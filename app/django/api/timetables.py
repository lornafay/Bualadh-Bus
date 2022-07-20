# from sqlalchemy import create_engine
import json
import os
from query import Query
import pandas as pd
#import ParseArguments
#import PredictJourneyTimes

StopID = '365'
Day = 'Saturday'

class Display_timetables:
    """ Class to display timetables to user.
    Contains three methods for extracting routeID, getting timetable, and returning timetable"""

    def extract_route_ID(StopID):
        """Method to extract_route_ID and append to LineID
        Returns dataframe for line and route IDs"""
        
        #Get line id from django after user input
        # ParseArguements.LineID()

        #get line and route id together and possibly drop result
        # PredictJourneyTimes.Get_LineID_RouteID_Groups()

        dictionary = {
            'ROUTEID' : ['77A_30', '77A_29', '46_5'],
            'LINEID' : ['77A', '77A', '46']
        }

        df = pd.DataFrame(dictionary)
        
        #return route ID list
        return df
    
    def get_timetable(Day):
        """Method to get day of week from user input
        Will query database for planned departure times for line
        Returns dataframe containing routeID, day of week, planned departure times"""
        
        #takes day of week from user
        day_of_week = 'Saturday'
        
        #after querying DB with SELECT ROUTEID, DAY_OF_WEEK, PLANNEDTIME_DEP_R_M5 FROM static_tables.timetables Where ROUTEID = '77A_30'and DAY_OF_WEEK = "Tuesday" order by PLANNEDTIME_DEP_R_M5
        
        dictionary = {
            'ROUTEID' : ['77A_30', '77A_30', '77A_29', '46_5'],
            'LINEID' : ['77A', '77A', '77A', '46'],
            'DAY_OF_WEEK' : ['SATURDAY', 'SATURDAY', 'SATURDAY', 'SATURDAY'],
            'PLANNED_DEP_R_M5' : ['08:00', '08:10', '08:10', '08:20']
        }
        
        df = pd.DataFrame(dictionary)
        
        return df
    
    def return_timetable(self):
        """Method to finalize dataframe to display to user
        returns dataframe containing only times of departure for that line"""
    
        df = Display_timetables.get_timetable(self)
        
        #drop columns don't want to display and any duplicates
        df = df.drop('DAY_OF_WEEK', axis=1)
        df = df.drop('ROUTEID', axis=1)
        df = df.drop_duplicates(subset=['PLANNED_DEP_R_M5'])
        
        return df

time = Display_timetables()
print(time.extract_route_ID())
print(time.get_timetable())
print(time.return_timetable())

