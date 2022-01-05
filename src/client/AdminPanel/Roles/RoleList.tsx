import { gql } from "@apollo/client";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
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
import { AdminRoleFragment } from "miracle-tv-shared/graphql";
import {
  useAdminRolesQuery,
  useBulkDeleteRolesMutation,
} from "miracle-tv-shared/hooks";
import { intersection, uniq, without } from "ramda";
import React, { useCallback, useEffect, useState } from "react";
import { ADMIN_ROLE_FRAGMENT } from "./const";

gql`
  query AdminRoles($filter: RolesFilter, $limit: QueryLimit) {
    roles(filter: $filter, limit: $limit) {
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
  const { data: { roles = [] } = {} } = useAdminRolesQuery();
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
      <Heading mb={2}>Roles</Heading>
      <Divider mb={4} />
      <Flex w="100%" justify="space-between">
        <Menu>
          <MenuButton
            size="sm"
            isDisabled={selectedRoles.length === 0}
            as={Button}
            mb={4}
            rightIcon={<ChevronDownIcon />}
          >
            Bulk actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onBulkDeleteRoles}>Delete</MenuItem>
          </MenuList>
        </Menu>
        <Button size="sm" onClick={onCreateDisclosureOpen}>
          Create role
        </Button>
      </Flex>
      <VStack w="100%">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isDisabled={roles.length === 0}
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
              <Th />
              <Th>ID</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role: AdminRoleFragment) => (
              <Tr>
                <Td>
                  <Checkbox
                    isDisabled={!role}
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
                      aria-label="Edit role"
                      icon={<EditIcon />}
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
