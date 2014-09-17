#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License. See accompanying LICENSE file.
#
import os
import sys
import errno
import logging
import zipfile
import ConfigParser
import StringIO
import subprocess
import fileinput
#import MySQLdb
import zipfile
import re
import shutil
import commands
from datetime import date

base_dir = ' '
PWD = os.path.dirname(os.path.realpath(__file__))
webapp_dir = ''
java_bin = ''
jar_bin = ''
conf = ''
options = ''
class_path = ''
log_dir = ''
home_dir = ''
data_dir = ''
app_dir = './'
LOGFILES = ''
VERSION = ''
INSTALL_DIR=''
WEBAPP_ROOT=''
war_file=''
db_core_file=''
db_audit_file=''
db_asset_file=''
db_create_user=''
ARGUS_HOME=''
conf_dict={}


# TODO
def populate_config_dict():
    global config_dict
    conf_dict['MYSQL_HOST'] = 'localhost'

def init_variables():
    global VERSION, INSTALL_DIR, EWS_ROOT, ARGUS_HOME, WEBAPP_ROOT, war_file, db_core_file
    global db_create_user, db_audit_file, db_asset_file
    global conf_dict

    populate_config_dict()

    # These are set from the Monarch
    ARGUS_HOME = os.getenv("ARGUS_HOME")
    ARGUS_CONF_DIR = os.getenv("ARGUS_CONF_DIR")
    ARGUS_LOG_DIR = os.getenv("ARGUS_LOG_DIR")

    db_core_file = os.path.join(ARGUS_HOME , "db", "xa_core_db.sql")
    db_create_user_file = os.path.join(ARGUS_HOME , "db", "create_dev_user.sql")
    db_core_file = os.path.join(ARGUS_HOME , "db", "xa_core_db.sql")
    db_audit_file = os.path.join(ARGUS_HOME , "db", "xa_audit_db.sql")
    db_asset_file = os.path.join(ARGUS_HOME , "db", "reset_asset.sql")

    INSTALL_DIR = os.path.join(os.getenv("ARGUS_HOME") , "app")

    # TODO FIX THIS
    war_file = os.path.join(ARGUS_HOME , "war", "security-admin-web-5.5.5.war")

    EWS_ROOT = os.path.join(INSTALL_DIR , "ews")
    WEBAPP_ROOT= os.path.join(INSTALL_DIR , "ews" , "webapp")

    log("INSTALL_DIR is : " + INSTALL_DIR, "debug")
    log("EWS_ROOT is : " + EWS_ROOT, "debug")
    log("WEBAPP_ROOT is : " + WEBAPP_ROOT, "debug")


#TODO fix the base_dir part
def setup_install_files():
    global INSTALL_DIR, WEBAPP_ROOT, EWS_ROOT

    EWS_LIB_DIR = os.path.join(EWS_ROOT,"lib")
    EWS_LOG_DIR = os.path.join(EWS_ROOT,"logs")

    log("Setting up installation files and directory", "debug")
    log("os.join.path(base_dir,INSTALL_DIR) : " + os.path.join(base_dir,INSTALL_DIR), "debug")


    if not os.path.isdir(INSTALL_DIR):
        log("creating Install dir : " + INSTALL_DIR, "debug")
        os.makedirs(os.path.join(base_dir,INSTALL_DIR))

    if not os.path.isdir(EWS_ROOT):
        log("creating EWS dir : " + EWS_ROOT, "debug")
        os.makedirs(os.path.join(base_dir,EWS_ROOT))

    if not os.path.isdir(WEBAPP_ROOT):
        log("creating WEBAPP dir : " + WEBAPP_ROOT, "debug")
        os.makedirs(os.path.join(base_dir,WEBAPP_ROOT))

    if not os.path.isdir(EWS_LIB_DIR):
        log("creating EWS_LIB_DIR dir : " + EWS_LIB_DIR, "debug")
        os.makedirs(os.path.join(base_dir,EWS_LIB_DIR))

    if not os.path.isdir(EWS_LOG_DIR):
        log("creating EWS_LOG_DIR dir : " + EWS_LOG_DIR, "debug")
        os.makedirs(os.path.join(base_dir,EWS_LOG_DIR))

    copy_files(os.path.join(ARGUS_HOME,"ews","lib"), EWS_LIB_DIR)

    #os.makedirs(os.path.join(base_dir,EWS_ROOT,"lib"))
    #copy_files(os.path.join(base_dir,INSTALL_DIR) , "lib", EWS_ROOT)

    log(" Setting up installation files and directory DONE", "info");
