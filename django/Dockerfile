FROM python:3.9

ENV PYTHONUNBUFFERED 1

WORKDIR /DBus

RUN apt-get install -y default-libmysqlclient-dev

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
