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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import com.xasecure.biz.XABizUtil;
import com.xasecure.biz.UserMgr;
import com.xasecure.common.ContextUtil;
import com.xasecure.common.MessageEnums;
import com.xasecure.common.PropertiesUtil;
import com.xasecure.common.SearchCriteria;
import com.xasecure.common.UserSessionBase;
import com.xasecure.common.XAConstants;
import com.xasecure.view.VXPortalUser;
import com.xasecure.view.VXUserGroupInfo;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xasecure.db.XADaoManager;
import com.xasecure.db.XXGroupUserDao;
import com.xasecure.entity.XXAuditMap;
import com.xasecure.entity.XXGroup;
import com.xasecure.entity.XXPermMap;
import com.xasecure.entity.XXPortalUser;
import com.xasecure.entity.XXTrxLog;
import com.xasecure.service.XUserService;
import com.xasecure.view.VXAuditMap;
import com.xasecure.view.VXAuditMapList;
import com.xasecure.view.VXGroup;
import com.xasecure.view.VXGroupGroup;
import com.xasecure.view.VXGroupList;
import com.xasecure.view.VXGroupUser;
import com.xasecure.view.VXGroupUserList;
import com.xasecure.view.VXLong;
import com.xasecure.view.VXPermMapList;
import com.xasecure.view.VXResponse;
import com.xasecure.view.VXUser;
import com.xasecure.view.VXUserList;

@Component
public class XUserMgr extends XUserMgrBase {

	@Autowired
	XUserService xUserService;

	@Autowired
	UserMgr userMgr;

	@Autowired
	XADaoManager daoManager;

	@Autowired
	XABizUtil xaBizUtil;

	@Autowired
	AssetMgr assetMgr;

	static final Logger logger = Logger.getLogger(XUserMgr.class);

	public void deleteXGroup(Long id, boolean force) {
		checkAdminAccess();
		if (force) {
			SearchCriteria searchCriteria = new SearchCriteria();
			searchCriteria.addParam("xGroupId", id);
			VXGroupUserList vxGroupUserList = searchXGroupUsers(searchCriteria);
			for (VXGroupUser groupUser : vxGroupUserList.getList()) {
				daoManager.getXXGroupUser().remove(groupUser.getId());
			}
			XXGroup xGroup = daoManager.getXXGroup().getById(id);
			daoManager.getXXGroup().remove(id);
			List<XXTrxLog> trxLogList = xGroupService.getTransactionLog(
					xGroupService.populateViewBean(xGroup), "delete");
			xaBizUtil.createTrxLog(trxLogList);
		} else {
			throw restErrorUtil.createRESTException(
					"serverMsg.modelMgrBaseDeleteModel",
					MessageEnums.OPER_NOT_ALLOWED_FOR_ENTITY);
		}
	}

	public void deleteXUser(Long id, boolean force) {
		checkAdminAccess();
		if (force) {
			SearchCriteria searchCriteria = new SearchCriteria();
			searchCriteria.addParam("xUserId", id);
			VXGroupUserList vxGroupUserList = searchXGroupUsers(searchCriteria);

			XXGroupUserDao xGroupUserDao = daoManager.getXXGroupUser();
			for (VXGroupUser groupUser : vxGroupUserList.getList()) {
				xGroupUserDao.remove(groupUser.getId());
			}
			// TODO : Need to discuss, why we were not removing user from the
			// system.

			// XXUser xUser = daoManager.getXXUser().getById(id);
			daoManager.getXXUser().remove(id);
			//applicationCache.removeUserID(id);
			// Not Supported So Far
			// List<XXTrxLog> trxLogList = xUserService.getTransactionLog(
			// xUserService.populateViewBean(xUser), "delete");
			// xaBizUtil.createTrxLog(trxLogList);
		} else {
			throw restErrorUtil.createRESTException(
					"serverMsg.modelMgrBaseDeleteModel",
					MessageEnums.OPER_NOT_ALLOWED_FOR_ENTITY);
		}
	}

	public VXUser getXUserByUserName(String userName) {
		return xUserService.getXUserByUserName(userName);
	}

