from memory_profiler import profile
from api.timetables import DisplayTimetables
import time

inputs = ['288', "Sunday"]

@profile
def get_TT(stop, day):
  tt = DisplayTimetables()
  res = tt.return_timetable(stop, day)
  return res


start = time.perf_counter()
get_TT(inputs[0], inputs[1])
end = time.perf_counter()

result = end - start

with open('timings.csv', 'a') as file:
  inputs = str(inputs).replace(",", "")
  file.write(f"\ntimetable,{inputs},{result}")
