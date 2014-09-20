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

    ###
    ### Install and Configure argus-hdfs agent
    ###
    
    $roles = ' '
    Install "argus-hdfs" $nodeInstallRoot $serviceCredential $roles
    Configure "argus-hdfs" $nodeInstallRoot $serviceCredential $argusHdfsConfigs
	###
    ### Apply configuration changes to hdfs-site.xml
    ###
    $xmlFile = Join-Path $ENV:HADOOP_CONF_DIR "hdfs-site.xml"
	$argusHdfsConfigs = @{
		"dfs.permissions.enabled" = "true";
		"dfs.permissions" = "true" 
	}
    UpdateXmlConfig $xmlFile @argusHdfsConfigs


    $xmlFile = Join-Path $ENV:HADOOP_CONF_DIR "xasecure-audit.xml"
	$argusHdfsAuditChanges = @{
		"xasecure.audit.jpa.javax.persistence.jdbc.url"			= "$ENV:XAAUDIT.DB.JDBC_URL"
		"xasecure.audit.jpa.javax.persistence.jdbc.user"		= "$ENV:XAAUDIT.DB.USER_NAME"
		"xasecure.audit.jpa.javax.persistence.jdbc.password"	= "crypted"		
		"xasecure.audit.repository.name"						= "$ENV:REPOSITORY_NAME"
		"xasecure.audit.credential.provider.file"				= "jceks://file$ENV:CREDENTIAL_PROVIDER_FILE"
		"xasecure.audit.jpa.javax.persistence.jdbc.driver"		= "$ENV:XAAUDIT.DB.JDBC_DRIVER"
	}
    UpdateXmlConfig $xmlFile @argusHdfsConfigs
	

    $xmlFile = Join-Path $ENV:HADOOP_CONF_DIR "xasecure-hdfs-security.xml"
	$argusHdfsSecurityChanges = @{
		"hdfs.authorization.verifier.classname"					= "com.xasecure.pdp.hdfs.XASecureAuthorizer"
		"xasecure.hdfs.policymgr.url"							= "$ENV:POLICY_MGR_URL/service/assets/policyList/$ENV:REPOSITORY_NAME"
		"xasecure.hdfs.policymgr.url.saveAsFile"				= "/tmp/hadoop_$ENV:REPOSITORY_NAME_json"
		"xasecure.hdfs.policymgr.url.laststoredfile"			= "%POLICY_CACHE_FILE_PATH%/hadoop_$ENV:REPOSITORY_NAME_json"
		"xasecure.hdfs.policymgr.url.reloadIntervalInMillis"	= "30000"
		"xasecure.hdfs.policymgr.ssl.config"					= Join-Path $ENV:HADOOP_CONF_DIR "xasecure-policymgr-ssl.xml"
	}
    UpdateXmlConfig $xmlFile @argusHdfsConfigs

    Write-Log "Installation of argus-hdfs completed successfully"
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
