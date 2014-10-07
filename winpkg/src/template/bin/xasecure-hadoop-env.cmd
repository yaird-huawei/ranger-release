@echo off
if not defined HADOOP_HOME (
	set HADOOP_HOME=%~dp0
)
echo %HADOOP_HOME%

setlocal enableextensions enabledelayedexpansion
for /f "usebackq" %%i in (`dir %HADOOP_HOME% /b ^| findstr /i "^hdfs-agent-[0-9][0-9.]*\.jar"`) do (
    set XASECURE_AGENT_PATH=%%i
)
endlocal

if exist {%XASECURE_AGENT_PATH%} (

	set XASECURE_AGENT_OPTS= -javaagent:%XASECURE_AGENT_PATH%=authagent 
	@setlocal enableextensions enabledelayedexpansion
	rem Convert \\ to \ in path since its causing problem with findstr below
	Echo.%HADOOP_NAMENODE_OPTS_TMP:\\=\% | findstr /C:"%XASECURE_AGENT_OPTS_TMP:\\=\%">nul && (
		REM OPTIONS already set continue
	) || (
		set HADOOP_NAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_NAMENODE_OPTS% 
		set HADOOP_SECONDARYNAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_SECONDARYNAMENODE_OPTS%
    )
) else (
    rem %XASECURE_AGENT_PATH% file doesn't exist
)
