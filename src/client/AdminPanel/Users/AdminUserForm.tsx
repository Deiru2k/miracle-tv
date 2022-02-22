import { Heading, Flex, Button, useToast } from "@chakra-ui/react";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { FormMarkdown } from "miracle-tv-client/components/form/FormMarkdown";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { UserEditForm } from "miracle-tv-client/UserSettings/UserEditForm";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  AccessUnit,
  AdminFullUserFragment,
  UpdateFullUserInput,
} from "miracle-tv-shared/graphql";
import { useUpdateFullUserMutation } from "miracle-tv-shared/hooks";
import { useCallback, useMemo } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

type Props = {
  user: AdminFullUserFragment;
};

export const AdminUserEditForm = ({ user }: Props) => {
  const toast = useToast();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { checkRights } = useCurrentUser();
  const formData: Partial<UpdateFullUserInput> = {
    bio: user.bio,
    displayName: user?.displayName,
    roles: user.roles?.map((role) => role.id),
    avatar: user.avatar?.id,
    header: user.header?.id,
    streamThumbnail: user.streamThumbnail?.id,
  };

  const { t: tAdmin } = useTranslation("admin");
  const { t: tUser } = useTranslation("user");
  const { t: tCommon } = useTranslation("common");

  const [updateFullUserMutation, { loading: isUserUpdating }] =
    useUpdateFullUserMutation({
      onCompleted() {
        toast({ status: "success", title: tAdmin("user-updated") });
      },
      onError(data) {
        toast({
          status: "error",
          title: `${tAdmin("user-update-error")}: ${data.message}`,
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
        {tAdmin("user-update")}
      </Heading>
      <Form<UpdateFullUserInput> onSubmit={onUpdate} initialValues={formData}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FormRolesSelect
              isDisabled={!canEditUser}
              label={tUser("roles")}
              name="roles"
              mb={4}
              inputProps={{ multi: true }}
            />
            <UserEditForm />
            <Flex mb={4} direction={isMobile ? "column" : "row"}>
              <FormGroup
                name="avatar"
                label={tUser("profile-picture")}
                mr={4}
                w="auto"
                help={tUser("aspect-ratio", { ratio: "1:1" })}
              >
                <ImageUploader id="avatar" name="avatar" ratio={1} />
              </FormGroup>
              <FormGroup
                name="header"
                label={tUser("profile-header")}
                width="100%"
                help={tUser("aspect-ratio", { ratio: "16:6" })}
              >
                <ImageUploader id="header" name="header" ratio={16 / 6} />
              </FormGroup>
            </Flex>
            <FormGroup
              name="header"
              label={tUser("stream-thumbnail")}
              width="100%"
              help={tUser("aspect-ratio", { ratio: "16:9" })}
              flex={4}
            >
              <ImageUploader
                id="streamThumbnail"
                name="streamThumbnail"
                ratio={16 / 9}
              />
            </FormGroup>
            <Flex
              w="100%"
              justify="flex-end"
              position="sticky"
              bottom={0}
              zIndex={100}
            >
              <Button
                type="submit"
                isLoading={isUserUpdating}
                isDisabled={pristine || isUserUpdating || !canEditUser}
              >
                {tCommon("update")}
              </Button>
            </Flex>
          </form>
        )}
      </Form>
    </>
  );
};
