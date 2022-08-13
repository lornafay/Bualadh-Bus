from memory_profiler import profile
from datetime import datetime as dt
from api.journey_times import JourneyTimes
import time

today = str(dt.now())
inputs = [today, '288', '7602']

@profile
def get_JT(inputs):
  j = JourneyTimes(inputs)
  res = j.return_user_journey_time_lineID()
  return res

start = time.perf_counter()
get_JT(inputs)
end = time.perf_counter()

result = end - start

with open('timings.csv', 'a') as file:
  outcome = "journey time prediction"
  code_modification = "model_queries class search narrowed by day"
  inputs = str(inputs).replace(",", "")
  
  file.write(f"\n{outcome},{code_modification},{inputs},{result}")