	public VXUser createXUser(VXUser vXUser) {
		checkAdminAccess();
		String userName = vXUser.getName();
		if (userName == null || userName.isEmpty()) {
			throw restErrorUtil.createRESTException("Please provide a valid "
					+ "username.", MessageEnums.INVALID_INPUT_DATA);
		}

		if (vXUser.getDescription() == null) {
			setUserDesc(vXUser);
		}

		String actualPassword = vXUser.getPassword();

		VXPortalUser vXPortalUser = new VXPortalUser();
		vXPortalUser.setLoginId(userName);
		vXPortalUser.setFirstName(vXUser.getFirstName());
		vXPortalUser.setLastName(vXUser.getLastName());
		vXPortalUser.setEmailAddress(vXUser.getEmailAddress());
		vXPortalUser.setPublicScreenName(vXUser.getFirstName() +" "+ vXUser.getLastName());
		vXPortalUser.setPassword(actualPassword);
		vXPortalUser.setUserRoleList(vXUser.getUserRoleList());
		vXPortalUser = userMgr.createDefaultAccountUser(vXPortalUser);

		VXUser createdXUser = xUserService.createResource(vXUser);

		createdXUser.setPassword(actualPassword);
		List<XXTrxLog> trxLogList = xUserService.getTransactionLog(
				createdXUser, "create");

		String hiddenPassword = PropertiesUtil.getProperty(
				"xa.password.hidden", "*****");
		createdXUser.setPassword(hiddenPassword);

		Collection<Long> groupIdList = vXUser.getGroupIdList();
		List<VXGroupUser> vXGroupUsers = new ArrayList<VXGroupUser>();
		if (groupIdList != null) {
			for (Long groupId : groupIdList) {
				VXGroupUser vXGroupUser = createXGroupUser(
						createdXUser.getId(), groupId);
				// trxLogList.addAll(xGroupUserService.getTransactionLog(
				// vXGroupUser, "create"));
				vXGroupUsers.add(vXGroupUser);
			}
		}
		for (VXGroupUser vXGroupUser : vXGroupUsers) {
			trxLogList.addAll(xGroupUserService.getTransactionLog(vXGroupUser,
					"create"));
		}
		//
		xaBizUtil.createTrxLog(trxLogList);

		return createdXUser;
	}

	private VXGroupUser createXGroupUser(Long userId, Long groupId) {
		VXGroupUser vXGroupUser = new VXGroupUser();
		vXGroupUser.setParentGroupId(groupId);
		vXGroupUser.setUserId(userId);
		VXGroup vXGroup = xGroupService.readResource(groupId);
		vXGroupUser.setName(vXGroup.getName());
		vXGroupUser = xGroupUserService.createResource(vXGroupUser);

		return vXGroupUser;
	}

