import { StatusBar } from "expo-status-bar";
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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GlobalProvider>
        <SafeAreaProvider>
          <RootSiblingParent>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </RootSiblingParent>
        </SafeAreaProvider>
      </GlobalProvider>
    );
  }
};

export default App;
