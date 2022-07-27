from rest_framework import serializers
from bus.models import current_weather
from api.timetables import DisplayTimetables

class Weather_Serializer(serializers.ModelSerializer):
    class Meta:
        model = current_weather
        fields = '__all__'

class TimetableSerializer(serializers.Serializer):
    day = serializers.CharField(max_length=10)
    stopID = serializers.CharField(max_length=10)
