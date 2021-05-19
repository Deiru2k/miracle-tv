import { ApolloError } from "apollo-server-errors";

export class UserExistsError extends ApolloError {
  constructor() {
    super('User with this username already exists', 'E_USER_EXISTS');

    Object.defineProperty(this, 'name', { value: 'UserExistsError' });
  }
}

export class EmailExistsError extends ApolloError {
  constructor() {
    super('User with this email already exists', 'E_EMAIL_EXISTS');

    Object.defineProperty(this, 'name', { value: 'UserExistsError' });
  }
}
