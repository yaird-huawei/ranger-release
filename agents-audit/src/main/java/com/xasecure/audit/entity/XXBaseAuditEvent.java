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

 package com.xasecure.audit.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Properties;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.xasecure.audit.model.AuditEventBase;
import com.xasecure.audit.provider.BaseAuditProvider;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Entity implementation class for Entity: XABaseAuditEvent
 *
 */
@Entity
@Inheritance
@DiscriminatorColumn(name="audit_type", discriminatorType=javax.persistence.DiscriminatorType.INTEGER, length=2)
@DiscriminatorValue("0")
@Table(name="xa_access_audit")
public class XXBaseAuditEvent implements Serializable {
	private static final long serialVersionUID = 1L;

	private static final Log LOG = LogFactory.getLog(XXBaseAuditEvent.class);
	
	static int MaxValueLengthAccessType = 255;
	static int MaxValueLengthAclEnforcer = 255;
	static int MaxValueLengthAgentId = 255;
	static int MaxValueLengthClientIp = 255;
	static int MaxValueLengthClientType = 255;
	static int MaxValueLengthRepoName = 255;
	static int MaxValueLengthResultReason = 255;
	static int MaxValueLengthSessionId = 255;
	static int MaxValueLengthRequestUser = 255;
	static int MaxValueLengthAction = 2000;
	static int MaxValueLengthRequestData = 2000;
	static int MaxValueLengthResourcePath = 2000;
	static int MaxValueLengthResourceType = 255;

	private long   auditId;
	private String agentId;
	private String user;
	private Date   timeStamp;
	private long   policyId;
	private String accessType;
	private int  accessResult;
	private String resultReason;
	private String aclEnforcer;
	private int      repositoryType;
	private String repositoryName;
	private String sessionId;
	private String clientType;
	private String clientIP;
	private String action;

	public XXBaseAuditEvent() {
		super();
	}   

	public XXBaseAuditEvent(AuditEventBase event) {
		this.agentId = event.getAgentId();
		this.user = event.getUser();
		this.timeStamp = event.getEventTime();
		this.policyId = event.getPolicyId();
		this.accessType = event.getAccessType();
		this.accessResult = event.getAccessResult();
		this.resultReason = event.getResultReason();
		this.aclEnforcer = event.getAclEnforcer();
		this.repositoryType = event.getRepositoryType();
		this.repositoryName = event.getRepositoryName();
		this.sessionId = event.getSessionId();
		this.clientType = event.getClientType();
		this.clientIP = event.getClientIP();
		this.action = event.getAction();
	}

	public static void init(Properties props)
	{
		final String AUDIT_DB_MAX_COLUMN_VALUE = "xasecure.audit.db.max.columnvalue";
		MaxValueLengthAccessType = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "access_type", MaxValueLengthAccessType);
		logMaxColumnValue("access_type", MaxValueLengthAccessType);

