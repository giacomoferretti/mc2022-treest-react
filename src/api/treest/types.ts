// Generic
export type Terminus = {
  sname: string;
  did: number;
};

export type Line = {
  terminus1: Terminus;
  terminus2: Terminus;
};

export type Station = {
  sname: string;
  lat: number;
  lon: number;
};

export enum Status {
  Ideal,
  Acceptable,
  HasProblems,
}

export enum Delay {
  OnTime,
  Minor,
  Major,
  Cancelled,
}

export type Post = {
  delay: Delay;
  status: Status;
  comment: string;

  followingAuthor: boolean;
  datetime: string;
  authorName: string;
  pversion: string;
  author: string;
};

export type Profile = {
  uid: string;
  name: string;
  picture: string;
  pversion: string;
};

export type UserPicture = {
  uid: string;
  pversion: string;
  picture: string;
};

// Api
export type SidRequest = {
  sid: string;
};

export type SidUidRequest = SidRequest & {
  uid: string;
};

export type SidDidRequest = SidRequest & {
  did: number;
};

export type SetUserRequest = SidRequest & {
  name?: string;
  picture?: string;
} & (
    | {
        name: string;
      }
    | {
        picture: string;
      }
  );

export type AddPostRequest = SidDidRequest & {
  comment?: string;
  delay?: Delay;
  status?: Status;
} & (
    | {
        comment: string;
      }
    | {
        delay: Delay;
      }
    | {
        status: Status;
      }
  );

export type LinesResponse = {
  lines: Line[];
};

export type PostsResponse = {
  posts: Post[];
};

export type StationsResponse = {
  stations: Station[];
};
