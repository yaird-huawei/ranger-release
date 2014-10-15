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

import sys
import os
import subprocess
import time
#import argus_install
from xml.dom.minidom import getDOMImplementation
import re 

cmd = sys.argv[0]
app_type = sys.argv[1]

service_entry = '--service' in sys.argv
configure_entry = '--configure' in sys.argv


conf_dict={}

def log(msg,type):
    if type == 'info': 
        logging.info(" %s",msg)
    if type == 'debug': 
        logging.debug(" %s",msg)
    if type == 'warning':
        logging.warning(" %s",msg)
    if type == 'exception':
        logging.exception(" %s",msg)


def appendTextElement(name, value):
	elem = xmlDoc.createElement(name)
	elem.appendChild(xmlDoc.createTextNode(value))
	xmlDocRoot.appendChild(elem)	

def get_argus_classpath():
	global conf_dict
	cp = [ os.path.join(conf_dict["INSTALL_DIR"],"dist","*"), os.path.join(conf_dict["INSTALL_DIR"],"lib","*"), os.path.join(conf_dict["INSTALL_DIR"], 'conf')]
	class_path = get_class_path(cp)
	return class_path
	
def get_jdk_options():
    global conf_dict
    return [os.getenv('ARGUS_PROPERTIES', ''), "-Dlogdir="+os.getenv("ARGUS_LOG_DIR")]

def init_variables():
	global  INSTALL_DIR,ARGUS_USERSYNC_HOME, conf_dict
	# These are set from the Monarch
	conf_dict["HDP_RESOURCES_DIR"] = os.getenv("HDP_RESOURCES_DIR")
	conf_dict["ARGUS_ADMIN_HOME"] = os.getenv("ARGUS_ADMIN_HOME")
	conf_dict["ARGUS_USERSYNC_HOME"] = os.getenv("ARGUS_USERSYNC_HOME")
	conf_dict["INSTALL_DIR"] = os.getenv("ARGUS_USERSYNC_HOME")

def get_class_path(paths):
    separator = ';' if sys.platform == 'win32' else ':';
    return separator.join(paths)	

def get_java_env():
    JAVA_HOME = os.getenv('JAVA_HOME')
    if JAVA_HOME:
        return os.path.join(JAVA_HOME, 'bin', 'java')
    else:
        os.sys.exit('java and jar commands are not available. Please configure JAVA_HOME')


if service_entry:
	#argus_install.run_setup(cmd, app_type)
	#init_logfiles()

	init_variables()
	jdk_options = get_jdk_options()
	class_path = get_argus_classpath()
	java_class = 'com.xasecure.authentication.UnixAuthenticationService'
	class_arguments = '' 

	dom = getDOMImplementation()
	xmlDoc = dom.createDocument(None, 'service', None)
	xmlDocRoot = xmlDoc.documentElement
	arguments = ' '.join([' '.join(jdk_options), '-cp', class_path, java_class, class_arguments ])
	appendTextElement('id', "argus-usersync")
	appendTextElement('name', "argus-usersync")
	appendTextElement('description', 'This service runs argus-usersync')
	appendTextElement('executable', get_java_env())
	appendTextElement('arguments', arguments)
	uglyXml = xmlDoc.toprettyxml(indent='  ')
	text_re = re.compile('>\n\s+([^<>\s].*?)\n\s+</', re.DOTALL)    
	prettyXml = text_re.sub('>\g<1></', uglyXml)

	print prettyXml
	sys.exit()
	
if configure_entry:
    #configure()
    sys.exit()
