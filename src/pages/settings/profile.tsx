import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Page } from "miracle-tv-client/components/system/Page";
import { Heading } from "@chakra-ui/layout";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { Form } from "react-final-form";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { gql } from "@apollo/client";
import {
  useUpdateUserSettingsProfileMutation,
  useUserSettingsProfileQuery,
} from "miracle-tv-shared/hooks";
import { Box, Button, Flex, Link, Spinner, useToast } from "@chakra-ui/react";
import { UpdateSelfInput } from "miracle-tv-shared/graphql";
import { useCallback, useMemo } from "react";
import { omit } from "ramda";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const userFragment = gql`
  fragment UserSettingsProfileFragment on User {
    id
    username
    displayName
    emailHash
    bio
    avatar {
      id
      filename
      encoding
      mimetype
    }
    streamThumbnail {
      id
      filename
      encoding
      mimetype
    }
    header {
      id
      filename
      encoding
      mimetype
    }
  }
`;

gql`
  query UserSettingsProfile {
    self {
      ...UserSettingsProfileFragment
    }
  }
  mutation UpdateUserSettingsProfile($input: UpdateSelfInput!) {
    updateSelf(input: $input) {
      ...UserSettingsProfileFragment
    }
  }
  ${userFragment}
`;

const ProfilePage = () => {
  const toast = useToast();
  const { data, loading } = useUserSettingsProfileQuery();
  const [updateProfileMutation, { loading: isUpdating }] =
    useUpdateUserSettingsProfileMutation({
      onCompleted: () =>
        toast({ status: "success", title: "Updated user info!" }),
      onError: () =>
        toast({ status: "error", title: "Error updating user info." }),
    });

  const formData = useMemo(
    () =>
      data?.self
        ? {
            avatar: data?.self?.avatar?.id,
            header: data?.self?.header?.id,
            streamThumbnail: data?.self?.streamThumbnail?.id,
            ...omit(
              [
                "__typename",
                "id",
                "username",
                "emailHash",
                "avatar",
                "header",
                "streamThumbnail",
              ],
              data.self
            ),
          }
        : {},
    [data?.self]
  );

  const updateProfile = useCallback(
    (values: UpdateSelfInput) => {
      updateProfileMutation({ variables: { input: values } });
    },
    [updateProfileMutation]
  );

  return (
    <AuthRedirect>
      <Page px={20}>
        <Heading as="h2" size="lg" mb={6}>
          <Link href="/" aria-label="back">
            <ChevronLeftIcon size="xl" />
          </Link>
          Settings
        </Heading>
        {loading && <Spinner />}
        {!loading && data?.self && (
          <Form<UpdateSelfInput>
            onSubmit={updateProfile}
            initialValues={formData}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Flex>
                  <Box flex={2} mr={4}>
                    <Heading as="h3" size="md" mb={6}>
                      Profile
                    </Heading>
                    <Panel>
                      <FormInput
                        id="displayName"
                        name="displayName"
                        label="Display Name"
                        mb={4}
                      />
                      <FormTextarea id="bio" name="bio" label="Bio" />
                    </Panel>
                  </Box>
                  <Box flex={4}>
                    <Heading as="h3" size="md" mb={6}>
                      Icons and Headers
                    </Heading>
                    <Panel pb={12}>
                      <Flex justify="space-between">
                        <FormGroup
                          name="avatar"
                          label="Profile Picture"
                          flex={2}
                        >
                          <ImageUploader
                            id="avatar"
                            name="avatar"
                            ratio={1}
                            aspectMaxH="200px"
                            aspectMaxW="200px"
                          />
                        </FormGroup>
                        <FormGroup
                          name="streamThumbnail"
                          label="Stream Thumbnail"
                          flex={4}
                        >
                          <ImageUploader
                            id="streamThumbnail"
                            name="streamThumbnail"
                            ratio={16 / 9}
                            aspectMaxH="100%"
                            aspectMaxW="100%"
                          />
                        </FormGroup>
                      </Flex>
                      <FormGroup
                        name="header"
                        label="Profile Header"
                        width="100%"
                      >
                        <ImageUploader
                          id="header"
                          name="header"
                          ratio={16 / 6}
                          aspectMaxH="100%"
                          aspectMaxW="100%"
                        />
                      </FormGroup>
                    </Panel>
                  </Box>
                </Flex>
                <Flex justify="flex-end">
                  <Button type="submit" mt={6} isLoading={isUpdating}>
                    Update profile
                  </Button>
                </Flex>
              </form>
            )}
          </Form>
        )}
      </Page>
    </AuthRedirect>
  );
};

export default ProfilePage;
