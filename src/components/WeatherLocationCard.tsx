import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { WeatherLocationResponse } from '~/services/weatherService.types';

export const WeatherLocationCard = ({location, current}: WeatherLocationResponse) => {

    return (
        <Link href={`/location/${location.name}`} className="flex" asChild>
            <Pressable className="grow rounded-lg" key={location.name} style={{backgroundColor:current?.weather_code.color }}>
                <View className="flex-row justify-between items-center bg-black/40 p-4">
                    <View>
                        <Image source={{uri:current?.weather_code.image}} className="w-16 h-16" />
                        <Text className="font-bold text-2xl text-white">{location.name}</Text>
                        <Text className="text-white">{current?.weather_code.description}</Text>
                    </View>
                    <Text className="text-white text-3xl font-bold">{Math.round(current?.temperature_2m)}°</Text>
                </View>
            </Pressable>
        </Link>
    );
}