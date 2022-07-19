import unittest
from divisors.divisors import findDivisors2357


class TestCase(unittest.TestCase):

    def testValues(self):

        self.assertEqual(findDivisors2357(35), [5, 7])
        self.assertEqual(findDivisors2357(10), [2, 5])
        self.assertEqual(findDivisors2357(100), [2, 5])
        self.assertEqual(findDivisors2357(17), [])
        self.assertEqual(findDivisors2357(0), [])
        self.assertEqual(findDivisors2357(-35), [])

        #self.assertTrue(findDivisors2357(60) == [2, 3, 5])
        #self.assertFalse(findDivisors2357(50) == [3, 5])

    def testTypes(self):

        self.assertTrue(type(findDivisors2357(5)) == list)
        with self.assertRaises(TypeError):
            findDivisors2357('string')


if __name__ == '__main__':
    unittest.main()
