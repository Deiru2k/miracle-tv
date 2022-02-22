import { gql } from "@apollo/client";
import { UseDisclosureReturn } from "@chakra-ui/hooks";
import {
  AccessUnit,
  AdminFullUserFragment,
  PasswordResetMethod,
} from "miracle-tv-shared/graphql";
import { ADMIN_FULL_USER_FRAGMENT } from "./const";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  AspectRatio,
  Divider,
  Button,
  Heading,
  Text,
  SimpleGrid,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { getMediaURL } from "miracle-tv-shared/media";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { useUpdateFullUserMutation } from "miracle-tv-shared/hooks";
import { ResetPasswordField } from "./ResetPasswordField";
import { AdminUserEditForm } from "./AdminUserForm";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useTranslation } from "react-i18next";

type Props = {
  user: AdminFullUserFragment | null;
} & Partial<UseDisclosureReturn>;

gql`
  mutation UpdateFullUser($input: UpdateFullUserInput!) {
    updateFullUser(input: $input) {
      ...AdminFullUser
    }
  }
  ${ADMIN_FULL_USER_FRAGMENT}
`;

type UpdateFields =
  | "deleted"
  | "silenced"
  | "suspended"
  | "loginDisabled"
  | "roles";

export const UserModal = ({ user, onClose }: Props) => {
  const { checkRights, checkActions } = useCurrentUser();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const toast = useToast();

  const { t: tAdmin } = useTranslation("admin");
  const { t: tUser } = useTranslation("user");
  const { t: tCommon } = useTranslation("common");

  const [updateFullUserMutation] = useUpdateFullUserMutation({
    onCompleted() {
      toast({ status: "success", title: "Updated user" });
    },
    onError(data: any) {
      toast({ status: "error", title: "There was an error updating user" });
    },
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
  });

  const onUpdate = useCallback(
    (field: UpdateFields, value: boolean) => {
      updateFullUserMutation({
        variables: { input: { id: user?.id, [field]: value } },
      });
    },
    [updateFullUserMutation, user]
  );

  const canEditUser = useMemo(() => {
    return checkRights(AccessUnit.Write, "users");
  }, [checkRights]);

  const actionRights = useMemo(
    () => ({
      user: {
        silence: checkActions("user", "silence"),
        ban: checkActions("user", "ban"),
      },
    }),
    [checkActions]
  );

  return (
    <Modal
      isOpen={!!user}
      onClose={onClose}
      size={isMobile ? "full" : undefined}
    >
      <ModalOverlay />
      <ModalContent maxW={isMobile ? undefined : "70vw"}>
        <ModalBody p={0}>
          <ModalCloseButton
            as={isMobile ? IconButton : undefined}
            zIndex={10}
          />
          <Flex
            id="settings-wrapper"
            w="100%"
            direction={isMobile ? "column" : "row"}
          >
            <Flex flex={5} direction="column">
              <Flex position="relative">
                <AspectRatio
                  w="100%"
                  ratio={16 / 6}
                  zIndex={1}
                  borderRightWidth="2px"
                  borderStyle="solid"
                  borderColor="primary.500"
                >
                  <Image
                    src={
                      user?.header
                        ? getMediaURL(user?.header?.filename)
                        : "/placeholders/sanae_profile.png"
                    }
                    objectPosition="center"
                    borderRightWidth="5px"
                  />
                </AspectRatio>
                <Flex
                  zIndex={2}
                  w="100%"
                  px={2}
                  py={1}
                  align="center"
                  bottom="-2rem"
                  position="absolute"
                >
                  <Link target="_blank" href={`/user/${user?.username}`}>
                    <Avatar
                      borderRadius="50%"
                      username={user?.username}
                      useGravatar={user?.settings?.useGravatar}
                      aspectMaxH="70px"
                      aspectMaxW="70px"
                      imageId={user?.avatar?.filename}
                      bgColor="white"
                      useAspectRatio={false}
                      borderLeftWidth="1px"
                      borderRightWidth="1px"
                      borderTopWidth="1px"
                      borderStyle="solid"
                      borderColor="primary.200"
                    />
                  </Link>
                </Flex>
              </Flex>
              <Box
                px={4}
                py={4}
                borderRightWidth="2px"
                borderStyle="solid"
                borderColor="primary.500"
                height="100%"
              >
                <Heading
                  size="md"
                  display="flex"
                  align="center"
                  mb={2}
                  mt="2rem"
                  py={1}
                >
                  {user?.displayName || user?.username}
                </Heading>
                <Flex direction="row" mb={2}>
                  <Text fontWeight="bold" mr={1}>
                    {tUser("username")}:
                  </Text>
                  <Text>{user?.username}</Text>
                </Flex>
                <Flex direction="row" mb={2}>
                  <Text fontWeight="bold" mr={1}>
                    {tUser("email")}:
                  </Text>
                  <Text>{user?.email}</Text>
                </Flex>
                <Flex direction="row" mb={2}>
                  <Text fontWeight="bold" mr={1}>
                    {" "}
                    {tUser("use-gravatar")}?:
                  </Text>
                  <Text>
                    {user?.settings?.useGravatar
                      ? tCommon("yes")
                      : tCommon("no")}
                  </Text>
                </Flex>
                <Flex direction="row" mb={2}>
                  <Text fontWeight="bold" mr={1}>
                    {tUser("single-user-mode")}?:
                  </Text>
                  <Text>
                    {user?.settings?.singleUserMode
                      ? tCommon("yes")
                      : tCommon("no")}
                  </Text>
                </Flex>
                {user?.settings?.singleUserMode && (
                  <Flex direction="row" mb={2}>
                    <Text fontWeight="bold" mr={1}>
                      {tUser("single-user-channel")}:
                    </Text>
                    {!user?.settings?.singleUserChannel && <Text>Not set</Text>}
                    {user?.settings?.singleUserChannel && (
                      <Text>{user?.settings?.singleUserChannel.name}</Text>
                    )}
                  </Flex>
                )}
                <Flex direction="row" mb={4}>
                  <Text fontWeight="bold" mr={1}>
                    {tUser("feature-profile-directory")}?:
                  </Text>
                  <Text>
                    {user?.settings?.featureInDirectory
                      ? tCommon("yes")
                      : tCommon("no")}
                  </Text>
                </Flex>
                <Heading size="sm" mb={2}>
                  {tAdmin("user-modal-actions")}
                </Heading>
                <Divider mb={2} />
                <SimpleGrid columns={2} spacing={2}>
                  <Button
                    onClick={() => onUpdate("suspended", !user?.suspended)}
                    isDisabled={!actionRights.user.ban}
                    colorScheme={!user?.suspended ? "red" : undefined}
                  >
                    {!user?.suspended
                      ? tAdmin("users-actions-suspend")
                      : tAdmin("users-actions-unsuspend")}
                  </Button>
                  <Button
                    onClick={() =>
                      onUpdate("loginDisabled", !user?.loginDisabled)
                    }
                    isDisabled={!canEditUser}
                    colorScheme={!user?.loginDisabled ? "red" : undefined}
                  >
                    {!user?.loginDisabled
                      ? tAdmin("users-actions-disable-login")
                      : tAdmin("users-actions-enable-login")}
                  </Button>
                  <Button
                    onClick={() => onUpdate("deleted", !user?.deleted)}
                    isDisabled={!canEditUser}
                    colorScheme={!user?.deleted ? "red" : undefined}
                  >
                    {!user?.deleted
                      ? tAdmin("users-actions-delete")
                      : tAdmin("users-actions-restore")}
                  </Button>
                  <Button
                    isDisabled={!actionRights.user.silence}
                    onClick={() => onUpdate("silenced", !user?.silenced)}
                    colorScheme={!user?.silenced ? "red" : undefined}
                  >
                    {!user?.silenced
                      ? tAdmin("users-actions-silence")
                      : tAdmin("users-actions-unsilence")}
                  </Button>
                </SimpleGrid>
              </Box>
            </Flex>
            <Box
              width="100%"
              flex={7}
              p={4}
              maxHeight={isMobile ? "100%" : "75vh"}
              overflowY={isMobile ? undefined : "auto"}
            >
              {user && (
                <>
                  <Heading size="md" mb={2} mt={4}>
                    {tAdmin("user-modal-reset-password")}
                  </Heading>
                  <ResetPasswordField
                    userId={user.id}
                    w="100%"
                    isDisabled={!canEditUser}
                    mb={2}
                  />
                  <AdminUserEditForm user={user} />
                </>
              )}
            </Box>
          </Flex>
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