pass

def parse_config_file():
    global PWD
    global conf_dict
    ##Logic to be written 
    #ini_file = os.path.join(conf, 'install.properties')
    ini_file = os.path.join(PWD,"install.properties")
    config = StringIO.StringIO()
    config.write('[dummysection]\n')
    config.write(open(ini_file).read())
    config.seek(0, os.SEEK_SET)
    ##Now parse using configparser
    cObj = ConfigParser.ConfigParser()
    cObj.optionxform = str
    cObj.readfp(config)
    options = cObj.options('dummysection')
    for option in options:
        value = cObj.get('dummysection', option)
        #os.environ[option] = value
        conf_dict[option] = value
        #print "Properties : %s=%s ::: \n", (option,value)
    # with open("install.properties", 'r') as f:
    # 
    #     config_string = '[dummy_section]\n' + f.read()
    #     config = configparser.ConfigParser()
    #     config.read_string(config_string)
    #     print "Properties : %s",(config)

def log(msg,type):
    if type == 'info': 
        logging.info(" %s",msg)
    if type == 'debug': 
        logging.debug(" %s",msg)
    if type == 'warning':
        logging.warning(" %s",msg)
    if type == 'exception':
        logging.exception(" %s",msg)

def init_logfiles():
    logging.basicConfig(filename=LOGFILES, filemode='w', level=logging.DEBUG)

#TODO!! THIS IS NOT WORKING!! 
#Get Properties from File
#propName -> propertyName, fileName -> fileName
def getPropertyFromFile(propName,fileName,varName):
    retVal=''
    propName = propName +"="
    found = False
    if os.path.isfile(fileName): 
        datafile = file("%s",fileName) 
        for line in datafile:
            if propName in line:
                found = True
                retVal = line.replace(propName,'')
                break
        return retVal
pass

def check_mysql_connector(): 
    ### From properties file 
    debugMsg = "Checking MYSQL CONNECTOR FILE : " + MYSQL_CONNECTOR_JAR
    log(debugMsg, 'debug') 
    ### From properties file 
    if os.path.isfile(MYSQL_CONNECTOR_JAR):
        log(" MYSQL CONNECTOR FILE :" + MYSQL_CONNECTOR_JAR + "file found",'info')
    else:
      log(" MYSQL CONNECTOR FILE : " + MYSQL_CONNECTOR_JAR + "file does not exist",'info')
pass

def sanity_check_files():
    log("Checking war file and core_db file!!", 'debug') 
    ### From properties file 
    if os.path.isfile(war_file):
        log("war_file: " + war_file + " file found", 'info')
    else:
        os.sys.exit('war_file: ' + war_file + ' file does not exist')

    if os.path.isfile(db_core_file):
        log(db_core_file + " file found", 'info')
    else:
        os.sys.exit('db_core_file: ' + db_core_file + ' file does not exist')
        
# def create_rollback_point():
#     DATE=`date`
#     BAK_FILE=APP-VERSION.DATE.bak
#     log "Creating backup file : BAK_FILE"
#     cp "APP" "BAK_FILE"

