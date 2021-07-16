import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  useToast,
  VStack,
  Image,
  FormLabel,
} from "@chakra-ui/react";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import {
  CurrentUserFullFragment,
  useCurrentUser,
} from "miracle-tv-client/hooks/auth";
import { UserEditForm } from "miracle-tv-client/UserSettings/UserEditForm";
import { UpdateSelfInput } from "miracle-tv-shared/graphql";
import {
  useSettingsUpdateUserMutation,
  useUploadSettingsMediaMutation,
  useUserSettingsFormDataQuery,
} from "miracle-tv-shared/hooks";
import { omit } from "ramda";
import React, { useCallback } from "react";
import { Form } from "react-final-form";

gql`
  query UserSettingsFormData {
    self {
      displayName
      bio
      singleUserMode
    }
  }
`;

gql`
  mutation SettingsUpdateUser($input: UpdateSelfInput!) {
    updateSelf(input: $input) {
      ...CurrentUser
    }
  }
  mutation UploadSettingsMedia($input: Upload!) {
    uploadFile(file: $input) {
      id
      filename
      mimetype
      encoding
    }
  }
  ${CurrentUserFullFragment}
`;

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

  const [uploadFile] = useUploadSettingsMediaMutation();

  const onSubmit = useCallback((input: UpdateSelfInput) => {
    updateSelf({ variables: { input } });
  }, []);

  return (
    <>
      <AuthRedirect />
      <Box bgColor="secondary.400" p={4} mb={4}>
        <Heading>My Settings</Heading>
      </Box>
      <Flex direction={["column", "row"]} px={4}>
        <VStack flex={1} mr={[0, 6]} mb={[4, 0]}>
          <Box w="100%">
            <Heading mb={4}>My Profile</Heading>
            <Panel>
              <Form<UpdateSelfInput>
                onSubmit={onSubmit}
                initialValues={omit(["__typename"], data?.self)}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <UserEditForm />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={mutationLoading}
                      isDisabled={userLoading}
                    >
                      Save
                    </Button>
                  </form>
                )}
              </Form>
            </Panel>
          </Box>
          <Box w="100%">
            <Heading mb={4}>My preferences</Heading>
            <Panel>
              <Form<any> onSubmit={() => {}}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <FormToggle
                      name="singleUserMode"
                      label="Single User Mode"
                    />
                    <FormToggle name="useGravatar" label="Use Gravatar" />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={mutationLoading}
                      isDisabled={userLoading}
                    >
                      Save
                    </Button>
                  </form>
                )}
              </Form>
            </Panel>
          </Box>
        </VStack>
        <VStack flex={1}>
          <Box w="100%">
            <Heading mb={4}>Customization</Heading>
            <Panel>
              <Flex mb={4} direction={["column", "row"]}>
                <Flex
                  flex={1}
                  direction="column"
                  align={["center", "unset"]}
                  mr={16}
                >
                  <FormLabel size="sm" mb={4}>
                    Profile Picture
                  </FormLabel>
                  <Box w="100%">
                    <AspectRatio h="100%" w="100%" ratio={1} mr={4} mb={4}>
                      <Image
                        borderRadius={8}
                        boxSizing="border-box"
                        borderWidth="3px"
                        borderStyle="dashed"
                        borderColor="primary.200"
                        src="/yuuka-avatar.jpg"
                      />
                    </AspectRatio>
                  </Box>
                  <Box flex="auto" />
                  <Box>
                    <input
                      type="file"
                      onChange={({ target }) => {
                        const input = target?.files?.item(0);
                        uploadFile({ variables: { input } });
                      }}
                      style={{ color: "white", width: "250px" }}
                    />
                  </Box>
                </Flex>
                <Flex flex={4} direction="column" align={["center", "unset"]}>
                  <FormLabel size="sm" mb={4}>
                    Stream Thumbnail
                  </FormLabel>
                  <Box w="100%">
                    <AspectRatio h="100%" w="100%" ratio={16 / 9} mr={4} mb={8}>
                      <Image
                        borderRadius={8}
                        boxSizing="border-box"
                        borderWidth="3px"
                        borderStyle="dashed"
                        borderColor="primary.200"
                        src="/yuuka-thumbnail.jpg"
                      />
                    </AspectRatio>
                  </Box>
                  <Box flex="auto" />
                  <Box>
                    <input
                      type="file"
                      style={{ color: "white", width: "250px" }}
                    />
                  </Box>
                </Flex>
              </Flex>
              <FormLabel size="sm" mb={4}>
                Header
              </FormLabel>
              <Flex direction="column" align={["center", "unset"]}>
                <AspectRatio w="100%" ratio={16 / 5} mb={4}>
                  <Image
                    src="/yuuka-header.jpg"
                    borderRadius={8}
                    boxSizing="border-box"
                    borderWidth="3px"
                    borderStyle="dashed"
                    borderColor="primary.200"
                  />
                </AspectRatio>
                <input type="file" style={{ color: "white", width: "250px" }} />
              </Flex>
            </Panel>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default UserSettingsPage;
