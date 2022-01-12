import { gql } from "@apollo/client";
export const ADMIN_ACTIVITY_FRAGMENT = gql`
  fragment AdminActivityFragment on Activity {
    id
    name
    verb
    icon {
      id
      filename
    }
    image {
      id
      filename
    }
  }
`;
