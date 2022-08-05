from django.urls import path
from . import views

urlpatterns = [
    path('current_weather/', views.get_current_weather),
    path('user_input/', views.user_input),
    path('timetable/', views.Timetables.as_view()),
    path('stop_location/<str:line>/<str:location>/<str:destination>/<str:day>/', views.stop_location)
]