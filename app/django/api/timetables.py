from api.query import Query
import pandas as pd
import numpy as np

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

        day = day.lower()

        # Queries the DB timetables table for routeID and departure time from user's stopID/day inputs.
        df = pd.read_sql("SELECT ROUTEID, LINEID, TIME_OF_DAY, DIRECTION, last_stop FROM static_tables.{0}_timetable where STOPPOINTID = {1} order by LINEID, TIME_OF_DAY".format(day, stopID), retreive_DB);

        # Drop duplicates
        df = df.drop_duplicates(subset=['ROUTEID', 'LINEID','TIME_OF_DAY', 'DIRECTION', 'last_stop'])
        
        # Prep time display
        df['TIME_OF_DAY'] = df['TIME_OF_DAY'].astype(str)
        df['TIME_OF_DAY'] = df['TIME_OF_DAY'].str[7:-3]

        # Add direction notice for user to see
        df['DIRECTION'] = np.where(df['DIRECTION']>=1, 'Inbound', 'Outbound')

        # Format last stop for user
        df['last_stop'] = df['last_stop'].astype('string')
        df['last_stop'] = df['last_stop'].str[0:-2]

        #Transform dataframe into dictionary in prep for frontend use.
        df = df.to_dict('records')

        return df