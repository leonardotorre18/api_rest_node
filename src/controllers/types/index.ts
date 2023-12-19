import type {
  T401Response,
  T403Response,
  T500Response,
  TCustom200Response,
  TLoginResponse,
  TPostsResponse,
  TUserResponse,
  TUsersResponse,
  IMusicResponse200,
  IMusicAddResponse200
} from './responses'

export type TServerResponse =
  TCustom200Response |
  TLoginResponse |
  TUsersResponse |
  TUserResponse |
  TPostsResponse |
  T403Response |
  T401Response |
  T500Response |
  IMusicResponse200 |
  IMusicAddResponse200
