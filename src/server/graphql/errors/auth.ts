import { ApolloError } from "apollo-server-errors";

export class InputErrorLogin extends ApolloError {
  constructor() {
    super("User was not found or wrong password provided", "E_LOGIN");

    Object.defineProperty(this, "code", { value: "E_LOGIN" });
  }
}

export class AuthenticationError extends ApolloError {
  constructor() {
    super("Unauthenticated", "E_AUTHNETICATED");

    Object.defineProperty(this, "name", { value: "E_AUTHNETICATED" });
  }
}
export class AuthorizationError extends ApolloError {
  constructor() {
    super("Unauthorized", "E_AUTHORIZATION");

    Object.defineProperty(this, "name", { value: "E_AUTHORIZATION" });
  }
}
