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
    const loadValue = async () => {
      setIsLoading(true);
      const value = await AsyncStorage.getItem(key);

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

      setStoredValue(value === null ? initialValue : JSON.parse(value));
      setIsLoading(false);
    };

    loadValue().catch((error) => console.error(error));
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
