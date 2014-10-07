@echo off
if not defined HADOOP_HOME (
	set HADOOP_HOME=%~dp0
)

for /f "usebackq delims=|" %%G in (`dir /b "%HADOOP_HOME%\share\hadoop\common\lib" ^| findstr /i "^hdfs-agent-.*\.jar"`) do (

    set "XASECURE_AGENT_PATH=%HADOOP_HOME%\share\hadoop\common\lib\%%~G"
	
)

if exist %XASECURE_AGENT_PATH% (

	set XASECURE_AGENT_OPTS= -javaagent:%XASECURE_AGENT_PATH%=authagent 
	rem Convert \\ to \ in path since its causing problem with findstr below
	Echo.%HADOOP_NAMENODE_OPTS:\\=\% | findstr /C:"%XASECURE_AGENT_OPTS:\\=\%">nul && (
		REM OPTIONS already set continue
	) || (
		set HADOOP_NAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_NAMENODE_OPTS% 
		set HADOOP_SECONDARYNAMENODE_OPTS= %XASECURE_AGENT_OPTS% %HADOOP_SECONDARYNAMENODE_OPTS%
    )
) else (
    rem %XASECURE_AGENT_PATH% file doesn't exist
)

