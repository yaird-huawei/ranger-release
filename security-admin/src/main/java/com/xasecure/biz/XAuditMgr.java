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

 package com.xasecure.biz;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import com.xasecure.common.ContextUtil;
import com.xasecure.common.SearchCriteria;
import com.xasecure.common.UserSessionBase;
import com.xasecure.view.VXAccessAudit;
import com.xasecure.view.VXAccessAuditList;
import com.xasecure.view.VXLong;
import com.xasecure.view.VXResponse;
import com.xasecure.view.VXTrxLog;
import com.xasecure.view.VXTrxLogList;

@Component
public class XAuditMgr extends XAuditMgrBase {
	public VXTrxLog getXTrxLog(Long id){
		checkAdminAccess();
		return super.getXTrxLog(id);
	}

	public VXTrxLog createXTrxLog(VXTrxLog vXTrxLog){
		checkAdminAccess();
		return super.createXTrxLog(vXTrxLog);
	}

	public VXTrxLog updateXTrxLog(VXTrxLog vXTrxLog) {
		checkAdminAccess();
		return super.updateXTrxLog(vXTrxLog);
	}

	public void deleteXTrxLog(Long id, boolean force) {
		checkAdminAccess();
		super.deleteXTrxLog(id,force);
	}

	public VXTrxLogList searchXTrxLogs(SearchCriteria searchCriteria) {
		checkAdminAccess();
		return super.searchXTrxLogs(searchCriteria);
	}

	public VXLong getXTrxLogSearchCount(SearchCriteria searchCriteria) {
		checkAdminAccess();
		return super.getXTrxLogSearchCount(searchCriteria);
	}

	public VXAccessAudit getXAccessAudit(Long id){
		checkAdminAccess();
		return super.getXAccessAudit(id);
	}

	public VXAccessAudit createXAccessAudit(VXAccessAudit vXAccessAudit){
		checkAdminAccess();
		return super.createXAccessAudit(vXAccessAudit);
	}

	public VXAccessAudit updateXAccessAudit(VXAccessAudit vXAccessAudit) {
		checkAdminAccess();
		return super.updateXAccessAudit(vXAccessAudit);
	}

	public void deleteXAccessAudit(Long id, boolean force) {
		checkAdminAccess();
		super.deleteXAccessAudit(id,force);
	}

	public VXAccessAuditList searchXAccessAudits(SearchCriteria searchCriteria) {
		checkAdminAccess();
		return super.searchXAccessAudits(searchCriteria);
	}

	public VXLong getXAccessAuditSearchCount(SearchCriteria searchCriteria) {
		checkAdminAccess();
		return super.getXAccessAuditSearchCount(searchCriteria);
	}

	public void checkAdminAccess() {
		UserSessionBase session = ContextUtil.getCurrentUserSession();
		if (session != null) {
			if (!session.isUserAdmin()) {
				throw restErrorUtil.create403RESTException("Operation"
						+ " denied. LoggedInUser="
						+ (session != null ? session.getXXPortalUser().getId()
								: "Not Logged In")
						+ " ,isn't permitted to perform the action.");
			}
		}else{
			VXResponse vXResponse = new VXResponse();
			vXResponse.setStatusCode(HttpServletResponse.SC_UNAUTHORIZED);
			vXResponse.setMsgDesc("Bad Credentials");
			throw restErrorUtil.generateRESTException(vXResponse);
		}
	}
}

