FROM python:3.9
ENV PYTHONUNBUFFERED 1

WORKDIR /django

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN apt install -y default-libmysqlclient-dev

COPY . .