	public VXUser updateXUser(VXUser vXUser) {
		if(vXUser==null || vXUser.getName()==null || vXUser.getName().trim().isEmpty()){
			throw restErrorUtil.createRESTException("Please provide a valid "
					+ "username.", MessageEnums.INVALID_INPUT_DATA);
		}
		checkAccess(vXUser.getName());
		VXPortalUser oldUserProfile = userMgr.getUserProfileByLoginId(vXUser
				.getName());
		VXPortalUser vXPortalUser = new VXPortalUser();
		if(oldUserProfile!=null && oldUserProfile.getId()!=null){
			vXPortalUser.setId(oldUserProfile.getId());
		}
		// TODO : There is a possibility that old user may not exist.
		
		
		vXPortalUser.setFirstName(vXUser.getFirstName());
		vXPortalUser.setLastName(vXUser.getLastName());
		vXPortalUser.setEmailAddress(vXUser.getEmailAddress());
		vXPortalUser.setLoginId(vXUser.getName());
		vXPortalUser.setStatus(vXUser.getStatus());
		vXPortalUser.setUserRoleList(vXUser.getUserRoleList());
		vXPortalUser.setPublicScreenName(vXUser.getFirstName() + " "
				+ vXUser.getLastName());
		vXPortalUser.setUserSource(vXUser.getUserSource());
		String hiddenPasswordString = PropertiesUtil.getProperty(
				"xa.password.hidden", "*****");
		String password = vXUser.getPassword();
		if (password != null && password.equals(hiddenPasswordString)) {
			vXPortalUser.setPassword(oldUserProfile.getPassword());
		}
		vXPortalUser.setPassword(password);

		Collection<Long> groupIdList = vXUser.getGroupIdList();
		XXPortalUser xXPortalUser = new XXPortalUser();
		xXPortalUser=userMgr.updateUserWithPass(vXPortalUser);
		Collection<String> roleList = new ArrayList<String>();
		if(xXPortalUser!=null){
			roleList=userMgr.getRolesForUser(xXPortalUser);	
		}
		if(roleList==null || roleList.size()==0){
			roleList.add(XAConstants.ROLE_USER);
		}	
		
		// TODO I've to get the transaction log from here.
		// There is nothing to log anything in XXUser so far.
		vXUser = xUserService.updateResource(vXUser);
		vXUser.setUserRoleList(roleList);
		vXUser.setPassword(password);
		List<XXTrxLog> trxLogList = xUserService.getTransactionLog(vXUser,
				oldUserProfile, "update");
		vXUser.setPassword(hiddenPasswordString);

		Long userId = vXUser.getId();
		List<Long> groupUsersToRemove = new ArrayList<Long>();

		if (groupIdList != null) {
			SearchCriteria searchCriteria = new SearchCriteria();
			searchCriteria.addParam("xUserId", userId);
			VXGroupUserList vXGroupUserList = xGroupUserService
					.searchXGroupUsers(searchCriteria);
			List<VXGroupUser> vXGroupUsers = vXGroupUserList.getList();

			if (vXGroupUsers != null) {

				// Create
				for (Long groupId : groupIdList) {
					boolean found = false;
					for (VXGroupUser vXGroupUser : vXGroupUsers) {
						if (groupId.equals(vXGroupUser.getParentGroupId())) {
							found = true;
							break;
						}
					}
					if (!found) {
						VXGroupUser vXGroupUser = createXGroupUser(userId,
								groupId);
						trxLogList.addAll(xGroupUserService.getTransactionLog(
								vXGroupUser, "create"));
					}
				}

				// Delete
				for (VXGroupUser vXGroupUser : vXGroupUsers) {
					boolean found = false;
					for (Long groupId : groupIdList) {
						if (groupId.equals(vXGroupUser.getParentGroupId())) {
							trxLogList.addAll(xGroupUserService
									.getTransactionLog(vXGroupUser, "update"));
							found = true;
							break;
						}
					}
					if (!found) {
						// TODO I've to get the transaction log from here.
						trxLogList.addAll(xGroupUserService.getTransactionLog(
								vXGroupUser, "delete"));
						groupUsersToRemove.add(vXGroupUser.getId());
						// xGroupUserService.deleteResource(vXGroupUser.getId());
					}
				}

			} else {
				for (Long groupId : groupIdList) {
					VXGroupUser vXGroupUser = createXGroupUser(userId, groupId);
					trxLogList.addAll(xGroupUserService.getTransactionLog(
							vXGroupUser, "create"));
				}
			}
			vXUser.setGroupIdList(groupIdList);
		} else {
			logger.debug("Group id list can't be null for user. Group user "
					+ "mapping not updated for user : " + userId);
		}

		xaBizUtil.createTrxLog(trxLogList);

		for (Long groupUserId : groupUsersToRemove) {
			xGroupUserService.deleteResource(groupUserId);
		}

		return vXUser;
	}
	
	public VXUserGroupInfo createXUserGroupFromMap(VXUserGroupInfo vXUserGroupInfo) {
		checkAdminAccess();
		VXUserGroupInfo vxUGInfo = new VXUserGroupInfo();
		
		VXUser vXUser = vXUserGroupInfo.getXuserInfo();
		
		vXUser = xUserService.createXUserWithOutLogin(vXUser);
		
		vxUGInfo.setXuserInfo(vXUser);
		
		List<VXGroup> vxg = new ArrayList<VXGroup>();
		
		for(VXGroup vXGroup : vXUserGroupInfo.getXgroupInfo()){
			VXGroup VvXGroup = xGroupService.createXGroupWithOutLogin(vXGroup);
			vxg.add(VvXGroup);
			VXGroupUser vXGroupUser = new VXGroupUser();
			vXGroupUser.setUserId(vXUser.getId());
			vXGroupUser.setName(VvXGroup.getName());
			vXGroupUser = xGroupUserService.createXGroupUserWithOutLogin(vXGroupUser);
		}
		
		vxUGInfo.setXgroupInfo(vxg);
		
		return vxUGInfo;
	}
	
	
	public VXUser createXUserWithOutLogin(VXUser vXUser) {
		checkAdminAccess();
		return xUserService.createXUserWithOutLogin(vXUser);
	}

	public VXGroup createXGroup(VXGroup vXGroup) {
		checkAdminAccess();
		if (vXGroup.getDescription() == null) {
			vXGroup.setDescription(vXGroup.getName());
		}

		vXGroup = xGroupService.createResource(vXGroup);
		List<XXTrxLog> trxLogList = xGroupService.getTransactionLog(vXGroup,
				"create");
		xaBizUtil.createTrxLog(trxLogList);
		return vXGroup;
	}

	public VXGroup createXGroupWithoutLogin(VXGroup vXGroup) {
		checkAdminAccess();
		return xGroupService.createXGroupWithOutLogin(vXGroup);
	}

