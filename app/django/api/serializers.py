from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from bus.models import current_weather, stop_locations
from api.timetables import DisplayTimetables

class Weather_Serializer(serializers.ModelSerializer):
    class Meta:
        model = current_weather
        fields = '__all__'

class TimetableSerializer(serializers.Serializer):
    day = serializers.CharField(max_length=10)
    stopID = serializers.CharField(max_length=10)

class StopLocationSerializer(serializers.Serializer):
    class Meta:
        model = stop_locations
        fields = '__all__'