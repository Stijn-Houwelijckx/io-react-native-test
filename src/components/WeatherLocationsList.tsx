import { View } from 'react-native'
import { WeatherLocationResponse } from '~/services/weatherService.types';
import { WeatherLocationCard } from './WeatherLocationCard';


export const WeatherLocationsList = ({data}: {data:WeatherLocationResponse[]}) => {
    return <View className="gap-4 p-4">
        {
            data?.map((weatherLocation:any) => {
                return <WeatherLocationCard key={weatherLocation.location.name} {...weatherLocation} />
            })
        }
    </View>
}