	public VXGroupUser createXGroupUser(VXGroupUser vXGroupUser) {
		checkAdminAccess();
		vXGroupUser = xGroupUserService
				.createXGroupUserWithOutLogin(vXGroupUser);
		return vXGroupUser;
	}

	public VXUser getXUser(Long id) {
		return xUserService.readResourceWithOutLogin(id);

	}

	public VXGroupUser getXGroupUser(Long id) {
		return xGroupUserService.readResourceWithOutLogin(id);

	}

	public VXGroup getXGroup(Long id) {
		return xGroupService.readResourceWithOutLogin(id);

	}

	/**
	 * // public void createXGroupAndXUser(String groupName, String userName) {
	 * 
	 * // Long groupId; // Long userId; // XXGroup xxGroup = //
	 * appDaoManager.getXXGroup().findByGroupName(groupName); // VXGroup
	 * vxGroup; // if (xxGroup == null) { // vxGroup = new VXGroup(); //
	 * vxGroup.setName(groupName); // vxGroup.setDescription(groupName); //
	 * vxGroup.setGroupType(AppConstants.XA_GROUP_USER); //
	 * vxGroup.setPriAcctId(1l); // vxGroup.setPriGrpId(1l); // vxGroup =
	 * xGroupService.createResource(vxGroup); // groupId = vxGroup.getId(); // }
	 * else { // groupId = xxGroup.getId(); // } // XXUser xxUser =
	 * appDaoManager.getXXUser().findByUserName(userName); // VXUser vxUser; //
	 * if (xxUser == null) { // vxUser = new VXUser(); //
	 * vxUser.setName(userName); // vxUser.setDescription(userName); //
	 * vxUser.setPriGrpId(1l); // vxUser.setPriAcctId(1l); // vxUser =
	 * xUserService.createResource(vxUser); // userId = vxUser.getId(); // }
	 * else { // userId = xxUser.getId(); // } // VXGroupUser vxGroupUser = new
	 * VXGroupUser(); // vxGroupUser.setParentGroupId(groupId); //
	 * vxGroupUser.setUserId(userId); // vxGroupUser.setName(groupName); //
	 * vxGroupUser.setPriAcctId(1l); // vxGroupUser.setPriGrpId(1l); //
	 * vxGroupUser = xGroupUserService.createResource(vxGroupUser);
	 * 
	 * // }
	 */

	public void deleteXGroupAndXUser(String groupName, String userName) {
		// access control
		checkAdminAccess();
		VXGroup vxGroup = xGroupService.getGroupByGroupName(groupName);
		VXUser vxUser = xUserService.getXUserByUserName(userName);
		SearchCriteria searchCriteria = new SearchCriteria();
		searchCriteria.addParam("xGroupId", vxGroup.getId());
		searchCriteria.addParam("xUserId", vxUser.getId());
		VXGroupUserList vxGroupUserList = xGroupUserService
				.searchXGroupUsers(searchCriteria);
		for (VXGroupUser vxGroupUser : vxGroupUserList.getList()) {
			daoManager.getXXGroupUser().remove(vxGroupUser.getId());
		}
	}

	public VXGroupList getXUserGroups(Long xUserId) {
		SearchCriteria searchCriteria = new SearchCriteria();
		searchCriteria.addParam("xUserId", xUserId);
		VXGroupUserList vXGroupUserList = xGroupUserService
				.searchXGroupUsers(searchCriteria);
		VXGroupList vXGroupList = new VXGroupList();
		List<VXGroup> vXGroups = new ArrayList<VXGroup>();
		if (vXGroupUserList != null) {
			List<VXGroupUser> vXGroupUsers = vXGroupUserList.getList();
			Set<Long> groupIdList = new HashSet<Long>();
			for (VXGroupUser vXGroupUser : vXGroupUsers) {
				groupIdList.add(vXGroupUser.getParentGroupId());
			}
			for (Long groupId : groupIdList) {
				VXGroup vXGroup = xGroupService.readResource(groupId);
				vXGroups.add(vXGroup);
			}
			vXGroupList.setVXGroups(vXGroups);
		} else {
			logger.debug("No groups found for user id : " + xUserId);
		}
		return vXGroupList;
	}

