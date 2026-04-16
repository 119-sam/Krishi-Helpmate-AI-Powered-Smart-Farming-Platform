from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

# Request schema for the existing frontend
class WeatherData(BaseModel):
    weather: Dict[str, Any]

@router.post("/api/farming-tips")
async def get_farming_tips(data: WeatherData):
    try:
        weather_info = data.weather
        main = weather_info.get('main', {})
        weather_condition = weather_info.get('weather', [{}])[0]
        
        tips = []

        # Temperature-based tips
        temp = main.get('temp', 0)
        if temp >= 35:
            tips.append("High heat today — water crops early morning or late evening.")
        elif temp <= 10:
            tips.append("Low temperature — protect sensitive crops from cold.")

        # Humidity-based tips
        humidity = main.get('humidity', 0)
        if humidity >= 80:
            tips.append("High humidity — watch out for fungal diseases.")
        
        # Rainfall-based tips (extract from rain data if available)
        rainfall = 0
        if 'rain' in weather_info and '1h' in weather_info['rain']:
            rainfall = weather_info['rain']['1h']
        
        if rainfall > 0:
            tips.append("Rain expected — avoid pesticide/fertilizer spraying today.")
        
        # Wind-based tips
        wind_speed = weather_info.get('wind', {}).get('speed', 0)
        if wind_speed > 20:
            tips.append("Strong winds — secure lightweight covers and nets.")

        # General condition-based tips
        condition = weather_condition.get('main', '').lower()
        if "sun" in condition:
            tips.append("Sunny weather — perfect for harvesting or sun-loving crops.")
        elif "cloud" in condition:
            tips.append("Cloudy weather — good for transplanting seedlings.")

        # Fallback
        if not tips:
            tips.append("Weather conditions are normal — maintain routine care.")

        return {"tips": tips}
        
    except Exception as e:
        print(f"Error processing weather data: {e}")
        return {"tips": ["Unable to generate tips due to incomplete weather data."]}
