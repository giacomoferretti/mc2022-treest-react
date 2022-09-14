import { ConsoleLogger } from "@/utils/Logger";

import {
  AddPostRequest,
  Line,
  LinesResponse,
  PostsResponse,
  Profile,
  SetUserRequest,
  SidDidRequest,
  SidRequest,
  SidUidRequest,
  Station,
  StationsResponse,
  UserPicture,
} from "./types";

const logger = new ConsoleLogger({ tag: "TreEstApi" });

export const BASE_API_URL = "https://ewserver.di.unimi.it/mobicomp/treest";

export type Endpoints =
  | "register"
  | "getProfile"
  | "setProfile"
  | "getLines"
  | "getStations"
  | "getPosts"
  | "addPost"
  | "getUserPicture"
  | "follow"
  | "unfollow";

export const request = async <T>(
  endpoint: Endpoints,
  data?: unknown
): Promise<T> => {
  logger.log(`POST ${endpoint} = ${JSON.stringify(data)}`);

  const response = await fetch(`${BASE_API_URL}/${endpoint}.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};

export const register = async (): Promise<SidRequest> => {
  return await request("register");
};

export const getProfile = async (data: SidRequest): Promise<Profile> => {
  return await request("getProfile", data);
};

export const setProfile = async (
  data: SetUserRequest
): Promise<Record<string, never>> => {
  return await request("setProfile", data);
};

export const getLines = async (data: SidRequest): Promise<Line[]> => {
  return (await request<LinesResponse>("getLines", data)).lines;
};

export const getStations = async (data: SidDidRequest): Promise<Station[]> => {
  const response = await request<StationsResponse>("getStations", data);

  return response.stations.map((x) => {
    return {
      sname: x.sname,
      lat: parseFloat(x.lat),
      lon: parseFloat(x.lon),
    };
  });
};

export const getPosts = async (data: SidDidRequest): Promise<PostsResponse> => {
  return await request("getPosts", data);
};

export const addPost = async (
  data: AddPostRequest
): Promise<Record<string, never>> => {
  return await request("addPost", data);
};

export const getUserPicture = async (
  data: SidUidRequest
): Promise<UserPicture> => {
  return await request("getUserPicture", data);
};

export const follow = async (
  data: SidUidRequest
): Promise<Record<string, never>> => {
  return await request("follow", data);
};

export const unfollow = async (
  data: SidUidRequest
): Promise<Record<string, never>> => {
  return await request("unfollow", data);
};
