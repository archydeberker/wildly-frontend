export const GetWeatherForecast = async (locations, handler) => {
    const DarkSkyKey = process.env.REACT_APP_DARKSKY_KEY;
    const weatherForLocation = (location, handler) => {
        const { name, long, lat } = location;
        const getRain = (json) => {
            let rain = json['hourly']['data'];
            // minutely data is not always available
            // rain = rain.concat(json['minutely']['data'])
            // Add daily estimates but only if they don't overlap with hourly ones
            const maxTime = Math.max(...rain.map(val => val.time));
            rain = rain.concat(json['daily']['data'].filter(el => el['time'] > maxTime));
            return {
                x: rain.map(value => {
                    let date = new Date(null);
                    date.setSeconds(value.time);
                    date.toLocaleString('en-GB', { timeZone: 'UTC' });
                    date.toString().concat(date.getDay().toString());
                    return (date);
                }),
                y: rain.map(value => value.precipIntensity),
            };
        };
        const getIcons = (json) => {
            let icons = json['daily']['data'];
            return {
                x: icons.map(value => {
                    let date = new Date(null);
                    date.setSeconds(value.time);
                    date.toLocaleString('en-GB', { timeZone: 'UTC' });
                    date.toString().concat(date.getDay().toString());
                    return (date);
                }),
                y: icons.map(value => value.icon),
            };
        };
        const getTemp = (json) => {
            let temp = json['daily']['data'];
            return {
                x: temp.map(value => {
                    let date = new Date(null);
                    date.setSeconds(value.time);
                    date.toLocaleString('en-GB', { timeZone: 'UTC' });
                    date.toString().concat(date.getDay().toString());
                    return (date);
                }),
                tempHigh: temp.map(value => value.temperatureHigh),
                tempLow: temp.map(value => value.temperatureLow),
            };
        };
        const getDaily = (json) => {
            let daily = json['daily']['data'];
            return daily.map(day => {
                let date = new Date(null);
                date.setSeconds(day.time);
                date.toLocaleString('en-GB', { timeZone: 'UTC' });
                date.toString().concat(date.getDay().toString());
                return ({ 'timestamp': date, 'icon': day.icon, 'tempHigh': day.temperatureHigh, 'tempLow': day.temperatureLow });
            });
        };
        let locationData = {};
        return locationData['rain'] = fetch(`https://mysterious-lowlands-26585.herokuapp.com/https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${long}?units=si`, { method: 'get' }).
            then(response => response.json()).
            then(json => {
                return ({
                    yaxis: 'Precipitation, mm/hr',
                    name: name,
                    'rain': getRain(json),
                    'daily': getDaily(json)
                });
            }).
            then(handler);
    };
    // We wait for ALL of the locations to return data before sending updating the data field: 
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all(locations.map(weatherForLocation)).then(data => handler(data));
};