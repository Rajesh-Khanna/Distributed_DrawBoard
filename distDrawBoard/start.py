import os
import sys

if __name__ == '__main__':
    n = len(sys.argv)
    print(sys.argv)
    if(n > 1):
        if(sys.argv[1] == 'db'):
            os.system("pip3 install -r requirements.txt && python3 -m pip install django-cors-headers && python3 manage.py makemigrations && python3 manage.py migrate")
    else:
        os.system("python3 manage.py runserver")
