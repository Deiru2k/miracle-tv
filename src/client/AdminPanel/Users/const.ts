import { gql } from "@apollo/client";

export const ADMIN_FULL_USER_FRAGMENT = gql`
  fragment AdminFullUser on FullUser {
    id
    username
    displayName
    bio
    email
    roles {
      id
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
      parentId
    }
    channels {
      id
      name
    }
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    streamThumbnail {
      id
      filename
    }
    silenced
    suspended
    deleted
    loginDisabled
    settings {
      id
      useGravatar
      singleUserMode
      singleUserChannel {
        id
        name
      }
      featureInDirectory
    }
    meta {
      followerCount
    }
  }
`;
