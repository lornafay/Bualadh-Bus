from cgitb import reset
from time import time
import unittest
import api.route_map as rm

class TestQuery(unittest.TestCase):


    def test_get_intermediate_stops(self):

        lst = ["77A", "395", "4662", "thursday"]
        map = rm.RouteMap(lst)
        result = map.get_intermediate_stops()
        user_route = [395, 396, 397, 398, 399, 400, 4522, 1934, 2310, 2311, 2312, 2313, 2314, 2315, 1407, 1406, 2094, 2095, 1409, 2096, 2097, 2101, 2099, 2102, 2333, 2103, 2334, 2337, 2335, 2420, 2336, 2447, 2339, 2421, 2332, 4662]

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
