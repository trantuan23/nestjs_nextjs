import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
    static type = "Email or password is correct  !"
  }

export class InvalidAccountActive extends AuthError {
    static type = "Account isn't active !"
  }