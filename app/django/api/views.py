from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from bus.models import current_weather
from .serializers import Weather_Serializer, TimetableSerializer
from api.timetables import DisplayTimetables
import pandas as pd

@api_view(['GET'])
def get_current_weather(request):
    # The credential is updated, so the function is not working now
    # weather = current_weather.objects.all()
    # serializer = Weather_Serializer(weather, many=True)
    # return Response(serializer.data)
    return Response({'status':'successful'})


@api_view(['POST'])
def user_input(request):
    print(request.data)
    return Response({'status':'successful'})
   
@api_view(['GET'])
def get_timetable(request):
    item = DisplayTimetables.return_timetable('365')
    # df = TimetableSerializer(item, many=True)
    df = [{'LINEID' : '77A', 'PLANNED_DEP_R_M5' : '08:00'}, {'LINEID' : '46A', 'PLANNED_DEP_R_M5' : '08:00'}]
    return Response(df)
