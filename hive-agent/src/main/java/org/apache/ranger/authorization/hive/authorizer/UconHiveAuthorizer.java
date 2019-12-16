package org.apache.ranger.authorization.hive.authorizer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huawei.policy.core.dto.UconRangerConstants;
import com.huawei.policy.core.dto.XacmlDecisionType;
import com.huawei.policy.core.dto.ucon.RequestElementDTO;
import com.huawei.policy.core.dto.ucon.ResultElementDTO;
import com.huawei.policy.core.pep.DecisionRequest;
import com.huawei.policy.core.pep.DecisionRequests;
import com.huawei.policy.core.pep.DecisionResponses;
import io.jaegertracing.Configuration;
import io.jaegertracing.internal.JaegerTracer;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import jodd.util.StringUtil;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.hive.conf.HiveConf;
import org.apache.hadoop.hive.ql.security.authorization.plugin.*;
import org.apache.hadoop.security.UserGroupInformation;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class UconHiveAuthorizer {

    private static final Log LOG = LogFactory.getLog(UconHiveAuthorizer.class);


    private static final String  RANGER_PLUGIN_HIVE_UCON_PDP_URL = "ranger.plugin.hive.ucon.pdp.url";
    private static final String  RANGER_PLUGIN_HIVE_UCON_AUTHZ_ENABLED = "ranger.plugin.hive.ucon.authorization.enabled";
    private static final String  UCON_REQUEST_METADATA_TABLE_NAME = "table";
    private static final String  UCON_REQUEST_METADATA_DB_NAME = "database";
    private static final String TAG_POLICY_DECISION_KEY = "TAG_POLICY_DECISION";
    private static final String UCON_POLICY_DECISION_KEY = "UCON_POLICY_DECISION";


    private static CloseableHttpClient httpclient;
    private static String uconPdpUrl;
    private static boolean enabled = false;
    private static Tracer jaegerTracer;

    static{
        jaegerTracer = initTracer("HiveUcon");
        GlobalTracer.registerIfAbsent(jaegerTracer);
    }

    private static ObjectMapper objectMapper = new ObjectMapper();

    public UconHiveAuthorizer(HiveConf hiveConf) {

        String enabledStr =  hiveConf.get(RANGER_PLUGIN_HIVE_UCON_AUTHZ_ENABLED);
        if(!StringUtil.isEmpty(enabledStr) && enabledStr.equals("true")) enabled = true;

        if(enabled){
            PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
            httpclient = HttpClients.custom().setConnectionManager(connectionManager).build();

            uconPdpUrl = hiveConf.get(RANGER_PLUGIN_HIVE_UCON_PDP_URL);
            if(StringUtil.isEmpty(uconPdpUrl)) throw new RuntimeException(RANGER_PLUGIN_HIVE_UCON_PDP_URL + " not configured");
        }
    }


    public boolean getDecision(HiveOperationType hiveOpType,
                     List<HivePrivilegeObject> inputHObjs,
                     List<HivePrivilegeObject> outputHObjs,
                     HiveAuthzContext context,
                     List<RangerHiveAccessRequest> requests) {

        //allows access if hiveOpType is not supported
        if(!isHiveOpTypeSupported(hiveOpType)) return true;

        //-------------------------- experimental --- start
        Span span = null;
        if(jaegerTracer != null) span = jaegerTracer.scopeManager().activeSpan();

        if(span == null){
            LOG.info("start span");
            Span hiveUconSpan = jaegerTracer.buildSpan("hiveUconSpan").start();
            hiveUconSpan.setBaggageItem("mybaggage-uc", "ucon-baggage");
            hiveUconSpan.finish();
            LOG.info("finish span");

        }
        //-------------------------- experimental --- end

        DecisionRequests decisionRequests = new DecisionRequests();
        List<DecisionRequest> collect = requests.stream().map(request -> buildDecisionRequest(request)).collect(Collectors.toList());
        decisionRequests.getDecisionRequestList().addAll(collect);

         DecisionResponses decisionResponses = getDecisionResponses(decisionRequests);

        boolean isAnyDeny = decisionResponses.getDecisionResponseList().stream()
                 .map(decisionResponse -> decisionResponse.getMetadata())
                 .filter(map ->{
                     String uconPolicyDecision = map.get(UCON_POLICY_DECISION_KEY);
                     String tagPolicyDecision = map.get(TAG_POLICY_DECISION_KEY);
                     if(!XacmlDecisionType.PERMIT.name().equals(uconPolicyDecision) || !XacmlDecisionType.PERMIT.name().equals(tagPolicyDecision))
                         return true;
                    return false;
                 }).findFirst().isPresent();

         return isAnyDeny;
    }

    protected List<HivePrivilegeObject>  applyUconRowFilterAndColumnMasking(
            HiveAuthzContext queryContext, List<HivePrivilegeObject> hiveObjs,
            UserGroupInformation ugi, HiveAuthzSessionContext hiveAuthzSessionContext){

        List<HivePrivilegeObject> ret = new ArrayList<HivePrivilegeObject>();

        DecisionRequests decisionRequests = new DecisionRequests();

        if(CollectionUtils.isNotEmpty(hiveObjs)) {
            hiveObjs.stream().forEach(hiveObj ->{
                String uconId = UconHiveUtils.getUconId();
                String action = HiveAccessType.SELECT.name().toLowerCase();
                List<String> authZColumns = UconHiveUtils.getAuthZColumns(queryContext.getCommandString(), hiveObj);
                List<String> resources = UconHiveUtils.parseRequestResources( hiveObj.getDbname(), hiveObj.getObjectName(), authZColumns);
                List<String> environments = new ArrayList<>();

                 if(StringUtils.isEmpty(uconId)) uconId = ugi.getUserName();

                RequestElementDTO requestElementDTO = UconHiveUtils.buildRequestElementDTO(uconId, action, resources, environments);

                DecisionRequest decisionRequest = new DecisionRequest();
                decisionRequest.setRequestElementDTO(requestElementDTO);
                decisionRequest.setTenantId("huawei");
                decisionRequest.setUconId(UconHiveUtils.getUconId());
                decisionRequest.setSessionId(hiveAuthzSessionContext.getSessionString());

                decisionRequest.addMetadataEntry(UCON_REQUEST_METADATA_DB_NAME, hiveObj.getDbname());
                decisionRequest.addMetadataEntry(UCON_REQUEST_METADATA_TABLE_NAME, hiveObj.getObjectName());

                decisionRequest.addMetadataEntry("accessTime", new Date().toString());
                decisionRequest.addMetadataEntry("IPAddresses", queryContext.getIpAddress());
                decisionRequest.addMetadataEntry("ClientType", hiveAuthzSessionContext.getClientType().name());
                decisionRequest.addMetadataEntry("RequestData", queryContext.getCommandString());
                decisionRequest.addMetadataEntry("SessionId", hiveAuthzSessionContext.getSessionString());

                //build request
                decisionRequests.getDecisionRequestList().add(decisionRequest);
            });

            DecisionResponses decisionResponses = getDecisionResponses(decisionRequests);

            Map<String, Map<String, String>> transformerMapMap = new HashMap<>();

            decisionResponses.getDecisionResponseList().stream()
                    .forEach(decisionResponse -> {
                        String tableName = decisionResponse.getMetadata().get(UCON_REQUEST_METADATA_TABLE_NAME);

                        Optional<ResultElementDTO> first = decisionResponse.getResponseElementDTO().getResults().stream().findFirst();
                        if(first.isPresent()){
                            ResultElementDTO resultElementDTO = first.get();
                            if(resultElementDTO.getDecisionType().equals(XacmlDecisionType.PERMIT)){
                                Map<String, String> transformedColsMap = new HashMap<>();
                                resultElementDTO.getObligationElementDTOs().stream().forEach(obligationElementDTO -> {
                                    String obligationTransformer = UconRangerConstants.UCON_RANGER_OBLIGATION.get(obligationElementDTO.getObligationId());
                                    obligationElementDTO.getAttributeAssignmentElementDTOS().stream().forEach(attributeAssignmentElementDTO -> {
                                        String dbTableColumn = attributeAssignmentElementDTO.getAttributeValue();
                                        String[] split = dbTableColumn.replaceFirst("/","").split("/");
                                        if(split.length == 3){
                                            transformedColsMap.put(split[2], obligationTransformer == null ? split[2] : obligationTransformer.replace("{col}", split[2]));
                                        }
                                    });
                                    transformerMapMap.put(tableName, transformedColsMap);
                                });
                            }
                        }
                    });


            if(transformerMapMap.size() != 0)
                hiveObjs.stream().forEach(hivePrivilegeObject -> {
                    Map<String, String> transformedCols = transformerMapMap.get(hivePrivilegeObject.getObjectName());
                    List<String> cellValueTransformers = new ArrayList<>();
                    hivePrivilegeObject.getColumns().stream().forEach( col ->{
                        cellValueTransformers.add(transformedCols.containsKey(col) ? transformedCols.get(col) : col);
                            });
                    hivePrivilegeObject.setCellValueTransformers(cellValueTransformers);

                    ret.add(hivePrivilegeObject);

                });
        }

      return ret;

    }

    private DecisionResponses getDecisionResponses(DecisionRequests decisionRequests) {
        CloseableHttpResponse response = null;
        try {
            String jsonStr = objectMapper.writeValueAsString(decisionRequests);
            StringEntity requestEntity = new StringEntity(jsonStr, ContentType.APPLICATION_JSON);

            HttpPost postMethod = new HttpPost(uconPdpUrl);
            postMethod.setEntity(requestEntity);

            response = httpclient.execute(postMethod);
            String jsonResponse = EntityUtils.toString(response.getEntity());
            return objectMapper.readValue(jsonResponse, DecisionResponses.class);

        } catch (IOException e) {
            LOG.error(e.getMessage());
            LOG.error(e.toString());
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public boolean isEnabled(){
        return enabled;
    }

    private DecisionRequest buildDecisionRequest(RangerHiveAccessRequest rangerRequest){

        String action = rangerRequest.getAccessType();
        List<String> resources = UconHiveUtils.parseRequestResources(rangerRequest.getResource());
        List<String> environments = new ArrayList<>();
        String uconId = UconHiveUtils.getUconId();
        if(StringUtils.isEmpty(uconId)) uconId = rangerRequest.getUser();

        RequestElementDTO requestElementDTO = UconHiveUtils.buildRequestElementDTO(uconId, action, resources, environments);

        DecisionRequest decisionRequest = new DecisionRequest();
        decisionRequest.setTenantId("huawei");
        decisionRequest.setUconId(UconHiveUtils.getUconId());
        decisionRequest.setSessionId(rangerRequest.getSessionId());

        decisionRequest.setRequestElementDTO(requestElementDTO);

        decisionRequest.addMetadataEntry("accessType", rangerRequest.getAccessType());
        decisionRequest.addMetadataEntry("user", rangerRequest.getUser());
        decisionRequest.addMetadataEntry("accessTime", rangerRequest.getAccessTime().toString());
        decisionRequest.addMetadataEntry("ClientIPAddress", rangerRequest.getClientIPAddress());
        decisionRequest.addMetadataEntry("ForwardedAddresses", rangerRequest.getForwardedAddresses().toString());
        decisionRequest.addMetadataEntry("RemoteIPAddress", rangerRequest.getRemoteIPAddress());
        decisionRequest.addMetadataEntry("ClientType", rangerRequest.getClientType());
        decisionRequest.addMetadataEntry("Action", rangerRequest.getAction());
        decisionRequest.addMetadataEntry("RequestData", rangerRequest.getRequestData());
        decisionRequest.addMetadataEntry("SessionId", rangerRequest.getSessionId());
        decisionRequest.addMetadataEntry("Context", rangerRequest.getContext().toString());
        decisionRequest.addMetadataEntry("UserGroups", rangerRequest.getUserGroups().toString());

        return decisionRequest;
    }



    private static JaegerTracer initTracer(String service) {
        Configuration.SamplerConfiguration samplerConfig = Configuration.SamplerConfiguration
                .fromEnv()
                .withType("const")
                .withParam(1);

        Configuration.SenderConfiguration senderConfiguration = new Configuration.SenderConfiguration();
        senderConfiguration.withEndpoint("http://192.168.56.1:14268/api/traces");

        Configuration.ReporterConfiguration reporterConfig = Configuration.ReporterConfiguration
                .fromEnv()
                .withSender(senderConfiguration)
                .withLogSpans(true);

        Configuration config = new Configuration(service)
                .withSampler(samplerConfig)
                .withReporter(reporterConfig);               ;
        return config.getTracer();
    }


    private boolean isHiveOpTypeSupported(HiveOperationType hiveOpType){
        switch (hiveOpType){
            case REPLDUMP:
                return false;
            default:
                return true;
        }
    }

}
