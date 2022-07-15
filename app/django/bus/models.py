from django.db import models

# Create your models here.
class current_weather(models.Model):
    time = models.CharField(max_length=45, primary_key=True)
    temperature = models.FloatField()
    wind_speed = models.FloatField()
    wind_dir = models.FloatField()
    clouds = models.FloatField()
    rain = models.FloatField()
    pressure = models.FloatField()
    humidity = models.FloatField()
    dew_point = models.FloatField()

    class Meta:
        db_table = "current_weather"