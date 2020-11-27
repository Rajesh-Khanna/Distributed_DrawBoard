# Distributed_DrawBoard
https://docs.google.com/document/d/1haY_I788-OJB0-aSkOUQI5JzGo68Sx4XyWfUc6FGAVY/edit# \
https://meet.google.com/eqz-zehf-srw?authuser=1&hl=en

---
### installation
* pip install Django
* pip install djangorestframework

---
refLink: https://docs.djangoproject.com/en/3.1/intro/tutorial01/
---
### setup
* django-admin startproject mysite
* python manage.py startapp polls
* python manage.py runserver

---
### docker setup
* docker-compose build
* docker-compose up
(try using sudo in case of any errors)

#### docker push commands
* docker login
* docker tag local-image:tagname username/new-repo:tagname
* docker push username/new-repo:tagname

#### docker pull command
* docker pull username/new-repo:tagname
