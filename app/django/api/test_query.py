import unittest
import query as q
import pandas as pd


class TestQuery(unittest.TestCase):

    def test_get_engine_static_tables(self):
        """checks if enginee connects to correct schema when schema name static_tables is given as argument"""
        schema="static_tables"
        #class call
        myquery=q.Query()
        #create enginee method call
        engine= myquery.get_engine(schema)
        #write query to dataframe
        myquery= pd.read_sql("SELECT DATABASE()", engine)
        #return value from dataframe
        result= myquery.loc[0][0]
        #check if returned value is same as desired to verify connection to correct schema establisted
        self.assertEqual(result,"static_tables")
    
    def test_get_engine_DBus(self):
        """checks if enginee connects to correct schema when schema name DBus is given as argument"""
        schema="DBus"
        #class call
        myquery=q.Query()
        #create enginee method call
        engine= myquery.get_engine(schema)
        #write query to dataframe
        myquery= pd.read_sql("SELECT DATABASE()", engine)
        #return value from dataframe
        result= myquery.loc[0][0]
        #check if returned value is same as desired to verify connection to correct schema establisted
        self.assertEqual(result,"DBus")

if __name__== '__main__':
    unittest.main()
