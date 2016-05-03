@echo off
@rem Licensed to the Apache Software Foundation (ASF) under one or more
@rem contributor license agreements.  See the NOTICE file distributed with
@rem this work for additional information regarding copyright ownership.
@rem The ASF licenses this file to You under the Apache License, Version 2.0
@rem (the "License"); you may not use this file except in compliance with
@rem the License.  You may obtain a copy of the License at
@rem
@rem     http://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.

if not defined HADOOP_HOME (
	set HADOOP_HOME=%~dp0
)

for /f "usebackq delims=|" %%G in (`dir /b "%HADOOP_HOME%\share\hadoop\common\lib" ^| findstr /i "^ranger-hdfs-plugin-.*\.jar"`) do (

    set "XASECURE_PLUGIN_PATH=%HADOOP_HOME%\share\hadoop\common\lib\%%~G"

)

if not defined XASECURE_PLUGIN_PATH (
	goto exit
)

if exist %XASECURE_PLUGIN_PATH% (

	set XASECURE_PLUGIN_OPTS= -javaagent:%XASECURE_PLUGIN_PATH%=authagent
	rem Convert \\ to \ in path since its causing problem with findstr below
	Echo.%HADOOP_NAMENODE_OPTS:\\=\% | findstr /C:"%XASECURE_PLUGIN_OPTS:\\=\%">nul && (
		REM OPTIONS already set continue
	) || (
		set HADOOP_NAMENODE_OPTS= %XASECURE_PLUGIN_OPTS% %HADOOP_NAMENODE_OPTS%
		set HADOOP_SECONDARYNAMENODE_OPTS= %XASECURE_PLUGIN_OPTS% %HADOOP_SECONDARYNAMENODE_OPTS%
    )
) 

:exit