def create_mysql_user():
    global conf_dict
    MYSQL_HOST = conf_dict['MYSQL_HOST']
    check_mysql_password
    check_mysql_user_password
    ### From properties file 
    log(" Creating MySQL user "+db_user+" (using root priviledges)", 'debug')
    count=0
    db = MySQLdb.connect(host=MYSQL_HOST, user="root", passwd=db_root_password)
    cursor = db.cursor ()
    cursor.execute("select count(*) from mysql.user where user = '"+ db_user+"' and host = '"+thost+"'")
    row = cursor.fetchone()
    if row[0]: 
        print "user found"
    else:
        cursor.execute("create user '" + db_user + "'@'"+ thost +"' identified by " + db_password)
        result = cursor.use_result()
        if result: 
            mysqlquery="GRANT ALL ON *.* TO '" + db_user + "@" + thost+"';\
            grant all privileges on *.* to '" + db_user + "'@'" + thost + "' with grant option;\
            FLUSH PRIVILEGES;"
            cursor.execute(mysqlquery)
            grantResult = cursor.use_result()
            if grantResult: 
                log("Creating MySQL user '" + db_user + "' (using root priviledges) DONE", "info")
            else:
                log("MySQL create user failed", "exception")

def check_mysql_password ():
    count=0
    log("Checking MYSQL root password","debug")
    # connect
    db = MySQLdb.connect(host=MYSQL_HOST, user="root", passwd=db_root_password)
    if db:
        log("Checking MYSQL root password DONE", "info")
    else:  
        log("COMMAND: mysql -u root --password=..... -h " + MYSQL_HOST + " : FAILED with error message:\n*******************************************\n" + {msg} + "\n*******************************************\n", "exception")
    

def check_mysql_user_password(): 
    db = MySQLdb.connect(host=MYSQL_HOST, user=db_user, passwd=db_password)
    if db:
        log("Checking MYSQL root password DONE", "info")
    else:  
        log("COMMAND: mysql -u " + db_user + " --password=..... -h " + MYSQL_HOST + " : FAILED with error message:\n*******************************************\n" + {msg} + "\n*******************************************\n", "exception")

def check_mysql_audit_user_password(): 
    try:
        db = MySQLdb.connect(host=MYSQL_HOST, user=audit_db_user, passwd=audit_db_password, db=audit_db)
    except MySQLdb.Error, e:
     exceptnMsg =  "Error %d: %s" % (e.args[0], e.args[1])
     log("COMMAND: mysql -u " + audit_db_user + " --password=..... -h " + MYSQL_HOST + " : FAILED with error message:\n*******************************************\n" + exceptnMsg + "\n*******************************************\n", "exception")
     sys.exit (1)
    if db:
        log("Checking Argus Audit Table owner password DONE", "info")

def upgrade_db():
    log("Starting upgradedb ... ", "debug")
    try:
        DBVERSION_CATALOG_CREATION="db/create_dbversion_catalog.sql"
        db = MySQLdb.connect(host=MYSQL_HOST, user=db_user, passwd=db_password, db=db_name)
        if db and os.path.isfile(DBVERSION_CATALOG_CREATION): 
            #execute each line from sql file 
            for line in open(DBVERSION_CATALOG_CREATION).read().split(';\n'):
                cursor.execute(line)
        #Logic to apply patches 
        #first get all patches 
        #then sort all patches by number 
        #and then apply each after validation 
        
    except MySQLdb.Error, e:
        exceptnMsg =  "Error %d: %s" % (e.args[0], e.args[1])
        log("Upgrade DB function failed:\n*******************************************\n" + exceptnMsg + "\n*******************************************\n", "exception")
        sys.exit (1)
    
