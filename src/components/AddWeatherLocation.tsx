import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text, TextInput, View } from 'react-native'

export const AddWeatherLocation = () => {
    return <View className="p-4 bg-white mx-4 rounded-lg gap-2">
        <Text className="font-bold">Add Location</Text>
        <View className="bg-gray-200 rounded-lg p-4 flex-row gap-2">
            <TextInput placeholder="Location" className="bg-gray-200 grow shrink" />
            <Pressable className="active:opacity-50">
                <Ionicons name="locate" size={24} color="black" />
            </Pressable>
        </View>
        <Pressable className="flex-row ml-auto items-center bg-white active:opacity-50 gap-1">
            <Text className="font-bold text-black rounded-lg">Add</Text>
            <Ionicons name="add" size={24} color="black" />
        </Pressable>
    </View>
}