	public VXUserList getXGroupUsers(Long xGroupId) {
		SearchCriteria searchCriteria = new SearchCriteria();
		searchCriteria.addParam("xGroupId", xGroupId);
		VXGroupUserList vXGroupUserList = xGroupUserService
				.searchXGroupUsers(searchCriteria);
		VXUserList vXUserList = new VXUserList();

		List<VXUser> vXUsers = new ArrayList<VXUser>();
		if (vXGroupUserList != null) {
			List<VXGroupUser> vXGroupUsers = vXGroupUserList.getList();
			Set<Long> userIdList = new HashSet<Long>();
			for (VXGroupUser vXGroupUser : vXGroupUsers) {
				userIdList.add(vXGroupUser.getUserId());
			}
			for (Long userId : userIdList) {
				VXUser vXUser = xUserService.readResource(userId);
				vXUsers.add(vXUser);

			}
			vXUserList.setVXUsers(vXUsers);
		} else {
			logger.debug("No users found for group id : " + xGroupId);
		}
		return vXUserList;
	}

	// FIXME Hack : Unnecessary, to be removed after discussion.
	private void setUserDesc(VXUser vXUser) {
		vXUser.setDescription(vXUser.getName());
	}

	@Override
	public VXGroup updateXGroup(VXGroup vXGroup) {
		checkAdminAccess();
		XXGroup xGroup = daoManager.getXXGroup().getById(vXGroup.getId());
		List<XXTrxLog> trxLogList = xGroupService.getTransactionLog(vXGroup,
				xGroup, "update");
		xaBizUtil.createTrxLog(trxLogList);
		vXGroup = (VXGroup) xGroupService.updateResource(vXGroup);
		return vXGroup;
	}

	public VXGroupUser updateXGroupUser(VXGroupUser vXGroupUser) {
		checkAdminAccess();
		return super.updateXGroupUser(vXGroupUser);
	}

	public void deleteXGroupUser(Long id, boolean force) {
		checkAdminAccess();
		super.deleteXGroupUser(id, force);
	}

	public VXGroupGroup createXGroupGroup(VXGroupGroup vXGroupGroup){
		checkAdminAccess();
		return super.createXGroupGroup(vXGroupGroup);
	}

	public VXGroupGroup updateXGroupGroup(VXGroupGroup vXGroupGroup) {
		checkAdminAccess();
		return super.updateXGroupGroup(vXGroupGroup);
	}

	public void deleteXGroupGroup(Long id, boolean force) {
		checkAdminAccess();
		super.deleteXGroupGroup(id, force);
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

	public void checkAccess(String loginID) {
		UserSessionBase session = ContextUtil.getCurrentUserSession();
		if (session != null) {
			if(!session.isUserAdmin() && !session.getLoginId().equalsIgnoreCase(loginID)){
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

	public void deleteXPermMap(Long id, boolean force) {
		if (force) {
			XXPermMap xPermMap = daoManager.getXXPermMap().getById(id);
			if (xPermMap != null) {
				if (assetMgr.getXResource(xPermMap.getResourceId()) == null) {
					throw restErrorUtil.createRESTException("Invalid Input Data - No resource found with Id: " + xPermMap.getResourceId(), MessageEnums.INVALID_INPUT_DATA);
				}
			}

			xPermMapService.deleteResource(id);
		} else {
			throw restErrorUtil.createRESTException("serverMsg.modelMgrBaseDeleteModel", MessageEnums.OPER_NOT_ALLOWED_FOR_ENTITY);
		}
	}

	public VXLong getXPermMapSearchCount(SearchCriteria searchCriteria) {
		VXPermMapList permMapList = xPermMapService.searchXPermMaps(searchCriteria);
		VXLong vXLong = new VXLong();
		vXLong.setValue(permMapList.getListSize());
		return vXLong;
	}

	public void deleteXAuditMap(Long id, boolean force) {
		if (force) {
			XXAuditMap xAuditMap = daoManager.getXXAuditMap().getById(id);
			if (xAuditMap != null) {
				if (assetMgr.getXResource(xAuditMap.getResourceId()) == null) {
					throw restErrorUtil.createRESTException("Invalid Input Data - No resource found with Id: " + xAuditMap.getResourceId(), MessageEnums.INVALID_INPUT_DATA);
				}
			}

			xAuditMapService.deleteResource(id);
		} else {
			throw restErrorUtil.createRESTException("serverMsg.modelMgrBaseDeleteModel", MessageEnums.OPER_NOT_ALLOWED_FOR_ENTITY);
		}
	}

	public VXLong getXAuditMapSearchCount(SearchCriteria searchCriteria) {
		VXAuditMapList auditMapList = xAuditMapService.searchXAuditMaps(searchCriteria);
		VXLong vXLong = new VXLong();
		vXLong.setValue(auditMapList.getListSize());
		return vXLong;
	}

}
