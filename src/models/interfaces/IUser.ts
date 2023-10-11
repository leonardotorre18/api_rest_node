export interface IUser {
  name: string,
  email: string,
  password: string,
}

export interface IPost {
  body: string,
  user: {
    _id: string
  }
}

export interface IAuth {
  email: string,
  password: string,
}