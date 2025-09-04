import { Link, router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { WeatherLocationResponse } from '~/services/weatherService.types';

export const WeatherLocationCard = ({ location, current, hourly }: WeatherLocationResponse) => {
  //   console.log('Location', JSON.stringify(location.name, null, 2));
  //   console.log('Current', JSON.stringify(current, null, 2));

  console.log('Hourly', JSON.stringify(hourly, null, 2));

  return (
    // <Link
    //   href={`/location/${location.name}?location=${locationParam}&current=${currentParam}`}
    //   className="flex"
    //   asChild>
    <Pressable
      className="grow rounded-lg"
      key={location.name}
      style={{ backgroundColor: current?.weather_code.color }}
      onPress={() => {
        router.push({
          pathname: `/location/${location.name}`,
          params: {
            location: JSON.stringify(location),
            current: JSON.stringify(current),
            hourly: JSON.stringify(hourly),
          },
        });
      }}>
      <View className="flex-row items-center justify-between bg-black/40 p-4">
        <View>
          <Image source={{ uri: current?.weather_code.image }} className="h-16 w-16" />
          <Text className="text-2xl font-bold text-white">{location.name}</Text>
          <Text className="text-white">{current?.weather_code.description}</Text>
        </View>
        <Text className="text-3xl font-bold text-white">
          {Math.round(current?.temperature_2m)}°
        </Text>
      </View>
    </Pressable>
    // </Link>
  );
};
