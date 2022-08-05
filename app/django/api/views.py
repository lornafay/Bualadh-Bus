from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import render
from bus.models import current_weather, stop_locations, Timetables
from .serializers import Weather_Serializer, TimetableSerializer, StopLocationSerializer
from .parse_arguments import Parse_arguments
from .journey_times import JourneyTimes
from .timetables import DisplayTimetables
from .route_map import RouteMap

@api_view(['GET'])
def get_current_weather(request):
    weather = current_weather.objects.all()
    serializer = Weather_Serializer(weather, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def user_input(request):
    print(request.data)
    time = request.data['time']
    start = request.data['location']
    end = request.data['destination']
    lst = [time, start, end]
    print('request: ', lst[0], lst[1], lst[2])
    j = JourneyTimes(lst)
    p=j.return_user_journey_time_lineID()
    print(p)
    return Response({'result': p})

@api_view(['GET'])
def stop_location(request, line, location, destination, day):

    print("THIS REQUEST", request.GET)
    '''print('THIS LINE: ' + request.GET['line'])
    line = request.GET['line']
    start = request.GET['location']
    end = request.GET['destination']
    day = request.GET['day']'''
    lst = [line, location, destination, day]
    print('request: ', lst[0], lst[1], lst[2], lst[3])

    # use RouteMap class to get the stops along user's journey
    route = RouteMap(lst)
    p = route.get_intermediate_stop_locations()

    serializer = StopLocationSerializer(p, many=True)
    return Response({'result': p})


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
