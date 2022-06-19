FROM python:3.9

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get install -y default-libmysqlclient-dev
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]