import { gql } from "@apollo/client";

export const ADMIN_SESSION_FRAGMENT = gql`
  fragment AdminSession on Session {
    id
    user
    userAgent
    lastUsedAt
    expiresAt
    ip
    isCurrentSession
  }
`;
