import { Heading, Flex, Button, useToast } from "@chakra-ui/react";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { FormMarkdown } from "miracle-tv-client/components/form/FormMarkdown";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
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

type Props = {
  user: AdminFullUserFragment;
};

export const AdminUserEditForm = ({ user }: Props) => {
  const toast = useToast();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { checkRights } = useCurrentUser();
  const formData: Partial<UpdateFullUserInput> = {
    bio: user.bio,
    roles: user.roles?.map((role) => role.id),
    avatar: user.avatar?.id,
    header: user.header?.id,
    streamThumbnail: user.streamThumbnail?.id,
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
              mb={4}
              inputProps={{ multi: true }}
            />
            <Flex mb={4} direction={isMobile ? "column" : "row"}>
              <FormGroup
                name="avatar"
                label="Profile Picture"
                mr={4}
                w="auto"
                help={"1:1 aspect ratio is preferred"}
              >
                <ImageUploader id="avatar" name="avatar" ratio={1} />
              </FormGroup>
              <FormGroup
                name="header"
                label="Profile Header"
                width="100%"
                help="16:6 aspect ratio is preffered"
              >
                <ImageUploader id="header" name="header" ratio={16 / 6} />
              </FormGroup>
            </Flex>
            <FormMarkdown
              label="Bio"
              name="bio"
              rows={10}
              height="auto"
              help={
                <>
                  This field supports{" "}
                  <Link
                    target="_blank"
                    textDecoration="underline"
                    href="https://www.markdownguide.org/basic-syntax/"
                  >
                    markdown
                  </Link>
                </>
              }
            />
            <FormGroup
              name="header"
              label="Stream Thumbnail"
              width="100%"
              help="16:9 aspect ratio is preffered"
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
                Update
              </Button>
            </Flex>
          </form>
        )}
      </Form>
    </>
  );
};
