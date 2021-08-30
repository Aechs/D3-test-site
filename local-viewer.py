#! Python 3.9
import os
import subprocess
import sys
import platform
import webbrowser

if platform.system == "Linux":
    os.system('/usr/bin/python3 -m http.server 8080')
else:
    os.system('index.html')
    webbrowser.open(http://127.0.0.1:8080/index.html)
