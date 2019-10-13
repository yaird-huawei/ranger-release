package org.apache.ranger.authorization.hive.authorizer;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.huawei.policy.core.model.ranger.RangerAccessRequestRestObj;
import com.huawei.policy.core.model.ranger.RangerAccessResourceRestObj;
import io.jaegertracing.Configuration;
import io.jaegertracing.internal.JaegerTracer;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import jodd.util.StringUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.hive.conf.HiveConf;
import org.apache.hadoop.hive.ql.security.authorization.plugin.HiveAuthzContext;
import org.apache.hadoop.hive.ql.security.authorization.plugin.HiveOperationType;
import org.apache.hadoop.hive.ql.security.authorization.plugin.HivePrivilegeObject;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.ranger.plugin.policyengine.RangerAccessResource;
import org.apache.ranger.plugin.policyengine.RangerAccessResourceImpl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class UconHiveAuthorizer {

    private static final Log LOG = LogFactory.getLog(UconHiveAuthorizer.class);


    private static final String  RANGER_PLUGIN_HIVE_UCON_PDP_URL = "ranger.plugin.hive.ucon.pdp.url";
    private static final String  RANGER_PLUGIN_HIVE_UCON_AUTHZ_ENABLED = "ranger.plugin.hive.ucon.authorization.enabled";
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
                     List<RangerHiveAccessRequest> requests){

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






        //Adding here my externalendPoint - start
        HashMap<String, Object> mmap = new HashMap<>();
        mmap.put("hiveOpType", hiveOpType);
        mmap.put("inputHObjs", inputHObjs);
        mmap.put("outputHObjs", outputHObjs);
        mmap.put("context", context);
        mmap.put("requests", requests.stream().map(req -> requestMapper(req)).collect(Collectors.toList()));

        try {
            String jsonStr = objectMapper.writeValueAsString(mmap);
            postClient(jsonStr);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return true;
    }


    private void postClient(String jsonStr){
        StringEntity requestEntity = new StringEntity(jsonStr, ContentType.APPLICATION_JSON);

        HttpPost postMethod = new HttpPost(uconPdpUrl);
        postMethod.setEntity(requestEntity);
        try {
            CloseableHttpResponse closeableHttpResponse = httpclient.execute(postMethod);
            closeableHttpResponse.close();
        } catch (IOException e) {
            LOG.info("YAIR DIAZ - Error connecting to AUTHZ external server!");
            LOG.info(e.getMessage());
            LOG.info(e.toString());
        }
    }

    public boolean isEnabled(){
        return enabled;
    }


    private RangerAccessRequestRestObj requestMapper(RangerHiveAccessRequest rangerRequest){
        RangerAccessRequestRestObj rangerRequestRest = new RangerAccessRequestRestObj();
        rangerRequestRest.setAccessType(rangerRequest.getAccessType());
        rangerRequestRest.setUser(rangerRequest.getUser());
        rangerRequestRest.setUserGroups(rangerRequest.getUserGroups());
        rangerRequestRest.setAccessTime(rangerRequest.getAccessTime());
        rangerRequestRest.setClientIPAddress(rangerRequest.getClientIPAddress());
        rangerRequestRest.setForwardedAddresses(rangerRequest.getForwardedAddresses());
        rangerRequestRest.setRemoteIPAddress(rangerRequest.getRemoteIPAddress());
        rangerRequestRest.setClientType(rangerRequest.getClientType());
        rangerRequestRest.setAction(rangerRequest.getAction());
        rangerRequestRest.setRequestData(rangerRequest.getRequestData());
        rangerRequestRest.setSessionId(rangerRequest.getSessionId());
        rangerRequestRest.setContext(rangerRequest.getContext());

        RangerAccessResourceRestObj resourceRestObj = new RangerAccessResourceRestObj();
        RangerAccessResource rar = rangerRequest.getResource();
        if(rar != null && rar instanceof RangerAccessResourceImpl){
            RangerAccessResourceImpl rari = (RangerAccessResourceImpl) rar;
            resourceRestObj.setOwnerUser(rari.getOwnerUser());
            resourceRestObj.setElements((rari.getAsMap()));
        }
        rangerRequestRest.setResource(resourceRestObj);

        return rangerRequestRest;

//        RangerAccessResultRestObj resultRest = new RangerAccessResultRestObj();
//        resultRest.setAllowed(result.getIsAllowed());
//        resultRest.setAccessDetermined(result.getIsAccessDetermined());
//        resultRest.setAuditedDetermined(result.getIsAuditedDetermined());
//        resultRest.setAudited(result.getIsAudited());
//        resultRest.setPolicyType(result.getPolicyType());
//        resultRest.setPolicyId(result.getPolicyId());
//        resultRest.setAuditPolicyId(result.getAuditPolicyId());
//        resultRest.setEvaluatedPoliciesCount(result.getEvaluatedPoliciesCount());
//        resultRest.setReason(result.getReason());
//        resultRest.setAdditionalInfo(result.getAdditionalInfo());
//
//
//        RangerRequestContext rangerRequestContext = new RangerRequestContext();
//        rangerRequestContext.setRangerAccessRequestRestObj(rangerRequestRest);
//        rangerRequestContext.setRangerAccessResultRestObj(resultRest);

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

    boolean isHiveOpTypeSupported(HiveOperationType hiveOpType){
        switch (hiveOpType){
            case REPLDUMP:
                return false;
            default:
                return true;
        }
    }
}
