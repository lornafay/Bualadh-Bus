from cgitb import reset
from time import time
import unittest
import api.route_map as rm

class TestQuery(unittest.TestCase):


    def test_get_intermediate_stops(self):

        lst = ["77A", "395", "4662", "thursday"]
        map = rm.RouteMap(lst)
        result = map.get_intermediate_stops()

        self.assertTrue(type(result) == list)
        self.assertTrue(type(result[0]) == int)


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
