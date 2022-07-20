#!/home/student/djangoenv/bin/python
# Adapted from Breakfast Bagels Spring 2022 weather scraper

import json
import time
import requests
from sqlalchemy import create_engine
from datetime import datetime
import os
import itertools as it

# open credentials.json with path just created
with open('/home/student/Bualadh-Bus/credentials.json', 'r') as credentials_file:
    credentials = json.load(credentials_file)


def weather_scraper():
    headers = {
        'user-agent': 'https://github.com/lornafay/Bualadh-Bus/tree/develop porterfa@tcd.ie'
    }
    dublin_weather_data = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=53.36&lon=-6.325000', headers=headers)
    dublin_weather_dynamic_json = json.loads(dublin_weather_data.content)
    return dublin_weather_dynamic_json


def post_weather_to_table(json):
    """Function that collects JSON data and imports it into storage in remote database.
    No return value."""

    # Connects to remote database
    user = 'admin'
    password = credentials["aws_db"]["password"]
    host = credentials["aws_db"]["host"]
    port = credentials["aws_db"]["port"]
    db = credentials["aws_db"]["db"]

    # Connection
    conn_weather = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{db}"

    # Function to establish connection with database using conn string
    weather_engine = create_engine(conn_weather, echo=True)

    # Take specific variables from JSON object and cast to strings



    #CURRENT WEATHER TO CURRENT WEATHER TABLE

    # adding one hour to the timestamp as results are behind by this amount for some reason
    time = (f"{json['properties']['timeseries'][0]['time']}")
    # time = str(datetime.fromtimestamp(timestamp))
    current_temp = f"{json['properties']['timeseries'][0]['data']['instant']['details']['air_temperature']}"
    wind_speed = f"{json['properties']['timeseries'][0]['data']['instant']['details']['wind_speed']}"
    clouds = f"{json['properties']['timeseries'][0]['data']['instant']['details']['cloud_area_fraction']}"
    #rain = f"{json['properties']['timeseries'][0]['data']['next_1_hours']['details']['precipitation_amount']}"
    pressure = f"{json['properties']['timeseries'][0]['data']['instant']['details']['air_pressure_at_sea_level']}"
    humidity = f"{json['properties']['timeseries'][0]['data']['instant']['details']['relative_humidity']}"
    dew_point = f"{json['properties']['timeseries'][0]['data']['instant']['details']['dew_point_temperature']}"

    # if no rain in forecast, json will not contain a rain attribute so assign default
    try:
        rain = f"{json['properties']['timeseries'][0]['data']['next_1_hours']['details']['precipitation_amount']}"
    except:
        rain = 0.0

    truncate_sql = "TRUNCATE current_weather"

    weather_engine.execute(truncate_sql)

    # prepare sql statement
    sql = f"INSERT INTO current_weather (`time`, `temp`, `wind_speed`, `clouds`, `rain`, " \
        f"`sea_lvl_pressure(hPa)`, `humidity(%)`, `dew_pt_temp(C)`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"

    # prepare entries
    items = [time, current_temp, wind_speed, clouds, rain, pressure, humidity, dew_point]

    weather_engine.execute(sql, items)



    # DAILY FORECAST OF 6 HOUR INTERVALS
    
    j = 0
    if j == 0:
        truncate_forecast = "TRUNCATE weather_forecast"
        weather_engine.execute(truncate_forecast)
        
    def weather_forecast(substring):
        for i in range(len(json['properties']['timeseries'])):
            fullstring = (f"{json['properties']['timeseries'][i]['time']}")
            if substring in fullstring:
                forecast_time = (f"{json['properties']['timeseries'][i]['time']}")
                forecast_temp = (f"{json['properties']['timeseries'][i]['data']['instant']['details']['air_temperature']}")
                # forecast_rain = (f"{json['properties']['timeseries'][i]['data']['next_6_hours']['details']['precipitation_amount']}")
                forecast_dew_point = (f"{json['properties']['timeseries'][i]['data']['instant']['details']['dew_point_temperature']}")
                forecast_humidity = (f"{json['properties']['timeseries'][i]['data']['instant']['details']['relative_humidity']}")
                forecast_pressure = (f"{json['properties']['timeseries'][i]['data']['instant']['details']['air_pressure_at_sea_level']}")

                try:
                    forecast_rain = (f"{json['properties']['timeseries'][i]['data']['next_6_hours']['details']['precipitation_amount']}")
                except:
                    forecast_rain = 0.0

                # prepare sql statement
                sql_forecast = f"INSERT INTO weather_forecast (`time`, `rain`, `temp`, `dew_pt_temp(C)`, `humidity(%)`, `sea_lvl_pressure(hPa)`) VALUES (%s, %s, %s, %s, %s, %s);"

                # prepare entries
                items_forecast = [forecast_time, forecast_rain, forecast_temp, forecast_dew_point, forecast_humidity, forecast_pressure]
                weather_engine.execute(sql_forecast, items_forecast)

    substring1 = '06:00'
    substring2 = '12:00'
    substring3 = '18:00'
    substring4 = '00:00:00'

    weather_forecast(substring1)
    weather_forecast(substring2)
    weather_forecast(substring3)
    weather_forecast(substring4)
            


while True:
    weather_json = weather_scraper()
    print(weather_json['properties'])
    post_weather_to_table(weather_json)
    time.sleep(1800)  # collect info every half hour