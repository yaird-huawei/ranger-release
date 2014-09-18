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
import MySQLdb
import zipfile
import re
import shutil
import commands
from datetime import date
import getpass
import subprocess
import glob

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
XAPOLICYMGR_DIR=''
MYSQL_HOST = "127.0.0.1"
MYSQL_CONNECTOR_JAR=''
war_file=''
db_core_file=''
db_audit_file=''
db_asset_file=''
db_create_user=''
ARGUS_HOME=''
conf_dict={}


def ModConfig(File, Variable, Setting):
    """
    Modify Config file variable with new setting
    """
    VarFound = False
    AlreadySet = False
    V=str(Variable)
    S=str(Setting)
    # use quotes if setting has spaces #
    if ' ' in S:
        S = '"%s"' % S
 
    for line in fileinput.input(File, inplace = 1):
        # process lines that look like config settings #
        if not line.lstrip(' ').startswith('#') and '=' in line:
            _infile_var = str(line.split('=')[0].rstrip(' '))
            _infile_set = str(line.split('=')[1].lstrip(' ').rstrip())
            # only change the first matching occurrence #
            if VarFound == False and _infile_var.rstrip(' ') == V:
                VarFound = True
                # don't change it if it is already set #
                if _infile_set.lstrip(' ') == S:
                    AlreadySet = True
                else:
                    line = "%s = %s\n" % (V, S)
 
        sys.stdout.write(line)
 
 
    # Append the variable if it wasn't found #
    if not VarFound:
        print "Variable '%s' not found.  Adding it to %s" % (V, File)
        with open(File, "a") as f:
            f.write("%s = %s\n" % (V, S))
    elif AlreadySet == True:
        print "Variable '%s' unchanged" % (V)
    else:
        print "Variable '%s' modified to '%s'" % (V, S)
 
    return

# TODO
def populate_config_dict():
    global config_dict
    conf_dict['MYSQL_HOST'] = 'localhost'
    conf_dict['ARGUS_ADMIN_DB_USERNAME'] = os.getenv("ARGUS_ADMIN_DB_USERNAME")
    conf_dict['ARGUS_ADMIN_DB_PASSWORD'] = os.getenv("ARGUS_ADMIN_DB_PASSWORD")
    conf_dict['ARGUS_ADMIN_DB_NAME'] = os.getenv("ARGUS_ADMIN_DB_NAME")
    conf_dict['ARGUS_AUDIT_DB_USERNAME'] = os.getenv("ARGUS_AUDIT_DB_USERNAME")
    conf_dict['ARGUS_AUDIT_DB_PASSWORD'] = os.getenv("ARGUS_AUDIT_DB_PASSWORD")
    conf_dict['ARGUS_AUDIT_DB_NAME'] = os.getenv("ARGUS_AUDIT_DB_NAME")
    conf_dict['ARGUS_ADMIN_DB_ROOT_PASSWORD'] = os.getenv("ARGUS_ADMIN_DB_ROOT_PASSWORD")

