type Reaction = {
  smiley: string;
  count: number;
  reacted?: boolean;
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
