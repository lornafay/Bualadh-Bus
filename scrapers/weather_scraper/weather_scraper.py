# Adapted from Breakfast Bagels Spring 2022 weather scraper

import json
import time
import requests
from sqlalchemy import create_engine
from datetime import datetime
import os

# create string of path to credentials file (in Bualadh-Bus/ directory)
cwd = os.getcwd()
ind = cwd.index("-Bus") + 5
path_to_credentails = cwd[:ind]
print(path_to_credentails)

# open credentials.json with path just created
with open(f'{path_to_credentails}credentials.json', 'r') as credentials_file:
    credentials = json.load(credentials_file)

def weather_scraper():
    dublin_weather_data = requests.get('https://api.openweathermap.org/data/2.5/onecall?lat=53.3497645&lon=-6.2602732&exclude=minutely&appid=' + f"{credentials['keys']['openweather']}")
    dublin_weather_dynamic_json = json.loads(dublin_weather_data.content)
    return dublin_weather_dynamic_json


def post_weather_to_table(json):
    """Function that collects JSON data and imports it into storage in remote database.
    No return value."""

    # Connects to remote database
    user = 'root'
    password = credentials["db"]["pwd"]
    host = credentials["db"]["host"]
    port = credentials["db"]["port"]
    db = credentials["db"]["name"]

    # Connection
    conn_weather = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{db}"

    # Function to establish connection with database using conn string
    weather_engine = create_engine(conn_weather, echo=True)

    # Take specific variables from JSON object and cast to strings
    timestamp = int(f"{json['current']['dt']}")
    time = str(datetime.fromtimestamp(timestamp))
    current_temp = f"{json['current']['temp']}"
    wind_speed = f"{json['current']['wind_speed']}"
    clouds = f"{json['current']['clouds']}"

    # if no rain in forecast, json will not contain a rain attribute so assign default
    try:
        rain = f"\'{json['daily'][0]['rain']}\'"
    except:
        rain = 0.0

    # prepare sql statement
    sql = f"INSERT INTO current_weather (`time`, `temperature`, `wind_speed`, `clouds`, `rain`)" \
            f"VALUES (%s, %s, %s, %s, %s);"

    # prepare entries
    items = [time, current_temp, wind_speed, clouds, rain]


    weather_engine.execute(sql, items)


while True:
    weather_json = weather_scraper()
    post_weather_to_table(weather_json)
    time.sleep(600)  # collect info every 10 mins