def init_variables():
    global VERSION, INSTALL_DIR, EWS_ROOT, ARGUS_HOME, WEBAPP_ROOT, war_file, db_core_file
    global db_create_user, db_audit_file, db_asset_file
    global conf_dict


    # These are set from the Monarch
    HDP_RESOURCES_DIR = os.getenv("HDP_RESOURCES_DIR")
    ARGUS_HOME = os.getenv("ARGUS_HOME")
    ARGUS_CONF_DIR = os.getenv("ARGUS_CONF_DIR")
    ARGUS_LOG_DIR = os.getenv("ARGUS_LOG_DIR")
    ARGUS_DB_DIR = os.path.join(ARGUS_HOME , "db")


    INSTALL_DIR = os.path.join(os.getenv("ARGUS_HOME") , "app")

    # TODO FIX THIS
    war_file_path = os.path.join(ARGUS_HOME , "war", "security-admin-web-*.war")
    war_file_list = glob.glob(war_file_path)
    war_file = war_file_list[0]

    EWS_ROOT = os.path.join(INSTALL_DIR , "ews")
    WEBAPP_ROOT= os.path.join(INSTALL_DIR , "ews" , "webapp")

    populate_config_dict()

    conf_dict['db_core_file'] = os.path.join(ARGUS_DB_DIR, "xa_core_db.sql")
    conf_dict['db_create_user_file'] = os.path.join(ARGUS_DB_DIR, "create_dev_user.sql")
    conf_dict['db_core_file'] = os.path.join(ARGUS_DB_DIR, "xa_core_db.sql")
    conf_dict['db_audit_file'] = os.path.join(ARGUS_DB_DIR, "xa_audit_db.sql")
    conf_dict['db_asset_file'] = os.path.join(ARGUS_DB_DIR, "reset_asset.sql")

    conf_dict['EWS_ROOT'] = EWS_ROOT
    conf_dict['ARGUS_DB_DIR'] = ARGUS_DB_DIR

    log("ARGUS_HOME is : " + ARGUS_HOME, "debug")
    log("INSTALL_DIR is : " + INSTALL_DIR, "debug")
    log("EWS_ROOT is : " + EWS_ROOT, "debug")
    log("WEBAPP_ROOT is : " + WEBAPP_ROOT, "debug")


#TODO fix the base_dir part
def setup_install_files():
    global INSTALL_DIR, WEBAPP_ROOT, EWS_ROOT, EWS_LOG_DIR

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

    log("copying xapolicymgr.properties file  ARGUS_HOME dir : " + ARGUS_HOME, "debug")
    shutil.copyfile(os.path.join(ARGUS_HOME,"ews","xapolicymgr.properties"), os.path.join(EWS_ROOT,"xapolicymgr.properties"))

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
    FORMAT = '%(asctime)-15s %(message)s'
    logging.basicConfig(format=FORMAT, level=logging.DEBUG)

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
    global MYSQL_CONNECTOR_JAR
    ### From properties file 
    MYSQL_CONNECTOR_JAR = os.getenv("MYSQL_CONNECTOR_JAR")
    debugMsg = "Checking MYSQL CONNECTOR FILE : " + MYSQL_CONNECTOR_JAR
    log(debugMsg, 'debug') 
    print "Checking MYSQL CONNECTOR FILE : " + MYSQL_CONNECTOR_JAR
    ### From properties file 
    if os.path.isfile(MYSQL_CONNECTOR_JAR):
        log(" MYSQL CONNECTOR FILE :" + MYSQL_CONNECTOR_JAR + "file found",'info')
    else:
      log(" MYSQL CONNECTOR FILE : "+MYSQL_CONNECTOR_JAR+" file does not exist",'info')
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
    global MYSQL_HOST, conf_dict

    #MYSQL_HOST = conf_dict["MYSQL_HOST"]
    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_root_password = conf_dict["ARGUS_ADMIN_DB_ROOT_PASSWORD"]

    check_mysql_password()
    #check_mysql_user_password()
    ### From properties file 
    log(" Creating MySQL user "+db_user+" (using root priviledges)", 'debug')
    count=0
    db = MySQLdb.connect(host=MYSQL_HOST, user="root", passwd=db_root_password)
    cursor = db.cursor ()
    cursor.execute("select count(*) from mysql.user where user='"+ db_user+"' and host='"+MYSQL_HOST+"'")
    row = cursor.fetchone()
    if row[0]: 
        log ("MYSQL user: " + db_user + " found", "debug")
    else:
        if db_password == "":
            log ("Creating MYSQL user: " + db_user + " with no password", "debug")
            cursor.execute("create user '" + db_user + "'@'"+ MYSQL_HOST +"'")
        else:
            cursor.execute("create user '" + db_user + "'@'"+ MYSQL_HOST +"' identified by '" + db_password + "'")
        if cursor: 
            mysqlquery="GRANT ALL ON *.* TO '" + db_user + "'@'" + MYSQL_HOST+"';\
            grant all privileges on *.* to '" + db_user + "'@'" + MYSQL_HOST + "' with grant option;\
            FLUSH PRIVILEGES;"
            cursor.execute(mysqlquery)
            if cursor: 
                log("Creating MySQL user '" + db_user + "' (using root priviledges) DONE", "info")
            else:
                log("MySQL create user failed", "exception")


