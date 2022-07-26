from rest_framework import serializers
from bus.models import current_weather
<<<<<<< HEAD
# from api.timetables import DisplayTimetables
=======
from timetables import DisplayTimetables
>>>>>>> develop

class Weather_Serializer(serializers.ModelSerializer):
    class Meta:
        model = current_weather
        fields = '__all__'

<<<<<<< HEAD
# class TimetableSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DisplayTimetables.return_timetable('395', '395', 'Saturday')
#         fields = '__all__'
=======
class TimetableSerializer(serializers.Serializer):
    day = serializers.CharField(max_length=10)
    stopID = serializers.CharField(max_length=10)
>>>>>>> develop
