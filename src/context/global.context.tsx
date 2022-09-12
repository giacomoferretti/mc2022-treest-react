import { createContext, useContext, useEffect } from "react";

import { useAsyncStorage } from "@/hooks";
import { logger } from "@/utils/Logger";

import * as TreEstApi from "../api/treest";

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
    logger.log("[  GlobalContext]", "Mounted!");

    return () => {
      logger.log("[  GlobalContext]", "UnMounted!");
    };
  }, []);

  const getSessionId = () => {
    TreEstApi.register()
      .then((result) => setSessionId(result["sid"]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!isLoading) {
      if (sessionId) {
        logger.log("[  GlobalContext]", "sessionId cache =", sessionId);
      } else {
        logger.log("[  GlobalContext]", "Requesting new sessionId...");
        getSessionId();
      }
    }
  }, [isLoading]);

  return {
    sessionId,
  };
};
