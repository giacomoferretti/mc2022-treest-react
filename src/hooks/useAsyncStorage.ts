import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { logger } from "@/utils/Logger";
const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Debugging purposes only
  if (__DEV__) {
    useEffect(() => {
      logger.log(
        "[   AsyncStorage]",
        `useAsyncStorage(${key}, ${initialValue})`,
        "Mounted!"
      );

      return () => {
        logger.log(
          "[   AsyncStorage]",
          `useAsyncStorage(${key}, ${initialValue})`,
          "Unmounted!"
        );
      };
    }, []);

    useEffect(() => {
      logger.log(
        "[   AsyncStorage]",
        `useAsyncStorage(${key}, ${initialValue})`,
        "isLoading =",
        isLoading
      );
    }, [isLoading]);
  }

  useEffect(() => {
    let isMounted = true;

    const loadValue = async () => {
      setIsLoading(true);
      const value = await AsyncStorage.getItem(key);
      setIsLoading(false);

      if (isMounted) {
        if (value) {
          logger.log(
            "[   AsyncStorage]",
            `useAsyncStorage(${key}, ${initialValue})`,
            "Found",
            value
          );
        } else {
          logger.log(
            "[   AsyncStorage]",
            `useAsyncStorage(${key}, ${initialValue})`,
            "Nothing found for key",
            key
          );
        }
      }
    };

    loadValue().catch((error) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [key, initialValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    logger.log("[AsyncStorage] Saving", valueToStore);

    setStoredValue(valueToStore);

    try {
      AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue, isLoading] as const;
};

export default useAsyncStorage;
