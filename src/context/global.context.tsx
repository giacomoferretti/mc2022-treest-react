import { createContext, useCallback, useContext, useEffect } from "react";

import * as TreEstApi from "@/api/treest";
import { useAsyncStorage } from "@/hooks";
import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "GlobalContext" });

type GlobalContextType = {
  sessionId: string | null; // sid
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const global = useProvideGlobal();

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};

const STORAGE_KEYS = {
  SID: "sessionId",
};

const useProvideGlobal = (): GlobalContextType => {
  const [sessionId, setSessionId, isLoading] = useAsyncStorage<
    GlobalContextType["sessionId"]
  >(STORAGE_KEYS.SID, null);

  useEffect(() => {
    logger.log("Mounted!");

    return () => {
      logger.log("UnMounted!");
    };
  }, []);

  const getSessionId = useCallback(() => {
    TreEstApi.register()
      .then((result) => setSessionId(result["sid"]))
      .catch((error) => console.error(error));
  }, [setSessionId]);

  useEffect(() => {
    logger.log("isLoading =", isLoading);
    logger.log("sessionId =", sessionId);

    if (!isLoading) {
      if (sessionId) {
        logger.log("sessionId cache =", sessionId);
      } else {
        logger.log("Requesting new sessionId...");
        getSessionId();
      }
    }
  }, [getSessionId, isLoading, sessionId]);

  return {
    sessionId,
  };
};
