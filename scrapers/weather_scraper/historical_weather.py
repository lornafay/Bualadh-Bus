import requests

'''url = "https://visual-crossing-weather.p.rapidapi.com/history"

querystring = {"startDateTime":"2018-01-01T00:00:00","aggregateHours":"1","location":"Dublin, Ireland","endDateTime":"2018-02-01T00:00:00","unitGroup":"metric"}

headers = {
	"X-RapidAPI-Key": "1a46f11044mshdb2c41f0ea27a42p1c6941jsnd7686697ea88",
	"X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)'''

# Import Meteostat library
from meteostat import Stations

# Get nearby weather stations
stations = Stations()
stations = stations.nearby(53.3498, 6.2603)
station = stations.fetch(1)

# Print DataFrame
print(station)