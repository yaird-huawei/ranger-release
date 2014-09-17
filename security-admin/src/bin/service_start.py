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

# resolve links - $0 may be a soft link
import sys
import os
import subprocess
import time
import argus_install



# TODO Need to modify for Argus
"""
def check_running(app_type, pid_file):
    if os.path.exists(pid_file):
        pid_file = open(pid_file)
        pid_file.seek(0)
        pid = int(pid_file.readline())
        try:
            os.kill(pid, 0)
            sys.exit(app_type + ' is running as process ' +
                     str(pid) + '. stop it first.')
        except:
            pass


# TODO Need to modify for Argus
def launch_java_process(java_bin, java_class, class_path, jdk_options,
                        class_arguments, out_file, pid_file):
    with open(out_file, 'w') as out_file_f:
        cmd = [java_bin]
        cmd.extend(jdk_options)
        cmd.extend(['-cp', class_path, java_class, class_arguments])
        process = subprocess.Popen(' '.join(filter(None, cmd)),
                                   stdout=out_file_f, stderr=out_file_f,
                                   shell=False)
        pid_f = open(pid_file, 'w')
        pid_f.write(str(process.pid))
        pid_f.close()


def get_hadoop_version(java_bin, class_path):
    cmd = [java_bin, '-cp', class_path, 'org.apache.hadoop.util.VersionInfo']
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    lines = process.communicate()[0]
    return lines.splitlines()[0]  # return only the first line
"""


cmd = sys.argv[0]
app_type = sys.argv[1]

argus_install.run_setup(cmd, app_type)

service_entry = '--service' in sys.argv
#if not service_entry:
#    check_running(app_type, ac.pid_file)

#ac.mkdir_p(ac.log_dir)

jdk_options =  [os.getenv('ARGUS_PROPERTIES', ''),
                  '-Dcatalina.base=' + argus_install.EWS_ROOT ]

# Add all the JVM command line options
jdk_options.extend([arg for arg in sys.argv if arg.startswith('-D')])
other_args = ' '.join([arg for arg in sys.argv[3:] if not arg.startswith('-D')])

java_class = 'com.xasecure.server.tomcat.EmbededServer'
class_arguments = other_args

if service_entry:
    from xml.dom.minidom import getDOMImplementation
    dom = getDOMImplementation()
    xmlDoc = dom.createDocument(None, 'service', None)
    xmlDocRoot = xmlDoc.documentElement
    arguments = ' '.join([' '.join(jdk_options), '-cp', argus_install.get_argus_classpath(), java_class, class_arguments])

    def appendTextElement(name, value):
        elem = xmlDoc.createElement(name)
        elem.appendChild(xmlDoc.createTextNode(value))
        xmlDocRoot.appendChild(elem)

    appendTextElement('id', app_type)
    appendTextElement('name', app_type)
    appendTextElement('description', 'This service runs ' + app_type)
    appendTextElement('executable', argus_install.get_java_env())
    appendTextElement('arguments', arguments)

    print xmlDoc.toprettyxml(indent='  ')
    sys.exit()

"""
launch_java_process(ac.java_bin, java_class,
                    ac.class_path,
                    jdk_options, class_arguments, out_file,
                    ac.pid_file)

print app_type + ' started using hadoop version: ' + \
      get_hadoop_version(ac.java_bin, ac.class_path)

"""