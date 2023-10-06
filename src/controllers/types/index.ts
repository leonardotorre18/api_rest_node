import { TBadRequestResponse, TCustomResponse, TInternalServerErrorResponse, TLoginResponse, TPostsResponse, TUnauthorizedResponse, TUserResponse, TUsersResponse } from "./responses";

export type TServerResponse =
  TCustomResponse |
  TLoginResponse |
  TUsersResponse |
  TUserResponse |
  TPostsResponse |
  TBadRequestResponse |
  TUnauthorizedResponse |
  TInternalServerErrorResponse
  