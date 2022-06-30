#Adapted from Breakfast Bagels Spring 2022 weather scraper

import json
import time
import datetime
import getJson as gJ
import errors
from sqlalchemy import create_engine

# Open keys file to access API key
with open("keys.json", "r") as keys_file:
    keys_handle = json.load(keys_file)


def weather_scraper():
    """Function to return data from weather data"""
    dublin_weather = gJ.GetJson('weather')

    # Try and except block for handling potential errors in server response
    try:
        dublin_weather_json = dublin_weather.get_weather_data()
    except errors.Error400:
        print(errors.Error400())
    except errors.Error401:
        print(errors.Error401())
    except errors.Error403:
        print(errors.Error403())
    except errors.Error404:
        print(errors.Error404)
    except errors.Error408:
        print(errors.Error408())
    except errors.Error429:
        print(errors.Error429())
    except errors.Error500:
        print(errors.Error500())
    except errors.Error511:
        print(errors.Error511())
    else:
        return dublin_weather_json


def post_weather_to_table(json):
    """Function that collects JSON data and imports it into storage in remote database.
    No return value."""

    # Connects to remote database
    user = keys_handle['DB']['user']
    password = keys_handle['DB']['password']
    host = keys_handle['DB']['host']
    port = keys_handle['DB']['port']
    db = keys_handle['DB']['db']

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
     VALUES ({current_id}, {current_description}, {current_tempt}, 
    {feels_like}, {min_weather}, {max_weather}, {pressure}, {humidity}, {visibility}, {wind_speed}, {wind_dir}
    {wind_dir}, {clouds}, {date}, {rain});'''
    weather_engine.execute(sql_weather)

if __name__ == "__main__":
    while True:
        weather_json = weather_scraper()
        post_weather_to_table(weather_json)
        time.sleep(3600)  # collect info hourly