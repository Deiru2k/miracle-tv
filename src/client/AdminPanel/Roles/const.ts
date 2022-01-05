import { gql } from "@apollo/client";

export const ADMIN_ROLE_FRAGMENT = gql`
  fragment AdminRole on Role {
    id
    parentId
    name
    access {
      rights {
        channels
        streamKeys
        roles
        users
        activities
        userSettings
      }
      actions {
        user {
          silence
          ban
          warn
        }
      }
    }
  }
`;
