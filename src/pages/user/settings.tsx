import { gql } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { CurrentUserFullFragment } from "miracle-tv-client/hooks/auth";
import { UserCustomization } from "miracle-tv-client/UserSettings/UserCustomization";
import { UserEditForm } from "miracle-tv-client/UserSettings/UserEditForm";
import { UserPreferences } from "miracle-tv-client/UserSettings/UserPreferences";
import { UpdateSelfInput, UpdateUserInput } from "miracle-tv-shared/graphql";
import {
  UserSettingsFormDataQueryResult,
  useSettingsUpdateUserMutation,
  useUserSettingsFormDataQuery,
} from "miracle-tv-shared/hooks";
import { omit } from "ramda";
import React, { useCallback, useMemo } from "react";
import { Form } from "react-final-form";

gql`
  query UserSettingsFormData {
    self {
      displayName
      bio
      singleUserMode
      avatar {
        id
      }
      header {
        id
      }
      streamThumbnail {
        id
      }
    }
  }
`;

gql`
  mutation SettingsUpdateUser($input: UpdateSelfInput!) {
    updateSelf(input: $input) {
      ...CurrentUser
    }
  }
  ${CurrentUserFullFragment}
`;

const convertUserToForm = ({
  avatar,
  streamThumbnail,
  header,
  ...user
}: UserSettingsFormDataQueryResult["data"]["self"]): UpdateUserInput => {
  return {
    header: header?.id,
    avatar: avatar?.id,
    streamThumbnail: streamThumbnail?.id,
    ...(user as UpdateUserInput),
  };
};

type LoaderProps = {
  isActive?: boolean;
  rows?: number;
  rowHeight?: string;
  children: React.ReactNode | React.ReactNode[];
};

const Loader = ({
  children,
  isActive = false,
  rows = 3,
  rowHeight = "20px",
}: LoaderProps) => {
  const rowEls = useMemo(() => [...Array(rows).keys()], [rows]);
  return isActive ? (
    <Stack>
      <Skeleton height={rowHeight} />
      <SkeletonText mt="4" noOfLines={rows} spacing="4" />
    </Stack>
  ) : (
    <>{children}</>
  );
};

const UserSettingsPage = (): JSX.Element => {
  const toast = useToast();
  const { data, loading: userLoading } = useUserSettingsFormDataQuery();
  const [updateSelf, { loading: mutationLoading }] =
    useSettingsUpdateUserMutation({
      onCompleted: () => {
        toast({ status: "success", title: "Changes saved!" });
      },
      onError: () => {
        toast({ status: "error", title: "Could not save changes!" });
      },
    });

  const updateUserData = useMemo(
    () =>
      data?.self ? convertUserToForm(omit(["__typename"], data?.self)) : {},
    [data]
  );

  const onSubmit = useCallback((input: UpdateSelfInput) => {
    updateSelf({ variables: { input } });
  }, []);

  return (
    <>
      <AuthRedirect />
      <Box bgColor="secondary.400" p={4} mb={4}>
        <Heading>My Settings</Heading>
      </Box>
      <Form<UpdateSelfInput> onSubmit={onSubmit} initialValues={updateUserData}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Flex direction={["column", "column", "row"]} px={4}>
              <VStack w="100%" mr={[0, 0, 6]} mb={[4, 0]}>
                <Box w="100%">
                  <Heading mb={4}>My Profile</Heading>
                  <Panel>
                    <Loader isActive={userLoading} rows={6} rowHeight="30px">
                      <UserEditForm />
                    </Loader>
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={mutationLoading}
                      isDisabled={userLoading}
                    >
                      Save
                    </Button>
                  </Panel>
                </Box>
                <Box w="100%">
                  <Heading mb={4}>My preferences</Heading>
                  <Panel>
                    <Loader isActive={userLoading} rows={3} rowHeight="30px">
                      <UserPreferences />
                      <Button
                        mt={4}
                        type="submit"
                        isLoading={mutationLoading}
                        isDisabled={userLoading}
                      >
                        Save
                      </Button>
                    </Loader>
                  </Panel>
                </Box>
              </VStack>
              <VStack
                w={["100%", "100%", "50vh", "unset"]}
                flex={[1, 1, "unset", 1]}
              >
                <Box w="545px">
                  <Heading mb={4}>Customization</Heading>
                  <Panel>
                    <Loader isActive={userLoading} rows={12} rowHeight="30px">
                      <UserCustomization />
                      <Button
                        mt={4}
                        type="submit"
                        isLoading={mutationLoading}
                        isDisabled={userLoading}
                      >
                        Save
                      </Button>
                    </Loader>
                  </Panel>
                </Box>
              </VStack>
            </Flex>
          </form>
        )}
      </Form>
    </>
  );
};

export default UserSettingsPage;
