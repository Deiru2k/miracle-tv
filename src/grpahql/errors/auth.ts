import { ApolloError } from 'apollo-server-errors';

export class InputErrorLogin extends ApolloError {
  constructor() {
    super('User was not found or wrong password provided', 'E_LOGIN');

    Object.defineProperty(this, 'name', { value: 'InputErrorLogin' });
  }
}

export class AuthenticationError extends ApolloError {
  constructor() {
    super('User is not authenticated', 'E_AUTHENTICATION');

    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