def import_db ():
    log("Verifying Database: db_name","debug")
    try:
        DBVERSION_CATALOG_CREATION="db/create_dbversion_catalog.sql"
        db = MySQLdb.connect(host=MYSQL_HOST, user=db_user, passwd=db_password, db=db_name)
        cursor.execute("show databases like " + db_name)
        dbRow = cursor.fetchone();

        if dbRow[0] == db_name: 
            log("database db_name already exists. Ignoring import_db ...","info")
        else:   
            cursor.execute("create database  " + db_name)
            #execute each line from sql file to import DB
            if os.path.isfile(db_core_file):
                for line in open(db_core_file).read().split(';\n'):
                    cursor.execute(line)
            if os.path.isfile(db_asset_file):
                for line in open(db_asset_file).read().split(';\n'):
                    cursor.execute(line)
    except MySQLdb.Error, e:
        exceptnMsg =  "Error %d: %s" % (e.args[0], e.args[1])
        log("Import DB function failed:\n*******************************************\n" + exceptnMsg + "\n*******************************************\n", "exception")
        sys.exit (1)

def extract_war(): 
    global war_file

    if os.path.isfile(war_file): 
        log("Extract War file " + war_file + " to " + WEBAPP_ROOT,"info")
    else:
        log(war_file + " file not found!","exception")

    if os.path.isdir(WEBAPP_ROOT):
        with zipfile.ZipFile(war_file, "r") as z:
            z.extractall(WEBAPP_ROOT)
        log("Extract War file " + war_file + " to " + WEBAPP_ROOT + " DONE! ","info")



def copy_files(source_dir,dest_dir):
    for dir_path, dir_names, file_names in os.walk(source_dir):
        for file_name in file_names:
                target_dir = dir_path.replace(source_dir, dest_dir, 1)
                if not os.path.exists(target_dir):
                    os.mkdir(target_dir)
                src_file = os.path.join(dir_path, file_name)
                dest_file = os.path.join(target_dir, file_name)
                shutil.copyfile(src_file, dest_file)

#TODO this is not required now 
def copy_to_webapps ():
    log("Copying to " + WEBAPP_ROOT,"debug")

    #TODO
    """
    if os.path.isfile(WEBAPP_ROOT + "/WEB-INF/log4j.xml.prod"):
        os.rename(app_home + "/WEB-INF/log4j.xml.prod",app_home + "/WEB-INF/log4j.xml")
        copy_files(app_home,WEBAPP_ROOT)        
        log("Copying to " + WEBAPP_ROOT +" DONE","info");
    """

def copy_mysql_connector():
    log("Copying MYSQL Connector to "+app_home+"/WEB-INF/lib ","info")
    shutil.copyfile(MYSQL_CONNECTOR_JAR, app_home+"/WEB-INF/lib/"+MYSQL_CONNECTOR_JAR)
    if os.path.isfile(app_home+"/WEB-INF/lib/"+MYSQL_CONNECTOR_JAR):
        log("Copying MYSQL Connector to app_home/WEB-INF/lib DONE","info");
    else:
         log("Copying MYSQL Connector to "+app_home+"/WEB-INF/lib failed","exception")


#Update Properties to File
#1 -> propertyName 2 -> newPropertyValue 3 -> fileName
def updatePropertyToFile(propertyName, newPropertyValue, fileName):     
    replaceStr = propertyName +"="+ newPropertyValue
    log("replaceStr: " + replaceStr, "debug")
    successMsg = "property : " + propertyName + " not found!"
    for line in fileinput.input(fileName, inplace = 1): # Does a list of files, and writes redirects STDOUT to the file in question
      if line.replace(propertyName, replaceStr):
        successMsg = "File " + fileName + " Updated successfully : "+ propertyName
    log(successMsg, "info")
pass

