import { createContext, useCallback, useContext, useEffect } from "react";

import * as TreEstApi from "@/api/treest";
import { useAsyncStorage } from "@/hooks";
import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "GlobalContext" });

type GlobalContextType = {
  sessionId: string | null; // sid
  directionId: number | null; // did
  skipFirstTime: boolean;
  setDirectionId: (did: number) => void;
  setSkipFirstTime: (value: boolean) => void;
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
  DID: "directionId",
  SKIP_FIRST_TIME: "skipFirstTime",
};

const useProvideGlobal = (): GlobalContextType => {
  const [sessionId, setSessionId, isLoadingSessionId] = useAsyncStorage<
    GlobalContextType["sessionId"]
  >(STORAGE_KEYS.SID, null);

  const [directionId, setDirectionId] = useAsyncStorage<
    GlobalContextType["directionId"]
  >(STORAGE_KEYS.DID, null);

  const [skipFirstTime, setSkipFirstTime] = useAsyncStorage<
    GlobalContextType["skipFirstTime"]
  >(STORAGE_KEYS.SKIP_FIRST_TIME, false);

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
    if (!isLoadingSessionId) {
      if (sessionId) {
        logger.log("sessionId cache =", sessionId);
      } else {
        logger.log("Requesting new sessionId...");
        getSessionId();
      }
    }
  }, [getSessionId, isLoadingSessionId, sessionId]);

  return {
    sessionId,
    directionId,
    skipFirstTime,
    setDirectionId,
    setSkipFirstTime,
  };
};
