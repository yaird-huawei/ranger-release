/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package com.xasecure.common;

import com.xasecure.db.XADaoManager;
import com.xasecure.entity.XXAsset;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Scope("singleton")
public class TimedExecutorHelper {
    static final private Logger LOG = Logger.getLogger(TimedExecutorHelper.class);

    @Autowired
    protected XADaoManager xADaoManager;

    @Autowired
    protected JSONUtil jsonUtil;

    static final public String _Type_Resource_Lookup = "resource.lookup";
    static final public String _Type_VAlidate_Config = "validate.config";
    static final public long _DefaultTimeoutValue_Lookp = 1000; // 1 s
    static final public long _DefaultTimeoutValue_ValidateConfig = 10000; // 10 s

    public long getTimeoutValueForLookupInMilliSeconds(String dataSourceName) {
        return getTimeoutValueInMilliSeconds(_Type_Resource_Lookup, dataSourceName);
    }

    public long getTimeoutValueForValidateConfigInMilliSeconds(String dataSourceName) {
        return getTimeoutValueInMilliSeconds(_Type_VAlidate_Config, dataSourceName);
    }

    long getTimeoutValueInMilliSeconds(final String type, final String serviceName) {
        long result = _DefaultTimeoutValue_Lookp;
        int assetType = AppConstants.ASSET_UNKNOWN;
        Map<String, String> configMap = MapUtils.EMPTY_MAP;
        XXAsset asset = xADaoManager.getXXAsset().findByAssetName(serviceName);
        if (asset != null) {
            assetType = asset.getAssetType();
            String config = asset.getConfig();
            if (StringUtils.isNotBlank(config)) {
                configMap = (Map<String, String>) jsonUtil.jsonToMap(config);
            }
        }
        result = getTimeoutValueInMilliSeconds(type, assetType, serviceName, configMap, _DefaultTimeoutValue_Lookp);

        return result;
    }

    long getTimeoutValueInMilliSeconds(final String type, final int serviceTypeEnum, final String serviceName,
                                       Map<String, String> config, long defaultValue) {
        if (LOG.isDebugEnabled()) {
            LOG.debug(String.format("==> TimedCallableConfigurator.getTimeoutValueInMilliSeconds (%s, %d, %s, %s, %s)", type, serviceTypeEnum, serviceName, config.toString(), defaultValue));
        }
        String propertyName = type + ".timeout.value.in.ms"; // type == _Type_VAlidate_Config || type == _Type_Resource_Lookup
        String serviceType = getServiceType(serviceTypeEnum);

        Long result = null;
        if (config != null && config.containsKey(propertyName)) {
            result = parseLong(config.get(propertyName));
        }
        if (result != null) {
            LOG.debug("Found override in service config!");
        } else {
            String[] keys = new String[] {
                    "ranger.service." + serviceName + "." + propertyName,
                    "ranger.servicetype." + serviceType + "." + propertyName,
                    "ranger." + propertyName
            };
            for (String key : keys) {
                String value = PropertiesUtil.getProperty(key);
                if (value != null) {
                    result = parseLong(value);
                    if (result != null) {
                        if (LOG.isDebugEnabled()) {
                            LOG.debug("Using the value[" + value + "] found in property[" + key + "]");
                        }
                        break;
                    }
                }
            }
        }
        if (result == null) {
            if (LOG.isDebugEnabled()) {
                LOG.debug("No overrides found in service config of properties file.  Using supplied default of[" + defaultValue + "]!");
            }
            result = defaultValue;
        }

        if (LOG.isDebugEnabled()) {
            LOG.debug(String.format("==> TimedCallableConfigurator.getTimeoutValueInMilliSeconds (%s, %d, %s, %s, %s): %d", type, serviceTypeEnum, serviceName, config.toString(), defaultValue, result));
        }
        return result;
    }

    private String getServiceType(int serviceTypeEnum) {
        if (LOG.isDebugEnabled()) {
            LOG.debug("==> TimedCallableConfigurator.getServiceType(" + serviceTypeEnum + ")");
        }
        String type;
        switch (serviceTypeEnum) {
            case AppConstants.ASSET_HBASE:
                type = "hbase";
                break;
            case AppConstants.ASSET_HDFS:
                type = "hdfs";
                break;
            case AppConstants.ASSET_HIVE:
                type = "hive";
                break;
            case AppConstants.ASSET_KNOX:
                type = "knox";
                break;
            case AppConstants.ASSET_STORM:
                type = "storm";
                break;
            case AppConstants.ASSET_UNKNOWN:
            default:
                type = "unknown";
                break;
        }
        if (LOG.isDebugEnabled()) {
            LOG.debug("<== TimedCallableConfigurator.getServiceType: serviceTypeEnum(" + serviceTypeEnum + "): " + type +")");
        }
        return type;
    }

    Long parseLong(String str) {
        try {
            return Long.valueOf(str);
        } catch (NumberFormatException e) {
            if (LOG.isDebugEnabled()) {
                LOG.debug("TimedCallableConfigurator.parseLong: could not parse [" + str + "] as Long! Returning null");
            }
            return null;
        }
    }
}
