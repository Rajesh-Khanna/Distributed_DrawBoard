FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /distDrawBoard

ADD . /distDrawBoard

COPY ./requirements.txt /distDrawBoard/requirements.txt

RUN pip install -r requirements.txt

RUN python -m pip install django-cors-headers

COPY . /distDrawBoard