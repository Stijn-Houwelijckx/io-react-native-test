import { SafeAreaView, FlatList, Alert } from 'react-native';
import { weatherService } from '~/services/weatherService';
import { useEffect, useState } from 'react';
import { WeatherLocationResponse } from '~/services/weatherService.types';
import locations from '~/data/locations.json';
import { WeatherLocationsList } from '~/components/WeatherLocationsList';
import { AddWeatherLocation } from '~/components/AddWeatherLocation';
import { Stack } from 'expo-router';
import * as Location from 'expo-location';

import { fetchLocation, fetchReverseLocation } from '~/services/api';

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherLocationResponse[] | null>(null);

  const [locationsState, setLocationsState] = useState(locations);

  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //   console.log('locationsState', locationsState);

  useEffect(() => {
    (async () => {
      const responses = await weatherService({ locations: locationsState });
      setWeatherData(responses);
    })();
  }, [locationsState]);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location);

    console.log('Current location:', location);

    try {
      const reverseLocation = await fetchReverseLocation(
        location.coords.latitude,
        location.coords.longitude
      );

      //   console.log('Reverse geocoding result:', JSON.stringify(reverseLocation, null, 2));
      //   console.log(
      //     'Reverse geocoding result:',
      //     JSON.stringify(reverseLocation.address.city, null, 2)
      //   );

      if (reverseLocation && reverseLocation.address) {
        console.log(
          'Reverse geocoding result:',
          JSON.stringify(reverseLocation.address.city, null, 2)
        );
        handleAddLocation(reverseLocation.address.city);
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
    }
  };

  const handleAddLocation = async (location: string) => {
    if (!location) {
      Alert.alert('Location is empty', 'Please enter a valid location.');
      console.warn('Location is empty');
      return;
    }

    // console.log('Adding location:', location);

    try {
      const geoData = await fetchLocation(location);
      if (geoData.length === 0) {
        console.warn('No location found for', location);
        return;
      }

      //   console.log('Fetched geoData:', geoData);
      const newLocation = {
        name: geoData[0].display_name.split(',')[0],
        latitude: parseFloat(geoData[0].lat),
        longitude: parseFloat(geoData[0].lon),
      };

      console.log('New location to add:', newLocation);

      const updatedLocations = [newLocation, ...locationsState];
      setLocationsState(updatedLocations);

      console.log('Updated locationsState:', JSON.stringify(updatedLocations, null, 2));
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={weatherData || []}
        renderItem={({ item }) => (
          <SafeAreaView>
            <WeatherLocationsList data={[item]} />
          </SafeAreaView>
        )}
        ListHeaderComponent={
          <AddWeatherLocation
            onAddClick={handleAddLocation}
            location={''}
            onCurrentLocationClick={getCurrentLocation}
          />
        }
        ListHeaderComponentClassName="mb-4"
        className="grow bg-gray-900 pt-4"
      />
    </>
  );
}
