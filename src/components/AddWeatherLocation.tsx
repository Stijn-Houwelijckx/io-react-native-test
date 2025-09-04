import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';

interface AddWeatherLocationProps {
  onAddClick: (location: string) => void;
  location: string;
  onCurrentLocationClick: () => void;
}

export const AddWeatherLocation = ({
  onAddClick,
  location,
  onCurrentLocationClick,
}: AddWeatherLocationProps) => {
  const [inputValue, setInputValue] = useState(location);

  return (
    <View className="mx-4 gap-2 rounded-lg bg-white p-4">
      <Text className="font-bold">Add Location</Text>
      <View className="flex-row gap-2 rounded-lg bg-gray-200 p-4">
        <TextInput
          placeholder="Location"
          className="shrink grow bg-gray-200"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Pressable className="active:opacity-50" onPress={onCurrentLocationClick}>
          <Ionicons name="locate" size={24} color="black" />
        </Pressable>
      </View>
      <Pressable
        className="ml-auto flex-row items-center gap-1 bg-white active:opacity-50"
        onPress={() => onAddClick(inputValue)}>
        <Text className="rounded-lg font-bold text-black">Add</Text>
        <Ionicons name="add" size={24} color="black" />
      </Pressable>
    </View>
  );
};
