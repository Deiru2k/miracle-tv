import { Heading } from "@chakra-ui/layout";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { Form } from "react-final-form";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
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
import { useTranslation } from "react-i18next";

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

  const { t: tSettings } = useTranslation("settings");
  const { t: tUser } = useTranslation("user");
  const { t: tCommon } = useTranslation("common");

  const [updateProfileMutation, { loading: isUpdating }] =
    useUpdateUserSettingsProfileMutation({
      onCompleted: () =>
        toast({
          status: "success",
          title: tSettings("profile-update-success"),
        }),
      onError: () =>
        toast({ status: "error", title: tSettings("profile-update-error") }),
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
    ({ roles, ...values }: UpdateSelfInput & { roles?: object[] }) => {
      updateProfileMutation({ variables: { input: values } });
    },
    [updateProfileMutation]
  );

  return (
    <>
      <Head>
        <title>{tSettings("ui-profile")} - Miracle TV</title>
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
                    {tSettings("ui-profile")}
                  </Heading>
                  <Panel>
                    <FormInput
                      id="displayName"
                      name="displayName"
                      label={tUser("display-name")}
                      mb={4}
                    />
                    <FormMarkdown
                      id="bio"
                      name="bio"
                      label={tUser("bio")}
                      rows={10}
                      height="auto"
                      help={
                        <>
                          {tCommon("this-field-supports")}{" "}
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
                        label={tUser("profile-picture")}
                        mr={4}
                        w="auto"
                        flex={1}
                        help={
                          !currentSettings?.useGravatar &&
                          tCommon("aspect-ratio", { ratio: "1:1" })
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
                              {tSettings("gravatar-controlled-via")}{" "}
                              <a target="_blank" href="https://gravatar.com">
                                [Gravatar]
                              </a>
                              {". "}
                              {tSettings("gravatar-please-visit")}{" "}
                              <Link href="/settings/user/preferences">
                                [{tSettings("ui-preferences")}]
                              </Link>{" "}
                              {tSettings("gravatar-and-disable")}
                            </FormHelperText>
                          </>
                        )}
                      </FormGroup>
                      <FormGroup
                        name="header"
                        label={tUser("profile-header")}
                        width="100%"
                        help={tCommon("aspect-ratio", { ratio: "16:6" })}
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
                      mt={6}
                      name="streamThumbnail"
                      label={tUser("stream-thumbnail")}
                      help={
                        <>
                          <Text>
                            {tCommon("aspect-ratio", { ratio: "16:9" })}
                          </Text>
                          <Text>{tSettings("profile-stream-thumbnail")}</Text>
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
                  {tSettings("preferences-update")}
                </Button>
              </Box>
            </form>
          )}
        </Form>
      )}
    </>
  );
};
