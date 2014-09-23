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
### Install script that can be used to install Argus
### To invoke the scipt, run the following command from PowerShell:
###   install.ps1 -username <username> -password <password> or
###   install.ps1 -credentialFilePath <credentialFilePath>
###
### where:
###   <username> and <password> represent account credentials used to run
###   Argus services as Windows services.
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
    $FinalName = "argus-@argus.version@"
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
    ### Install and Configure argus (Looks like this config will come from earlier HDP installation steps )
    ###
    if ( $ENV:IS_ARGUS -eq "yes" ) {
      $roles = "argus" # TODO!!
    }

    Write-Log "Roles are $roles"
    Install "argus" $nodeInstallRoot $serviceCredential $roles
    Configure "argus" $nodeInstallRoot $serviceCredential 
    Write-Log "Installation of Argus Admin Tool completed successfully"

    ####################################################################
    ###			Install and Configure argus-hdfs agent               ###
    ####################################################################
    
    $roles = ' '
    Install "argus-hdfs" $nodeInstallRoot $serviceCredential $roles
    Configure "argus-hdfs" $nodeInstallRoot $serviceCredential 
    ###
    ### Apply configuration changes to hdfs-site.xml
    ###
    $xmlFile = Join-Path $ENV:HADOOP_CONF_DIR "hdfs-site.xml"
        $argusHdfsConfigs = @{
        	"dfs.permissions.enabled" = "true";
        	"dfs.permissions" = "true" 
        }
    UpdateXmlConfig $xmlFile $argusHdfsConfigs


    $xmlFile = Join-Path $ENV:HADOOP_CONF_DIR "xasecure-audit.xml"
        $argusHdfsAuditChanges = @{
			"xasecure.audit.jpa.javax.persistence.jdbc.url"			= "jdbc:mysql://$ENV:ARGUS_AUDIT_DB_HOST:3306/$ENV:ARGUS_AUDIT_DB_DBNAME"
        	"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "$ENV:ARGUS_AUDIT_DB_USERNAME"
        	"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"		
        	"xasecure.audit.repository.name"						= "$ENV:ARGUS_HDFS_REPO"
        	"xasecure.audit.credential.provider.file"				= "jceks://file$ENV:ARGUS_HDFS_CRED_KEYSTORE_FILE"
        	"xasecure.audit.jpa.javax.persistence.jdbc.driver"		= "com.mysql.jdbc.Driver"
        }
    UpdateXmlConfig $xmlFile $argusHdfsAuditChanges
        

    $xmlFile = Join-Path $ENV:HADOOP_CONF_DIR "xasecure-hdfs-security.xml"
        $argusHdfsSecurityChanges = @{
        	"hdfs.authorization.verifier.classname"					= "com.xasecure.pdp.hdfs.XASecureAuthorizer"
        	"xasecure.hdfs.policymgr.url"							= "$ENV:ARGUS_HOST/service/assets/policyList/$ENV:ARGUS_HDFS_REPO"
        	"xasecure.hdfs.policymgr.url.saveAsFile"				= "/tmp/hadoop_$ENV:ARGUS_HDFS_REPO"
        	"xasecure.hdfs.policymgr.url.laststoredfile"			= "$ENV:ARGUS_HDFS_CACHE_FILE/hadoop_$ENV:ARGUS_HDFS_REPO_json"
        	"xasecure.hdfs.policymgr.url.reloadIntervalInMillis"	= "30000"
        	"xasecure.hdfs.policymgr.ssl.config"					= Join-Path $ENV:HADOOP_CONF_DIR "xasecure-policymgr-ssl.xml"
        }
    UpdateXmlConfig $xmlFile $argusHdfsSecurityChanges

    Write-Log "Installation of argus-hdfs completed successfully"


    ####################################################################
    ###			Install and Configure argus-hive agent               ###
    ####################################################################
    
    $roles = ' '
    Install "argus-hive" $nodeInstallRoot $serviceCredential $roles
    Configure "argus-hive" $nodeInstallRoot $serviceCredential 

    ###
    ### Apply configuration changes to hive-site.xml
    ###
    $xmlFile = Join-Path $ENV:HIVE_CONF_DIR "hive-site.xml"
	UpdateXmlConfig $xmlFile  @{
		"hive.security.authorization.enabled"	= "true"
		"hive.security.authorization.manager"	= "com.xasecure.authorization.hive.authorizer.XaSecureHiveAuthorizerFactory"
		"hive.conf.restricted.list"				= "hive.security.authorization.enabled"
		"hive.conf.restricted.list"				= "hive.security.authorization.manager"
		"hive.conf.restricted.list"				= "hive.security.authenticator.manager"
	}

    ###
    ### Apply configuration changes to hiveserver2-site.xml
    ###
    $xmlFile = Join-Path $ENV:HIVE_CONF_DIR "hiveserver2-site.xml"
	UpdateXmlConfig $xmlFile  @{
		"hive.security.authorization.enabled"	= "true"
		"hive.security.authorization.manager"	= "com.xasecure.authorization.hive.authorizer.XaSecureHiveAuthorizerFactory"
		"hive.security.authenticator.manager"	= "org.apache.hadoop.hive.ql.security.SessionStateUserAuthenticator"
		"hive.conf.restricted.list"				= "hive.security.authorization.enabled"
		"hive.conf.restricted.list"				= "hive.security.authorization.manager"
		"hive.conf.restricted.list"				= "hive.security.authenticator.manager"
	}

    ###
    ### Apply configuration changes to xasecure-audit.xml
    ###
    $xmlFile = Join-Path $ENV:HIVE_CONF_DIR "xasecure-audit.xml"
    UpdateXmlConfig $xmlFile @{
		"xasecure.audit.jpa.javax.persistence.jdbc.url"			= "jdbc:mysql://$ENV:ARGUS_AUDIT_DB_HOST:3306/$ENV:ARGUS_AUDIT_DB_DBNAME"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "$ENV:ARGUS_AUDIT_DB_USERNAME"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"		
		"xasecure.audit.repository.name"						= "$ENV:ARGUS_HIVE_REPO"
		"xasecure.audit.credential.provider.file"				= "jceks://file$ENV:ARGUS_HIVE_CRED_KEYSTORE_FILE"
       	"xasecure.audit.jpa.javax.persistence.jdbc.driver"		= "com.mysql.jdbc.Driver"
	}

    ###
    ### Apply configuration changes to xasecure-hive-security.xml
    ###
	
    $xmlFile = Join-Path $ENV:HIVE_CONF_DIR "xasecure-hive-security.xml"
	
    UpdateXmlConfig $xmlFile @{
		"hive.authorization.verifier.classname"					= "com.xasecure.pdp.hive.XASecureAuthorizer"
		"xasecure.hive.policymgr.url"							= "$ENV:ARGUS_HOST/service/assets/policyList/$ENV:ARGUS_HDFS_REPO"
		"xasecure.hive.policymgr.url.saveAsFile"				= "/tmp/hive_$ENV:ARGUS_HIVE_REPO"
		"xasecure.hive.policymgr.url.laststoredfile"			= "$ENV:ARGUS_HIVE_CACHE_FILE/hive_$ENV:ARGUS_HIVE_REPO_json"
		"xasecure.hive.policymgr.url.reloadIntervalInMillis"	= "30000"
		"xasecure.hive.update.xapolicies.on.grant.revoke"		= "true"
		"xasecure.policymgr.url"								= "$ENV:ARGUS_HOST"
	}

    Write-Log "Installation of argus-hive completed successfully"


    ####################################################################
    ###			Install and Configure argus-hbase agent              ###
    ####################################################################
    
 
    $roles = ' '
    Install "argus-hbase" $nodeInstallRoot $serviceCredential $roles
    Configure "argus-hbase" $nodeInstallRoot $serviceCredential 

    ###
    ### Apply configuration changes to hbase-site.xml
    ###
    $xmlFile = Join-Path $ENV:HBASE_CONF_DIR "hbase-site.xml"
	UpdateXmlConfig $xmlFile  @{
		"hbase.coprocessor.master.classes"	= "com.xasecure.authorization.hbase.XaSecureAuthorizationCoprocessor"
		"hbase.coprocessor.region.classes"	= "com.xasecure.authorization.hbase.XaSecureAuthorizationCoprocessor"
		"hbase.rpc.protection"				= "PRIVACY"
		"hbase.rpc.engine"					= "org.apache.hadoop.hbase.ipc.SecureRpcEngine"
	}

    ###
    ### Apply configuration changes to hbaseserver2-site.xml
    ###
    $xmlFile = Join-Path $ENV:HBASE_CONF_DIR "hbaseserver2-site.xml"
	UpdateXmlConfig $xmlFile  @{
		"hbase.security.authorization.enabled"	= "true"
		"hbase.security.authorization.manager"	= "com.xasecure.authorization.hbase.authorizer.XaSecureHbaseAuthorizerFactory"
		"hbase.security.authenticator.manager"	= "org.apache.hadoop.hbase.ql.security.SessionStateUserAuthenticator"
		"hbase.conf.restricted.list"				= "hbase.security.authorization.enabled"
		"hbase.conf.restricted.list"				= "hbase.security.authorization.manager"
		"hbase.conf.restricted.list"				= "hbase.security.authenticator.manager"
	}

    ###
    ### Apply configuration changes to xasecure-audit.xml
    ###
    $xmlFile = Join-Path $ENV:HBASE_CONF_DIR "xasecure-audit.xml"
    UpdateXmlConfig $xmlFile @{
		"xasecure.audit.jpa.javax.persistence.jdbc.url"			= "jdbc:mysql://$ENV:ARGUS_AUDIT_DB_HOST:3306/$ENV:ARGUS_AUDIT_DB_DBNAME"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "$ENV:ARGUS_AUDIT_DB_USERNAME"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"		
		"xasecure.audit.repository.name"						= "$ENV:ARGUS_HBASE_REPO"
		"xasecure.audit.credential.provider.file"				= "jceks://file$ENV:ARGUS_HBASE_CRED_KEYSTORE_FILE"
       	"xasecure.audit.jpa.javax.persistence.jdbc.driver"		= "com.mysql.jdbc.Driver"
	}

    ###
    ### Apply configuration changes to xasecure-hbase-security.xml
    ###
	
    $xmlFile = Join-Path $ENV:HBASE_CONF_DIR "xasecure-hbase-security.xml"
	
    UpdateXmlConfig $xmlFile @{
		"hbase.authorization.verifier.classname"					= "com.xasecure.pdp.hbase.XASecureAuthorizer"
		"xasecure.hbase.policymgr.url"							= "$ENV:ARGUS_HOST/service/assets/policyList/$ENV:ARGUS_HDFS_REPO"
		"xasecure.hbase.policymgr.url.saveAsFile"				= "/tmp/hbase_$ENV:ARGUS_HBASE_REPO"
		"xasecure.hbase.policymgr.url.laststoredfile"			= "$ENV:ARGUS_HBASE_CACHE_FILE/hbase_$ENV:ARGUS_HBASE_REPO_json"
		"xasecure.hbase.policymgr.url.reloadIntervalInMillis"	= "30000"
		"xasecure.hbase.update.xapolicies.on.grant.revoke"		= "true"
		"xasecure.policymgr.url"								= "$ENV:ARGUS_HOST"
	}

    ####################################################################
    ###         Install and Configure argus-ugsync service              ###
    ####################################################################
    
 
    $roles = ' '
    Install "argus-ugsync" $nodeInstallRoot $serviceCredential $roles
    Configure "argus-ugsync" $nodeInstallRoot $serviceCredential 


    Write-Log "Installation of argus-hbase completed successfully"


}

try
{
    $scriptDir = Resolve-Path (Split-Path $MyInvocation.MyCommand.Path)
    $utilsModule = Import-Module -Name "$scriptDir\..\resources\Winpkg.Utils.psm1" -ArgumentList ("argus") -PassThru
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
