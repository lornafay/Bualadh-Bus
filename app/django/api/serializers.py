from rest_framework import serializers
from bus.models import current_weather
# from api.timetables import DisplayTimetables

class Weather_Serializer(serializers.ModelSerializer):
    class Meta:
        model = current_weather
        fields = '__all__'

# class TimetableSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DisplayTimetables.return_timetable('395', '395', 'Saturday')
#         fields = '__all__'