def create_audit_mysql_user(): 
    global MYSQL_HOST, conf_dict

    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_root_password = conf_dict["ARGUS_ADMIN_DB_ROOT_PASSWORD"]
    audit_db = conf_dict["ARGUS_AUDIT_DB_NAME"]
    audit_db_user = conf_dict["ARGUS_AUDIT_DB_USERNAME"]
    audit_db_password = conf_dict["ARGUS_AUDIT_DB_PASSWORD"]
    db_name = conf_dict['ARGUS_ADMIN_DB_NAME']
    audit_db_name = conf_dict['ARGUS_AUDIT_DB_NAME']

    db_core_file = conf_dict['db_core_file'] 
    db_create_user_file = conf_dict['db_create_user_file']
    db_core_file =  conf_dict['db_core_file'] 
    db_audit_file =  conf_dict['db_audit_file']
    db_asset_file = conf_dict['db_asset_file']
 
    check_mysql_audit_user_password()
    
    log("Verifying Database: "+audit_db_name, "info")

    db = MySQLdb.connect(host=MYSQL_HOST, user="root", passwd=db_root_password)
    cursor = db.cursor()
    cursor.execute("show databases like '" + audit_db_name+"'")
    dbRow = cursor.fetchone();
    if (dbRow) and dbRow[0] == audit_db_name: 
        log("database " + audit_db_name + " already exists.","info")
    else:   
        log("Creating Database " + audit_db_name, "info")
        cursor.execute("create database  '" + audit_db_name + "'")
        if cursor: 
            log("Creating database "+audit_db_name+" Succeeded..", "info")
        else:
            log("Creating database "+audit_db_name+" Failed..", "warning")
    ##Check for user 
    cursor.execute("select count(*) from mysql.user where user = '"+ audit_db_user+"' and host = '"+MYSQL_HOST+"'")
    row = cursor.fetchone()
    if row[0]: 
        log("Mysql User found","info")
    else:
        cursor.execute("create user '" + audit_db_user + "'@'"+ MYSQL_HOST +"'")
        if cursor: 
            mysqlquery="GRANT ALL ON " + audit_db_name + ".* TO '" + audit_db_user + "'@'" + MYSQL_HOST+"';\
            grant all privileges ON " + audit_db_name + ".* to '" + audit_db_user + "'@'" + MYSQL_HOST + "' with grant option;\
            FLUSH PRIVILEGES;"
            cursor.execute(mysqlquery)
            if cursor: 
                log("Creating MySQL user '" + audit_db_user + "' (using root priviledges) DONE", "info")
            else:
                log("MySQL create user failed", "exception")
            # try:
            AUDIT_TABLE="xa_access_audit"
            log("Verifying table "+AUDIT_TABLE+" in audit database "+audit_db_name, "debug")
            print cursor
            cursor.close()
            cursor = db.cursor()
            cursor.execute("USE " + audit_db_name)
            cursor.execute("show tables like '" + AUDIT_TABLE+"'")
            row = cursor.fetchall()
            if len(row) != 1:
                log("Importing Audit Database file: " + db_audit_file,"debug")
                if os.path.isfile(db_audit_file):
                    proc = subprocess.Popen(["mysql", "--user=%s" % audit_db_user, "--password=%s" % audit_db_paassword, audit_db_name],
                        stdin=subprocess.PIPE,
                        stdout=subprocess.PIPE)
                    out, err = proc.communicate(file(db_audit_file).read())
                    print out
            else:
                log("table "+AUDIT_TABLE+" already exists in audit database "+audit_db_name,"info")


def check_mysql_password ():
    global conf_dict, MYSQL_HOST
    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_root_password = conf_dict["ARGUS_ADMIN_DB_ROOT_PASSWORD"]

    log("Checking MYSQL root password : " + db_root_password,"debug")
    # connect
    db = MySQLdb.connect(host=MYSQL_HOST, user="root", passwd=db_root_password)
    if db:
        log("Checking MYSQL root password DONE", "info")
    else:  
        log("COMMAND: mysql -u root --password=..... -h " + MYSQL_HOST + " : FAILED with error message:\n*******************************************\n" + {msg} + "\n*******************************************\n", "exception")
        os.exit(1)
    

