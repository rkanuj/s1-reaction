type Reaction = {
  smiley: string;
  count: number;
  reacted?: boolean;
}

type ReactionOffline = {
  smiley: string;
  remark: string;
  pid: number;
  uid2: number;
}

type SmilesData = {
  typeid: number;
  type: string;
  list: {
    code: string;
    url: string;
  }[];
}

type UserAuthPayload = {
  uid: number;
  iat: number;
  exp: number;
}

type UserAuth = {
  token: string;
  payload: UserAuthPayload;
}

type UserInfo = {
  uid: number;
  username: string;
  auth: UserAuth;
}

type ReactListOfflineItem = {
  pid: number;
  uid2: number;
  smiley: string;
  remark: string;
  created_at: string;
}
