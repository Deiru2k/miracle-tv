import { ApolloError } from "apollo-server-errors";

export class InputErrorLogin extends ApolloError {
  constructor() {
    super("User was not found or wrong password provided", "E_LOGIN");

    Object.defineProperty(this, "code", { value: "E_LOGIN" });
  }
}

export class DeletedErrorLogin extends ApolloError {
  constructor() {
    super("Your account has been deleted", "E_LOGIN");

    Object.defineProperty(this, "code", { value: "E_LOGIN" });
  }
}

export class SuspendedErrorLogin extends ApolloError {
  constructor() {
    super("Your account has been suspended", "E_LOGIN");

    Object.defineProperty(this, "code", { value: "E_LOGIN" });
  }
}

export class DisabledErrorLogin extends ApolloError {
  constructor() {
    super("Login for your account has been disabled", "E_LOGIN");

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
  constructor(msg?: string) {
    const prompt = "Unauthorized";
    const message = msg ? `${prompt}: ${msg}` : `${prompt}:`;
    super(message, "E_AUTHORIZATION");

    Object.defineProperty(this, "name", { value: "E_AUTHORIZATION" });
  }
}
