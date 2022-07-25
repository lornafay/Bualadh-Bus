from .parse_arguments import Parse_arguments
from .model_querries import ModelQuerries
import pandas as pd
import pickle
import numpy as np


class JourneyTimes(ModelQuerries):

    def __init__(self):
        super(Parse_arguments, self).__init__()
        self.parse_arguments = super(ModelQuerries, self)
        self.date = self.parse_arguments.__set_date_time__('2022-07-23T12:00:00.000Z')
        self.beginningstop = self.parse_arguments.__set_beginningstop__('395')
        self.ending_stop = self.parse_arguments.__set_endingstop__('4662')
        super(JourneyTimes, self).__init__()


    def predict_total_journey_time(self):
        # call Get_PModel_Values in super() to get dictionary of routeID and feature selection df
        route_feature_dict = super().get_pmodel_values()
        routes = route_feature_dict.keys()
        
        result_dict = pd.DataFrame()

        routeid_list = []
        total_list = []

        # read pickle file for each routeid of dict
        for route in routes:
            with open(f'../Best_Perf_Model_Pickle_Mix/{route}.pkl', 'rb') as file:
                model = pickle.load(file)

                # generate prediction
                #inputs = route_feature_dict[route].to_numpy() 
                inputs = route_feature_dict[route]
                prediction = model.predict(inputs)
                routeid_list.append(route)
                total_list.append(prediction)

        # build df and return
        df = pd.DataFrame(result_dict)
        result_dict['ROUTID'] = routeid_list
        result_dict['TOTAL_TIME_PREDICTION'] = total_list

        return df


    def get_user_journey_time(self, beg_stop: str, end_stop: str):
        # call methods in super() to get stop proportion dataframes for stops
        beginning_df = super().get_time_percent("beginning")
        end_df = super().get_time_percent("ending")

        # call predict_total_journey_times
        total_times_df = self.predict_total_journey_time()
        routes = list(total_times_df['ROUTEID'])
        
        # initilise empty df and columns
        user_props_df = pd.DataFrame()
        routeid_list = []
        user_time_list = []

        # for each routeid in total times
        for route in routes:
            # ending_time - beginning_time%s x total_jt
            beg_prop = beginning_df[beginning_df['ROUTEID'] == route]['TRIPS_TIME_PROPORTION_v2']
            end_prop = end_df[end_df['ROUTEID'] == route]['TRIPS_TIME_PROPORTION_v2']
            total_time = total_times_df[total_times_df['ROUTEID'] == route]['TOTAL_TIME_PREDICTION']

            # apply formula and append results to df lists
            user_time = (end_prop - beg_prop) * total_time
            routeid_list.append(route)
            user_time_list.append(user_time)
       
        # build df and return
        user_props_df['ROUTEID'] = routeid_list
        user_props_df['USER_JOURNEY_TIME'] = user_time_list
        
        return user_props_df


    def parse_routeID_lineID(self):
        # call get_user_journey_time
        user_times_df = self.get_user_journey_time()

        # parse the lineIDs from the routeIDs
        lineIDs = list(user_times_df['ROUTEID'])
        for route in lineIDs:
            lineIDs[lineIDs.index(route)] = route.split('_')[0]

        # add new lineID column
        user_times_df['lineIDs'] = lineIDs

        # return routeid/result df
        return user_times_df


    def normalise_routeID_weights(self):
        # call routeID_weights from super()
        weights_df = super().routeid_weights()
        # call parse_routeID_lineID to get lineID/routeID/results df
        line_weights_df = self.parse_routeID_lineID(weights_df)

        with line_weights_df as df:

            # get the lineID weight by summing routeID weights for that line
            line_weights = df.groupby(['LINEID'])['weight'].sum()
            line_weight_seq = []

            # create list of lineID weights in sequence matching df
            # limimting decimal places so keep number small
            for line in list(df['LINEID']):
                line_weight_seq.append(round(line_weights[line], 4))
            df['normalised_weight'] = line_weight_seq

            print('before normalising:\n', df)

            # normalised weight is proportion of routeID weight of total lineID weight 
            normalised_final = []
            for row in df.index:
                normalised_final.append(round(df['weight'][row] / df['normalised_weight'][row], 3))

            df['normalised_weight'] = normalised_final
            df.drop('weight', axis=1, inplace=True)
            
            # return lineID/routeID/results/normalised_weights df
            return df


    def get_user_journey_time_lineID(self):
        # call normalise_routeID_weights
        routes_df = self.normalise_routeID_weights()

        with routes_df as df:
            # get weighted average time for each lineID 
            weighted_time = []
            for row in df.index:
                weighted_time.append(df['result'][row] * df['normalised_weight'][row])
            df['weighted_time'] = weighted_time

            # construct a lineID/results df 
            line_time_df = pd.DataFrame(df.groupby(['LINEID'])['weighted_time'].sum().sort_values()).reset_index()

            return line_time_df


    def return_user_journey_time_lineID(self):
        
        # call get_user_journey_time_lineID
        line_time_df = self.get_user_journey_time_lineID()  

        options_dict = {}

        # for each travel option convert the seconds count to hours and mins
        for row in line_time_df.index:
            secs = line_time_df['weighted_time'][row]
            mins = round(secs / 60)
            hours = round(mins / 60)

            options_dict[line_time_df['LINEID'][row]] = {
                                            'hours': hours,
                                            'mins': mins
                                            }
        return options_dict


obj = JourneyTimes()
print(obj.return_user_journey_time_lineID())