def update_properties():
    # TODO take this from cluster.properties
    global conf_dict, WEBAPP_ROOT
    MYSQL_HOST = conf_dict['MYSQL_HOST']

    newPropertyValue=''
    to_file = os.path.join(WEBAPP_ROOT, "WEB-INF", "classes", "xa_system.properties")

    log("Updating properties in : " + to_file,"debug")

    if os.path.isfile(to_file):
        log(to_file + " file found", "info")
    else:
        log(to_file + " does not exists", "warning")

    ##########
    propertyName="jdbc.url"
    newPropertyValue="jdbc:log4jdbc:mysql://" + MYSQL_HOST+":3306/"+conf_dict["db_name"]
    updatePropertyToFile(propertyName, newPropertyValue, to_file)
    return
    ##########
    propertyName="xa.webapp.url.root"
    newPropertyValue = conf_dict["policymgr_external_url"]
    updatePropertyToFile(propertyName, newPropertyValue, to_file)
    ##########
    propertyName="http.enabled"
    newPropertyValue = conf_dict["policymgr_http_enabled"]
    updatePropertyToFile(propertyName, newPropertyValue, to_file)
    ##########
    propertyName="auditDB.jdbc.url"
    newPropertyValue="jdbc:log4jdbc:mysql://"+MYSQL_HOST+":3306/"+conf_dict["audit_db_name"]
    updatePropertyToFile(propertyName, newPropertyValue, to_file)   
    ##########
    propertyName="jdbc.user"
    newPropertyValue=conf_dict["db_user"]
    updatePropertyToFile(propertyName, newPropertyValue, to_file)
    ##########
    propertyName="auditDB.jdbc.user"
    newPropertyValue=conf_dict["audit_db_user"]
    updatePropertyToFile(propertyName, newPropertyValue, to_file)
    ##########
    keystore=cred_keystore_filename
    log("Starting configuration for Argus DB credentials:","info")
    db_password_alias="policyDB.jdbc.password"
    if keystore != "":
        os.makedirs(keystore)
        commands.getstatusoutput("java -cp cred/lib/* com.hortonworks.credentialapi.buildks create " + db_password_alias + "-value " + db_password + " -provider jceks://file" + keystore)
        propertyName="xaDB.jdbc.credential.alias"
        newPropertyValue=db_password_alias
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
    
        propertyName="xaDB.jdbc.credential.provider.path"
        newPropertyValue=keystore
        updatePropertyToFile(propertyName, newPropertyValue, to_file)

        propertyName="jdbc.password"
        newPropertyValue="_"    
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
    else:    
        propertyName="jdbc.password"
        newPropertyValue=db_password
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
    if os.path.isfile(keystore):
        log("keystore found.", "info")
        # Not running chown as it is not used 
        # commands.getstatusoutput("chown -R " + unix_user + ":" + unix_group+" "+ keystore)
    else:
        #echo "keystore not found. so clear text password"
        propertyName="jdbc.password"
        newPropertyValue=db_password
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
    ###########
    audit_db_password_alias="auditDB.jdbc.password"
    log("Starting configuration for Audit DB credentials:", "info")
    if keystore != "":
        commands.getstatusoutput("java -cp 'cred/lib/*' com.hortonworks.credentialapi.buildks create "+audit_db_password_alias + " -value " + audit_db_password + " -provider jceks://file"+ keystore)
        ###########
        propertyName="auditDB.jdbc.credential.alias"
        newPropertyValue=audit_db_password_alias
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
        ###########        
        propertyName="auditDB.jdbc.credential.provider.path"
        newPropertyValue=keystore
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
        ###########
        propertyName="auditDB.jdbc.password"
        newPropertyValue="_"    
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
    else: 
        propertyName="auditDB.jdbc.password"
        newPropertyValue=audit_db_password
        updatePropertyToFile(propertyName, newPropertyValue, to_file)
    if os.path.isfile(keystore):
        # Not running chown as it is not used 
        # commands.getstatusoutput("chown -R " + unix_user + ":" + unix_group+" "+ keystore)
        log("Skipped chown statement as it is not needed","info")
    else:
        #echo "keystore not found. so use clear text password"
        propertyName="auditDB.jdbc.password"
        newPropertyValue=audit_db_password
        updatePropertyToFile(propertyName, newPropertyValue, to_file)

