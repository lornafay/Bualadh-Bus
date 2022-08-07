import json
import os
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from .parse_arguments import Parse_arguments
import datetime

class ModelQuerries(Parse_arguments):
    """Class which will return majority of querries from sql for model to function"""

    def __init__(self, lst):
        """initializing instance variables"""
        # creating Parse_arguments object
        super(ModelQuerries, self).__init__(lst)
        self.parse_arguments = super(ModelQuerries, self)
        # calling methods on parse_arguments object initializing output as instance variable
        self.beginning_stop = self.parse_arguments.get_beginningstop()
        self.ending_stop = self.parse_arguments.get_endingstop()
        self.date = self.parse_arguments.parse_date()
        self.day_of_week = self.parse_arguments.extract_day_of_week()
        self.forecast_date = self.parse_arguments.transform_to_forecast_date()
        # Inheriting instance variables from Query class.
        super(Parse_arguments, self).__init__()
        # creating Query object
        self.engine = super(Parse_arguments, self)
        # calling methods on Query object initializing output as instance variable
        self.engine_static = self.engine.get_engine("static_tables")
        self.engine_dynamic = self.engine.get_engine("DBus")
        # calling set_route_id method to initialize its output as instance variable.
        self.route_id_list = self.set_route_id()

    # Getters and Setters for testing purposes.
    def __get_beginning_stop__(self):
        return self.beginning_stop

    def __set_beginning_stop__(self, value):
        self.beginning_stop = value

    def __get_ending_stop__(self):
        return self.ending_stop

    def __set_endingstop__(self, value):
        self.ending_stop = value

    def __get_date__(self):
        return self.date

    def __set_date__(self, value):
        self.date = value

    def __get_forecast_date__(self):
        return self.forecast_date

    def __set_forecast_date__(self, value):
        self.forecast_date = value

    @staticmethod
    def route_id_query_string(roueid_list):
        """Helper method to avoid code repeat. Takes a list and creates a string tagged with
         'ROUTEID =' and 'Or' and '()' at appropriate places for sql querries, returns a string output"""
        routeid_query_str = "("
        for routeid in roueid_list:
            routeid_query_str += "ROUTEID = '"+routeid+"' OR "
        routeid_query_str = routeid_query_str[:-4]+")"
        return routeid_query_str

    def set_route_id(self):
        """Querry STOPPOINTID_pairs_vs_ROUTEID table at static_tables schema 
        to return a ROUTEID list for user's chosen Beginning_stop and Ending_stop depending on 
        time of day and day of week"""
        # obtaining all routeid's matching stoppair
        df = pd.read_sql("SELECT * FROM static_tables.STOPPOINTID_pairs_vs_ROUTEID where "
                         " Beginning_stop = "+self.beginning_stop+" AND Ending_stop= " +
                         self.ending_stop, self.engine_static)
        raw_routeid_list = df["ROUTEID"].tolist()
        
        routeid_query_str = ModelQuerries.route_id_query_string(
            raw_routeid_list)
        # filtering all routeid's matching stoppair to deduct routeids operating -+30 min of user's date/time input
        df_date_time_adjust = pd.read_sql("SELECT ROUTEID FROM static_tables."+self.day_of_week+" where "
                                          + routeid_query_str + " AND STOPPOINTID = "+self.beginning_stop +
                                          " AND TIME_OF_DAY between " +
                                          "SUBTIME('"+str(self.date.hour)+":00:00', '0:30:00') and " +
                                          " ADDTIME('"+str(self.date.hour)+":00:00', '0:30:00')", self.engine_static)
        print("set_route_id df_date_time_adjust: " , df_date_time_adjust)
        # selecting unique values sorting and returning list output.
        date_time_adjusted_list = list(
            set(df_date_time_adjust["ROUTEID"].tolist()))
        date_time_adjusted_list.sort()
        print("set_route_id date_time_adjusted_list after sort: " , date_time_adjusted_list)
        return date_time_adjusted_list

    def get_time_percent(self, var):
        """Query timetables(day of week) table at static_tables schema to get TRIPS_TIME_PROPORTION_v2 for 
            user's chosen stop at user's chosen day of week of each route,
            return a ROUTEID stop TRIPS_TIME_PROPORTION_v2 dataframe. Takes one 
            required argument which can be Beginning_stop or Ending_stop
            if argument is wrong raises a value error"""

        route_id_list = self.route_id_list
        routeid_query_str = ModelQuerries.route_id_query_string(route_id_list)
        # query for desired output by taking average of trips time proportion.
        if var == "Beginning_stop":
            df = pd.read_sql("SELECT ROUTEID, STOPPOINTID, AVG(TRIPS_TIME_PROPORTION_v2) FROM " +
                             "static_tables."+self.day_of_week+" where " + routeid_query_str + " AND STOPPOINTID = " +
                             self.beginning_stop + 
                             " GROUP BY ROUTEID, STOPPOINTID", self.engine_static)
            df.rename(columns={
                      "AVG(TRIPS_TIME_PROPORTION_v2)": 'TRIPS_TIME_PROPORTION_v2'}, inplace=True)
            print("="*66)
            print("get_time_percent: ",df)
            return df
        elif var == "Ending_stop":
            df = pd.read_sql("SELECT ROUTEID, STOPPOINTID, AVG(TRIPS_TIME_PROPORTION_v2) FROM " +
                             "static_tables."+self.day_of_week+" where " + routeid_query_str + " AND STOPPOINTID = " +
                             self.ending_stop + 
                             " GROUP BY ROUTEID, STOPPOINTID", self.engine_static)
            df.rename(columns={
                      "AVG(TRIPS_TIME_PROPORTION_v2)": 'TRIPS_TIME_PROPORTION_v2'}, inplace=True)
            print("="*66)
            print("get_time_percent: ",df)
            return df
        else:
            raise(ValueError)

    def get_pmodel_features(self):
        """Query feature_selection table at static_tables schema to get features for the predictive model 
        of ROUTEID, return ROUTEID(key) vs feature_list(value) dictionary"""
        route_id_list = self.route_id_list
        routeid_query_str = ModelQuerries.route_id_query_string(route_id_list)
        # Query database to obtain dataframe for routeid list
        df = pd.read_sql("SELECT* FROM static_tables.feature_selection where" +
                         routeid_query_str, self.engine_static)

        features_dict = {}
        # group dataframe by routeid and create dict with list of dataframe's as values
        df_dict = dict(list(df.groupby(df['ROUTEID'])))
        # iterate content of dataframe dictionary
        for key, value in df_dict.items():
            # make boolean mask of dataframe as True/False(1/0)
            check = value.columns[(value == 1).any()]
            # Add to dictionary by matching routeid key with lists made out of check True column of dataframe
            if len(check) > 0:
                features_dict[key] = check.tolist()
        print("="*66)
        print("get_pmodel_features: ",features_dict)
        return features_dict

    def get_pmodel_values(self):
        """Method to feed features for prediction to predictive models in pickle files:
        Depending on the condition that PLANNEDTIME_DEP is in ROUTEID(key)'s feature_list(value);
        query timetables(day of week) table at static_tables schema to get values for PLANNEDTIME_DEP,
        depending on the condition that date is current date;
        querry current_weather at DBus schema, depending on the condition that feature is in
        ROUTEID(key)'s feature_list(value) to  get values for  feature.
        depending on the condition that date is future date;
        querry weather_forecast at DBus schema, depending on the condition that feature is in ROUTEID(key)'s 
        feature_list(value) to get values for feature creates dataframe with feature values for each routeid and
        appends to a dictionary returns  dictionary of dataframes where keys of dictionary are routeids and
        values are dataframes
        """
        # call get_pmodel_features method
        feature_names_dict = self.get_pmodel_features()
        current_time = datetime.datetime.now().hour
        current_date = datetime.datetime.now().date()
        print("get_pmodel_values: self.day_of_week: ", self.day_of_week)
        print("get_pmodel_values: self.date: ", self.date)
        # initialize empty dictionary to append dataframes by routeid keys
        feature_values_dict = {}
        for key, value in feature_names_dict.items():
            # initialize empty dataframe to fill with column name and value of features for the routeid
            df = pd.DataFrame()
            # If plannedtime departure is in pmodel_features dictionary value,
            # query for planned time deparure for final stop points
            # where time is closests to user's time input for hour of day.
            if 'PLANNEDTIME_DEP' in value:
                #changed TRIPS_TIME_PROPORTION_v2 >0.89 to cover for cases where 
                df_plannedtime_dep = pd.read_sql("SELECT PLANNEDTIME_DEP FROM static_tables."+self.day_of_week+ 
                                                 " where  ROUTEID = '"+key+
                                                 "' AND TRIPS_TIME_PROPORTION_v2 >0.89 " +
                                                 "ORDER BY ABS(TIME_TO_SEC(TIMEDIFF(TIME_OF_DAY, '" +
                                                 str(self.date.hour)+":00:00'))) LIMIT 1", self.engine_static)
                df = pd.concat([df, df_plannedtime_dep], axis=1)

            # check if weather feature is in feature list if it is append to query string.
            weather_feature_query_str = ""
            feature_checker = False
            if 'rain' in value:
                weather_feature_query_str += ' rain '
                feature_checker += True
            if 'temp' in value:
                if feature_checker > 0:
                    weather_feature_query_str += ',temp '
                else:
                    weather_feature_query_str += 'temp '
                feature_checker += True
            if 'dew_pt_temp' in value:
                if feature_checker > 0:
                    weather_feature_query_str += ',dew_pt_temp '
                else:
                    weather_feature_query_str += 'dew_pt_temp '
                feature_checker += True
            if 'humidity' in value:
                if feature_checker > 0:
                    weather_feature_query_str += ',humidity '
                else:
                    weather_feature_query_str += 'humidity '
                feature_checker += True
            if 'sea_lvl_pressure' in value:
                if feature_checker > 0:
                    weather_feature_query_str += ',sea_lvl_pressure '
                else:
                    weather_feature_query_str += 'sea_lvl_pressure '

            # don't query the weather tables if no weather features were selected for this model
            if weather_feature_query_str != "":

                # If hour of user's time input matches current hour query current weather table
                # If not query feature weather table.
                if current_time == self.date.hour and current_date == self.date.date():
                    print("model_querries: get_pmodel_values() current_time: ", current_time)
                    df_weather = pd.read_sql("SELECT " + weather_feature_query_str + " FROM  DBus.current_weather",
                                            self.engine_dynamic)
                    df = pd.concat([df, df_weather], axis=1)
                else:
                    print("model_querries: get_pmodel_values() self.forecast_date: ", self.forecast_date)
                    date = self.forecast_date
                    df_weather = pd.read_sql("SELECT " + weather_feature_query_str +
                                            " FROM  DBus.weather_forecast where time ='"+str(date)+"'", self.engine_dynamic)
                    df = pd.concat([df, df_weather], axis=1)

            # applying cyclical encoding with sine/cosine transformation for hour of day
            hour_sin_val = np.sin(np.deg2rad((self.date.hour/24)*360))
            hour_cos_val = np.cos(np.deg2rad((self.date.hour/24)*360))
            hour_data = [[hour_sin_val, hour_cos_val]]
            hour_columns = ['sin_hour_of_day', 'cos_hour_of_day']
            df_hour = pd.DataFrame(hour_data, columns=hour_columns)
            df = pd.concat([df, df_hour], axis=1)

            # check if day of week in feature list if it is add it as column
            # apply binary encoding based on user's day of week input for day of week
            day_columns = []
            day_data = []
            if 'friday' in value:
                day_columns.append('friday')
                if self.day_of_week == 'Friday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            if 'monday' in value:
                day_columns.append('monday')
                if self.day_of_week == 'Monday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            if 'saturday' in value:
                day_columns.append('saturday')
                if self.day_of_week == 'Saturday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            if 'sunday' in value:
                day_columns.append('sunday')
                if self.day_of_week == 'Sunday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            if 'thursday' in value:
                day_columns.append('thursday')
                if self.day_of_week == 'Thursday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            if 'tuesday' in value:
                day_columns.append('tuesday')
                if self.day_of_week == 'Tuesday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            if 'wednesday' in value:
                day_columns.append('wednesday')
                if self.day_of_week == 'Wednesday':
                    day_data.append(1)
                else:
                    day_data.append(0)
            df_days = pd.DataFrame([day_data], columns=day_columns)
            df = pd.concat([df, df_days], axis=1)

            # add final dataframe to routeid/df dictionary
            feature_values_dict[key] = df
        print("="*66)
        print("get_pmodel_values: ",feature_values_dict)
        return feature_values_dict

    def routeid_weights(self):
        """Query STOPPOINTID_pairs_vs_ROUTEID table at static_tables schema to get weights,
        return routeid/weights dataframe"""
        route_id_list = self.route_id_list
        routeid_query_str = ModelQuerries.route_id_query_string(route_id_list)
        # query for desired output
        df = pd.read_sql("SELECT * FROM static_tables.STOPPOINTID_pairs_vs_ROUTEID where "
                         "Beginning_stop = '"+self.beginning_stop +
                         "'AND Ending_stop= '"+self.ending_stop + "' AND "
                         + routeid_query_str, self.engine_static)
        print("="*66)
        print("routeid_weights: ",df)
        return df
