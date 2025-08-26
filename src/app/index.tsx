import { SafeAreaView, ScrollView } from 'react-native';
import { weatherService } from '~/services/weatherService';
import { useEffect, useState } from 'react';
import { WeatherLocationResponse } from '~/services/weatherService.types';
import locations from '~/data/locations.json';
import { WeatherLocationsList } from '~/components/WeatherLocationsList';
import { AddWeatherLocation } from '~/components/AddWeatherLocation';
import { Stack } from 'expo-router';

export default function WeatherDashboard() {
    const [weatherData, setWeatherData] = useState<WeatherLocationResponse[]|null>(null);
    useEffect(()=> {
        (async() => {
            const responses = await weatherService({locations});
            setWeatherData(responses);
        })();
    }, [])

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className="bg-gray-900 pt-4 grow">
                <SafeAreaView>
                    <AddWeatherLocation />
                    { weatherData && <WeatherLocationsList data={weatherData} /> }
                </SafeAreaView>
            </ScrollView>
        </>
    );
}