def create_audit_mysql_user(): 
    check_mysql_audit_user_password
    ##Audit DB Credentials 
    AUDIT_DB=audit_db_name
    AUDIT_USER=audit_db_user
    AUDIT_PASSWORD=audit_db_password
    log("Verifying Database: "+AUDIT_DB, "info")
    db = MySQLdb.connect(host=MYSQL_HOST, user=AUDIT_USER, passwd=AUDIT_PASSWORD, db=AUDIT_DB)
    cursor.execute("show databases like " + AUDIT_DB)
    dbRow = cursor.fetchone();
    if dbRow[0] == AUDIT_DB: 
        log("database " + AUDIT_DB + " already exists.","info")
    else:   
        log("Creating Database " + AUDIT_DB, "info")
        cursor.execute("create database  " + AUDIT_DB)
        result = cursor.use_result()
        if result: 
            log("Creating database "+AUDIT_DB+" Succeeded..", "info")
        else:
            log("Creating database "+AUDIT_DB+" Failed..", "warning")
    ##Check for user 
    cursor.execute("select count(*) from mysql.user where user = '"+ AUDIT_USER+"' and host = '"+MYSQL_HOST+"'")
    row = cursor.fetchone()
    if row[0]: 
        log("Mysql User found","info")
    else:
        cursor.execute("create user '" + AUDIT_USER + "'@'"+ MYSQL_HOST +"' identified by " + AUDIT_PASSWORD)
        result = cursor.use_result()
        if result: 
            mysqlquery="GRANT ALL ON " + AUDIT_DB + ".* TO '" + AUDIT_USER + "@" + MYSQL_HOST+"';\
            grant all privileges ON " + AUDIT_DB + ".* to '" + AUDIT_USER + "'@'" + MYSQL_HOST + "' with grant option;\
            FLUSH PRIVILEGES;"
            cursor.execute(mysqlquery)
            grantResult = cursor.use_result()
            if grantResult: 
                log("Creating MySQL user '" + AUDIT_USER + "' (using root priviledges) DONE", "info")
            else:
                log("MySQL create user failed", "exception")
            AUDIT_TABLE="xa_access_audit"
            log("Verifying table AUDIT_TABLE in audit database AUDIT_DB", "debug")
            try:
                cursor.execute("show tables like " + AUDIT_TABLE)
                if cursor.rowcount != 1:
                    log("Importing Audit Database file: " + db_audit_file,"debug")
                    if os.path.isfile(db_audit_file):
                        for line in open(db_audit_file).read().split(';\n'):
                            cursor.execute(line)
                else:
                    log("table "+AUDIT_TABLE+" already exists in audit database "+AUDIT_DB,"info")
            except MySQLdb.Error, e:
                exceptnMsg =  "Error %d: %s" % (e.args[0], e.args[1])
                log("Importing Audit Database file failed:\n*******************************************\n" + exceptnMsg + "\n*******************************************\n", "exception")
                sys.exit (1)

