from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from bus.models import current_weather
from .serializers import Weather_Serializer, TimetableSerializer
from datetime import datetime
import pytz
from api.timetables import DisplayTimetables
import pandas as pd

@api_view(['GET'])
def get_current_weather(request):
    weather = current_weather.objects.all()
    serializer = Weather_Serializer(weather, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def user_input(request):
    print(request.data)
    # parse time into standard  Dublin time
    time = datetime.strptime(request.data['time'], "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=pytz.utc).astimezone(pytz.timezone('Europe/Dublin'))
    print(time)
    return Response({'status':'successful'})

@api_view(['GET'])
def get_timetable(request):
    item = DisplayTimetables.return_timetable('365')
    # df = TimetableSerializer(item, many=True)
    df = {'LINEID' : ['77A', '77A', '46A'], 'PLANNED_DEP_R_M5' : ['08:00', '08:10', '08:20']}
    return Response(df)