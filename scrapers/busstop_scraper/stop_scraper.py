import googlemaps
import numpy as np
from sqlalchemy import create_engine
from keys import GMAPS_KEY as key

# so far just creates an array of lat and long values for each stop
# geocoder not returning results yet

with open("stop_numbers.csv", 'r') as f:
    stop_arr = np.loadtxt(f, delimiter=",")

gmaps = googlemaps.Client(
    key=key)

lat_arr, long_arr = [], []

# Geocoding the address of each stop into lat and lng values
for stop_number in stop_arr:
    geocode_result = gmaps.geocode(f"Stop {stop_number}, Dublin")
    stop_lat = geocode_result[0]["geometry"]["location"]["lat"]
    stop_long = geocode_result[0]["geometry"]["location"]["lng"]
    lat_arr.append(stop_lat)
    long_arr.append(stop_long)


print(lat_arr)
print(long_arr)
