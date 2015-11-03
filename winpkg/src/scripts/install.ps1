### Licensed to the Apache Software Foundation (ASF) under one or more
### contributor license agreements.  See the NOTICE file distributed with
### this work for additional information regarding copyright ownership.
### The ASF licenses this file to You under the Apache License, Version 2.0
### (the "License"); you may not use this file except in compliance with
### the License.  You may obtain a copy of the License at
###
###     http://www.apache.org/licenses/LICENSE-2.0
###
### Unless required by applicable law or agreed to in writing, software
### distributed under the License is distributed on an "AS IS" BASIS,
### WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
### See the License for the specific language governing permissions and
### limitations under the License.

###
### Install script that can be used to install Ranger
### To invoke the scipt, run the following command from PowerShell:
###   install.ps1 -username <username> -password <password> or
###   install.ps1 -credentialFilePath <credentialFilePath>
###
### where:
###   <username> and <password> represent account credentials used to run
###   Ranger services as Windows services.
###   <credentialFilePath> encripted credentials file path
###
### By default, Hadoop is installed to "C:\Hadoop". To change this set
### HADOOP_NODE_INSTALL_ROOT environment variable to a location were
### you'd like Hadoop installed.
###
### Script pre-requisites:
###   JAVA_HOME must be set to point to a valid Java location.
###   HADOOP_HOME must be set to point to a valid Hadoop install location.
###
### To uninstall previously installed Single-Node cluster run:
###   uninstall.ps1
###
### NOTE: Notice @version@ strings throughout the file. First compile
### winpkg with "ant winpkg", that will replace the version string.

###

param(
    [String]
    [Parameter( ParameterSetName='UsernamePassword', Position=0, Mandatory=$true )]
    [Parameter( ParameterSetName='UsernamePasswordBase64', Position=0, Mandatory=$true )]
    $username,
    [String]
    [Parameter( ParameterSetName='UsernamePassword', Position=1, Mandatory=$true )]
    $password,
    [String]
    [Parameter( ParameterSetName='UsernamePasswordBase64', Position=1, Mandatory=$true )]
    $passwordBase64,
    [Parameter( ParameterSetName='CredentialFilePath', Mandatory=$true )]
    $credentialFilePath,
    [String]
    $roles
    )

