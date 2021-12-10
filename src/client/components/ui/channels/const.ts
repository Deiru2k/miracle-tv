import { gql } from "@apollo/client";

export const channelFragment = gql`
  fragment ChannelFull on Channel {
    id
    name
    description
    slug
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon
    }
  }
`;
