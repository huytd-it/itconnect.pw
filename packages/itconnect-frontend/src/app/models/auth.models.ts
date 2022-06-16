import {User} from "./user.model";

export class AuthLoginOutput {
  email: string;
  password: string;
}


export class AuthLoginInput {
  token: string;
  user: User;
}


export class AuthRegisterOutput {
  email: string;
  password: string;
}


export class AuthRegisterInput {
  token: string;
  user: User;
}
