import { gql } from "@apollo/client";
import { ChevronDownIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  HStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  SimpleGrid,
} from "@chakra-ui/react";
import { FormCheckbox } from "miracle-tv-client/components/form/FormCheckbox";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";
import { Filter } from "miracle-tv-client/components/ui/Filter";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { Pagination, usePagination } from "miracle-tv-client/hooks/pagination";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  AccessUnit,
  AdminFullUserFragment,
  FullUsersFilter,
} from "miracle-tv-shared/graphql";
import {
  useFullUserAdminQuery,
  useFullUserAdminCountQuery,
  useBulkDeleteUsersMutation,
  useBulkRestoreUsersMutation,
  useBulkSuspendUsersMutation,
  useBulkUnsuspendUsersMutation,
  useBulkDisableLoginsMutation,
  useBulkEnableLoginsMutation,
  useBulkSilenceUsersMutation,
  useBulkUnsilenceUsersMutation,
} from "miracle-tv-shared/hooks";
import { uniq } from "ramda";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ADMIN_FULL_USER_FRAGMENT } from "./const";
import { UserModal } from "./UserModal";

gql`
  query FullUserAdmin($filter: FullUsersFilter, $limit: QueryLimit) {
    fullUsers(filter: $filter, limit: $limit) {
      ...AdminFullUser
    }
  }
  query FullUserAdminCount($filter: FullUsersFilter) {
    fullUserCount(filter: $filter)
  }
  ${ADMIN_FULL_USER_FRAGMENT}
`;

gql`
  mutation BulkDeleteUsers($ids: [ID]!) {
    deleteFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkRestoreUsers($ids: [ID]!) {
    restoreFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkSuspendUsers($ids: [ID]!) {
    suspendFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkUnsuspendUsers($ids: [ID]!) {
    unsuspendFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkDisableLogins($ids: [ID]!) {
    disableFullUsersLogin(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkEnableLogins($ids: [ID]!) {
    enableFullUsersLogin(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkSilenceUsers($ids: [ID]!) {
    silenceFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  mutation BulkUnsilenceUsers($ids: [ID]!) {
    unsilenceFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${ADMIN_FULL_USER_FRAGMENT}
`;

const perPage = 6;

const defaultFilter: FullUsersFilter = {
  deleted: false,
};

