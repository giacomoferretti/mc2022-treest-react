import { logger } from "@/utils/Logger";

export const BASE_API_URL = "https://ewserver.di.unimi.it/mobicomp/treest";

export const register = async () => {
  const response = await (
    await fetch(`${BASE_API_URL}/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  logger.log("[TreEst.register]", response);

  return response;
};
