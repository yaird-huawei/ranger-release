#!/bin/bash
#find -L /usr/hdp -name "webapp"
#tar -zcvf webapp.tar.gz webapp
#tar -zxvf webapp.tar.gz

mkdir webapp

cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp/templates /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp/templates/
cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp/styles /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp/styles/
cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp/scripts /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp/scripts/
cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp/login.jsp /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp/login.jsp
cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp/index.html /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp/index.html
cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp/libs/other/json-editor /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp/json-editor/


docker cp webapp/templates sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/
docker cp webapp/styles sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/
docker cp webapp/scripts sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/
docker cp webapp/login.jsp sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/
docker cp webapp/index.html sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/
docker cp webapp/json-editor sandbox-hdp:/usr/hdp/current/ranger-admin/ews/webapp/libs/other/


rm -rf webapp

echo done!
