import { gql } from "@apollo/client";

export const channelFragment = gql`
  fragment UserSettingsChannelFragment on Channel {
    id
    name
    description
    slug
    activity {
      id
      name
      icon
    }
  }
`;
