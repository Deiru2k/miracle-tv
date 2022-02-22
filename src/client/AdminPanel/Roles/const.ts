import { gql } from "@apollo/client";

export const ADMIN_ROLE_FRAGMENT = gql`
  fragment AdminRoleBasic on Role {
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
        system
        sessions
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
  fragment AdminRole on RoleRaw {
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
        system
        sessions
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
