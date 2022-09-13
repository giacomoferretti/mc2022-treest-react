import { LinesResponse } from "types";

import { logger } from "@/utils/Logger";

export const BASE_API_URL = "https://ewserver.di.unimi.it/mobicomp/treest";

export type Endpoint = "register" | "getLines";

export const request = async (endpoint: Endpoint, data?: any) => {
  return await fetch(`${BASE_API_URL}/${endpoint}.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
};

export const register = async () => {
  logger.log("[      TreEstAPI]", "register()");
  const response = await (await request("register")).json();
  logger.log("[      TreEstAPI]", "register()", response);

  return response;
};

export const getLines = async (sid: string): Promise<LinesResponse> => {
  logger.log("[      TreEstAPI]", `getLines(${sid})`);
  const response: LinesResponse = await (
    await request("getLines", { sid })
  ).json();
  logger.log("[      TreEstAPI]", `getLines(${sid})`, response);
  logger.log("[      TreEstAPI]", `getLines(${sid})`, response.lines[0]);

  return response;
};
