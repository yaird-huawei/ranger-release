package com.xasecure.usergroupsync;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

public class RegExTest {
	
	protected String userNameBaseProperty = "userSync.mapping.UserName.regex";
	protected String groupNameBaseProperty = "userSync.mapping.GroupName.regex";
	protected RegEx userNameRegEx = null;
	protected RegEx groupNameRegEx = null;
	List<String> userRegexPatterns = null;
	List<String> groupRegexPatterns = null;

	
	@Before
	public void setUp() throws Exception {
		userNameRegEx = new RegEx();
		//userNameRegEx.init(userNameBaseProperty);
		userRegexPatterns = new ArrayList<String>();
		groupNameRegEx = new RegEx();
		//groupNameRegEx.init(groupNameBaseProperty);
		groupRegexPatterns = new ArrayList<String>();
	}
	
	@Test
	public void testUserNameTransform() {
		userRegexPatterns.add("s/\\s/_/");
		userNameRegEx.populateReplacementPatterns(userNameBaseProperty, userRegexPatterns);
		assertEquals("test_user", userNameRegEx.transform("test user"));
	}
	
	@Test
	public void testGroupNameTransform() {
		groupRegexPatterns.add("s/\\s/_/g");
		groupRegexPatterns.add("s/_/$/g");
		groupNameRegEx.populateReplacementPatterns(userNameBaseProperty, groupRegexPatterns);
		assertEquals("ldap$grp", groupNameRegEx.transform("ldap grp"));
	}

	@Test
	public void testEmptyTransform() {		
		assertEquals("test user", userNameRegEx.transform("test user"));
		assertEquals("ldap grp", groupNameRegEx.transform("ldap grp"));
	}
	
	@Test
	public void testTransform() {		
		userRegexPatterns.add("s/\\s/_/g");
		userNameRegEx.populateReplacementPatterns(userNameBaseProperty, userRegexPatterns);
		assertEquals("test_user", userNameRegEx.transform("test user"));
		assertEquals("ldap grp", groupNameRegEx.transform("ldap grp"));
	}
	
	@Test
	public void testTransform1() {		
		userRegexPatterns.add("s/\\\\/ /g");
		userRegexPatterns.add("s//_/g");
		userNameRegEx.populateReplacementPatterns(userNameBaseProperty, userRegexPatterns);
		groupRegexPatterns.add("s/\\s//g");
		groupRegexPatterns.add("s/\\s");
		groupNameRegEx.populateReplacementPatterns(userNameBaseProperty, groupRegexPatterns);
		assertEquals("test user", userNameRegEx.transform("test\\user"));
		assertEquals("ldapgrp", groupNameRegEx.transform("ldap grp"));
	}
}
