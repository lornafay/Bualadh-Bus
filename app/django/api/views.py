from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import render
from bus.models import current_weather
from .serializers import Weather_Serializer, TimetableSerializer
from timetables import DisplayTimetables
import pandas as pd
import json

@api_view(['GET'])
def get_current_weather(request):
    # The credential is updated, so the function is not working now
    weather = current_weather.objects.all()
    serializer = Weather_Serializer(weather, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def user_input(request):
    print(request.data)
    return Response({'status':'successful'})

class Timetables(APIView):
    """ Method Get and Post timetables to frontend

    Two methods: the Get Request to first display on page,
    and the Post request that takes user input and updates page.
    """

    serializer_class = TimetableSerializer

    def get(self, request, format=None):
        """ Returns timetable that first displays on frontend.
        """
        df = DisplayTimetables.return_timetable('395', '395', 'Saturday')
        return Response(df)

    def post(self, request):
        """ Method to take user input and return timetable for that bus stop. """

        serializer = TimetableSerializer(data = request.data)
        
        if serializer.is_valid():
            day = serializer.data.get('day')
            stopID = serializer.data.get('stopID')
            df_new = DisplayTimetables.return_timetable('395', stopID, day)
            return Response(df_new)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)