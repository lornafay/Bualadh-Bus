# Adapted from Breakfast Bagels Spring 2022 weather scraper

# DATABASE DETAILS NEED TO BE CORRECTED LEXIE!!!

import json
import time
import requests
from sqlalchemy import create_engine

with open('keys.json', 'r') as API_weather_file:
    API_keys = json.load(API_weather_file)

def weather_scraper():
    dublin_weather_data = requests.get('https://api.openweathermap.org/data/2.5/onecall?lat=53.3497645&lon=-6.2602732&exclude=minutely&appid=' + API_keys['weather'])
    dublin_weather_dynamic_json = json.loads(dublin_weather_data.content)
    return dublin_weather_dynamic_json


def post_weather_to_table(json):
    """Function that collects JSON data and imports it into storage in remote database.
    No return value."""

    # Connects to remote database
    user = API_keys['DB']['user']
    password = API_keys['DB']['password']
    host = API_keys['DB']['host']
    port = API_keys['DB']['port']
    db = API_keys['DB']['db']

    # Connection
    conn_weather = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{db}"

    # Function to establish connection with database using conn string
    weather_engine = create_engine(conn_weather, echo=True)

    # Take specific variables from JSON object and cast to strings
    time = f"\'{json['current']['dt']}\'"
    current_temp = f"\'{json['current']['temp']}\'"
    wind_speed = f"\'{json['current']['wind_speed']}\'"
    current_id = f"\'{json['current']['weather'][0]['id']}\'"
    current_tag = f"\'{json['current']['weather'][0]['icon']}\'"
    current_description = f"\'{json['current']['weather'][0]['description']}\'"
    feels_like = f"\'{json['current']['feels_like']}\'"
    max_weather = f"\'{json['daily'][0]['temp']['max']}\'"
    min_weather = f"\'{json['daily'][0]['temp']['min']}\'"
    pressure = f"\'{json['current']['pressure']}\'"
    humidity = f"\'{json['current']['humidity']}\'"
    visibility = f"\'{json['current']['visibility']}\'"
    wind_dir = f"\'{json['current']['wind_deg']}\'"
    clouds = f"\'{json['current']['clouds']}\'"
    rain = f"\'{json['daily'][0]['rain']}\'"

    # Cast strings now added to SQL query passed into database connection
    sql_weather = f'''TRUNCATE `DBus.main_currentweather`; INSERT INTO `DBus.main_currentweather` (id, description,
      temp, feels, min, max, pressure, tag, humidity, visibility, wind_speed, wind_dir, clouds, date, rain) 
     VALUES ({current_id}, {current_description}, {current_temp}, 
    {feels_like}, {min_weather}, {max_weather}, {pressure}, {current_tag} {humidity}, {visibility}, {wind_speed}, {wind_dir},
    {clouds}, {time}, {rain});'''
    weather_engine.execute(sql_weather)

if __name__ == "__main__":
    while True:
        weather_json = weather_scraper()
        post_weather_to_table(weather_json)
        time.sleep(3600)  # collect info hourly