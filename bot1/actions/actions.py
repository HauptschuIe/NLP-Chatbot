# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests
from datetime import datetime
import time

class ActionWeather(Action):

    def name(self) -> Text:
        return "action_weather_api"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        city = tracker.get_slot("city").capitalize()
        date = tracker.get_slot("date")
        return_date = "Right now"
        if(city is None):
            city = "Reutlingen"
        if(date is None):
            date = int(time.time())
        if(date == "tomorrow"):
            date = int(time.time() + 86400)
            return_date = "Tomorrow"
        data = returnData(city, date)
        temp = int(data['main']['temp'] - 273)
        description = str(data['weather'][0]['description'])
        dispatcher.utter_message(response="utter_weather", temp=temp, description=description, date = return_date)

        return []


class ActionSunrise(Action):
    def name(self) -> Text:
        return "action_sunrise_api"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        city = tracker.get_slot("city").capitalize()
        if(city is None):
            city = "Reutlingen"
        date = None
        data = returnData(city, date)
        sunrise_unix = data['sys']['sunrise']
        offset = data['timezone']
        sunrise_localtime = datetime.utcfromtimestamp(sunrise_unix + offset).strftime('%H:%M:%S')

        dispatcher.utter_message(response="utter_sunrise", sunrise_localtime=sunrise_localtime)
        
        return []


class ActionSunset(Action):
    def name(self) -> Text:
        return "action_sunset_api"
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        city = tracker.get_slot("city").capitalize()
        if(city is None):
            city = "Reutlingen"

        date = None
        data = returnData(city, date)
        sunset_unix = data['sys']['sunset']
        offset = data['timezone']
        sunset_localtime = datetime.utcfromtimestamp(sunset_unix + offset).strftime('%H:%M:%S')

        dispatcher.utter_message(response="utter_sunset", sunset_localtime=sunset_localtime)
        
        return []



class ActionWind(Action):
    def name(self) -> Text:
        return "action_wind_api"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        city = tracker.get_slot("city").capitalize()
        if(city is None):
            city = "Reutlingen"

        date = None
        data = returnData(city, date)
        speed_mph = data['wind']['speed']
        speed = round(speed_mph * 1.6093440006147, 2)
        degree = data['wind']['deg']


        if (degree>337.5): 
            degree_description = 'Northerly'
        if (degree>292.5): 
            degree_description = 'North Westerly'
        if(degree>247.5): 
            degree_description = 'Westerly'
        if(degree>202.5): 
            degree_description = 'South Westerly'
        if(degree>157.5): 
            degree_description = 'Southerly'
        if(degree>122.5): 
            degree_description = 'South Easterly'
        if(degree>67.5): 
            degree_description = 'Easterly'
        if(degree>22.5):
            degree_description = 'North Easterly'

        dispatcher.utter_message(response="utter_wind", speed=speed, degree_description=degree_description)
        
        return []

class ActionHumidity(Action):
    def name(self) -> Text:
        return "action_humidity_api"
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        city = tracker.get_slot("city").capitalize()
        if(city is None):
            city = "Reutlingen"

        date = None
        data = returnData(city, date)
        humidity = data['main']['humidity']

        dispatcher.utter_message(response="utter_humidity", humidity=humidity)
        
        return []

# Fallback Key 72d892b8a95691dda766eef45635a22a || 86102def3d3cbcd7acb8864254af9a2f
def returnData(city, date):
    api_adress = 'http://api.openweathermap.org/data/2.5/weather?appid=72d892b8a95691dda766eef45635a22a&q='
    if (date is not None):
        date = '&date={}'.format(date)
        url = api_adress + city + date
    else:
        url = api_adress + city
    
    json_data = requests.get(url).json()

    return json_data




