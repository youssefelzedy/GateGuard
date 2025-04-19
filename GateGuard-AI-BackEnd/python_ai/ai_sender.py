import requests
import time
import random

URL = "http://localhost:5174/api/v1/data"

def get_fake_ai_value():
    return round(random.uniform(20.0, 100.0), 2)

while True:
    value = get_fake_ai_value()
    print(f"Sending value: {value}")
    
    try:
        res = requests.post(URL, json={"value": value})
        print(f"Status: {res.status_code}, Response: {res.json()}")
    except Exception as e:
        print("Error:", e)

    time.sleep(2)
