import { fetchWeatherApi } from 'openmeteo';
import { WeatherLocationResponse, WeatherServiceProps } from './weatherService.types';
import { VariablesWithTime } from '@openmeteo/sdk/variables-with-time';
import { getWeatherInfo } from './weatherCodes';

const config = {
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,precipitation,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min'
};

const transformVariableMapper:Record<string, (v:number) => any> = {
    'weather_code': getWeatherInfo
}

function weatherMapper(response:VariablesWithTime | null, configString:string, singleValue:boolean = false) {
    if(!response) {
        return;
    }
    const configVars = configString.split(',');
    const responseObj:Record<string, number|number[]|undefined> = {};
    
    configVars.forEach((configVar, index) => {
        const transformer = transformVariableMapper[configVar] ?? ((v:number) => v);
        const variables = response.variables(index);
        const rawValue = singleValue ? variables?.value() : variables?.valuesArray();

        if(rawValue !== undefined) {
            if(singleValue) {
                responseObj[configVar] = transformer(rawValue as number);
            } else {
                responseObj[configVar] = [...(rawValue as Float32Array)].map(transformer) as number[];
            }
        }
    })
    return responseObj;

}
const range = (start: number, stop: number, step: number) =>
 Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);


export async function weatherService({ locations }: WeatherServiceProps) {
    const url = 'https://api.open-meteo.com/v1/forecast';

    const params = {
        latitude: locations.map(location => location.latitude),
        longitude: locations.map(location => location.longitude),
        forecast_hours: 24,
        ...config
    }
    const responses = await fetchWeatherApi(url, params);
    return responses.map((response, index) => {
        const hourly = response.hourly();
        const daily = response.daily();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const weatherLocationResponse:WeatherLocationResponse = {
            location: locations[index],
            current: weatherMapper(response.current(), config.current, true),
            hourly: {
                time: range(Number(hourly!.time()), Number(hourly!.timeEnd()), hourly!.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                ...weatherMapper(hourly, config.hourly)
            },
            daily: {
                time: range(Number(daily!.time()), Number(daily!.timeEnd()), daily!.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                ...weatherMapper(daily, config.daily),
            }
        }
        return weatherLocationResponse;
    })
}