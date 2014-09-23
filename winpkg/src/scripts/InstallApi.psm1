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
### A set of basic PowerShell routines that can be used to install and
### manage Hadoop services on a single node. For use-case see install.ps1.
###

###
### Global variables
###
$ScriptDir = Resolve-Path (Split-Path $MyInvocation.MyCommand.Path)

$FinalName = "argus-@argus.version@"

###############################################################################
###
### Installs argus.
###
### Arguments:
###     component: Component to be installed, it can be "core, "hdfs" or "mapreduce"
###     nodeInstallRoot: Target install folder (for example "C:\Hadoop")
###     serviceCredential: Credential object used for service creation
###     role: Space separated list of roles that should be installed.
###           (for example, "jobtracker historyserver" for mapreduce)
###
###############################################################################

function Install(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $component,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $nodeInstallRoot,
    [System.Management.Automation.PSCredential]
    [Parameter( Position=2, Mandatory=$false )]
    $serviceCredential,
    [String]
    [Parameter( Position=3, Mandatory=$false )]
    $roles
    )
{


    if ( $component -eq "argus" )
    {
        $HDP_INSTALL_PATH, $HDP_RESOURCES_DIR = Initialize-InstallationEnv $scriptDir "$FinalName.winpkg.log"

        ### $argusInstallPath: the name of the folder containing the application, after unzipping
        $argusInstallPath = Join-Path $nodeInstallRoot $FinalName
        $argusAdmin = $FinalName + "-admin"
        $argusAdminInstallPath = Join-Path "$argusInstallPath" "$argusAdmin" 
        $argusInstallToBin = Join-Path "$argusAdminInstallPath" "bin"
        InstallBinaries $nodeInstallRoot $serviceCredential

		if ($roles) {
			###
			### Create Argus Windows Services and grant user ACLS to start/stop
			###
			### TODO
			Write-Log "argus Role Services: $roles"

			### Verify that roles are in the supported set
			### TODO
			CheckRole $roles @("argus")

			Write-Log "Role : $roles"
			foreach( $service in empty-null ($roles -Split('\s+')))
			{
				CreateAndConfigureHadoopService $service $HDP_RESOURCES_DIR $argusInstallToBin $serviceCredential
				###
				### Setup argus service config
				###
				$ENV:PATH="$ENV:HADOOP_HOME\bin;" + $ENV:PATH
				Write-Log "Creating service config ${argusInstallToBin}\$service.xml"
				# TODO:WINDOWS take python from `which` or `where`
				$cmd = "python $argusInstallToBin\argus_start.py --service > `"$argusInstallToBin\$service.xml`""
				Invoke-CmdChk $cmd    

			}
	        ### end of roles loop
        }
        Write-Log "Finished installing Argus Admin Tool"
    } 
	elseif ( $component -eq "argus-hdfs" )
	{
		# This if will work on the assumption that $component ="argus" is installed
		# so we have the ARGUS_HDFS_HOME properly set

		# setup path variables
        $argusInstallPath = Join-Path $nodeInstallRoot $FinalName

        Write-Log "Copying argus-hdfs config files "

		# TODO:WINDOWS check if the path HADOOP_CONF_DIR is set or not

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HDFS_HOME\conf\*`" `"$ENV:HADOOP_CONF_DIR`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HDFS_HOME\dist\*.jar`" `"$HADOOP_HOME\share\hadoop\common\lib\`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HDFS_HOME\lib\*.jar`" `"$HADOOP_HOME\share\hadoop\common\lib\`""
        Invoke-CmdChk $xcopy_cmd

        #$xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_ADMIN_HOME\conf\xasecure-hadoop-env.cmd`" `"$ENV:HADOOP_CONF_DIR`""
        #Invoke-CmdChk $xcopy_cmd

	}
	elseif ( $component -eq "argus-hive" )
	{
		# This if will work on the assumption that $component ="argus" is installed
		# so we have the ARGUS_HIVE_HOME properly set

        Write-Log "Copying argus-hive config files "

		# TODO:WINDOWS check if the path HADOOP_CONF_DIR is set or not

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HIVE_HOME\conf\*`" `"$ENV:HADOOP_CONF_DIR`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HIVE_HOME\dist\*.jar`" `"$HADOOP_HOME\share\hadoop\common\lib`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HIVE_HOME\lib\*.jar`" `"$HADOOP_HOME\share\hadoop\common\lib`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_HIVE_HOME\template\configuration.xml`" `"$ENV:HADOOP_CONF_DIR`""
        Invoke-CmdChk $xcopy_cmd

	}
    elseif ( $component -eq "argus-ugsync" )
    {
        # This if will work on the assumption that $component ="argus" is installed
        # so we have the ARGUS_HDFS_HOME properly set

        # setup path variables
        $argusInstallPath = Join-Path $nodeInstallRoot $FinalName

        Write-Log "Copying argus-hdfs config files "

        # TODO:WINDOWS check if the path HADOOP_CONF_DIR is set or not

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_UGSYNC_HOME\conf\*`" `"$ENV:HADOOP_CONF_DIR`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_UGSYNC_HOME\dist\*.jar`" `"$HADOOP_HOME\share\hadoop\common\lib\`""
        Invoke-CmdChk $xcopy_cmd

        $xcopy_cmd = "xcopy /EIYF `"$ENV:ARGUS_UGSYNC_HOME\lib\*.jar`" `"$HADOOP_HOME\share\hadoop\common\lib\`""
        Invoke-CmdChk $xcopy_cmd
    }
    else
    {
        throw "Install: Unsupported component argument."
    }
}

###############################################################################
###
### Installs argus binaries.
###
### Arguments:
###     nodeInstallRoot: Target install folder (for example "C:\Hadoop")
###     serviceCredential: 
###
###############################################################################
function InstallBinaries(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $nodeInstallRoot,
    [System.Management.Automation.PSCredential]
    [Parameter( Position=2, Mandatory=$true )]
    $serviceCredential
    )
{
        $HDP_INSTALL_PATH, $HDP_RESOURCES_DIR = Initialize-InstallationEnv $scriptDir "$FinalName.winpkg.log"
    
        # setup path variables
        $argusInstallPath = Join-Path $nodeInstallRoot $FinalName
        $argusInstallToBin = Join-Path "$argusInstallPath" "bin"

        $argusAdminFile = $FinalName + "-admin"
        $argusAdminPath = Join-Path $argusInstallPath $argusAdminFile 

        $argusHdfsAgentFile = $FinalName + "-hdfs-agent"
        $argusHdfsAgentPath = Join-Path $argusInstallPath $argusHdfsAgentFile 

        $argusHBaseAgentFile = $FinalName + "-hbase-agent"
        $argusHBaseAgentPath = Join-Path $argusInstallPath $argusHBaseAgentFile 

        $argusHiveAgentFile = $FinalName + "-hive-agent"
        $argusHiveAgentPath = Join-Path $argusInstallPath $argusHiveAgentFile 

        $argusKnoxAgentFile = $FinalName + "-knox-agent"
        $argusKnoxAgentPath = Join-Path $argusInstallPath $argusKnoxAgentFile 

        $argusStormAgentFile = $FinalName +"-storm-agent"
        $argusStormAgentPath = Join-Path $argusInstallPath $argusStormAgentFile 

        $argusUgsyncFile = $FinalName + "-ugsync"
        $argusUgsyncPath = Join-Path $argusInstallPath $argusUgsyncFile 

        Write-Log "Installing $FinalName to $argusInstallPath"
        #argus: Installing argus-0.1.0.2.1.1.0-1111 to D:\HDP\\argus-0.1.0.2.1.1.0-1111

        Write-Log "Checking the JAVA Installation."
        if( -not (Test-Path $ENV:JAVA_HOME\bin\java.exe))
        {
            Write-Log "JAVA_HOME not set properly; $ENV:JAVA_HOME\bin\java.exe does not exist" "Failure"
            throw "Install: JAVA_HOME not set properly; $ENV:JAVA_HOME\bin\java.exe does not exist."
        }

        Write-Log "Checking the Hadoop Installation."
        if( -not (Test-Path $ENV:HADOOP_HOME\bin\winutils.exe))
        {
          Write-Log "HADOOP_HOME not set properly; $ENV:HADOOP_HOME\bin\winutils.exe does not exist" "Failure"
          throw "Install: HADOOP_HOME not set properly; $ENV:HADOOP_HOME\bin\winutils.exe does not exist."
        }

        ### Create Install Root directory
        if( -not (Test-Path "$argusInstallPath"))
        {
            Write-Log "Creating Install Root directory: `"$argusInstallPath`""
            $cmd = "mkdir `"$argusInstallPath`""
            Invoke-CmdChk $cmd
        }

        $argusInstallPathParent = (Get-Item $argusInstallPath).parent.FullName

        ###
        ###  Unzip Argus secure from compressed archive
        ###

        Write-Log "Extracting $argusAdminFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusAdminFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusAdminFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_HOME environment variable at machine scope to `"$argusInstallPath`""
        [Environment]::SetEnvironmentVariable("ARGUS_HOME", $argusInstallPath, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_HOME = "$argusInstallPath"


        ###
        ### Set ARGUS_ADMIN_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_ADMIN_HOME environment variable at machine scope to `"$argusAdminPath`""
        [Environment]::SetEnvironmentVariable("ARGUS_ADMIN_HOME", $argusAdminPath, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_ADMIN_HOME = "$argusAdminPath"



        ###
        ###  Unzip Argus HDFS Agent from compressed archive
        ###

        Write-Log "Extracting $argusHdfsAgentFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusHdfsAgentFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusHdfsAgentFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_HDFS_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_HDFS_HOME environment variable at machine scope to `"$argusHdfsAgentPath`""
        [Environment]::SetEnvironmentVariable("ARGUS_HDFS_HOME", $argusHdfsAgentPath, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_HDFS_HOME = "$argusHdfsAgentPath"



        ###
        ###  Unzip Argus HIVE Agent from compressed archive
        ###

        Write-Log "Extracting $argusHiveAgentFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusHiveAgentFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusHiveAgentFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_HIVE_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_HIVE_HOME environment variable at machine scope to `"$argusHiveAgentPath`""
        [Environment]::SetEnvironmentVariable("ARGUS_HIVE_HOME", $argusHiveAgentPath, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_HIVE_HOME = "$argusHiveAgentPath"



        ###
        ###  Unzip Argus HBASE Agent from compressed archive
        ###

        Write-Log "Extracting $argusHBaseAgentFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusHBaseAgentFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusHBaseAgentFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_HBASE_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_HBASE_HOME environment variable at machine scope to `"$argusHBaseAgentPath`""
        [Environment]::SetEnvironmentVariable("ARGUS_HBASE_HOME", $argusHBaseAgentPath, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_HBASE_HOME = "$argusHBaseAgentPath"

        ###
        ###  Unzip Argus Knox Agent from compressed archive
        ###

        Write-Log "Extracting $argusKnoxAgentFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusKnoxAgentFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusKnoxAgentFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_KNOX_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_KNOX_HOME environment variable at machine scope to `"$argusKnoxAgentFile`""
        [Environment]::SetEnvironmentVariable("ARGUS_KNOX_HOME", $argusKnoxAgentFile, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_KNOX_HOME = "$argusKnoxAgentFile"

        ###
        ###  Unzip Argus Storm Agent from compressed archive
        ###

        Write-Log "Extracting $argusStormAgentFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusStormAgentFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusStormAgentFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_STORM_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_STORM_HOME environment variable at machine scope to `"$argusStormAgentFile`""
        [Environment]::SetEnvironmentVariable("ARGUS_STORM_HOME", $argusStormAgentFile, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_STORM_HOME = "$argusStormAgentFile"

        ###
        ###  Unzip Argus Ugsync from compressed archive
        ###

        Write-Log "Extracting $argusUgsyncAgentFile.zip to $argusInstallPath"

        if ( Test-Path ENV:UNZIP_CMD )
        {
            ### Use external unzip command if given
            $unzipExpr = $ENV:UNZIP_CMD.Replace("@SRC", "`"$HDP_RESOURCES_DIR\$argusUgsyncAgentFile.zip`"")
            $unzipExpr = $unzipExpr.Replace("@DEST", "`"$argusInstallPath`"")
            ### We ignore the error code of the unzip command for now to be
            ### consistent with prior behavior.
            Invoke-Ps $unzipExpr
        }
        else
        {
            $shellApplication = new-object -com shell.application
            $zipPackage = $shellApplication.NameSpace("$HDP_RESOURCES_DIR\$argusUgsyncAgentFile.zip")
            $destinationFolder = $shellApplication.NameSpace($argusInstallPath)
            $destinationFolder.CopyHere($zipPackage.Items(), 20)
        }

        ###
        ### Set ARGUS_UGSYNC_HOME environment variable
        ###
        Write-Log "Setting the ARGUS_UGSYNC_HOME environment variable at machine scope to `"$argusUgsyncAgentFile`""
        [Environment]::SetEnvironmentVariable("ARGUS_UGSYNC_HOME", $argusUgsyncAgentFile, [EnvironmentVariableTarget]::Machine)
        $ENV:ARGUS_STORM_HOME = "$argusUgsyncAgentFile"

}



###############################################################################
###
### Uninstalls Hadoop component.
###
### Arguments:
###     component: Component to be uninstalled, it can be "core, "hdfs" or "mapreduce"
###     nodeInstallRoot: Install folder (for example "C:\Hadoop")
###
###############################################################################

function Uninstall(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $component,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $nodeInstallRoot
    )
{
    if ( $component -eq "argus" )
    {
        $HDP_INSTALL_PATH, $HDP_RESOURCES_DIR = Initialize-InstallationEnv $scriptDir "$FinalName.winpkg.log"

	    Write-Log "Uninstalling argus $FinalName"
	    $argusInstallPath = Join-Path $nodeInstallRoot $FinalName

        ### If Hadoop Core root does not exist exit early
        if ( -not (Test-Path $argusInstallPath) )
        {
            return
        }

		### Stop and delete services
        ###
        foreach( $service in ("argus"))
        {
            StopAndDeleteHadoopService $service
        }

	    ###
	    ### Delete install dir
	    ###
	    $cmd = "rd /s /q `"$argusInstallPath`""
	    Invoke-Cmd $cmd

        ### Removing ARGUS_HOME environment variable
        Write-Log "Removing the ARGUS_HOME environment variable"
        [Environment]::SetEnvironmentVariable( "ARGUS_HOME", $null, [EnvironmentVariableTarget]::Machine )

        Write-Log "Successfully uninstalled argus"

    }
    else
    {
        throw "Uninstall: Unsupported component argument."
    }
}

###############################################################################
###
### Start component services.
###
### Arguments:
###     component: Component name
###     roles: List of space separated service to start
###
###############################################################################
function StartService(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $component,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $roles
    )
{
    Write-Log "Starting `"$component`" `"$roles`" services"

    if ( $component -eq "argus" )
    {
        Write-Log "StartService: argus services"
		CheckRole $roles @("argus")

        foreach ( $role in $roles -Split("\s+") )
        {
            Write-Log "Starting $role service"
            Start-Service $role
        }
    }
    else
    {
        throw "StartService: Unsupported component argument."
    }
}

###############################################################################
###
### Stop component services.
###
### Arguments:
###     component: Component name
###     roles: List of space separated service to stop
###
###############################################################################
function StopService(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $component,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $roles
    )
{
    Write-Log "Stopping `"$component`" `"$roles`" services"

    if ( $component -eq "argus" )
    {
        ### Verify that roles are in the supported set
        CheckRole $roles @("argus")
        foreach ( $role in $roles -Split("\s+") )
        {
            try
            {
                Write-Log "Stopping $role "
                if (Get-Service "$role" -ErrorAction SilentlyContinue)
                {
                    Write-Log "Service $role exists, stopping it"
                    Stop-Service $role
                }
                else
                {
                    Write-Log "Service $role does not exist, moving to next"
                }
            }
            catch [Exception]
            {
                Write-Host "Can't stop service $role"
            }

        }
    }
    else
    {
        throw "StartService: Unsupported component argument."
    }
}


###############################################################################
###
### Alters the configuration of the argus component.
###
### Arguments:
###     component: Component to be configured, it should be "argus"
###     nodeInstallRoot: Target install folder (for example "C:\Hadoop")
###     serviceCredential: Credential object used for service creation
###     configs:
###
###############################################################################
function Configure(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $component,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $nodeInstallRoot,
    [System.Management.Automation.PSCredential]
    [Parameter( Position=2, Mandatory=$false )]
    $serviceCredential,
    [hashtable]
    [parameter( Position=3 )]
    $configs = @{},
    [bool]
    [parameter( Position=4 )]
    $aclAllFolders = $True
    )
{

    if ( $component -eq "argus" )
    {
        Write-Log "Configure: argus does not have any configurations"
		### TODO
    }
	elseif ( $component -eq "argus-hdfs" )
    {
        ConfigureArgusHdfs $nodeInstallRoot $serviceCredential $configs $aclAllFolders
    }
    elseif ( $component -eq "argus-ugsync" )
    {
        ConfigureArgusUgsync $nodeInstallRoot $serviceCredential $configs $aclAllFolders
    }
    else
    {
        throw "Configure: Unsupported component argument."
    }
}

###############################################################################
###
### Alters the configuration of the Hadoop HDFS component for Argus.
###
### Arguments:
###   See Configure
###############################################################################
function ConfigureArgusHdfs(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $nodeInstallRoot,
    [System.Management.Automation.PSCredential]
    [Parameter( Position=1, Mandatory=$false )]
    $serviceCredential,
    [hashtable]
    [parameter( Position=2 )]
    $configs = @{},
    [bool]
    [parameter( Position=3 )]
    $aclAllFolders = $True
    )
{

    $HDP_INSTALL_PATH, $HDP_RESOURCES_DIR = Initialize-InstallationEnv $ScriptDir "hadoop-$HadoopCoreVersion.winpkg.log" $ENV:WINPKG_BIN

	#TODO:WINDOWS Check if appropriate dirs are present and env set
    #if( -not (Test-Path $hadoopInstallToDir ))
    #{
    #    throw "ConfigureArgusHdfs: Install must be called before ConfigureArgusHdfs"
    #}

	# Add line to invoke the xasecure-hadoop-env.cmd
	# set HADOOP_NAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_NAMENODE_OPTS% 
	# set HADOOP_SECONDARYNAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_SECONDARYNAMENODE_OPTS%
    
	Write-Log "Modifying hadoop-env.cmd to invoke xasecure-hadoop-env.cmd"
    $file = Join-Path $ENV:HADOOP_CONF_DIR "hadoop-env.cmd"

    $line = "`set HADOOP_NAMENODE_OPTS= -javaagent:%HADOOP_HOME%\share\hadoop\common\lib\hdfs-agent-@argus.version@.jar=authagent  %HADOOP_NAMENODE_OPTS%"
	#TODO:WINDOWS Should we guard against option already being present?
    Add-Content $file $line

    $line = "`set HADOOP_SECONDARYNAMENODE_OPTS= -javaagent:%HADOOP_HOME%\share\hadoop\common\lib\hdfs-agent-@argus.version@.jar=authagent  %HADOOP_SECONDARYNAMENODE_OPTS%"
	#TODO:WINDOWS Should we guard against option already being present?
    Add-Content $file $line

 }

###############################################################################
###
### Alters the configuration of the Hadoop Ugsync service for Argus.
###
### Arguments:
###   See Configure
###############################################################################
function ConfigureArgusUgsync(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $nodeInstallRoot,
    [System.Management.Automation.PSCredential]
    [Parameter( Position=1, Mandatory=$false )]
    $serviceCredential,
    [hashtable]
    [parameter( Position=2 )]
    $configs = @{},
    [bool]
    [parameter( Position=3 )]
    $aclAllFolders = $True
    )
{

    $HDP_INSTALL_PATH, $HDP_RESOURCES_DIR = Initialize-InstallationEnv $ScriptDir "hadoop-$HadoopCoreVersion.winpkg.log" $ENV:WINPKG_BIN

    #TODO:WINDOWS Check if appropriate dirs are present and env set
    #if( -not (Test-Path $hadoopInstallToDir ))
    #{
    #    throw "ConfigureArgusHdfs: Install must be called before ConfigureArgusHdfs"
    #}

    # Add line to invoke the xasecure-hadoop-env.cmd
    # set HADOOP_NAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_NAMENODE_OPTS% 
    # set HADOOP_SECONDARYNAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_SECONDARYNAMENODE_OPTS%
    
    Write-Log "Modifying hadoop-env.cmd to invoke xasecure-hadoop-env.cmd"
    $file = Join-Path $ENV:HADOOP_CONF_DIR "hadoop-env.cmd"

    $line = "`set HADOOP_NAMENODE_OPTS= -javaagent:%HADOOP_HOME%\share\hadoop\common\lib\hdfs-agent-@argus.version@.jar=authagent  %HADOOP_NAMENODE_OPTS%"
    #TODO:WINDOWS Should we guard against option already being present?
    Add-Content $file $line

    $line = "`set HADOOP_SECONDARYNAMENODE_OPTS= -javaagent:%HADOOP_HOME%\share\hadoop\common\lib\hdfs-agent-@argus.version@.jar=authagent  %HADOOP_SECONDARYNAMENODE_OPTS%"
    #TODO:WINDOWS Should we guard against option already being present?
    Add-Content $file $line

 }

### Helper routing that converts a $null object to nothing. Otherwise, iterating over
### a $null object with foreach results in a loop with one $null element.
function empty-null($obj)
{
   if ($obj -ne $null) { $obj }
}

### Gives full permissions on the folder to the given user
function GiveFullPermissions(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $folder,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $username,
    [bool]
    [Parameter( Position=2, Mandatory=$false )]
    $recursive = $false)
{
    Write-Log "Giving user/group `"$username`" full permissions to `"$folder`""
    $cmd = "icacls `"$folder`" /grant ${username}:(OI)(CI)F"
    if ($recursive) {
        $cmd += " /T"
    }
    Invoke-CmdChk $cmd
}

### Checks if the given space separated roles are in the given array of
### supported roles.
function CheckRole(
    [string]
    [parameter( Position=0, Mandatory=$true )]
    $roles,
    [array]
    [parameter( Position=1, Mandatory=$true )]
    $supportedRoles
    )
{
    foreach ( $role in $roles.Split(" ") )
    {
        if ( -not ( $supportedRoles -contains $role ) )
        {
            throw "CheckRole: Passed in role `"$role`" is outside of the supported set `"$supportedRoles`""
        }
    }
}

### Creates and configures the service.
function CreateAndConfigureHadoopService(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $service,
    [String]
    [Parameter( Position=1, Mandatory=$true )]
    $hdpResourcesDir,
    [String]
    [Parameter( Position=2, Mandatory=$true )]
    $serviceBinDir,
    [System.Management.Automation.PSCredential]
    [Parameter( Position=3, Mandatory=$true )]
    $serviceCredential
)
{
    if ( -not ( Get-Service "$service" -ErrorAction SilentlyContinue ) )
    {
		 Write-Log "Creating service `"$service`" as $serviceBinDir\$service.exe"
        $xcopyServiceHost_cmd = "copy /Y `"$HDP_RESOURCES_DIR\serviceHost.exe`" `"$serviceBinDir\$service.exe`""
        Invoke-CmdChk $xcopyServiceHost_cmd

        #Creating the event log needs to be done from an elevated process, so we do it here
        if( -not ([Diagnostics.EventLog]::SourceExists( "$service" )))
        {
            [Diagnostics.EventLog]::CreateEventSource( "$service", "" )
        }

        Write-Log "Adding service $service"
        $s = New-Service -Name "$service" -BinaryPathName "$serviceBinDir\$service.exe" -Credential $serviceCredential -DisplayName "Apache Hadoop $service"
        if ( $s -eq $null )
        {
            throw "CreateAndConfigureHadoopService: Service `"$service`" creation failed"
        }

        $cmd="$ENV:WINDIR\system32\sc.exe failure $service reset= 30 actions= restart/5000"
        Invoke-CmdChk $cmd

        $cmd="$ENV:WINDIR\system32\sc.exe config $service start= disabled"
        Invoke-CmdChk $cmd

        Set-ServiceAcl $service
    }
    else
    {
        Write-Log "Service `"$service`" already exists, Removing `"$service`""
        StopAndDeleteHadoopService $service
        CreateAndConfigureHadoopService $service $hdpResourcesDir $serviceBinDir $serviceCredential
    }
}

### Stops and deletes the Hadoop service.
function StopAndDeleteHadoopService(
    [String]
    [Parameter( Position=0, Mandatory=$true )]
    $service
)
{
    Write-Log "Stopping $service"
    $s = Get-Service $service -ErrorAction SilentlyContinue

    if( $s -ne $null )
    {
        Stop-Service $service
        $cmd = "sc.exe delete $service"
        Invoke-Cmd $cmd
    }
}

### Helper routine that converts a $null object to nothing. Otherwise, iterating over
### a $null object with foreach results in a loop with one $null element.
function empty-null($obj)
{
   if ($obj -ne $null) { $obj }
}

### Helper routine that updates the given fileName XML file with the given
### key/value configuration values. The XML file is expected to be in the
### Hadoop format. For example:
### <configuration>
###   <property>
###     <name.../><value.../>
###   </property>
### </configuration>
function UpdateXmlConfig(
    [string]
    [parameter( Position=0, Mandatory=$true )]
    $fileName,
    [hashtable]
    [parameter( Position=1 )]
    $config = @{} )
{
    $xml = New-Object System.Xml.XmlDocument
    $xml.PreserveWhitespace = $true
    $xml.Load($fileName)

    foreach( $key in empty-null $config.Keys )
    {
        $value = $config[$key]
        $found = $False
        $xml.SelectNodes('/configuration/property') | ? { $_.name -eq $key } | % { $_.value = $value; $found = $True }
        if ( -not $found )
        {
            $xml["configuration"].AppendChild($xml.CreateWhitespace("`r`n  ")) | Out-Null
            $newItem = $xml.CreateElement("property")
            $newItem.AppendChild($xml.CreateWhitespace("`r`n    ")) | Out-Null
            $newItem.AppendChild($xml.CreateElement("name")) | Out-Null
            $newItem.AppendChild($xml.CreateWhitespace("`r`n    ")) | Out-Null
            $newItem.AppendChild($xml.CreateElement("value")) | Out-Null
            $newItem.AppendChild($xml.CreateWhitespace("`r`n  ")) | Out-Null
            $newItem.name = $key
            $newItem.value = $value
            $xml["configuration"].AppendChild($newItem) | Out-Null
            $xml["configuration"].AppendChild($xml.CreateWhitespace("`r`n")) | Out-Null
        }
    }

    $xml.Save($fileName)
    $xml.ReleasePath
}

### Helper routine that replaces string in file
function ReplaceString($file,$find,$replace)
{
    $content = Get-Content $file
    for ($i=1; $i -le $content.Count; $i++)
    {
        if ($content[$i] -like "*$find*")
        {
            $content[$i] = $content[$i].Replace($find, $replace)
        }
    }
    Set-Content -Value $content -Path $file -Force
}

###
### Public API
###
Export-ModuleMember -Function Install
Export-ModuleMember -Function Uninstall
Export-ModuleMember -Function Configure
Export-ModuleMember -Function StartService
Export-ModuleMember -Function StopService
###
### Private API (exposed for test only)
###
Export-ModuleMember -Function UpdateXmlConfig
