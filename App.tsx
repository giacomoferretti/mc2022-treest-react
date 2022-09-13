import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GlobalProvider } from "@/context/global.context";
import useCachedResources from "@/hooks/useCachedResources";
import useColorScheme from "@/hooks/useColorScheme";
import Navigation from "@/navigation";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const onPress = () => {
    AsyncStorage.clear();
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GlobalProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <Pressable onPress={onPress}>
            <Text>Reset</Text>
          </Pressable>
        </SafeAreaProvider>
      </GlobalProvider>
    );
  }
};

export default App;
