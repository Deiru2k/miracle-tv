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
import {
  Box,
  Button,
  Flex,
  FormHelperText,
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import { UpdateSelfInput } from "miracle-tv-shared/graphql";
import React, { useCallback, useMemo } from "react";
import { omit } from "ramda";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { useCurrentUserSettings } from "miracle-tv-client/hooks/auth";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { Link } from "miracle-tv-client/components/ui/Link";
import Head from "next/head";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { FormMarkdown } from "miracle-tv-client/components/form/FormMarkdown";

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
    roles {
      id
      name
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

export const ProfileSettings = () => {
  const toast = useToast();
  const { data, loading } = useUserSettingsProfileQuery();
  const [updateProfileMutation, { loading: isUpdating }] =
    useUpdateUserSettingsProfileMutation({
      onCompleted: () =>
        toast({ status: "success", title: "Updated user info!" }),
      onError: () =>
        toast({ status: "error", title: "Error updating user info." }),
    });

  const { currentSettings } = useCurrentUserSettings();
  const isMobile = useMediaQuery(MediaQuery.mobile);

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
    <>
      <Head>
        <title>Profile settings - Miracle TV</title>
      </Head>
      {loading && <Spinner />}
      {!loading && data?.self && (
        <Form<UpdateSelfInput>
          onSubmit={updateProfile}
          initialValues={formData}
        >
          {({ handleSubmit, dirty }) => (
            <form onSubmit={handleSubmit}>
              <Flex direction={isMobile ? "column" : "row"}>
                <Box flex={2} mr={isMobile ? 0 : 4} mb={isMobile ? 4 : 0}>
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
                    <FormMarkdown
                      id="bio"
                      name="bio"
                      label="Bio"
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
                  </Panel>
                </Box>
                <Box flex={4}>
                  <Heading as="h3" size="md" mb={6}>
                    Icons and Headers
                  </Heading>
                  <Panel pb={12}>
                    <Flex
                      justify="space-between"
                      direction={isMobile ? "column" : "row"}
                    >
                      <FormGroup
                        name="avatar"
                        label="Profile Picture"
                        mr={4}
                        w="auto"
                        flex={1}
                        help={
                          !currentSettings?.useGravatar &&
                          "1:1 aspect ratio is preferred"
                        }
                      >
                        {!currentSettings?.useGravatar && (
                          <ImageUploader id="avatar" name="avatar" ratio={1} />
                        )}
                        {currentSettings?.useGravatar && (
                          <>
                            <Avatar
                              useGravatar
                              emailHash={data?.self?.emailHash}
                              username={data?.self?.username}
                            />
                            <FormHelperText>
                              Controlled via{" "}
                              <a target="_blank" href="https://gravatar.com">
                                [Gravatar]
                              </a>
                              . Please visit Gravatar.com to change, or go to{" "}
                              <Link href="/settings/user/preferences">
                                [preferences]
                              </Link>{" "}
                              and disable gravatar avatars
                            </FormHelperText>
                          </>
                        )}
                      </FormGroup>
                      <FormGroup
                        name="header"
                        label="Profile Header"
                        width="100%"
                        help="16:6 aspect ratio is preffered"
                        flex={4}
                      >
                        <ImageUploader
                          id="header"
                          name="header"
                          ratio={16 / 6}
                        />
                      </FormGroup>
                    </Flex>
                    <FormGroup
                      name="streamThumbnail"
                      label="Stream Thumbnail"
                      help={
                        <>
                          <Text>16:9 aspect ratio is preferred.</Text>
                          <Text>
                            {
                              "Used for any channel that doesn't have it's own thumbnail set."
                            }
                          </Text>
                        </>
                      }
                    >
                      <ImageUploader
                        id="streamThumbnail"
                        name="streamThumbnail"
                        ratio={16 / 9}
                        aspectMaxH="100%"
                        aspectMaxW="100%"
                      />
                    </FormGroup>
                  </Panel>
                </Box>
              </Flex>
              <Box
                display="inline-block"
                position="sticky"
                float="right"
                bottom={0}
              >
                <Button
                  type="submit"
                  mt={6}
                  isLoading={isUpdating}
                  isDisabled={!dirty}
                >
                  Update profile
                </Button>
              </Box>
            </form>
          )}
        </Form>
      )}
    </>
  );
};
