#!/usr/bin/python3
import os
import platform
import webbrowser

if platform.system() == "Linux":
    os.system('/usr/bin/python3 -m http.server 8080')
    # sys.stdout( )
else:
    os.system('python -m http.server 8080')

webbrowser.open('http://127.0.0.1:8080/index.html')
