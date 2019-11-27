import React from 'react';
import { WiDaySunny, WiRain, WiDayCloudy, WiNightClear, WiSnow, WiSleet, WiCloud, WiNightAltCloudy, WiDayFog, WiWindy } from "weather-icons-react";


const WeatherIconMapper = (darkSkyIcon, size, color) => {
    const map = {'rain': <WiRain size={size} color={color}/>,
                'partly-cloudy-day': <WiDayCloudy size={size} color={color} />,
                'clear-day': <WiDaySunny size={size} color={color}/>,
                'clear-night': <WiNightClear size={size} color={color}/>,
                'snow': <WiSnow size={size} color={color} />,
                'sleet': <WiSleet size={size} color={color}/>,
                'wind': <WiWindy size={size} color={color} />,
                'fog': <WiDayFog size={size} color={color} />,
                'cloudy': <WiCloud size={size} color={color} />,
                'partly-cloudy-night': <WiNightAltCloudy size={size} color={color} />,
                }

    return map[darkSkyIcon]
}

export default WeatherIconMapper