export const AdminUserList = () => {
  const toast = useToast();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { checkRights, checkActions } = useCurrentUser();
  const [filter, setFilter] = useState<FullUsersFilter>(defaultFilter);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [editableUserId, setEditableUserId] = useState<string | null>(null);

  const { t: tAdmin } = useTranslation("admin");
  const { t: tUser } = useTranslation("user");

  const { data: { fullUserCount = 0 } = {} } = useFullUserAdminCountQuery({
    variables: { filter },
  });
  const pagination = usePagination(fullUserCount, perPage);
  const {
    data: { fullUsers = [] } = {},
    loading: isLoading,
    refetch,
  } = useFullUserAdminQuery({
    variables: {
      filter: filter,
      limit: { limit: perPage, skip: pagination.targetSkip },
    },
    fetchPolicy: "no-cache",
  });

  const editableUser: AdminFullUserFragment | null = useMemo(() => {
    return fullUsers.find((user) => user.id === editableUserId) || null;
  }, [editableUserId, fullUsers]);

  const onUserModalOpen = useCallback(
    (id: string) => {
      setEditableUserId(id);
    },
    [setEditableUserId]
  );

  const onUserModalClose = useCallback(() => {
    setEditableUserId(null);
  }, [setEditableUserId]);

  useEffect(() => {
    setSelectedUsers([]);
  }, [fullUsers, setSelectedUsers]);

  const toggleUser = useCallback(
    (id: string) => {
      if (selectedUsers.includes(id)) {
        setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
      } else {
        setSelectedUsers(uniq([...selectedUsers, id]));
      }
    },
    [selectedUsers, setSelectedUsers]
  );

  const toggleAllUsers = useCallback(() => {
    if (selectedUsers.length < fullUsers.length) {
      setSelectedUsers(fullUsers.map((user) => user.id));
    } else if (selectedUsers.length === fullUsers.length) {
      setSelectedUsers([]);
    }
  }, [selectedUsers, setSelectedUsers, fullUsers]);

  const isChecked = useCallback(
    (id: string) => selectedUsers.includes(id),
    [selectedUsers]
  );

  const [deleteBulkUserMutaiton] = useBulkDeleteUsersMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Disabled users!" });
    },
    onError() {
      toast({ status: "error", title: "There was an error disabling users!" });
    },
  });

  const onBulkDelete = useCallback(() => {
    deleteBulkUserMutaiton({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [restoreBulkUserMutaiton] = useBulkRestoreUsersMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Restored users!" });
    },
    onError() {
      toast({ status: "error", title: "There was an error restoring users!" });
    },
  });

  const onBulkRestore = useCallback(() => {
    restoreBulkUserMutaiton({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [suspendBulkUserMutation] = useBulkSuspendUsersMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Suspended users!" });
    },
    onError() {
      toast({ status: "error", title: "There was an error suspending users!" });
    },
  });

  const onBulkSuspend = useCallback(() => {
    suspendBulkUserMutation({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [unsuspendBulkUserMutation] = useBulkUnsuspendUsersMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Unsuspended users!" });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error Unsuspending users!",
      });
    },
  });

  const onBulkUnsuspend = useCallback(() => {
    unsuspendBulkUserMutation({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [disableLoginBulkMutation] = useBulkDisableLoginsMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Disabled login for users!" });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error Disabling login for users!",
      });
    },
  });

  const onBulkLoginDisable = useCallback(() => {
    disableLoginBulkMutation({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [enableLoginBulkMutation] = useBulkEnableLoginsMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Enabled login for users!" });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error Enabling login for users!",
      });
    },
  });

  const onBulkLoginEnable = useCallback(() => {
    enableLoginBulkMutation({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [silenceBulkMutation] = useBulkSilenceUsersMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Silenced users!" });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error Silencing users!",
      });
    },
  });

  const onBulkSilence = useCallback(() => {
    silenceBulkMutation({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const [unsilenceBulkMutation] = useBulkUnsilenceUsersMutation({
    refetchQueries: ["FullUserAdmin", "FullUserAdminCount"],
    onCompleted() {
      toast({ status: "success", title: "Unsilenced users!" });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error Silencing users!",
      });
    },
  });

  const onBulkUnsilence = useCallback(() => {
    unsilenceBulkMutation({ variables: { ids: selectedUsers } });
  }, [deleteBulkUserMutaiton, selectedUsers]);

  const bufferedUsers = useMemo(() => {
    if (fullUsers.length < perPage) {
      const bufferArray = Array(perPage - fullUsers.length).map(() => null);
      return [...fullUsers, ...bufferArray];
    }
    return fullUsers;
  }, [fullUsers]);

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
    <>
      <Heading mb={2}>{tAdmin("users")}</Heading>
      <Divider mb={4} />
      <Filter<FullUsersFilter>
        onFilter={setFilter}
        initialValues={filter}
        defaultValues={defaultFilter}
        refetch={refetch}
      >
        <Heading size="sm">{tAdmin("users-filter-fields")}</Heading>
        <SimpleGrid mt={2} columns={isMobile ? 1 : 3} spacing={2}>
          <FormInput name="username" label={tUser("username")} />
          <FormInput name="email" label={tUser("email")} />
          <FormRolesSelect
            name="roles"
            label={tUser("roles")}
            inputProps={{ multi: true }}
          />
        </SimpleGrid>
        <Heading mt={3} size="sm">
          {tAdmin("users-filter-states")}
        </Heading>
        <HStack mt={2}>
          <FormCheckbox
            name="suspended"
            label={tAdmin("users-filter-suspended")}
            w="initial"
          />
          <FormCheckbox
            name="silenced"
            label={tAdmin("users-filter-silenced")}
            w="initial"
          />
          <FormCheckbox
            name="loginDisabled"
            label={tAdmin("users-filter-login-disabled")}
            w="initial"
          />
          <FormCheckbox
            name="deleted"
            label={tAdmin("users-filter-deleted")}
            w="initial"
          />
        </HStack>
      </Filter>
      <Divider mb={4} />
      <Menu>
        <MenuButton
          size="sm"
          isDisabled={selectedUsers.length === 0}
          as={Button}
          mb={4}
          rightIcon={<ChevronDownIcon />}
        >
          {tAdmin("users-bulk-actions")}
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled={!canEditUser} onClick={onBulkDelete}>
            {tAdmin("users-actions-delete")}
          </MenuItem>
          <MenuItem isDisabled={!canEditUser} onClick={onBulkRestore}>
            {tAdmin("users-actions-restore")}
          </MenuItem>
          <MenuDivider />
          <MenuItem isDisabled={!actionRights.user.ban} onClick={onBulkSuspend}>
            {tAdmin("users-actions-suspend")}
          </MenuItem>
          <MenuItem
            isDisabled={!actionRights.user.ban}
            onClick={onBulkUnsuspend}
          >
            {tAdmin("users-actions-unsuspend")}
          </MenuItem>
          <MenuDivider />
          <MenuItem isDisabled={!canEditUser} onClick={onBulkLoginDisable}>
            {tAdmin("users-actions-disable-login")}
          </MenuItem>
          <MenuItem isDisabled={!canEditUser} onClick={onBulkLoginEnable}>
            {tAdmin("users-actions-enable-login")}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            isDisabled={!actionRights.user.silence}
            onClick={onBulkSilence}
          >
            {tAdmin("users-actions-silence")}
          </MenuItem>
          <MenuItem
            isDisabled={!actionRights.user.silence}
            onClick={onBulkUnsilence}
          >
            {tAdmin("users-actions-unsilence")}
          </MenuItem>
        </MenuList>
      </Menu>
      <UserModal user={editableUser} onClose={onUserModalClose} />
      <Box position="relative" overflowY="auto" maxW="100%">
        {isLoading && (
          <Box position="absolute" w="100%" h="100%" top={0} left={0}>
            <Loading />
          </Box>
        )}
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isDisabled={fullUsers.length === 0}
                  isChecked={
                    selectedUsers.length &&
                    selectedUsers.length === fullUsers.length
                  }
                  isIndeterminate={
                    selectedUsers.length > 0 &&
                    selectedUsers.length < fullUsers.length
                  }
                  onChange={toggleAllUsers}
                />
              </Th>
              <Th />
              <Th>{tUser("username")}</Th>
              <Th>{tUser("display-name")}</Th>
              <Th>{tUser("email")}</Th>
              <Th>{tAdmin("users-filter-suspended")}</Th>
              <Th>{tAdmin("users-filter-silenced")}</Th>
              <Th>{tAdmin("users-filter-login-disabled")}</Th>
              <Th>{tAdmin("users-filter-deleted")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bufferedUsers?.map((user, index) => (
              <Tr key={user?.id || index}>
                <Td>
                  <Checkbox
                    isDisabled={!user}
                    isChecked={isChecked(user?.id)}
                    onChange={() => user && toggleUser(user.id)}
                  />
                </Td>
                <Td>
                  <IconButton
                    isDisabled={!user}
                    p={0}
                    variant="ghost"
                    color="primary.200"
                    aria-label={canEditUser ? "Edit user" : "View user"}
                    icon={canEditUser ? <EditIcon /> : <InfoIcon />}
                    onClick={() => onUserModalOpen(user?.id)}
                  />
                </Td>
                <Td>{user?.username}</Td>
                <Td>{user?.displayName ?? "-"}</Td>
                <Td>{user?.email}</Td>
                <Td>
                  <Checkbox isReadOnly isChecked={user?.suspended} />
                </Td>
                <Td>
                  <Checkbox isReadOnly isChecked={user?.silenced} />
                </Td>
                <Td>
                  <Checkbox isReadOnly isChecked={user?.loginDisabled} />
                </Td>
                <Td>
                  <Checkbox isReadOnly isChecked={user?.deleted} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Pagination {...pagination} />
    </>
  );
};