		MaxValueLengthAclEnforcer = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "acl_enforcer", MaxValueLengthAclEnforcer);
		logMaxColumnValue("action", MaxValueLengthAclEnforcer);

		MaxValueLengthAction = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "action", MaxValueLengthAction);
		logMaxColumnValue("action", MaxValueLengthAction);

		MaxValueLengthAgentId = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "agent_id", MaxValueLengthAgentId);
		logMaxColumnValue("agent_id", MaxValueLengthAgentId);

		MaxValueLengthClientIp = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "client_id", MaxValueLengthClientIp);
		logMaxColumnValue("client_id", MaxValueLengthClientIp);

		MaxValueLengthClientType = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "client_type", MaxValueLengthClientType);
		logMaxColumnValue("client_type", MaxValueLengthClientType);

		MaxValueLengthRepoName = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "repo_name", MaxValueLengthRepoName);
		logMaxColumnValue("repo_name", MaxValueLengthRepoName);

		MaxValueLengthResultReason = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "result_reason", MaxValueLengthResultReason);
		logMaxColumnValue("result_reason", MaxValueLengthResultReason);

		MaxValueLengthSessionId = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "session_id", MaxValueLengthSessionId);
		logMaxColumnValue("session_id", MaxValueLengthSessionId);

		MaxValueLengthRequestUser = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "request_user", MaxValueLengthRequestUser);
		logMaxColumnValue("request_user", MaxValueLengthRequestUser);

		MaxValueLengthAction = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "action", MaxValueLengthAction);
		logMaxColumnValue("action", MaxValueLengthAction);

		MaxValueLengthRequestData = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "request_data", MaxValueLengthRequestData);
		logMaxColumnValue("request_data", MaxValueLengthRequestData);

		MaxValueLengthResourcePath = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "resource_path", MaxValueLengthResourcePath);
		logMaxColumnValue("resource_path", MaxValueLengthResourcePath);

		MaxValueLengthResourceType = BaseAuditProvider.getIntProperty(props, AUDIT_DB_MAX_COLUMN_VALUE + "." + "resource_type", MaxValueLengthResourceType);
		logMaxColumnValue("resource_type", MaxValueLengthResourceType);
	}

	public static void logMaxColumnValue(String columnName, int configuredMaxValueLength) {
		LOG.info("Setting max column value for column[" + columnName + "] to [" + configuredMaxValueLength + "].");
		if (configuredMaxValueLength == 0) {
			LOG.info("Max length of column[" + columnName + "] was 0! Column will NOT be emitted in the audit.");
		} else if (configuredMaxValueLength < 0) {
			LOG.info("Max length of column[" + columnName + "] was less than 0! Column value will never be truncated.");
		}
	}

	@Id
	@SequenceGenerator(name="XA_ACCESS_AUDIT_SEQ",sequenceName="XA_ACCESS_AUDIT_SEQ",allocationSize=1)
	@GeneratedValue(strategy=GenerationType.AUTO,generator="XA_ACCESS_AUDIT_SEQ")
	@Column(name = "id", unique = true, nullable = false)
	public long getAuditId() {
		return this.auditId;
	}

	public void setAuditId(long auditId) {
		this.auditId = auditId;
	}   

	@Column(name = "agent_id")
	public String getAgentId() {
		return truncate(this.agentId, MaxValueLengthAgentId, "agent_id");
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	@Column(name = "request_user")
	public String getUser() {
		return truncate(this.user, MaxValueLengthRequestUser, "request_user");
	}

	public void setUser(String user) {
		this.user = user;
	}   

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "event_time")
	public Date getTimeStamp() {
		return this.timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}   

	@Column(name = "policy_id")
	public long getPolicyId() {
		return this.policyId;
	}

	public void setPolicyId(long policyId) {
		this.policyId = policyId;
	}   

	@Column(name = "access_type")
	public String getAccessType() {
		return truncate(this.accessType, MaxValueLengthAccessType, "access_type");
	}

	public void setAccessType(String accessType) {
		this.accessType = accessType;
	}   

	@Column(name = "access_result")
	public int getAccessResult() {
		return this.accessResult;
	}

	public void setAccessResult(int accessResult) {
		this.accessResult = accessResult;
	}   

	@Column(name = "result_reason")
	public String getResultReason() {
		return truncate(this.resultReason, MaxValueLengthResultReason, "result_reason");
	}

	public void setResultReason(String resultReason) {
		this.resultReason = resultReason;
	}   

	@Column(name = "acl_enforcer")
	public String getAclEnforcer() {
		return truncate(this.aclEnforcer, MaxValueLengthAclEnforcer, "acl_enforcer");
	}

	public void setAclEnforcer(String aclEnforcer) {
		this.aclEnforcer = aclEnforcer;
	}   

	@Column(name = "repo_type")
	public int getRepositoryType() {
		return this.repositoryType ;
	}

	public void setRepositoryType(int repositoryType) {
		this.repositoryType = repositoryType;
	}   

	@Column(name = "repo_name")
	public String getRepositoryName() {
		return truncate(this.repositoryName, MaxValueLengthRepoName, "repo_name");
	}

	public void setRepositoryName(String repositoryName) {
		this.repositoryName = repositoryName;
	}   

	@Column(name = "session_id")
	public String getSessionId() {
		return truncate(this.sessionId, MaxValueLengthSessionId, "session_id");
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}   

	@Column(name = "client_type")
	public String getClientType() {
		return truncate(this.clientType, MaxValueLengthClientType, "client_type");
	}

	public void setClientType(String clientType) {
		this.clientType = clientType;
	}   

	@Column(name = "client_ip")
	public String getClientIP() {
		return truncate(this.clientIP, MaxValueLengthClientIp, "client_ip");
	}

	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}

	@Column(name = "action")
	public String getAction() {
		return truncate(this.action, MaxValueLengthAction, "action");
	}

	public void setAction(String action) {
		this.action = action;
	}

	protected String truncateResourcePath(String value) {
		return truncate(value, MaxValueLengthResourcePath, "resource_path");
	}

	protected String truncateRequestData(String value) {
		return truncate(value, MaxValueLengthRequestData, "request_data");
	}

	protected String truncateResourceType(String value) {
		return truncate(value, MaxValueLengthResourceType, "resource_type");
	}

	protected String truncate(String value, int limit, String columnName) {
		String result = value;
		if (value != null) {
			if (limit < 0) {
				if (LOG.isDebugEnabled()) {
					LOG.debug(String.format("Truncation is suppressed for column[%s]: old value [%s], new value[%s]", columnName, value, result));
				}
			} else if (limit == 0) {
				if (LOG.isDebugEnabled()) {
					LOG.debug(String.format("Column[%s] is to be excluded from audit: old value [%s], new value[%s]", columnName, value, result));
				}
				result = null;
			} else {
				if (value.length() > limit) {
					result = getTrunctedValue(value, limit);
					if (LOG.isDebugEnabled()) {
						LOG.debug(String.format("Truncating value for column[%s] to [%d] characters: old value [%s], new value[%s]", columnName, limit, value, result));
					}
				} else {
					if (LOG.isDebugEnabled()) {
						LOG.debug(String.format("Value[%s] for column[%s] is less than [%d] characters. Leaving it as is.", value, columnName, limit));
					}
				}
			}
		}
		return result;
	}

	static final String TruncationMarker = "...";
	static final int TruncationMarkerLength = TruncationMarker.length();

	// must not be called with null value
	protected String getTrunctedValue(String value, int length) {
		if (LOG.isDebugEnabled()) {
			LOG.debug("==> getTrunctedValue(" + value + ", " + length + ")");
		}

		String result;
		if (length <= TruncationMarkerLength) {
			// NOTE: If value is to be truncated to a size that is less than of equal to the Truncation Marker then we won't put the marker in!!
			result = value.substring(0, length);
		} else {
			StringBuilder sb = new StringBuilder(value.substring(0, length - TruncationMarkerLength));
			sb.append(TruncationMarker);
			result = sb.toString();
		}

		if (LOG.isDebugEnabled()) {
			LOG.debug("<== getTrunctedValue(" + value + ", " + length + "): " + result);
		}
		return result;
	}
}