def check_mysql_user_password(): 
    global conf_dict, MYSQL_HOST
    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_root_password = conf_dict["ARGUS_ADMIN_DB_ROOT_PASSWORD"]

    db = MySQLdb.connect(host=MYSQL_HOST, user=db_user, passwd=db_password)
    if db:
        log("Checking MYSQL "+ db_user +" password DONE", "info")
    else:  
        log("COMMAND: mysql -u " + db_user + " --password=..... -h " + MYSQL_HOST + " : FAILED with error message:\n*******************************************\n" + {msg} + "\n*******************************************\n", "exception")

def check_mysql_audit_user_password(): 
    global conf_dict, MYSQL_HOST
    audit_db = conf_dict["ARGUS_AUDIT_DB_NAME"]
    audit_db_user = conf_dict["ARGUS_AUDIT_DB_USERNAME"]
    audit_db_password = conf_dict["ARGUS_AUDIT_DB_PASSWORD"]

    try:
        db = MySQLdb.connect(host=MYSQL_HOST, user=audit_db_user, passwd=audit_db_password, db=audit_db)
    except MySQLdb.Error, e:
     exceptnMsg =  "Error %d: %s" % (e.args[0], e.args[1])
     log("COMMAND: mysql -u " + audit_db_user + " --password=..... -h " + MYSQL_HOST + " : FAILED with error message:\n*******************************************\n" + exceptnMsg + "\n*******************************************\n", "exception")
     sys.exit (1)
    if db:
        log("Checking Argus Audit Table owner password DONE", "info")

def upgrade_db():
    global config_dict, MYSQL_HOST

    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_root_password = conf_dict["ARGUS_ADMIN_DB_ROOT_PASSWORD"]
    db_name = conf_dict["ARGUS_ADMIN_DB_NAME"]

    log("Starting upgradedb ... ", "debug")
    try:
        DBVERSION_CATALOG_CREATION = os.path.join(conf_dict['ARGUS_DB_DIR'], 'create_dbversion_catalog.sql') 
        PATCHES_PATH = os.path.join(conf_dict['ARGUS_DB_DIR'], 'patches') 
        db = MySQLdb.connect(host=MYSQL_HOST, user=db_user, passwd=db_password, db=db_name)
        if db and os.path.isfile(DBVERSION_CATALOG_CREATION): 
            cursor = db.cursor()
            #import sql file 
            proc = subprocess.Popen(["mysql", "--user=%s" % db_user, "--password=%s" % db_password, db_name],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE)
            out, err = proc.communicate(file(DBVERSION_CATALOG_CREATION).read())
            print out
            log("Baseline DB upgraded successfully", "info")
            #Logic to apply patches
            #first get all patches and then apply each patch 
            files = os.listdir(PATCHES_PATH)
            # files: coming from os.listdir() sorted alphabetically, thus not numerically
            sorted_files = sorted(files, key=lambda x: str(x.split('.')[0]))
            for filename in sorted_files: 
                currentPatch = PATCHES_PATH + "/"+filename
                if os.path.isfile(currentPatch):
                    proc = subprocess.Popen(["mysql", "--user=%s" % db_user, "--password=%s" % db_password, db_name],
                                stdin=subprocess.PIPE,
                                stdout=subprocess.PIPE)
                    out, err = proc.communicate(file(currentPatch).read())
                    print out + "Patch applied: "+  currentPatch

        log("upgradedb DONE... ", "debug")
    except MySQLdb.Error, e:
        exceptnMsg =  "Error %d: %s" % (e.args[0], e.args[1])
        log("Upgrade DB function failed:\n*******************************************\n" + exceptnMsg + "\n*******************************************\n", "exception")
        sys.exit (1)
    
