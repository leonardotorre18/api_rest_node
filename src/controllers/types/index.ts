import { TBadRequestResponse, TCustomResponse, TInternalServerErrorResponse, TLoginResponse, TPostsResponse, TUnauthorizedResponse, TUsersResponse } from "./responses";

export type TServerResponse =
  TCustomResponse |
  TLoginResponse |
  TUsersResponse |
  TPostsResponse |
  TBadRequestResponse |
  TUnauthorizedResponse |
  TInternalServerErrorResponse
  