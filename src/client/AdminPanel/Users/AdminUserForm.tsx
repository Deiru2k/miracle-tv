import { Heading, Flex, Button, useToast } from "@chakra-ui/react";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";
import {
  AdminFullUserFragment,
  UpdateFullUserInput,
} from "miracle-tv-shared/graphql";
import { useUpdateFullUserMutation } from "miracle-tv-shared/hooks";
import { useCallback } from "react";
import { Form } from "react-final-form";

type Props = {
  user: AdminFullUserFragment;
};

export const AdminUserEditForm = ({ user }: Props) => {
  const toast = useToast();
  const formData: Partial<UpdateFullUserInput> = {
    roles: user.roles?.map((role) => role.id),
  };

  const [updateFullUserMutation, { loading: isUserUpdating }] =
    useUpdateFullUserMutation({
      onCompleted() {
        toast({ status: "success", title: "Updated user" });
      },
      onError() {
        toast({ status: "error", title: "There was an error updated user" });
      },
      refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    });

  const onUpdate = useCallback(
    (input: UpdateFullUserInput) => {
      updateFullUserMutation({
        variables: { input: { id: user?.id, ...input } },
      });
    },
    [updateFullUserMutation, user]
  );

  return (
    <>
      <Heading size="md" mb={2}>
        Update user
      </Heading>
      <Form<UpdateFullUserInput> onSubmit={onUpdate} initialValues={formData}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FormRolesSelect
              label="Roles"
              name="roles"
              mb={2}
              inputProps={{ multi: true }}
            />
            <Flex w="100%" justify="flex-end">
              <Button
                type="submit"
                isLoading={isUserUpdating}
                isDisabled={pristine || isUserUpdating}
              >
                Update
              </Button>
            </Flex>
          </form>
        )}
      </Form>
    </>
  );
};
