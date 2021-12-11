import React from "react";
import { gql } from "@apollo/client";

import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";

import {
  CurrentUserFragment,
  UpdateUserInput,
} from "miracle-tv-shared/graphql";

type Props = {
  user: CurrentUserFragment;
};

gql`
  query AccountDetailsQuery {
    selfAccount {
      id
      username
      email
    }
  }
  mutation ChangeAccountPassword($input: ChangePasswordInput) {
    changeSelfPassword(input: $input)
  }
  mutation SettingsUpdateAccount($input: UpdateUserAccountInput) {
    updateSelfAccount {
      id
      username
      email
    }
  }
`;

export const AccountDetails = ({ user }: Props) => {
  const userFormData = {};
  return (
    <Form<UpdateUserInput> onSubmit={() => {}} defaultValues={userFormData}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormInput name="email" />
        </form>
      )}
    </Form>
  );
};
