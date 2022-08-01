import pandas as pd

df_dict = {
            'ROUTEID' : ['77A_3','77A_4','42_7', '42_8'],
            'result' : [1050, 928, 1078, 902]
        }

df = pd.DataFrame(df_dict)

print(list(df['ROUTEID']))


# parse the lineIDs from the routeIDs
lineIDs = list(df['ROUTEID'])
for route in lineIDs:
    lineIDs[lineIDs.index(route)] = route.split('_')[0]

df['LINEID'] = lineIDs
df['weight'] = [0.078, 0.043, 0.056, 0.032]

print(df)

# get the lineID weight by summing routeID weights for that line
line_weights = df.groupby(['LINEID'])['weight'].sum()
line_weight_seq = []

# create list of lineID weights in sequence matching df
# limimting decimal places so keep number small
for line in list(df['LINEID']):
    line_weight_seq.append(round(line_weights[line], 4))
df['normalised_weight'] = line_weight_seq

print('before normalising:\n', df)

normalised_final = []
# normalise weight col
for row in df.index:
    normalised_final.append(round(df['weight'][row] / df['normalised_weight'][row], 3))
df['normalised_weight'] = normalised_final
df.drop('weight', axis=1, inplace=True)

print('after normalising:\n', df)

#### next function ####

# get weighted average time for each lineID 
weighted_time = []
for row in df.index:
    weighted_time.append(df['result'][row] * df['normalised_weight'][row])
df['weighted_time'] = weighted_time

line_time_df = pd.DataFrame(df.groupby(['LINEID'])['weighted_time'].sum().sort_values()).reset_index()


print('lineID weighted journey time: \n', line_time_df)
print(list(line_time_df))


### next function ###

# call get_user_journey_time_lineID
#line_time_df = self.get_user_journey_time_lineID()  


options_dict = {}


for row in line_time_df.index:
    # convert to readable time
    secs = line_time_df['weighted_time'][row]
    mins = round(secs / 60)
    hours = round(mins / 60)

    options_dict[line_time_df['LINEID'][row]] = {
                                    'hours': hours,
                                    'mins': mins
                                    }


#readable_df = pd.DataFrame(time_dict)
print("\n", options_dict)




