import { gql } from "@apollo/client";

export const ADMIN_STREAM_KEY_FRAGMENT = gql`
  fragment AdminStreamKey on StreamKey {
    id
    name
    channel {
      id
      name
    }
    user {
      id
      displayName
      username
      avatar {
        id
        filename
      }
    }
  }
`;