def setup_authentication(authentication_method, xmlPath):
    if authentication_method == "UNIX":
        log("Setting up UNIX authentication for : " + xmlPath,"debug")
        appContextPath = xmlPath + "/META-INF/security-applicationContext.xml"
        beanSettingPath = xmlPath + "/META-INF/contextXML/unix_bean_settings.xml"
        secSettingPath = xmlPath + "/META-INF/contextXML/unix_security_settings.xml"
        ## Logic is to find UNIX_BEAN_SETTINGS_START,UNIX_SEC_SETTINGS_START  from appContext xml file and append 
        ## the xml properties from unix bean settings file
        if os.path.isfile(appContextPath) and os.path.isfile(unixSettingPath):
            beanStrToBeAppended =  open(beanSettingPath).read()
            secStrToBeAppended =  open(secSettingPath).read()
            fileObj = open(appContextPath)
            for line in fileObj.read().split(';\n'):
                beanLineToAppend = line.match("UNIX_BEAN_SETTINGS_START")
                beanLineToAppend.apend(beanStrToBeAppended)
                secLineToAppend = line.match("UNIX_SEC_SETTINGS_START")
                secLineToAppend.append(secStrToBeAppended)

            fileObj.close()    
            sys.exit(0);
    elif authentication_method == "LDAP":
        log("Setting up authentication for : " + xmlPath,"debug")

        log("Setting up "+authentication_method+" authentication for : " + xmlPath,"debug")
        appContextPath = xmlPath + "/META-INF/security-applicationContext.xml"
        beanSettingPath = xmlPath + "/META-INF/contextXML/ldap_bean_settings.xml"
        secSettingPath = xmlPath + "/META-INF/contextXML/ldap_security_settings.xml"
        ## Logic is to find LDAP_BEAN_SETTINGS_START,LDAP_SEC_SETTINGS_START  from appContext xml file and append 
        ## the xml properties from unix bean settings file
        if os.path.isfile(appContextPath) and os.path.isfile(unixSettingPath):
            beanStrToBeAppended =  open(beanSettingPath).read()
            secStrToBeAppended =  open(secSettingPath).read()
            fileObj = open(appContextPath)
            for line in fileObj.read().split(';\n'):
                beanLineToAppend = line.match("LDAP_BEAN_SETTINGS_START")
                beanLineToAppend.apend(beanStrToBeAppended)
                secLineToAppend = line.match("LDAP_SEC_SETTINGS_START")
                secLineToAppend.append(secStrToBeAppended)

            fileObj.close()    
            sys.exit(0);
    elif authentication_method == "ACTIVE_DIRECTORY":
        log("Setting up "+authentication_method+" authentication for : " + xmlPath,"debug")
        appContextPath = xmlPath + "/META-INF/security-applicationContext.xml"
        beanSettingPath = xmlPath + "/META-INF/contextXML/ad_bean_settings.xml"
        secSettingPath = xmlPath + "/META-INF/contextXML/ad_security_settings.xml"
        ## Logic is to find AD_BEAN_SETTINGS_START,AD_SEC_SETTINGS_START  from appContext xml file and append 
        ## the xml properties from unix bean settings file
        if os.path.isfile(appContextPath) and os.path.isfile(unixSettingPath):
            beanStrToBeAppended =  open(beanSettingPath).read()
            secStrToBeAppended =  open(secSettingPath).read()
            fileObj = open(appContextPath)
            for line in fileObj.read().split(';\n'):
                beanLineToAppend = line.match("AD_BEAN_SETTINGS_START")
                beanLineToAppend.apend(beanStrToBeAppended)
                secLineToAppend = line.match("AD_SEC_SETTINGS_START")
                secLineToAppend.append(secStrToBeAppended)

            fileObj.close()    
            sys.exit(0);
        elif authentication_method == "NONE":
            log("Authentication Method: "+authentication_method+" authentication for : " + xmlPath,"debug")
            sys.exit(0);
pass

def do_authentication_setup(): 
    log("Starting setup based on user authentication method=authentication_method","debug")
    ##Written new function to perform authentication setup for all  cases
    setup_authentication(authentication_method, app_home)
    if authentication_method == "LDAP":
        log("Loading LDAP attributes and properties", "debug");
        newPropertyValue='' 
        ldap_file=app_home+"/WEB-INF/classes/xa_ldap.properties"
        if os.path.isfile(ldap_file):
            log("LDAP file : "+ ldap_file + " file found", "info")
            propertyName="xa_ldap_url"
            newPropertyValue=xa_ldap_url
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########            
            propertyName="xa_ldap_userDNpattern"
            newPropertyValue=xa_ldap_userDNpattern
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########            
            propertyName="xa_ldap_groupSearchBase"
            newPropertyValue=xa_ldap_groupSearchBase
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########            
            propertyName="xa_ldap_groupSearchFilter"
            newPropertyValue=xa_ldap_groupSearchFilter
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########            
            propertyName="xa_ldap_groupRoleAttribute"
            newPropertyValue=xa_ldap_groupRoleAttribute
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########            
            propertyName="authentication_method"
            newPropertyValue=authentication_method
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
        else:
            log( "LDAP file: "+ ldap_file +" does not exists","exception")
    if authentication_method == "ACTIVE_DIRECTORY":
        log("[I] Loading ACTIVE DIRECTORY attributes and properties", "debug")
        newPropertyValue=''
        ldap_file=app_home+"/WEB-INF/classes/xa_ldap.properties"
        if os.path.isfile(ldap_file):
            log("LDAP file : "+ ldap_file + " file found", "info")
            propertyName="xa_ldap_ad_url"
            newPropertyValue=xa_ldap_ad_url
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########        
            propertyName="xa_ldap_ad_domain"
            newPropertyValue=xa_ldap_ad_domain
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
            ###########            
            propertyName="authentication_method"
            newPropertyValue=authentication_method
            updatePropertyToFile(propertyName, newPropertyValue, ldap_file)
        else:
            log(ldap_file + " does not exists", "exception")
    #if authentication_method == "UNIX":
        ## I think it is not needed for Windows 
        ##do_unixauth_setup
    log("Finished setup based on user authentication method=authentication_method", "info") 