def import_db ():

    global conf_dict, MYSQL_HOST

    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_root_password = conf_dict["ARGUS_ADMIN_DB_ROOT_PASSWORD"]
    audit_db = conf_dict["ARGUS_AUDIT_DB_NAME"]
    audit_db_user = conf_dict["ARGUS_AUDIT_DB_USERNAME"]
    audit_db_password = conf_dict["ARGUS_AUDIT_DB_PASSWORD"]
    db_name = conf_dict['ARGUS_ADMIN_DB_NAME']

    db_core_file = conf_dict['db_core_file'] 
    db_create_user_file = conf_dict['db_create_user_file']
    db_core_file =  conf_dict['db_core_file'] 
    db_audit_file =  conf_dict['db_audit_file']
    db_asset_file = conf_dict['db_asset_file']
    log ("[I] Importing to Database: " + db_name,"debug");

    try:
        global MYSQL_HOST

        log("Verifying Database: db_name","debug")
        DBVERSION_CATALOG_CREATION = os.path.join(conf_dict['ARGUS_DB_DIR'], 'create_dbversion_catalog.sql') 
        db = MySQLdb.connect(host=MYSQL_HOST, user=db_user, passwd=db_password)
        cursor = db.cursor()
        cursor.execute("show databases like '" + db_name +"'")
        dbRow = cursor.fetchone();
        if (dbRow) and dbRow[0] == db_name: 
            log("database "+db_name + " already exists. Ignoring import_db ...","info")
        else:   
            cursor.execute("create database  " + db_name)
            cursor.execute("USE " + db_name)
            #execute each line from sql file to import DB
            print os.path.isfile(db_core_file)
            print "import script path : "+ db_core_file 
            if os.path.isfile(db_core_file):
                proc = subprocess.Popen(["mysql", "--user=%s" % db_user, "--password=%s" % db_password, db_name],
                            stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE)
                out, err = proc.communicate(file(db_core_file).read())
                print out
            else:
                log("Import sql file not found","exception")
            if os.path.isfile(db_asset_file):
                proc = subprocess.Popen(["mysql", "--user=%s" % db_user, "--password=%s" % db_password, db_name],
                            stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE)
                out, err = proc.communicate(file(db_asset_file).read())
                print out
                log("Audit file Imported successfully","info")
            else:
                log("Import asset sql file not found","exception")
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
                log("copying src: " + src_file + " dest: " + dest_file, "debug")
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

def update_xapolicymgr_properties():
    global conf_dict
    EWS_ROOT = conf_dict['EWS_ROOT']
    xapolicymgr_properties = os.path.join(EWS_ROOT, "xapolicymgr.properties")
    log("xapolicymgr_properties: " + xapolicymgr_properties, "debug")
    ModConfig(xapolicymgr_properties,"xa.webapp.dir",'webapp')

    
