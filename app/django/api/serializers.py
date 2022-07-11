from rest_framework import serializers
from bus.models import current_weather

class Weather_Serializer(serializers.ModelSerializer):
    class Meta:
        model = current_weather
        fields = '__all__'