pass


## Argus Functions Ends here --------------------

def get_class_path(paths):
    separator = ';' if sys.platform == 'win32' else ':';
    return separator.join(paths)

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise


def resolve_sym_link(path):
    path = os.path.realpath(path)
    base_dir = os.path.dirname(os.path.dirname(path))
    return path, base_dir


def get_java_env():
    global java_bin, jar_bin
    JAVA_HOME = os.getenv('JAVA_HOME')
    if JAVA_HOME:
        return os.path.join(JAVA_HOME, 'bin', 'java')
    else:
        os.sys.exit('java and jar commands are not available. Please configure JAVA_HOME')


def set_opts(opt, *env_vars):
    for env_var in env_vars:
        opt += ' ' + os.getenv(env_var, '')
    return opt.strip()


def get_argus_classpath():
    global EWS_ROOT
    cp = [ os.path.join(EWS_ROOT,"lib","*"), os.path.join(os.getenv('JAVA_HOME'), 'lib', '*')]
    class_path = get_class_path(cp)
    return class_path

def init_server(webapp_dir):
    global options, class_path, log_dir, home_dir, conf, base_dir

    app_dir = os.path.join(webapp_dir)
    create_app_dir(webapp_dir, app_dir, app_type + '.war')
    cp = [conf, os.path.join(app_dir, 'WEB-INF', 'classes'),
          os.path.join(app_dir, 'WEB-INF', 'lib', '*'),
          os.path.join(base_dir, 'libext', '*')]
    class_path = get_class_path(cp)
    log_dir = os.getenv('ARGUS_LOG_DIR', os.path.join(base_dir, 'logs'))
    home_dir = os.getenv('ARGUS_HOME_DIR', base_dir)


def create_app_dir(webapp_dir, app_base_dir, app_war):
    app_webinf_dir = os.path.join(app_base_dir, 'WEB-INF')
    if not os.path.exists(app_webinf_dir):
        mkdir_p(app_base_dir)
        war_file = os.path.join(webapp_dir, app_war)
        zf = zipfile.ZipFile(war_file, 'r')
        zf.extractall(app_base_dir)


def run_setup(cmd, app_type):
    print "Setup of Argus PolicyManager Web Application is STARTED."
    parse_config_file()
    init_logfiles()
    log(" --------- Running Argus PolicyManager Web Application Install Script --------- ","info")
    log("uname=`uname`", "info")
    log("hostname=`hostname`", "info")
    init_variables()
    #check_mysql_connector()
    #setup_install_files()
    #sanity_check_files()
    # create_mysql_user()
    #extract_war()
    # copy_mysql_connector()
    # import_db()
    # upgrade_db()
    # create_audit_mysql_user()
    #update_properties()
    # do_authentication_setup()
    # copy_to_webapps()
    print "Setup of Argus PolicyManager Web Application is COMPLETED."
