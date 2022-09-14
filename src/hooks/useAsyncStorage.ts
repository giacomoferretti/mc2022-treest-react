import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "useAsyncStorage" });

const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Debugging purposes only
  useEffect(() => {
    logger.log(`(${key}, ${initialValue})`, "Mounted!");

    return () => {
      logger.log(`(${key}, ${initialValue})`, "Unmounted!");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logger.log(`(${key}, ${initialValue})`, "isLoading =", isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    const loadValue = async () => {
      setIsLoading(true);
      const value = await AsyncStorage.getItem(key);

      if (value) {
        logger.log(`(${key}, ${initialValue})`, "Found", value);
      } else {
        logger.log(`(${key}, ${initialValue})`, "Nothing found for key", key);
      }

      setStoredValue(value === null ? initialValue : JSON.parse(value));
      setIsLoading(false);
    };

    loadValue().catch((error) => console.error(error));
  }, [key, initialValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    logger.log(`(${key}, ${initialValue})`, "Saving", valueToStore);
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
