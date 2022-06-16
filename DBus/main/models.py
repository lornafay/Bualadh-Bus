from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CurrentWeather(models.Model):
    date = models.DateField(auto_now=False)
    tag = models.CharField(max_length=40)
    description = models.CharField(max_length=40)
    temp = models.FloatField()
    feels = models.FloatField()
    min = models.FloatField()
    max = models.FloatField()
    pressure = models.IntegerField()
    humidity = models.IntegerField()
    visibility = models.IntegerField()
    wind_speed = models.IntegerField()
    wind_dir = models.IntegerField()
    clouds = models.IntegerField()