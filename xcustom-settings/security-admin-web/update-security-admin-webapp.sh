#!/bin/bash
#find -L /usr/hdp -name "webapp"
cp -r /c/Users/y00495068/dev/code/yaird/ranger-release/security-admin/src/main/webapp /c/Users/y00495068/dev/code/yaird/ranger-release/xcustom-settings/security-admin-web/webapp
docker cp webapp sandbox-hdp:/usr/hdp/current/ranger-admin/ews/
rm -rf webapp

echo done!




