#!/bin/bash
#find -L /usr/hdp -name "webapp"

mvn clean install -o -DskiptTest -f /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/pom.xml

cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/target/security-admin-web-1.0.0.3.0.0.0-SNAPSHOT /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp

docker cp /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp sandbox-hdp:/usr/hdp/current/ranger-admin/ews/

rm -rf webapp

echo done!




