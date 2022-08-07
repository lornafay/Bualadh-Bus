from django.db import models

# Create your models here.
class current_weather(models.Model):
    time = models.CharField(max_length=45, primary_key=True)
    temp = models.FloatField()
    wind_speed = models.FloatField()
    clouds = models.FloatField()
    rain = models.FloatField()
    sea_lvl_pressure = models.FloatField()
    humidity = models.FloatField()
    dew_pt_temp = models.FloatField()

    class Meta:
        db_table = "current_weather"

class Timetables(models.Model):
    stopID_request = models.CharField(max_length=10, primary_key=True)
    day_request = models.CharField(max_length=10)

class stop_locations(models.Model):
    STOPPOINTID = models.IntegerField(primary_key=True)
    LAT = models.FloatField()
    LNG = models.FloatField()
    LOCATION = models.CharField(max_length=45)
    
    class Meta:
        db_table = "stop_locations"

    def __str__(self):
        return '%s %s %s %s' % (self.STOPPOINTID, self.LAT, self.LNG, self.LOCATION)