#!/bin/bash
cp /c/Users/y00495068/dev/code/yaird/ranger-release/hive-agent/target/ranger-hive-plugin-1.0.0.3.0.0.0-1574.jar /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar

docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/3.0.1.0-187/ranger-admin/ews/webapp/WEB-INF/classes/ranger-plugins/hive/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/3.0.1.0-187/ranger-hive-plugin/lib/ranger-hive-plugin-impl/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/3.0.1.0-187/hive/lib/ranger-hive-plugin-impl/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/hive-client/lib/ranger-hive-plugin-impl/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/hive-metastore/lib/ranger-hive-plugin-impl/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/hive-server2/lib/ranger-hive-plugin-impl/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/WEB-INF/classes/ranger-plugins/hive/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-hive-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/hive-server2-hive/lib/ranger-hive-plugin-impl/ranger-hive-plugin-1.1.0.3.0.1.0-187.jar

echo done!


