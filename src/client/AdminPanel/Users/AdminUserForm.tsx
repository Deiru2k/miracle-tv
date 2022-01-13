import { Heading, Flex, Button, useToast } from "@chakra-ui/react";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import {
  AccessUnit,
  AdminFullUserFragment,
  UpdateFullUserInput,
} from "miracle-tv-shared/graphql";
import { useUpdateFullUserMutation } from "miracle-tv-shared/hooks";
import { useCallback, useMemo } from "react";
import { Form } from "react-final-form";

type Props = {
  user: AdminFullUserFragment;
};

export const AdminUserEditForm = ({ user }: Props) => {
  const toast = useToast();
  const { checkRights } = useCurrentUser();
  const formData: Partial<UpdateFullUserInput> = {
    roles: user.roles?.map((role) => role.id),
  };

  const [updateFullUserMutation, { loading: isUserUpdating }] =
    useUpdateFullUserMutation({
      onCompleted() {
        toast({ status: "success", title: "Updated user" });
      },
      onError(data) {
        toast({
          status: "error",
          title: `There was an error updating user: ${data.message}`,
        });
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

  const canEditUser = useMemo(() => {
    return checkRights(AccessUnit.Write, "users");
  }, [checkRights]);

  return (
    <>
      <Heading size="md" mb={2}>
        Update user
      </Heading>
      <Form<UpdateFullUserInput> onSubmit={onUpdate} initialValues={formData}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FormRolesSelect
              isDisabled={!canEditUser}
              label="Roles"
              name="roles"
              mb={2}
              inputProps={{ multi: true }}
            />
            <Flex w="100%" justify="flex-end">
              <Button
                type="submit"
                isLoading={isUserUpdating}
                isDisabled={pristine || isUserUpdating || !canEditUser}
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
