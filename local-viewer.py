#!/usr/bin/python3
import os
import sys
import platform
import webbrowser

if platform.system() == "Linux":
    os.system('/usr/bin/python3 -m http.server 8080')
    # sys.stdout( )
elif platform.system() == "Windows":
    os.system('C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python39\python.exe -m http.server 8080')

webbrowser.open('http://127.0.0.1:8080/index.html')
