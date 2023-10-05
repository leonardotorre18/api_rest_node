export interface IUser {
  email: string,
  password: string,
}

export interface IPost {
  body: string,
  user_id: {
    _id: string
  }
}

export interface IAuth {
  email: string,
  password: string,
}