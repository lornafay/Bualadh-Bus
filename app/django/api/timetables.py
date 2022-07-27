from api.query import Query
import pandas as pd

class DisplayTimetables:
    """Class to display timetables to user.
    
    Contains one method to query database for StopID provided by user.
    Returns necessary timetable information.
    """

    def return_timetable(self, stopID, day):
        """Method to take user input and query database for timetable info.
        
        Takes user input of: StopID and day of travel.
        Queries database for RouteID and bus arrival time for each bus at that stop.
        Parses LineID from RouteID and drops duplicates.
        Returns array with key pairs for line ID and bus arrival time.
        """
        
        # Creates connection to DB static tables
        query= Query()
        DBs = ("static_tables")
        retreive_DB = query.get_engine(DBs)

        # Queries the DB timetables table for routeID and departure time from user's stopID/day inputs.
        df = pd.read_sql("SELECT ROUTEID, TIME_OF_DAY FROM static_tables.timetables Where STOPPOINTID = '{0}' and DAY_OF_WEEK = '{1}' order by ROUTEID, TIME_OF_DAY".format(stopID, day), retreive_DB);

        # Splits the ID from routeID to get the LineID, and then drops ROUTEID.
        df [['LINEID', 'ROUTEID']]= df['ROUTEID'].str.split('_', expand=True)
        df = df.drop('ROUTEID', axis=1)

        # Drop duplicates
        df = df.drop_duplicates(subset=['LINEID','TIME_OF_DAY'])
        
        #prep time display
        df['TIME_OF_DAY'] = df['TIME_OF_DAY'].astype(str)
        df['TIME_OF_DAY'] = df['TIME_OF_DAY'].str[7:-3]

        #Transform dataframe into dictionary in prep for frontend use.
        df = df.to_dict('records')

        return df