import { gql } from "@apollo/client";

export const selfChannelFragment = gql`
  fragment SelfChannelFull on SelfChannel {
    id
    name
    description
    slug
    disabled
    shelved
    mature
    matureDescription
    passwordProtected
    password
    user {
      id
      username
      displayName
    }
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon {
        id
        filename
      }
    }
  }
`;

export const channelFragment = gql`
  fragment ChannelFull on Channel {
    id
    name
    description
    slug
    disabled
    shelved
    mature
    passwordProtected
    matureDescription
    user {
      id
      username
      displayName
    }
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon {
        id
        filename
      }
    }
  }
`;
