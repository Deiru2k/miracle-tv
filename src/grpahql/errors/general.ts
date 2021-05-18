import { ApolloError } from 'apollo-server-errors';

export class ServerError extends ApolloError {
  constructor(msg?: string) {
    const message = msg
      ? `Following server error has occured: ${msg}`
      : 'A server error has occured';
    super(message, 'E_SERVER');

    Object.defineProperty(this, 'name', { value: 'ServerError' });
  }
}
