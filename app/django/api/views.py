from rest_framework.response import Response
from rest_framework.decorators import api_view
from bus.models import current_weather
from .serializers import Weather_Serializer
from datetime import datetime
import pytz

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