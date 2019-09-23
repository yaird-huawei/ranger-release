package org.apache.ranger.authorization.hive.authorizer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.apache.ranger.authorization.utils.StringUtil;
import org.apache.ranger.plugin.policyengine.RangerAccessResult;

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



    public void test(HiveOperationType hiveOpType,
                     List<HivePrivilegeObject> inputHObjs,
                     List<HivePrivilegeObject> outputHObjs,
                     HiveAuthzContext context,
                     List<RangerHiveAccessRequest> requests,
                     RangerAccessResult result){


        //Adding here my externalendPoint - start
        HashMap<String, Object> mmap = new HashMap<>();
        mmap.put("hiveOpType", hiveOpType);
        mmap.put("inputHObjs", inputHObjs);
        mmap.put("outputHObjs", outputHObjs);
        mmap.put("context", context);
        mmap.put("requests", requests.stream().map(req -> req.toString()).collect(Collectors.toList()));
        mmap.put("result", result.toString());


        try {
            String jsonStr = objectMapper.writeValueAsString(mmap);
            postClient(jsonStr);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


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
}
