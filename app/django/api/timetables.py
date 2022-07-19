from sqlalchemy import create_engine
import json
import os
from query import Query
#import ParseArguments
#import PredictJourneyTimes

class Display_timetables:

    def extract_route_ID(StopPointID):

        #Get line id from django after user input
        # ParseArguements.LineID()

        #get line and route id together?
        # PredictJourneyTimes.Get_LineID_RouteID_Groups(RouteID)

        #return RouteIDs_list
        return ["77A_30", "47_136", "1_40"]
        
    def get_timetables():
        
        #get day of week
        # ParseArguements.Extract_Day_of_Week()

        route_ID = extract_route_ID()

        for i in len(route_ID):
            
            #query database for routeID and Day of week:
                #SELECT * FROM static_tables.timetables Where ROUTEID = "41B_52"
                # and DAY_OF_WEEK = "Tuesday" order by PLANNEDTIME_DEP_R_M5 

            return database

    def return_time_table():
        
        #get database that has all times for routeid on day of week
        timetable = get_timetables()

        #somehow concat that to a table but not clear on how to do until other methods done

        #pandas to drop routeID column and any duplicate rows

        return timetable

