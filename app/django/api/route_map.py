from bus.models import stop_locations as sl
from .query import Query
import pandas as pd


class RouteMap():
    def __init__(self, lst):
        self.line = lst[0]
        self.start = int(lst[1])
        self.end = int(lst[2])
        self.day = lst[3]

    def get_intermediate_stops(self):
        '''gets the stops along the user's journey for given line'''

        query = Query()
        static_tables = query.get_engine("static_tables")
        # query timetables table for the user's chosen line stop sequence
        
        #df = pd.read_sql("SELECT DISTINCT STOPPOINTID FROM static_tables.{0}_timetable_V2 WHERE ROUTEID IN (SELECT DISTINCT ROUTEID FROM static_tables.{0}_timetable_V2 WHERE LINEID = '{1}' AND STOPPOINTID = {2}) ORDER BY TRIPS_TIME_PROPORTION_v2;".format(self.day, self.line, self.start), static_tables)
        df = pd.read_sql("SELECT DISTINCT STOPPOINTID FROM static_tables.{0}_timetable_V2 WHERE ROUTEID IN (SELECT DISTINCT ROUTEID FROM static_tables.{0}_timetable_V2 WHERE ROUTEID IN (SELECT ROUTEID FROM static_tables.{0}_timetable_V2 WHERE LINEID = '{1}' AND STOPPOINTID = {2}) AND ROUTEID IN (SELECT ROUTEID FROM static_tables.{0}_timetable_V2 WHERE LINEID = '{1}' AND STOPPOINTID = {3})) ORDER BY TRIPS_TIME_PROPORTION_v2;".format(self.day, self.line, self.start, self.end), static_tables)

        stop_sequence = list(df['STOPPOINTID'].astype(int))

        # code to narrow route down to user's segment only, does not work very well in practice
        #start_ind = stop_sequence.index(self.start)
        #end_ind = stop_sequence.index(self.end)
        #user_journey_stops = stop_sequence[start_ind:end_ind+1]

        return stop_sequence

        
    def get_intermediate_stop_locations(self):
        '''gets the location details for the intermediate stops along journey'''

        stop_sequence = self.get_intermediate_stops()
        stops = sl.objects.filter(STOPPOINTID__in=stop_sequence)

        result = []
        for stop in stops:
            if type(stop.LOCATION) == str:
                result.append({"stop": stop.STOPPOINTID,
                               "latlng": { "lat": stop.LAT,
                                           "lng": stop.LNG,
                                         },
                               "loc": stop.LOCATION,
                              })
        
        return result
