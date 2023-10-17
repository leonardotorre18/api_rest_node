import { 
  T401Response,
  T403Response,
  T500Response,
  TCustom200Response,
  TLoginResponse,
  TPostsResponse,
  TUserResponse,
  TUsersResponse
} from "./responses";

export type TServerResponse =
  TCustom200Response |
  TLoginResponse |
  TUsersResponse |
  TUserResponse |
  TPostsResponse |
  T403Response |
  T401Response |
  T500Response
  