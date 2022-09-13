import { StatusBar } from "expo-status-bar";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { GlobalProvider } from "@/context/global.context";
import useCachedResources from "@/hooks/useCachedResources";
import useColorScheme from "@/hooks/useColorScheme";
import Navigation from "@/navigation";
import CounterScreen from "@/screens/CounterScreen";

// import Navigation from "./navigation";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GlobalProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </GlobalProvider>
    );
  }
};

export default App;