function Main( $scriptDir )
{
    $FinalName = "ranger-@ranger.version@"
    if ( -not (Test-Path ENV:WINPKG_LOG))
    {
        $ENV:WINPKG_LOG = "$FinalName.winpkg.log"
    }

    $HDP_INSTALL_PATH, $HDP_RESOURCES_DIR = Initialize-InstallationEnv $scriptDir "$FinalName.winpkg.log"
    $nodeInstallRoot = "$ENV:HADOOP_NODE_INSTALL_ROOT"


    ###
    ### Create the Credential object from the given username and password or the provided credentials file
    ###
    $serviceCredential = Get-HadoopUserCredentials -credentialsHash @{"username" = $username; "password" = $password; `
        "passwordBase64" = $passwordBase64; "credentialFilePath" = $credentialFilePath}
    $username = $serviceCredential.UserName
    Write-Log "Username: $username"
    Write-Log "CredentialFilePath: $credentialFilePath"

    ###
    ### Install and Configure ranger (Looks like this config will come from earlier HDP installation steps )
    ###
    if ( $ENV:IS_RANGER -eq "yes" ) {
      $roles = "ranger-admin"  
    }

    Write-Log "Roles are $roles"
    Install "ranger" $nodeInstallRoot $serviceCredential $roles
    Configure "ranger" $nodeInstallRoot $serviceCredential
    Write-Log "Installation of Ranger Admin Tool completed successfully"

    ####################################################################
    ###			Install and Configure ranger-hdfs plugin               ###
    ####################################################################

    $roles = ''

    Install "ranger-hdfs" $nodeInstallRoot $serviceCredential $roles
    ###
    ### Apply configuration changes to hdfs-site.xml
    ###
	$hdfsChanges = @{
		"dfs.permissions.enabled" = "true"
		"dfs.permissions" = "true"
		"dfs.namenode.inode.attributes.provider.class" = "org.apache.ranger.authorization.hadoop.RangerHdfsAuthorizer"
	}
    ###
    ### Apply configuration changes to ranger-hdfs-audit.xml
    ###
	$hdfsAuditChanges = @{
		"xasecure.audit.db.is.enabled"                          = "true"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "${ENV:RANGER_AUDIT_DB_USERNAME}"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"
		"xasecure.audit.repository.name"						= "${ENV:RANGER_HDFS_REPO}"
		"xasecure.audit.credential.provider.file"				= "jceks://file/${ENV:RANGER_HDFS_CRED_KEYSTORE_FILE}"
        "xasecure.audit.hdfs.is.enabled"                        = "false"
		#"xasecure.audit.hdfs.config.destination.file"           = "${ENV:RANGER_HDFS_DESTINTATION_FILE}"
        "xasecure.audit.hdfs.config.destination.directory" = "hdfs://${ENV:NAMENODE_HOST}:8020/ranger/audit"
	}
        if($ENV:RANGER_DB_FLAVOR.ToUpper() -eq "MYSQL")
        {
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:mysql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hdfsAuditChanges["xasecure.audit.destination.db.jdbc.driver"] = "com.mysql.jdbc.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'ORACLE')
        {
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:oracle:thin:@${ENV:RANGER_AUDIT_DB_HOST}"
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"]= "oracle.jdbc.driver.OracleDriver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'POSTGRES')
        {
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:postgresql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "org.postgresql.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'MSSQL')
        {
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:sqlserver://${ENV:RANGER_AUDIT_DB_HOST};databaseName=${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hdfsAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        }
    ###
    ### Apply configuration changes to ranger-hdfs-security.xml
    ###
	$hdfsSecurityChanges = @{
		"ranger.plugin.hdfs.policy.pollIntervalMs"			=	"30000"
		"ranger.plugin.hdfs.policy.source.impl"				=	"org.apache.ranger.admin.client.RangerAdminRESTClient"
		"ranger.plugin.hdfs.policy.rest.url"				=	"${ENV:RANGER_POLICY_ADMIN_URL}"            
		"ranger.plugin.hdfs.service.name" 					=	"${ENV:RANGER_HDFS_REPO}" #REPOSITORY_NAME 
		"ranger.plugin.hdfs.policy.cache.dir"               =	"${ENV:RANGER_HDFS_CACHE_FILE}"#POLICY_CACHE_FILE_PATH  
	}

	### Since we modify different files, this hashtable contains hashtables for
	### each files. So its a hashtable of hashtables!
	$configs = @{}
	$configs.Add("hdfsChanges",$hdfsChanges)
	$configs.Add("hdfsAuditChanges",$hdfsAuditChanges)
	$configs.Add("hdfsSecurityChanges",$hdfsSecurityChanges)

    Configure "ranger-hdfs" $nodeInstallRoot $serviceCredential $configs

    Write-Log "Installation of ranger-hdfs completed successfully"


    ####################################################################
    ###			Install and Configure ranger-hive plugin               ###
    ####################################################################

    $roles = ''
    Install "ranger-hive" $nodeInstallRoot $serviceCredential $roles

    ####
    #### Apply configuration changes to hive-site.xml
    ####
	$hivechanges =   @{
		"hive.security.authorization.enabled"	= "true"
		"hive.security.authorization.manager"	= "org.apache.ranger.authorization.hive.authorizer.RangerHiveAuthorizerFactory"
		"hive.conf.restricted.list"				= "hive.security.authorization.enabled, hive.security.authorization.manager, hive.security.authenticator.manager"
	}

    ####
    #### Apply configuration changes to hiveserver2-site.xml
    ####
    #$xmlFile = Join-Path $ENV:HIVE_CONF_DIR "hiveserver2-site.xml"
	$hiveServerChanges =  @{
		"hive.security.authorization.enabled"	= "true"
		"hive.security.authorization.manager"	= "org.apache.ranger.authorization.hive.authorizer.RangerHiveAuthorizerFactory"
		"hive.security.authenticator.manager"	= "org.apache.hadoop.hive.ql.security.SessionStateUserAuthenticator"
		"hive.conf.restricted.list"				= "hive.security.authorization.enabled, hive.security.authorization.manager, hive.security.authenticator.manager"
	}

    ####
    #### Apply configuration changes to ranger-hive-audit.xml
    ####
    #$xmlFile = Join-Path $ENV:HIVE_CONF_DIR "ranger-hive-audit.xml"
    $hiveAuditChanges = @{
		"xasecure.audit.db.is.enabled"                          = "true"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "${ENV:RANGER_AUDIT_DB_USERNAME}"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"
		"xasecure.audit.repository.name"						= "${ENV:RANGER_HIVE_REPO}"
		"xasecure.audit.credential.provider.file"				= "jceks://file/${ENV:RANGER_HIVE_CRED_KEYSTORE_FILE}"
        "xasecure.audit.hdfs.is.enabled"                        = "false"
		#"xasecure.audit.hdfs.config.destination.file"           = "${ENV:RANGER_HDFS_DESTINTATION_FILE}"
        "xasecure.audit.hdfs.config.destination.directory" = "hdfs://${ENV:NAMENODE_HOST}:8020/ranger/audit"
	}
        if($ENV:RANGER_DB_FLAVOR.ToUpper() -eq "MYSQL")
        {
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:mysql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hiveAuditChanges["xasecure.audit.destination.db.jdbc.driver"] = "com.mysql.jdbc.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'ORACLE')
        {
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:oracle:thin:@${ENV:RANGER_AUDIT_DB_HOST}"
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"]= "oracle.jdbc.driver.OracleDriver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'POSTGRES')
        {
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:postgresql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "org.postgresql.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'MSSQL')
        {
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:sqlserver://${ENV:RANGER_AUDIT_DB_HOST};databaseName=${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hiveAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        }
    ####
    #### Apply configuration changes to ranger-hive-security.xml
    ####
	#
    #$xmlFile = Join-Path $ENV:HIVE_CONF_DIR "ranger-hive-security.xml"
	#
	$hiveSecurityChanges = @{
		"ranger.plugin.hive.policy.source.impl"							= 	"org.apache.ranger.admin.client.RangerAdminRESTClient"
		"ranger.plugin.hive.policy.rest.url"             				=	"${ENV:RANGER_POLICY_ADMIN_URL}"
		"ranger.plugin.hive.policy.pollIntervalMs"     					=	"30000"
		"xasecure.hive.update.xapolicies.on.grant.revoke"				=	"true"
		"ranger.plugin.hive.service.name" 								=	"${ENV:RANGER_HIVE_REPO}"#REPOSITORY_NAME 
		"ranger.plugin.hive.policy.cache.dir"            				=	"${ENV:RANGER_HIVE_CACHE_FILE}"#POLICY_CACHE_FILE_PATH              
 	}

    $configs = @{}
    #$configs.Add("hiveChanges",$hiveChanges)
    $configs.Add("hiveServerChanges",$hiveServerChanges)
    $configs.Add("hiveAuditChanges",$hiveAuditChanges)
    $configs.Add("hiveSecurityChanges",$hiveSecurityChanges)
    Configure "ranger-hive" $nodeInstallRoot $serviceCredential $configs
    Write-Log "Installation of ranger-hive completed successfully"


    #####################################################################
    ####			Install and Configure ranger-hbase plugin              ###
    #####################################################################
    #

	if ("$ENV:HBASE" -eq "yes") {

	    $roles = ''
	    Install "ranger-hbase" $nodeInstallRoot $serviceCredential $roles

	    ####
	    #### Apply configuration changes to hbase-site.xml
	    ####
	    #$xmlFile = Join-Path $ENV:HBASE_CONF_DIR "hbase-site.xml"
		$hbaseChanges =   @{
	        "hbase.security.authorization"      = "true"
		"hbase.coprocessor.master.classes"	= "org.apache.ranger.authorization.hbase.RangerAuthorizationCoprocessor"
			"hbase.coprocessor.region.classes"	= "org.apache.ranger.authorization.hbase.RangerAuthorizationCoprocessor"
			"hbase.rpc.protection"				= "PRIVACY"
		    "hbase.rpc.engine"					= "org.apache.hadoop.hbase.ipc.SecureRpcEngine"
		}

	    ####
	    #### Apply configuration changes to ranger-hbase-audit.xml
	    ####
	    #$xmlFile = Join-Path $ENV:HBASE_CONF_DIR "ranger-hbase-audit.xml"
    $hbaseAuditChanges = @{
		"xasecure.audit.db.is.enabled"                          = "true"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "${ENV:RANGER_AUDIT_DB_USERNAME}"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"
		"xasecure.audit.repository.name"						= "${ENV:RANGER_HBASE_REPO}"
		"xasecure.audit.credential.provider.file"				= "jceks://file/${ENV:RANGER_HBASE_CRED_KEYSTORE_FILE}"
        "xasecure.audit.hdfs.is.enabled"                        = "false"
		#"xasecure.audit.hdfs.config.destination.file"           = "${ENV:RANGER_HDFS_DESTINTATION_FILE}"
        "xasecure.audit.hdfs.config.destination.directory" = "hdfs://${ENV:NAMENODE_HOST}:8020/ranger/audit"
	}
        if($ENV:RANGER_DB_FLAVOR.ToUpper() -eq "MYSQL")
        {
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:mysql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hbaseAuditChanges["xasecure.audit.destination.db.jdbc.driver"] = "com.mysql.jdbc.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'ORACLE')
        {
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:oracle:thin:@${ENV:RANGER_AUDIT_DB_HOST}"
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"]= "oracle.jdbc.driver.OracleDriver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'POSTGRES')
        {
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:postgresql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "org.postgresql.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'MSSQL')
        {
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:sqlserver://${ENV:RANGER_AUDIT_DB_HOST};databaseName=${ENV:RANGER_AUDIT_DB_DBNAME}"
            $hbaseAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        }

	    ####
	    #### Apply configuration changes to ranger-hbase-security.xml
	    ####
		#
	    #$xmlFile = Join-Path $ENV:HBASE_CONF_DIR "ranger-hbase-security.xml"
		#
		$hbaseSecurityChanges =     @{
			"ranger.plugin.hbase.policy.source.impl"	 			=	"org.apache.ranger.admin.client.RangerAdminRESTClient"
			"ranger.plugin.hbase.policy.rest.url"		 			=	"${ENV:RANGER_POLICY_ADMIN_URL}"
			"ranger.plugin.hbase.policy.pollIntervalMs"				=	"30000"
			"xasecure.hbase.update.xapolicies.on.grant.revoke"		=	"true"
			"ranger.plugin.hbase.service.name" 						=	"${ENV:RANGER_HBASE_REPO}"#REPOSITORY_NAME 
			"ranger.plugin.hbase.policy.cache.dir"               	=	"${ENV:RANGER_HBASE_CACHE_FILE}"#POLICY_CACHE_FILE_PATH                 
		}

		$configs = @{}
	    $configs.Add("hbaseChanges",$hbaseChanges)
	    $configs.Add("hbaseAuditChanges",$hbaseAuditChanges)
	    $configs.Add("hbaseSecurityChanges",$hbaseSecurityChanges)
	    Configure "ranger-hbase" $nodeInstallRoot $serviceCredential $configs
	    Write-Log "Installation of ranger-hbase completed successfully"
	} else {
	    Write-Log "Not installing ranger-hbase, since HBase is not installed"
	}



    #####################################################################
    ####			Install and Configure ranger-knox plugin              ###
    #####################################################################
    #

	if ("$ENV:KNOX" -eq "yes") {

		$roles = ''
		Install "ranger-knox" $nodeInstallRoot $serviceCredential $roles

	    ####
	    #### Apply configuration changes to ranger-knox-audit.xml
	    ####
	    #$xmlFile = Join-Path $ENV:KNOX_CONF_DIR "ranger-knox-audit.xml"
    $knoxAuditChanges = @{
		"xasecure.audit.db.is.enabled"                          = "true"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "${ENV:RANGER_AUDIT_DB_USERNAME}"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"
		"xasecure.audit.repository.name"						= "${ENV:RANGER_KNOX_REPO}"
		"xasecure.audit.credential.provider.file"				= "jceks://file/${ENV:RANGER_KNOX_CRED_KEYSTORE_FILE}"
        "xasecure.audit.hdfs.is.enabled"                        = "false"
		#"xasecure.audit.hdfs.config.destination.file"           = "${ENV:RANGER_HDFS_DESTINTATION_FILE}"
        "xasecure.audit.hdfs.config.destination.directory" = "hdfs://${ENV:NAMENODE_HOST}:8020/ranger/audit"
	}
        if($ENV:RANGER_DB_FLAVOR.ToUpper() -eq "MYSQL")
        {
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:mysql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $knoxAuditChanges["xasecure.audit.destination.db.jdbc.driver"] = "com.mysql.jdbc.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'ORACLE')
        {
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:oracle:thin:@${ENV:RANGER_AUDIT_DB_HOST}"
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"]= "oracle.jdbc.driver.OracleDriver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'POSTGRES')
        {
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:postgresql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/${ENV:RANGER_AUDIT_DB_DBNAME}"
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "org.postgresql.Driver"
        }
        elseif($ENV:RANGER_DB_FLAVOR.ToUpper() -eq 'MSSQL')
        {
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.url"] = "jdbc:sqlserver://${ENV:RANGER_AUDIT_DB_HOST};databaseName=${ENV:RANGER_AUDIT_DB_DBNAME}"
            $knoxAuditChanges["xasecure.audit.jpa.javax.persistence.jdbc.driver"] = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        }
	    ####
	    #### Apply configuration changes to ranger-knox-security.xml
	    ####
		#
	    #$xmlFile = Join-Path $ENV:KNOX_CONF_DIR "ranger-knox-security.xml"
		#
		$knoxSecurityChanges =     @{
			"ranger.plugin.knox.policy.source.impl"          =	"org.apache.ranger.admin.client.RangerAdminJersey2RESTClient"
            #org.apache.ranger.admin.client.RangerAdminRESTClient
			"ranger.plugin.knox.policy.rest.url"             =	"${ENV:RANGER_POLICY_ADMIN_URL}"
			"ranger.plugin.knox.policy.pollIntervalMs"       =	"30000"
			"ranger.plugin.knox.service.name"                =	"${ENV:RANGER_KNOX_REPO}"#REPOSITORY_NAME                                           
			"ranger.plugin.knox.policy.cache.dir"            =	"${ENV:RANGER_KNOX_CACHE_FILE}"#POLICY_CACHE_FILE_PATH  
		}

		$configs = @{}
	    $configs.Add("knoxAuditChanges",$knoxAuditChanges)
	    $configs.Add("knoxSecurityChanges",$knoxSecurityChanges)
	    Configure "ranger-knox" $nodeInstallRoot $serviceCredential $configs
	    Write-Log "Installation of ranger-knox completed successfully"
	} else {
	    Write-Log "Not installing ranger-knox, since Knox is not installed"
	}


    #####################################################################
    ####			Install and Configure ranger-storm plugin              ###
    #####################################################################
    #

	# Storm not yet supported on Windows
	#
	#if ("$ENV:STORM" -eq "yes") {
	#    $roles = ''
	#    Install "ranger-storm" $nodeInstallRoot $serviceCredential $roles

	#    ####
	#    #### Apply configuration changes to xasecure-audit.xml
	#    ####
	#    #$xmlFile = Join-Path $ENV:STORM_CONF_DIR "xasecure-audit.xml"
	#    $stormAuditChanges =   @{
	#        "xasecure.audit.db.is.enabled"                          = "true"
	#        "xasecure.audit.jpa.javax.persistence.jdbc.url"			= "jdbc:mysql://${ENV:RANGER_AUDIT_DB_HOST}:${ENV:RANGER_AUDIT_DB_PORT}/xasecure"
	#		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "${ENV:RANGER_AUDIT_DB_USERNAME}"
	#		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"
	#		"xasecure.audit.repository.name"						= "${ENV:RANGER_STORM_REPO}"
	#		"xasecure.audit.credential.provider.file"				= "jceks://file/${ENV:RANGER_STORM_CRED_KEYSTORE_FILE}"
	#	"xasecure.audit.jpa.javax.persistence.jdbc.driver"		= "com.mysql.jdbc.Driver"
	#		"xasecure.audit.hdfs.is.enabled"                        = "false"
	#		"xasecure.audit.hdfs.config.destination.directroy"      = "${ENV:RANGER_HDFS_DESTINATION_DIRECTORY}"
	#		"xasecure.audit.hdfs.config.destination.file"           = "${ENV:RANGER_HDFS_DESTINTATION_FILE}"
	#		"xasecure.audit.hdfs.config.destination.flush.interval.seconds"= "{ENV:RANGER_HDFS_DESTINTATION_FLUSH_INTERVAL_SECONDS}"
	#		"xasecure.audit.hdfs.config.destination.rollover.interval.seconds"= "{ENV:RANGER_HDFS_DESTINTATION_ROLLOVER_INTERVAL_SECONDS}"
	#		"xasecure.audit.hdfs.config.destination.open.retry.interval.seconds"= "{ENV:RANGER_HDFS_DESTINTATION_OPEN_RETRY_INTERVAL_SECONDS}"
	#		"xasecure.audit.hdfs.config.local.buffer.directroy"     =  "{ENV:RANGER.HDFS_LOCAL_BUFFER_DIRECTORY}"
	#		"xasecure.audit.hdfs.config.local.buffer.file"          =  "{ENV:RANGER.HDFS_LOCAL_BUFFER_FILE}"
	#		"xasecure.audit.hdfs.config.local.buffer.flush.interval.seconds"= "{ENV:RANGER_HDFS_LOCAL_BUFFER_FLUSH_INTERVAL_SECONDS}"
	#		"xasecure.audit.hdfs.config.local.buffer.rollover.interval.seconds"= "{ENV:RANGER_HDFS_LOCAL_BUFFER_ROLLOVER_INTERVAL_SECONDS}"
	#		"xasecure.audit.hdfs.config.local.archive.directroy"      = "{ENV:RANGER_HDFS_LOCAL_ARCHIVE_DIRECTORY}"
	#		"xasecure.audit.hdfs.config.local.archive.max.file.count" =  "{ENV:RANGER_HDFS_LOCAL_ARCHIVE_MAX_FILE_COUNT}"


	#	}

	#    ####
	#    #### Apply configuration changes to xasecure-storm-security.xml
	#    ####
	#	#
	#    #$xmlFile = Join-Path $ENV:STORM_CONF_DIR "xasecure-storm-security.xml"
	#	#
	#    $stormSecurityChanges =     @{
	#		"storm.authorization.verifier.classname"				= "org.apache.ranger.pdp.storm.RangerAuthorizer"
	#		"xasecure.storm.policymgr.url"							= "${ENV:RANGER_EXTERNAL_URL}/service/assets/policyList/${ENV:RANGER_STORM_REPO}"
	#		"xasecure.storm.policymgr.url.saveAsFile"				= "${ENV:RANGER_HOME}\tmp\storm_${ENV:RANGER_STORM_REPO}"
	#		"xasecure.storm.policymgr.url.laststoredfile"			= "${ENV:RANGER_HOME}\tmp\storm_${ENV:RANGER_STORM_REPO}_json"
	#		"xasecure.storm.policymgr.url.reloadIntervalInMillis"	= "30000"
	#		"xasecure.storm.update.xapolicies.on.grant.revoke"		= "true"
	#		"xasecure.policymgr.url"                            	= "${ENV:RANGER_POLICY_ADMIN_URL}"
    #       "xasecure.hive.policymgr.url"                           = "${ENV:RANGER_POLICY_ADMIN_URL}"
	#	}

	#	$configs = @{}
	#    $configs.Add("stormAuditChanges",$stormAuditChanges)
	#    $configs.Add("stormSecurityChanges",$stormSecurityChanges)
	#    Configure "ranger-storm" $nodeInstallRoot $serviceCredential $configs
	#    Write-Log "Installation of ranger-storm completed successfully"

	#    Configure "ranger-storm" $nodeInstallRoot $serviceCredential $configs
	#	Write-Log "Installation of ranger-storm completed successfully"
	#} else {
	#    Write-Log "Not installing ranger-storm, since Storm is not installed"
	#}


    #####################################################################
    ####         Install and Configure ranger-usersync service              ###
    #####################################################################
    #
    if ( $ENV:IS_RANGER -eq "yes" ) {
      $roles = "ranger-usersync"
    } else {
      $roles = ""
    }
    Install "ranger-usersync" $nodeInstallRoot $serviceCredential $roles
    if($ENV:SYNCSOURCE.ToUpper() -eq 'LDAP') {
    $sync_port=($ENV:RANGER_LDAP_URL -split ':')[2]
    }elseif($ENV:SYNCSOURCE.ToUpper() -eq 'ACTIVE_DIRECTORY') {
    $sync_port=($ENV:RANGER_LDAP_AD_URL -split ':')[2]
    }else{
    $sync_port="5151"
    }
    $UserSync = @{
        "ranger.usersync.policymanager.baseURL"="${ENV:RANGER_EXTERNAL_URL}"
        "ranger.usersync.sleeptimeinmillisbetweensynccycle"="${ENV:RANGER_SYNC_INTERVAL}"
        "ranger.usersync.ldap.binddn"="${ENV:RANGER_SYNC_LDAP_BIND_DN}"
        "ranger.usersync.ldap.ldapbindpassword"="_"#"${ENV:RANGER_SYNC_LDAP_BIND_PASSWORD}"
        "ranger.usersync.ldap.searchBase"=""
        "ranger.usersync.ldap.url"="${ENV:RANGER_SYNC_LDAP_URL}"
        "ranger.usersync.ldap.user.groupnameattribute"="${ENV:RANGER_SYNC_LDAP_USER_GROUP_NAME_ATTRIBUTE}"
        "ranger.usersync.ldap.user.nameattribute"="${ENV:RANGER_SYNC_LDAP_USER_NAME_ATTRIBUTE}"
        "ranger.usersync.ldap.user.objectclass"="${ENV:RANGER_SYNC_LDAP_USER_OBJECT_CLASS}"
        "ranger.usersync.ldap.user.searchbase"="${ENV:RANGER_SYNC_LDAP_USER_SEARCH_BASE}"
        "ranger.usersync.ldap.user.searchfilter"="${ENV:RANGER_SYNC_LDAP_USER_SEARCH_FILTER}"
        "ranger.usersync.ldap.user.searchscope"="${ENV:RANGER_SYNC_LDAP_USER_SEARCH_SCOPE}"
        "ranger.usersync.ldap.username.caseconversion"="${ENV:RANGER_SYNC_LDAP_USERNAME_CASE_CONVERSION}"
        "ranger.usersync.ssl"="true"
        "ranger.usersync.port"="$sync_port"
        "ranger.usersync.sink.impl.class"="org.apache.ranger.unixusersync.process.PolicyMgrUserGroupBuilder"
        "ranger.usersync.ldap.referral"="${ENV:RANGER_SYNC_LDAP_REFERRAL}"
    }
    $GroupSync = @{
        "ranger.usersync.group.nameattribute"="${ENV:RANGER_SYNC_LDAP_USER_GROUP_NAME_ATTRIBUTE}"
        "ranger.usersync.group.searchbase"="${ENV:RANGER_LDAP_GROUPSEARCHBASE}"
        "ranger.usersync.group.searchenabled"="true"
        "ranger.usersync.group.searchfilter"="${ENV:RANGER_LDAP_GROUPSEARCHFILTER}"
        "ranger.usersync.ldap.groupname.caseconversion"="${ENV:RANGER_SYNC_LDAP_GROUPNAME_CASE_CONVERSION}"
    }
    $SyncSourceLDAP = @{
        "ranger.usersync.source.impl.class"="org.apache.ranger.ldapusersync.process.LdapUserGroupBuilder"
        #"ranger.usersync.ldap.bindalias"="ldap.bind.password"
        "ranger.usersync.credstore.filename"="${ENV:RANGER_USERSYNC_CRED_KEYSTORE_FILE}"
    }
    $SynchSourceUNIX =@{
        "ranger.usersync.source.impl.class"="org.apache.ranger.unixusersync.process.UnixUserGroupBuilder"
    }
    $configs = @{}
	$configs.Add("UserSync",$UserSync)
	$configs.Add("GroupSync",$GroupSync)
    $configs.Add("SyncSourceLDAP",$SyncSourceLDAP)
    $configs.Add("SynchSourceUNIX",$SynchSourceUNIX)
    Configure "ranger-usersync" $nodeInstallRoot $serviceCredential $configs
    Write-Log "Installation of ranger-usersync completed successfully"
    
    $hdpLayoutLocation =  Split-Path -Parent (Resolve-Path $ENV:HDP_LAYOUT)
	# Copy mysql connector jar to each components dir
	if ((Test-Path ENV:RANGER) -and ($ENV:RANGER -ieq "yes") -and (($ENV:RANGER_DB_FLAVOR -eq "MYSQL") -or ($ENV:RANGER_AUDIT_DB_FLAVOR -eq "MYSQL")))
	{
		$mysqlConnJar = @(gci -Filter mysql-connector-java*.jar -Path $hdpLayoutLocation)[0]

		Write-Log "Copying $mysqlConnJar.FullName to $ENV:HADOOP_HOME\share\hadoop\common\lib"
		Copy-Item $mysqlConnJar.FullName "$ENV:HADOOP_HOME\share\hadoop\common\lib"

		Write-Log "Copying $mysqlConnJar.FullName to $ENV:HIVE_HOME\lib"
		Copy-Item $mysqlConnJar.FullName "$ENV:HIVE_HOME\lib"

		Write-Log "Copying $mysqlConnJar.FullName to $ENV:HBASE_HOME\lib"
		Copy-Item $mysqlConnJar.FullName "$ENV:HBASE_HOME\lib"

		Write-Log "Copying $mysqlConnJar.FullName to $ENV:KNOX_HOME\lib"
		Copy-Item $mysqlConnJar.FullName "$ENV:KNOX_HOME\lib"

		Write-Log "Copying $mysqlConnJar.FullName to $ENV:STORM_HOME\lib"
		Copy-Item $mysqlConnJar.FullName "$ENV:STORM_HOME\lib"
	}
	# Copy oracle connector jar to each components dir
	if ((Test-Path ENV:RANGER) -and ($ENV:RANGER -ieq "yes") -and (($ENV:RANGER_DB_FLAVOR -eq "ORACLE") -or ($ENV:RANGER_AUDIT_DB_FLAVOR -eq "ORACLE")))
	{
		$oracleConnJar = @(gci -Filter ojdbc*.jar -Path $hdpLayoutLocation)[0]

		Write-Log "Copying $oracleConnJar.FullName to $ENV:HADOOP_HOME\share\hadoop\common\lib"
		Copy-Item $oracleConnJar.FullName "$ENV:HADOOP_HOME\share\hadoop\common\lib"

		Write-Log "Copying $oracleConnJar.FullName to $ENV:HIVE_HOME\lib"
		Copy-Item $oracleConnJar.FullName "$ENV:HIVE_HOME\lib"

		Write-Log "Copying $oracleConnJar.FullName to $ENV:HBASE_HOME\lib"
		Copy-Item $oracleConnJar.FullName "$ENV:HBASE_HOME\lib"

		Write-Log "Copying $oracleConnJar.FullName to $ENV:KNOX_HOME\lib"
		Copy-Item $oracleConnJar.FullName "$ENV:KNOX_HOME\lib"

		Write-Log "Copying $oracleConnJar.FullName to $ENV:STORM_HOME\lib"
		Copy-Item $oracleConnJar.FullName "$ENV:STORM_HOME\lib"
	}
	# Copy Postgres connector jar to each components dir
	if ((Test-Path ENV:RANGER) -and ($ENV:RANGER -ieq "yes") -and (($ENV:RANGER_DB_FLAVOR -eq "POSTGRES") -or ($ENV:RANGER_AUDIT_DB_FLAVOR -eq "POSTGRES")))
	{
		$postgresConnJar = @(gci -Filter postgresql-connector-jdbc*.jar -Path $hdpLayoutLocation)[0]

		Write-Log "Copying $postgresConnJar.FullName to $ENV:HADOOP_HOME\share\hadoop\common\lib"
		Copy-Item $postgresConnJar.FullName "$ENV:HADOOP_HOME\share\hadoop\common\lib"

		Write-Log "Copying $postgresConnJar.FullName to $ENV:HIVE_HOME\lib"
		Copy-Item $postgresConnJar.FullName "$ENV:HIVE_HOME\lib"

		Write-Log "Copying $postgresConnJar.FullName to $ENV:HBASE_HOME\lib"
		Copy-Item $postgresConnJar.FullName "$ENV:HBASE_HOME\lib"

		Write-Log "Copying $postgresConnJar.FullName to $ENV:KNOX_HOME\lib"
		Copy-Item $postgresConnJar.FullName "$ENV:KNOX_HOME\lib"

		Write-Log "Copying $postgresConnJar.FullName to $ENV:STORM_HOME\lib"
		Copy-Item $postgresConnJar.FullName "$ENV:STORM_HOME\lib"			
	}
	# Copy SQLSERVER connector jar to each components dir
	if ((Test-Path ENV:RANGER) -and ($ENV:RANGER -ieq "yes") -and (($ENV:RANGER_DB_FLAVOR -eq "MSSQL") -or ($ENV:RANGER_AUDIT_DB_FLAVOR -eq "MSSQL")))
	{
		$SQLSeverConnJar = @(gci -Filter sqljdbc*.jar -Path $hdpLayoutLocation)[0]

		Write-Log "Copying $SQLSeverConnJar.FullName to $ENV:HADOOP_HOME\share\hadoop\common\lib"
		Copy-Item $SQLSeverConnJar.FullName "$ENV:HADOOP_HOME\share\hadoop\common\lib"

		Write-Log "Copying $SQLSeverConnJar.FullName to $ENV:HIVE_HOME\lib"
		Copy-Item $SQLSeverConnJar.FullName "$ENV:HIVE_HOME\lib"

		Write-Log "Copying $SQLSeverConnJar.FullName to $ENV:HBASE_HOME\lib"
		Copy-Item $SQLSeverConnJar.FullName "$ENV:HBASE_HOME\lib"

		Write-Log "Copying $SQLSeverConnJar.FullName to $ENV:KNOX_HOME\lib"
		Copy-Item $SQLSeverConnJar.FullName "$ENV:KNOX_HOME\lib"

		Write-Log "Copying $SQLSeverConnJar.FullName to $ENV:STORM_HOME\lib"
		Copy-Item $SQLSeverConnJar.FullName "$ENV:STORM_HOME\lib"				
	}
}

try
{
    $scriptDir = Resolve-Path (Split-Path $MyInvocation.MyCommand.Path)
    $utilsModule = Import-Module -Name "$scriptDir\..\resources\Winpkg.Utils.psm1" -ArgumentList ("ranger") -PassThru
    $apiModule = Import-Module -Name "$scriptDir\InstallApi.psm1" -PassThru
    Main $scriptDir
}
catch [Exception]
{
    Write-Log $_.Exception.Message $_
    throw $_.Exception.Message
}
finally
{
    if( $apiModule -ne $null )
    {
        Remove-Module $apiModule
    }

    if( $utilsModule -ne $null )
    {

        Remove-Module $utilsModule
    }
}
