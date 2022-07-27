from .parse_arguments import Parse_arguments
from .model_querries import ModelQuerries
import pandas as pd
import pickle
import numpy as np


class JourneyTimes(ModelQuerries):

    def __init__(self, lst):
        super(Parse_arguments, self).__init__()
        time = lst[0]
        start = lst[1]
        end = lst[2]
        self.parse_arguments = super(ModelQuerries, self)
        self.date = self.parse_arguments.__set_date_time__(time)
        self.beginning_stop = self.parse_arguments.__set_beginningstop__(start)
        self.ending_stop = self.parse_arguments.__set_endingstop__(end)
        super(JourneyTimes, self).__init__(lst)


    def predict_total_journey_time(self):
        # call Get_PModel_Values in super() to get dictionary of routeID and feature selection df
        route_feature_dict = super().get_pmodel_values()
        routes = route_feature_dict.keys()

        for k, value in route_feature_dict.items():
            for column in value.columns:

                if column == "sea_lvl_pressure":
                    value.rename(columns={
                        'sea_lvl_pressure': 'sea_lvl_pressure(hPa)'
                    }, inplace=True)

                elif column == "humidity":
                    value.rename(columns={
                        'humidity': 'humidity(%)'
                    }, inplace=True)
        
                elif column == "dew_pt_temp":
                    value.rename(columns={
                        'dew_pt_temp': 'dew_pt_temp(C)'
                    }, inplace=True)
        
        
        result_df = pd.DataFrame()

        routeid_list = []
        total_list = []

        # read pickle file for each routeid of dict
        for route in routes:
            with open(f'Best_Perf_Model_Pickle_Mix/{route}.pkl', 'rb') as file:
                model = pickle.load(file)

                # generate prediction
                inputs = route_feature_dict[route]
                print(f"Route {route} features: \n{inputs}")
                prediction = model.predict(inputs)[0] # prediction returns as a list type
                routeid_list.append(route)
                total_list.append(prediction)

        # build df and return
        result_df['ROUTEID'] = routeid_list
        result_df['TOTAL_TIME_PREDICTION'] = total_list

        return result_df


    def get_user_journey_time(self):
        # call methods in super() to get stop proportion dataframes for stops
        beginning_df = super().get_time_percent("Beginning_stop")
        end_df = super().get_time_percent("Ending_stop")

        print(f"\nbeginning df\n{beginning_df}\n\nending df\n{end_df}\n")

        # call predict_total_journey_times
        total_times_df = self.predict_total_journey_time()
        routes = list(total_times_df['ROUTEID'])

        print(f"\ntotal times df\n{total_times_df}\n\nroutes\n{routes}\n")
        
        # initilise empty df and columns
        user_props_df = pd.DataFrame(columns=['ROUTEID', 'USER_JOURNEY_TIME'])
        routeid_list = []
        user_time_list = []

        # for each routeid in total times
        for route in routes:
            # ending_time - beginning_time%s x total_jt
            beg_prop = round(
                beginning_df[beginning_df['ROUTEID'] == route]['TRIPS_TIME_PROPORTION_v2'].unique()[0], 4)
            end_prop = round(
                end_df[end_df['ROUTEID'] == route]['TRIPS_TIME_PROPORTION_v2'].unique()[0], 4)
            total_time = total_times_df[total_times_df['ROUTEID'] == route]['TOTAL_TIME_PREDICTION'].unique()[0]
            # apply formula and append results to df lists
            user_time = (end_prop - beg_prop) * total_time
            print(f"\n{route}:\nbeg_prop: {beg_prop}\nend_prop: \n{end_prop}\nuser_time: {user_time}\n")
            routeid_list.append(route)
            user_time_list.append(round(user_time))
       
        # build df and return
        user_props_df['ROUTEID'] = routeid_list
        user_props_df['USER_JOURNEY_TIME'] = user_time_list

        print("User JT df: \n", user_props_df, "\n")
        
        return user_props_df


    def parse_routeID_lineID(self):
        # call get_user_journey_time
        user_times_df = self.get_user_journey_time()

        # parse the lineIDs from the routeIDs
        lineIDs = list(user_times_df['ROUTEID'])
        for route in lineIDs:
            lineIDs[lineIDs.index(route)] = route.split('_')[0]

        # add new lineID column
        user_times_df['LINEID'] = lineIDs

        # return routeid/result df
        return user_times_df


    def normalise_routeID_weights(self):
        # call routeID_weights from super()
        weights_df = super().routeid_weights()
        weights_df.drop(['Beginning_stop', 'Ending_stop'], axis=1, inplace=True)
        print("\nweight DF: \n", weights_df)
        # call parse_routeID_lineID to get lineID/routeID/results df
        lineid_df = self.parse_routeID_lineID()
        print("\nlineID DF: \n", lineid_df)

        # join dfs on routeID
        df = lineid_df.merge(weights_df, on='ROUTEID')


        print(f"\nweight merged DF:\n{df}")

        # get the lineID weight by summing routeID weights for that line
        line_weights = df.groupby(['LINEID'])['Weight'].sum()
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
            normalised_final.append(round(list(df['Weight'])[row] / list(df['normalised_weight'])[row], 3))

        df['normalised_weight'] = normalised_final
        df.drop('Weight', axis=1, inplace=True)
        
        # return lineID/routeID/results/normalised_weights df
        return df


    def get_user_journey_time_lineID(self):
        # call normalise_routeID_weights
        df = self.normalise_routeID_weights()

    
        # get weighted average time for each lineID 
        weighted_time = []
        for row in df.index:
            weighted_time.append(df['USER_JOURNEY_TIME'][row] * df['normalised_weight'][row])
        df['weighted_time'] = weighted_time

        # construct a lineID/results df 
        line_time_df = pd.DataFrame(df.groupby(['LINEID'])['weighted_time'].sum().sort_values()).reset_index()

        return line_time_df


    def return_user_journey_time_lineID(self):
        
        # call get_user_journey_time_lineID
        line_time_df = self.get_user_journey_time_lineID()  

        options_arr = []

        # for each travel option convert the seconds count to hours and mins
        for row in line_time_df.index:
            secs = line_time_df['weighted_time'][row]
            mins = round(secs / 60)
            hours = round(mins / 60)
            res_dict = {
                        'line': list(line_time_df['LINEID'])[row],
                        'hours': hours,
                        'mins': mins
                        }

            options_arr.append(res_dict)
            
        return options_arr


#obj = JourneyTimes()
#print(obj.return_user_journey_time_lineID())
