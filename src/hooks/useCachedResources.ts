import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "useCachedResources" });

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...MaterialIcons.font,
          ...MaterialCommunityIcons.font,
          // "Inter-Regular": require("../../assets/fonts/Inter-Regular.otf"),
          // "Inter-Bold": require("../../assets/fonts/Inter-Bold.otf"),
          // "Inter-Black": require("../../assets/fonts/Inter-Black.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        logger.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
