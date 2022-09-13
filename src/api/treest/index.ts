import { logger } from "@/utils/Logger";

import {
  AddPostRequest,
  LinesResponse,
  PostsResponse,
  Profile,
  SetUserRequest,
  SidDidRequest,
  SidRequest,
  SidUidRequest,
  StationsResponse,
  UserPicture,
} from "./types";

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

// type Endpoints = Register | GetLines;

// type Register = {
//   endpoint: "register";
//   data: null;
// };

// type GetLines = {
//   endpoint: "getLines";
//   data: { sid: string };
// };

export const request = async (endpoint: Endpoints, data?: any) => {
  logger.log("[      TreEstAPI]", `${endpoint}(${JSON.stringify(data)})`);
  const response = await fetch(`${BASE_API_URL}/${endpoint}.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
  logger.log("[      TreEstAPI]", `${endpoint}(${JSON.stringify(data)})`);
  return response;
};

export const register = async (): Promise<SidRequest> => {
  return await (await request("register")).json();
};

export const getProfile = async (data: SidRequest): Promise<Profile> => {
  return await (await request("getProfile", data)).json();
};

export const setProfile = async (
  data: SetUserRequest
): Promise<Record<string, never>> => {
  return await (await request("setProfile", data)).json();
};

export const getLines = async (data: SidRequest): Promise<LinesResponse> => {
  return await (await request("getLines", data)).json();
};

export const getStations = async (
  data: SidDidRequest
): Promise<StationsResponse> => {
  return await (await request("getStations", data)).json();
};

export const getPosts = async (data: SidDidRequest): Promise<PostsResponse> => {
  return await (await request("getPosts", data)).json();
};

export const addPost = async (
  data: AddPostRequest
): Promise<Record<string, never>> => {
  return await (await request("addPost", data)).json();
};

export const getUserPicture = async (
  data: SidUidRequest
): Promise<UserPicture> => {
  return await (await request("getUserPicture", data)).json();
};

export const follow = async (
  data: SidUidRequest
): Promise<Record<string, never>> => {
  return await (await request("follow", data)).json();
};

export const unfollow = async (
  data: SidUidRequest
): Promise<Record<string, never>> => {
  return await (await request("unfollow", data)).json();
};
