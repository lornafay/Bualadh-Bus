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
    LINEID = models.CharField(max_length=10)
    PLANNED_DEP_R_M5 = models.CharField(max_length = 20)

    # class Meta:
    #     db_timetable = 'timetables'

class TimetableRequest(models.Model):
    stopID_request = models.CharField(max_length=10, primary_key=True)
    day_request = models.CharField(max_length=10)