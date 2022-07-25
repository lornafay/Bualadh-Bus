from query import Query
import pandas as pd
from parse_arguments import Parse_arguments as pa
from journey_times import JourneyTimes as jt

class DisplayTimetables:
    """Class to display timetables to user.
    
    Contains one method to query database for StopID provided by user.
    Returns necessary timetable information.
    """

    def return_timetable(self, stopID, day):
        """Method to take user input and query database for timetable info.
        
        Takes user input of: StopID and day of travel.
        Queries database for RouteID and bus arrival time for each bus at that stop.
        Queries Parse_arguments class for lineID.
        Queries JourneyTimes class to parse RouteID and lineID together.
        Returns array with key pairs for line ID and bus arrival time.
        """
        
        # Creates connection to DB static tables
        query= Query()
        DBs = ("static_tables")
        retreive_DB = query.get_engine(DBs)

        # Queries the DB timetables table for routeID and departure time from user's stopID/day inputs
        df = pd.read_sql("SELECT ROUTEID, TIME_OF_DAY FROM static_tables.timetables Where STOPPOINTID = '{0}' and DAY_OF_WEEK = '{1}' order by ROUTEID, TIME_OF_DAY".format(stopID, day), retreive_DB);
        routeID_unique = df["ROUTEID"].unique()

        ### WILL FIX LINEID ONCE JOURNEYTIMES CLASS FINISHED
        # Get line id from django after user input
        lineID = pa.get_lineid(routeID_unique)

        # Get line and route id together and drop result.
        line_route = jt.parse_routeID_lineID(lineID)
        line_route = line_route.drop('result', axis=1)

        # Delete this lineID when JourneyTimes class finished.
        line_route = {
            'LINEID' : ['77A', '77A', '77A', '1'],
            'ROUTEID' : ['77A_30', '77A_30', '77A_29', '1_40']
        }
        line_route = pd.DataFrame(line_route)

        # Combine returned df with lineID, then drop RouteID column.
        df = pd.DataFrame.merge(df, line_route, on='ROUTEID')
        df = df.drop('ROUTEID', axis=1)

        # Drop duplicates
        df = df.drop_duplicates(subset=['LINEID','TIME_OF_DAY'])

        # Transform dataframe into dictionary in prep for frontend use.
        df = df.to_dict('records')
        
        return df