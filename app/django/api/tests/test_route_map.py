from cgitb import reset
from time import time
import unittest
import api.route_map as rm

class TestQuery(unittest.TestCase):


    def test_get_intermediate_stops(self):

        lst = ["77A", "395", "4662", "thursday"]
        map = rm.RouteMap(lst)
        result = map.get_intermediate_stops()
        user_route = [395, 398, 396, 397, 399, 400, 4522, 1934, 2310, 2312, 2315, 2095, 2311, 2313, 2314, 2332, 2094, 
                      1409, 1407, 1406, 2103, 2096, 4662, 2336, 2102, 2097, 2099, 2334, 2101, 2337, 2333, 2613, 2335, 
                      2420, 2339, 2424, 2447, 2423, 5133, 2560, 2421, 2602, 2614, 2596, 2615, 2611, 2616, 2536, 2535, 
                      2617, 4436, 2557, 4640, 5008, 4347, 2351, 2349, 2559, 4928, 2558, 4929, 2561, 2562, 2352, 2564, 
                      4927, 4930, 4931, 2574, 7460, 2573, 2575, 7459]

        self.assertTrue(type(result) == list)
        self.assertTrue(type(result[0]) == int)
        self.assertEqual(result, user_route)


    def test_get_intermediate_stop_locations(self):

        lst = ["77A", "395", "4662", "thursday"]
        map = rm.RouteMap(lst)
        result = map.get_intermediate_stop_locations()

        self.assertTrue(type(result) == list)
        self.assertTrue(type(result[0]) == dict)
        self.assertTrue(list(result[0].keys()) == ['stop', 'latlng', 'loc'])
        self.assertTrue(type(result[0]['stop']) == int)
        self.assertTrue(type(result[0]['latlng']) == dict)
        self.assertTrue(type(result[0]['latlng']['lat']) == float)
        self.assertTrue(type(result[0]['latlng']['lng']) == float)
        self.assertTrue(type(result[0]['loc']) == str)



if __name__== '__main__':
    unittest.main()
