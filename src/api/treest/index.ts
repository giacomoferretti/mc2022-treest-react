import { ConsoleLogger } from "@/utils/Logger";

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

export const request = async (endpoint: Endpoints, data?: unknown) => {
  logger.log(` REQUEST = ${endpoint}(${JSON.stringify(data)})`);

  const response = await (
    await fetch(`${BASE_API_URL}/${endpoint}.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    })
  ).json();

  // logger.log(
  //   `RESPONSE = ${endpoint}(${JSON.stringify(data)}) = ${JSON.stringify(
  //     response
  //   )}`
  // );
  return response;
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

export const getLines = async (data: SidRequest): Promise<LinesResponse> => {
  return await request("getLines", data);
};

export const getStations = async (
  data: SidDidRequest
): Promise<StationsResponse> => {
  return await request("getStations", data);
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
