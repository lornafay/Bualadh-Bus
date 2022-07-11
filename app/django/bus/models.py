from django.db import models

# Create your models here.
class current_weather(models.Model):
    time = models.CharField(max_length=45, primary_key=True)
    temperature = models.FloatField()
    wind_speed = models.FloatField()
    wind_dir = models.FloatField()
    clouds = models.FloatField()
    rain = models.FloatField()
    id = models.FloatField()
    icon = models.CharField(max_length=45)
    description = models.CharField(max_length=45)
    feels_like = models.FloatField()
    day_max_temp = models.FloatField()
    day_min_temp = models.FloatField()
    pressure = models.FloatField()
    humidity = models.FloatField()
    visibility = models.FloatField()

    class Meta:
        db_table = "current_weather"