def update_properties():
    global MYSQL_HOST, conf_dict
    sys_conf_dict={}

    #MYSQL_HOST = conf_dict["MYSQL_HOST"]
    db_user = conf_dict["ARGUS_ADMIN_DB_USERNAME"]
    db_password = conf_dict["ARGUS_ADMIN_DB_PASSWORD"]
    db_name = conf_dict["ARGUS_ADMIN_DB_NAME"]

    audit_db_user = conf_dict["ARGUS_AUDIT_DB_USERNAME"]
    audit_db_password = conf_dict["ARGUS_AUDIT_DB_PASSWORD"]
    audit_db_name = conf_dict["ARGUS_AUDIT_DB_NAME"]

    update_xapolicymgr_properties()

    newPropertyValue=''
    to_file = os.path.join(WEBAPP_ROOT, "WEB-INF", "classes", "xa_system.properties")

    if os.path.isfile(to_file):
        log("to_file: " + to_file + " file found", "info")
    else:
        log("to_file: " + to_file + " does not exists", "warning")

    config = StringIO.StringIO()
    config.write('[dummysection]\n')
    config.write(open(to_file).read())
    config.seek(0, os.SEEK_SET)
    ##Now parse using configparser
    cObj = ConfigParser.ConfigParser()
    cObj.optionxform = str
    cObj.readfp(config)
    options = cObj.options('dummysection')
    for option in options:
        value = cObj.get('dummysection', option)
        sys_conf_dict[option] = value
        cObj.set("dummysection",option, value)

    log("MYSQL_HOST is : " + MYSQL_HOST,"debug")
    propertyName="jdbc.url"
    newPropertyValue="jdbc:log4jdbc:mysql://" + MYSQL_HOST + ":3306/" + db_name
    cObj.set('dummysection',propertyName,newPropertyValue)

    propertyName="xa.webapp.url.root"
    newPropertyValue=os.getenv("policymgr_external_url")
    cObj.set('dummysection',propertyName,newPropertyValue)

    propertyName="http.enabled"
    newPropertyValue=os.getenv("policymgr_http_enabled")
    cObj.set('dummysection',propertyName,newPropertyValue)

    propertyName="auditDB.jdbc.url"
    newPropertyValue="jdbc:log4jdbc:mysql://"+MYSQL_HOST+":3306/"+audit_db_name
    cObj.set('dummysection',propertyName,newPropertyValue)

    propertyName="jdbc.user"
    newPropertyValue=db_user
    cObj.set('dummysection',propertyName,newPropertyValue)

    propertyName="auditDB.jdbc.user"
    newPropertyValue=audit_db_user
    cObj.set('dummysection',propertyName,newPropertyValue)

    keystore=os.getenv("cred_keystore_filename")
    log("Starting configuration for Argus DB credentials:","info")
    db_password_alias="policyDB.jdbc.password"

    if keystore is not None:
        #os.makedirs(keystore)
        commands.getstatusoutput("java -cp cred/lib/* com.hortonworks.credentialapi.buildks create " + db_password_alias + "-value " + db_password + " -provider jceks://file" + keystore)
        propertyName="xaDB.jdbc.credential.alias"
        newPropertyValue=db_password_alias
        cObj.set('dummysection',propertyName,newPropertyValue)
    
        propertyName="xaDB.jdbc.credential.provider.path"
        newPropertyValue=keystore
        cObj.set('dummysection',propertyName,newPropertyValue)

        propertyName="jdbc.password"
        newPropertyValue="_"    
        cObj.set('dummysection',propertyName,newPropertyValue)

        # TODO:WINDOWS Not running chown as it is not used 
        # commands.getstatusoutput("chown -R " + unix_user + ":" + unix_group+" "+ keystore)

    else:    
        propertyName="jdbc.password"
        newPropertyValue=db_password
        cObj.set('dummysection',propertyName,newPropertyValue)

    audit_db_password_alias="auditDB.jdbc.password"

    if keystore is not None :
        commands.getstatusoutput("java -cp 'cred/lib/*' com.hortonworks.credentialapi.buildks create "+audit_db_password_alias + " -value " + audit_db_password + " -provider jceks://file"+ keystore)

        propertyName="auditDB.jdbc.credential.alias"
        newPropertyValue=audit_db_password_alias
        cObj.set('dummysection',propertyName,newPropertyValue)

        propertyName="auditDB.jdbc.credential.provider.path"
        newPropertyValue=keystore
        cObj.set('dummysection',propertyName,newPropertyValue)

        propertyName="auditDB.jdbc.password"
        newPropertyValue="_"    
        cObj.set('dummysection',propertyName,newPropertyValue)
    else: 
        propertyName="auditDB.jdbc.password"
        newPropertyValue=audit_db_password
        cObj.set('dummysection',propertyName,newPropertyValue)

    with open(to_file, 'wb') as configfile:
        cObj.write(configfile)



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
    global PWD
    sys_conf_dict={}
    log("Starting setup based on user authentication method=authentication_method","debug")
    ##Written new function to perform authentication setup for all  cases
    authentication_method = os.getenv("authentication_method")
    setup_authentication(authentication_method, PWD)
    ldap_file=PWD +"/WEB-INF/resources/xa_ldap.properties"
    if os.path.isfile(ldap_file):
        log(ldap_file + " file found", "info")
    else:
        log(ldap_file + " does not exists", "warning")
    config = StringIO.StringIO()
    config.write('[dummysection]\n')
    config.write(open(ldap_file).read())
    config.seek(0, os.SEEK_SET)
    ##Now parse using configparser
    cObj = ConfigParser.ConfigParser()
    cObj.optionxform = str
    cObj.readfp(config)
    options = cObj.options('dummysection')
    for option in options:
        value = cObj.get('dummysection', option)
        sys_conf_dict[option] = value
        cObj.set("dummysection",option, value)
    log("LDAP file : "+ ldap_file + " file found", "info")

    if authentication_method == "LDAP":
        log("Loading LDAP attributes and properties", "debug");
        newPropertyValue='' 
        ##########
        propertyName="xa_ldap_url"
        newPropertyValue=xa_ldap_url
        cObj.set('dummysection',propertyName,newPropertyValue)        
        ###########            
        propertyName="xa_ldap_userDNpattern"
        newPropertyValue=xa_ldap_userDNpattern
        cObj.set('dummysection',propertyName,newPropertyValue)        
        ###########            
        propertyName="xa_ldap_groupSearchBase"
        newPropertyValue=xa_ldap_groupSearchBase
        cObj.set('dummysection',propertyName,newPropertyValue)        
        ###########            
        propertyName="xa_ldap_groupSearchFilter"
        newPropertyValue=xa_ldap_groupSearchFilter
        cObj.set('dummysection',propertyName,newPropertyValue)        
        ###########            
        propertyName="xa_ldap_groupRoleAttribute"
        newPropertyValue=xa_ldap_groupRoleAttribute
        cObj.set('dummysection',propertyName,newPropertyValue)        
        ###########            
        propertyName="authentication_method"
        newPropertyValue=authentication_method
        cObj.set('dummysection',propertyName,newPropertyValue)
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
            cObj.set('dummysection',propertyName,newPropertyValue)
            ###########        
            propertyName="xa_ldap_ad_domain"
            newPropertyValue=xa_ldap_ad_domain
            cObj.set('dummysection',propertyName,newPropertyValue)
            ###########            
            propertyName="authentication_method"
            newPropertyValue=authentication_method
            cObj.set('dummysection',propertyName,newPropertyValue)
        else:
            log(ldap_file + " does not exists", "exception")
    with open(ldap_file, 'wb') as configfile:
        cObj.write(configfile)        

    #if authentication_method == "UNIX":
        ## I think it is not needed for Windows 
        ##do_unixauth_setup
    log("Finished setup based on user authentication method=authentication_method", "info") 
