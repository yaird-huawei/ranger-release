/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.ranger.patch;

import java.util.List;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.ranger.biz.ServiceDBStore;
import org.apache.ranger.db.RangerDaoManager;
import org.apache.ranger.entity.XXService;
import org.apache.ranger.plugin.model.RangerService;
import org.apache.ranger.plugin.model.RangerServiceDef;
import org.apache.ranger.service.RangerServiceService;
import org.apache.ranger.util.CLIUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PatchForAtlasServiceDefUpdate_J10013 extends BaseLoader {
	private static final Logger logger = Logger.getLogger(PatchForAtlasServiceDefUpdate_J10013.class);
	public static final String SERVICEDBSTORE_SERVICEDEFBYNAME_ATLAS_NAME  = "atlas";
	
	@Autowired
	RangerDaoManager daoMgr;

	@Autowired
	ServiceDBStore svcDBStore;
	
	@Autowired
	RangerServiceService svcService;

	public static void main(String[] args) {
		logger.info("main()");
		try {
			PatchForAtlasServiceDefUpdate_J10013 loader = (PatchForAtlasServiceDefUpdate_J10013) CLIUtil.getBean(PatchForAtlasServiceDefUpdate_J10013.class);
			loader.init();
			while (loader.isMoreToProcess()) {
				loader.load();
			}
			logger.info("Load complete. Exiting!!!");
			System.exit(0);
		} catch (Exception e) {
			logger.error("Error loading", e);
			System.exit(1);
		}
	}
	
	@Override
	public void init() throws Exception {
	}

	@Override
	public void execLoad() {
		logger.info("==> PatchForAtlasServiceDefUpdate.execLoad()");
		try {
			updateAtlasServiceDef();
		} catch (Exception e) {
			logger.error("Error whille updateAtlasServiceDef()data.", e);
		}
		logger.info("<== PatchForAtlasServiceDefUpdate.execLoad()");
	}

	@Override
	public void printStats() {
		logger.info("PatchForAtlasServiceDefUpdate data ");
	}

	private void updateAtlasServiceDef(){
		String serviceDefName=null;
		try {
			RangerServiceDef serviceDef = svcDBStore.getServiceDefByName(SERVICEDBSTORE_SERVICEDEFBYNAME_ATLAS_NAME);
			// if service-def named 'atlas' does not exist then no need to process this patch further.
			if(serviceDef == null) {
				return;
			}
			serviceDefName=serviceDef.getName();
			logger.info("Started patching service-def:[" + serviceDefName + "]");
			List<XXService> services=daoMgr.getXXService().findByServiceDefId(serviceDef.getId());
			if(CollectionUtils.isNotEmpty(services)) {
				for(XXService service : services) {
					if(service!=null && StringUtils.isNotEmpty(service.getName())) {
						String updateServiceName=getUpdatedServiceName(service.getName());
						service.setName(updateServiceName);
						RangerService rangerService=svcService.getPopulatedViewObject(service);
						rangerService=svcDBStore.updateService(rangerService, null);
						if(updateServiceName.equals(rangerService.getName())){
							logger.info("Service "+service.getName()+" name has been changed to "+updateServiceName);
						}
					}
				}
			}
			serviceDef.setName(serviceDefName.concat("-v1"));
			RangerServiceDef updatedServiceDef=svcDBStore.updateServiceDef(serviceDef);
			if(serviceDefName.equals(updatedServiceDef.getName())){
				logger.info("ServiceDef "+serviceDefName+" name has been changed to "+updatedServiceDef.getName());
			}
			logger.info("Completed patching service-def:[" + serviceDefName + "]");
		}catch(Exception ex) {
			logger.error("Error while updating Atlas service-def:[" + serviceDefName + "]", ex);
		}
	}

	public static String getUpdatedServiceName(String serviceName) {
		if(serviceName.contains("-v1")) {
			String serviceNamePart1=serviceName.substring(0,serviceName.indexOf("-v1"));
			String serviceNamePart2=serviceName.substring(serviceName.indexOf("-v1"));
			if(serviceNamePart2.contains(".")) {
				String version=serviceNamePart2.substring(0,serviceNamePart2.indexOf("."));
				String subversionStr=serviceNamePart2.substring(serviceNamePart2.indexOf(".")+1);
				int subversion=0;
				try {
					subversion=Integer.parseInt(subversionStr);
				}catch(Exception ex) {
				}
				subversion++;
				serviceNamePart2=version.concat("."+subversion);
				serviceName=serviceNamePart1.concat(serviceNamePart2);
			}else {
				serviceName=serviceName.concat(".1");
			}
		} else {
			serviceName=serviceName.concat("-v1");
		}
		return serviceName;
	}
}