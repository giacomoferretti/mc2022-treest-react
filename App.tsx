import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GlobalProvider } from "@/context/global.context";
import useCachedResources from "@/hooks/useCachedResources";
import useColorScheme from "@/hooks/useColorScheme";
import Navigation from "@/navigation";
import "@/utils/Storage";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const onClearPress = () => {
    AsyncStorage.clear();
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GlobalProvider>
        <SafeAreaProvider>
          <RootSiblingParent>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            {/* <Pressable onPress={onClearPress}>
              <Text>Reset</Text>
            </Pressable> */}
          </RootSiblingParent>
        </SafeAreaProvider>
      </GlobalProvider>
    );
  }
};

export default App;
