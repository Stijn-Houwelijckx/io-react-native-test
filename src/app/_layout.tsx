import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import '~/css/global.css';

export default function RootStackLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1">
      <Stack />
    </SafeAreaView>
  );
}
