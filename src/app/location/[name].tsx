import { Stack } from 'expo-router';
import { Text, View, Image, Flat } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function WeatherLocationDetail() {
  const { name, location, current, hourly } = useLocalSearchParams();
  // Parse current if it's a string
  const parsedCurrent = typeof current === 'string' ? JSON.parse(current) : current;
  const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
  const parsedHourly = typeof hourly === 'string' ? JSON.parse(hourly) : hourly;

  console.log('Name param:', name);
  console.log('Location param:', location);
  console.log('Current param:', current);
  console.log('Hourly param:', hourly);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        className="grow items-center justify-center gap-8 p-4"
        style={{ backgroundColor: parsedCurrent?.weather_code?.color }}>
        <View className="items-center justify-center">
          <Image source={{ uri: parsedCurrent?.weather_code?.image }} className="size-32" />
          <View className="items-center gap-4">
            <Text className="text-3xl font-bold text-white">{parsedLocation.name}</Text>
            <Text className="text-3xl font-bold text-white">
              {Math.round(parsedCurrent?.temperature_2m)}°
            </Text>
            <View className="flex-row gap-4">
              <Text className="text-lg text-white">min: xx°</Text>
              <Text className="text-lg text-white">max: xx°</Text>
            </View>
          </View>
        </View>
        <View className="w-full rounded-xl bg-black/20 p-4">
          <View>
            <Text className="text-2xl font-bold text-white">Next 24 hours</Text>
          </View>
          <View></View>
        </View>
      </View>
    </>
  );
}
