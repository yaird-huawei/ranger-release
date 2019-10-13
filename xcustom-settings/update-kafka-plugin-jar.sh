#!/bin/bash
cp /c/Users/y00495068/dev/code/yaird/ranger-release/plugin-kafka/target/ranger-kafka-plugin-1.0.0.3.0.0.0-1574.jar /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar

docker cp ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/3.0.1.0-187/kafka/libs/ranger-kafka-plugin-impl/ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/3.0.1.0-187/ranger-admin/ews/webapp/WEB-INF/classes/ranger-plugins/kafka/ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/3.0.1.0-187/ranger-kafka-plugin/lib/ranger-kafka-plugin-impl/ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/kafka-broker/libs/ranger-kafka-plugin-impl/ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar
docker cp ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/WEB-INF/classes/ranger-plugins/kafka/ranger-kafka-plugin-1.1.0.3.0.1.0-187.jar

echo done!
