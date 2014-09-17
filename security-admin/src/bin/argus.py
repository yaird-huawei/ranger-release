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
import argus_config
import subprocess
from os.path import expanduser

cmd = sys.argv[0]
prg, base_dir = argus_config.resolve_sym_link(os.path.abspath(cmd))
argus_config.init_config(cmd, 'client')
other_args = ' '.join(arg for arg in sys.argv[1:])

log_dir = '-Dargus.log.dir=' + expanduser("~")
cmd = [argus_config.java_bin, '-cp', argus_config.class_path,
       log_dir, 'org.apache.argus.cli.ArgusCLI', other_args]
exit(subprocess.call(' '.join(cmd)))
