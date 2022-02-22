import { gql } from "@apollo/client";
import { ChevronDownIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CreateRoleModal } from "miracle-tv-client/components/roles/RolePermissions/CreateRoleModal";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { AccessUnit, AdminRoleFragment } from "miracle-tv-shared/graphql";
import {
  useAdminRolesQuery,
  useBulkDeleteRolesMutation,
} from "miracle-tv-shared/hooks";
import { useTranslation } from "next-i18next";
import { intersection, uniq, without } from "ramda";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ADMIN_ROLE_FRAGMENT } from "./const";

gql`
  query AdminRoles($filter: RolesFilter, $limit: QueryLimit) {
    rolesRaw(filter: $filter, limit: $limit) {
      ...AdminRole
    }
  }
  ${ADMIN_ROLE_FRAGMENT}
`;

gql`
  mutation BulkDeleteRoles($ids: [ID]!) {
    bulkDeleteRoles(ids: $ids)
  }
`;

const systemRoles = ["admin", "moderator", "user", "volunteer"];

export const AdminRolesList = () => {
  const toast = useToast();

  const { t: tRole } = useTranslation("role");
  const { t: tCommon } = useTranslation("common");

  const { checkRights } = useCurrentUser();

  const canViewRole = useMemo(() => checkRights(AccessUnit.Read, "roles"), []);
  const canEditRole = useMemo(() => checkRights(AccessUnit.Write, "roles"), []);

  const { data: { rolesRaw: roles = [] } = {} } = useAdminRolesQuery({
    skip: !canViewRole,
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const createDisclosure = useDisclosure();
  const onCreateDisclosureOpen = useCallback(() => {
    createDisclosure.onOpen();
  }, [createDisclosure]);

  const toggleRole = useCallback(
    (id: string) => {
      if (selectedRoles.includes(id)) {
        setSelectedRoles(selectedRoles.filter((roleId) => roleId !== id));
      } else {
        setSelectedRoles(uniq([...selectedRoles, id]));
      }
    },
    [selectedRoles, setSelectedRoles]
  );

  const toggleAllRoles = useCallback(() => {
    if (selectedRoles.length < roles.length) {
      setSelectedRoles(roles.map((role) => role.id));
    } else if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    }
  }, [selectedRoles, setSelectedRoles, roles]);

  const isChecked = useCallback(
    (id: string) => selectedRoles.includes(id),
    [selectedRoles]
  );

  const [bulkDeleteRolesMutation] = useBulkDeleteRolesMutation({
    onCompleted() {
      toast({ status: "success", title: "Deleted roles!" });
    },
    onError() {
      toast({ status: "error", title: "There was an error deleted roles!" });
    },
    refetchQueries: ["AdminRoles"],
  });

  const onBulkDeleteRoles = useCallback(() => {
    const systemIntersect = intersection(systemRoles, selectedRoles);
    const rolesToDelete = without(systemIntersect, selectedRoles);

    if (systemIntersect.length > 0) {
      toast({
        status: "warning",
        title: `Following system roles cannot be deleted and were excluded: ${systemIntersect.join(
          ", "
        )}.`,
      });
    }
    if (rolesToDelete.length > 0) {
      bulkDeleteRolesMutation({ variables: { ids: rolesToDelete } });
    }
  }, [bulkDeleteRolesMutation, selectedRoles]);

  useEffect(() => {
    setSelectedRoles([]);
  }, [roles, setSelectedRoles]);

  return (
    <>
      <CreateRoleModal {...createDisclosure} />
      <Heading mb={2}>{tRole("roles")}</Heading>
      <Divider mb={4} />
      <Flex w="100%" justify="space-between">
        <Menu>
          <MenuButton
            size="sm"
            isDisabled={selectedRoles.length === 0 || !canEditRole}
            as={Button}
            mb={4}
            rightIcon={<ChevronDownIcon />}
          >
            {tCommon("actions")}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onBulkDeleteRoles}>{tCommon("delete")}</MenuItem>
          </MenuList>
        </Menu>
        <Button
          size="sm"
          onClick={onCreateDisclosureOpen}
          isDisabled={!canEditRole}
        >
          {tRole("form-create-role")}
        </Button>
      </Flex>
      <VStack w="100%">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th width="2rem">
                <Checkbox
                  isDisabled={roles.length === 0 || !canEditRole}
                  isChecked={
                    selectedRoles.length &&
                    selectedRoles.length === roles.length
                  }
                  isIndeterminate={
                    selectedRoles.length > 0 &&
                    selectedRoles.length < roles.length
                  }
                  onChange={toggleAllRoles}
                />
              </Th>
              <Th width="2rem" />
              <Th>ID</Th>
              <Th>{tRole("name")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role: AdminRoleFragment) => (
              <Tr key={role.id}>
                <Td>
                  <Checkbox
                    isDisabled={!role || !canEditRole}
                    isChecked={isChecked(role?.id)}
                    onChange={() => role && toggleRole(role.id)}
                  />
                </Td>
                <Td>
                  <Link href={`/admin/roles/${role?.id}`} isDisabled={!role}>
                    <IconButton
                      p={0}
                      variant="ghost"
                      color="primary.200"
                      aria-label={canEditRole ? "Edit role" : "View Role"}
                      icon={canEditRole ? <EditIcon /> : <InfoIcon />}
                    />
                  </Link>
                </Td>
                <Td>{role.id}</Td>
                <Td>{role.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </>
  );
};