pass



## Argus Functions Ends here --------------------

def get_class_path(paths):
    separator = ';' if sys.platform == 'win32' else ':';
    return separator.join(paths)

def get_jdk_options():
    global EWS_ROOT
    return [os.getenv('ARGUS_PROPERTIES', ''),
                  '-Dcatalina.base=' + EWS_ROOT ]

def get_argus_log_file():
    global EWS_LOG_DIR
    return os.path.join(EWS_LOG_DIR, "catalina.out")

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


# Entry point to script using --service
def run_setup(cmd, app_type):
    print(" --------- Running Argus PolicyManager Install Script --------- ")
    parse_config_file()
    init_logfiles()
    log(" --------- Running Argus PolicyManager Install Script --------- ","debug")
    #logging.setLevel()
    init_variables()
    #check_mysql_connector()
    setup_install_files()
    #sanity_check_files()
    extract_war()
    update_properties()
    # do_authentication_setup()
    # copy_to_webapps()
    #print "Setup of Argus PolicyManager Web Application is COMPLETED."
    return

# Entry point to script using --configure
def configure():
    init_logfiles()
    parse_config_file()
    log(" --------- Running Argus PolicyManager Configure Script --------- ","info")
    init_variables()
    log(" --------- Creating mysql user --------- ","info")
    create_mysql_user()
    log(" --------- Importing DB --------- ","info")
    # copy_mysql_connector()
    import_db()
    log(" --------- Upgrading DB --------- ","info")
    upgrade_db()
    log(" --------- Creatin Audit DB --------- ","info")
    create_audit_mysql_user()

