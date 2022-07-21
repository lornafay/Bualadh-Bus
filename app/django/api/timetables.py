# from sqlalchemy import create_engine
import json
import os
# from query import Query
import pandas as pd
#import ParseArguments
#import PredictJourneyTimes

StopID = '365'
Day = 'Saturday'

class DisplayTimetables:
    """Class to display timetables to user.
    
    Contains three methods for extracting routeID, getting timetable, and returning timetable.
    """

    def extract_route_ID(StopID):
        """Method to extract_route_ID and append to LineID.
        
        Returns dataframe for line and route IDs.
        """
        
        # Get line id from django after user input
        # ParseArguements.LineID()

        # Get line and route id together and possibly drop result
        # PredictJourneyTimes.Get_LineID_RouteID_Groups()

        dictionary = {
            'ROUTEID' : ['77A_30', '77A_29', '46_5'],
            'LINEID' : ['77A', '77A', '46']
        }

        df = pd.DataFrame(dictionary)
        
        # Return route ID list
        return df
    
    def get_timetable(Day):
        """Method to get day of week from user input.
        
        Will query database for planned departure times for line.
        Returns dataframe containing routeID, day of week, planned departure times.
        """
        
        # Takes day of week from user
        day_of_week = 'Saturday'
        
        # After querying DB with SELECT ROUTEID, DAY_OF_WEEK, PLANNEDTIME_DEP_R_M5 FROM static_tables.timetables Where ROUTEID = '77A_30'and DAY_OF_WEEK = "Tuesday" order by PLANNEDTIME_DEP_R_M5
        
        dictionary = {
            'ROUTEID' : ['77A_30', '77A_30', '77A_29', '46_5'],
            'LINEID' : ['77A', '77A', '77A', '46'],
            'DAY_OF_WEEK' : ['SATURDAY', 'SATURDAY', 'SATURDAY', 'SATURDAY'],
            'PLANNED_DEP_R_M5' : ['08:00', '08:10', '08:10', '08:20']
        }
        
        df = pd.DataFrame(dictionary)
        
        return df
    
    def return_timetable(self):
        """Method to finalize dataframe to display to user.

        Returns dataframe containing only times of departure for that line.
        """
    
        df = DisplayTimetables.get_timetable(StopID)
        
        # Drop columns don't want to display and any duplicates
        df = df.drop('DAY_OF_WEEK', axis=1)
        df = df.drop('ROUTEID', axis=1)
        df = df.drop_duplicates(subset=['PLANNED_DEP_R_M5'])
        
        #prep dataframe for return as dictionary for frontend use
        # df = df.set_index('PLANNED_DEP_R_M5').T.to_dict('index_names')

        return df

time = DisplayTimetables()
print(time.extract_route_ID())
print(time.get_timetable())
print(time.return_timetable())

