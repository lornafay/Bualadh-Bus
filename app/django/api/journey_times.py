from model_querries import ModelQuerries
from model_querries import ModelQuerries as mq
import pandas as pd
import pickle
import numpy as np

item = ModelQuerries()
print(item.get_pmodel_values)

class JourneyTimes(ModelQuerries):

    def __init__(self):
        pass
    
    def predict_total_journey_time():
        # call Get_PModel_Values in super() to get dictionary of routeID and feature selection df
        route_feature_dict = super().get_pmodel_values()
        routes = route_feature_dict.keys()

        result_dict = {}

        # for each routeid in routeid key of dict
            # read in pickle
            # input model/value into dict and append to result df
        for route in routes:
            with open(f'../../../Best_Perf_Model_Pickle_Mix/{route}.pkl', 'rb') as file:
                model = pickle.load(file)

                inputs = routes[route].to_numpy() # PICK UP HERE, ACCESSING DF ROW AS NP ARRAY TO INPUT TO PICKLE
                prediction = model.predict(inputs)
                result_dict[route] = [prediction]

        # return routeid/result df
        # dummy variable
        """df_dict = {
            'ROUTEID' : ['77A_3','77A_4','42_7', '42_8'],
            'result' : [3954, 3694, 2346, 3200]
        }"""

        df = pd.DataFrame(result_dict)

        return df


    def get_user_journey_time(cls):
        # call get_time_per in super()
        # call Get_EndingStop_TimePercentage in super()
        # call predict_total_journey_times
        
        # for each routeid in routeid 
            # ending_time - beginning_time%s x total_jt
            # append to routed/result df
       

        # return routeid/result df
        # dummy variable

        df_dict = {
            'ROUTEID' : ['77A_3','77A_4','42_7', '42_8'],
            'result' : [1050, 928, 1078, 902]
        }
        
        df = pd.DataFrame(df_dict)

        return df


    def parse_routeID_lineID(cls):
        # call get_user_journey_time
        # parse the lineIDs from the routeIDs
        # append lineIDs to routeid/result df

        # return routeid/result df
        # dummy variable

        df_dict = {
            'LINEID' : ['77A', '77A', '42', '42'],
            'ROUTEID' : ['77A_3','77A_4','42_7', '42_8'],
            'result' : [1050, 928, 1078, 902]
        }
        
        df = pd.DataFrame(df_dict)

        return df


    def normalise_routeID_weights(cls):
        # call routeID_weights from super()
        # call parse_routeID_lineID to get lineID/routeID/results df
        # find sum of routeID weights in same lineID to get lineID global weight
        # normalised weight is proportion of routeID weight of total lineID weight 
        # append normalised weight to df

        # return lineID/routeID/results/normalised_weights df
        # dummy variable

        df_dict = {
            'LINEID' : ['77A', '77A', '42', '42'],
            'ROUTEID' : ['77A_3','77A_4','42_7', '42_8'],
            'result': [1050, 928, 1078, 902],
            'normalised_weight': [0.68, 0.32, 0.57, 0.43]
        }
        
        df = pd.DataFrame(df_dict)

        return df


    def get_user_journey_time_lineID(cls):
        # call normalise_routeID_weights
        # for each lineID take weighted average time

        # return lineID/result df
        # dummy variable

        df_dict = {
            'LINEID' : ['77A', '42'],
            'result' : [1011, 653]
        }
        
        df = pd.DataFrame(df_dict)

        return df


    def return_user_journey_time_lineID(cls):
        # call get_user_journey_time_lineID
        # convert to datetime obj
        # extract H:M:S and append to dataframe
        # drop number of seconds (too precise) and round mins
        # return the info as dict obj

        # dummy variable

        results_dict = {
            '77A' : '17 mins',
            '42' : '11 mins'
        }
        
        return results_dict


print(JourneyTimes.predict_total_journey_time())