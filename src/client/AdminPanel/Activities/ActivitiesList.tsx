import { gql } from "@apollo/client";
import { Heading, Flex, Divider, HStack } from "@chakra-ui/layout";
import {
  useAdminActivityCountQuery,
  useAdminActivityListQuery,
  useAdminDeleteActivityMutation,
} from "miracle-tv-shared/hooks";
import { ADMIN_ACTIVITY_FRAGMENT } from "./const";
import { ActivityGrid } from "miracle-tv-client/components/ui/activities/ActivityGrid";
import {
  AccessUnit,
  ActivityFilter,
  AdminActivityFragmentFragment,
} from "miracle-tv-shared/graphql";
import React, { useCallback, useMemo, useState } from "react";
import { Pagination, usePagination } from "miracle-tv-client/hooks/pagination";
import { Filter } from "miracle-tv-client/components/ui/Filter";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { Button, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { ConfirmDialog } from "miracle-tv-client/components/ui/ConfirmDialog";
import { CreateActivityModal } from "./CreateActivityModal";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useTranslation } from "next-i18next";

gql`
  query AdminActivityCount($filter: ActivityFilter) {
    activitiesCount(filter: $filter)
  }
  query AdminActivityList($filter: ActivityFilter, $limit: ActivityLimit) {
    activities(filter: $filter, limit: $limit) {
      ...AdminActivityFragment
    }
  }
  mutation AdminDeleteActivity($id: ID!) {
    deleteActivity(id: $id)
  }
  ${ADMIN_ACTIVITY_FRAGMENT}
`;

const perPage = 15;

export const AdminActivitiesList = () => {
  const toast = useToast();
  const createDisclosure = useDisclosure();

  const { t: tActivity } = useTranslation("activity");
  const { t: tCommon } = useTranslation("common");

  const [filter, setFilter] = useState<ActivityFilter>({});
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  const { checkRights } = useCurrentUser();

  const canEditActivity = useMemo(
    () => checkRights(AccessUnit.Write, "activities"),
    [checkRights]
  );

  const { data: { activitiesCount = 0 } = {} } = useAdminActivityCountQuery({
    variables: { filter },
  });
  const pagination = usePagination(activitiesCount, perPage);
  const { data: { activities = [] } = {} } = useAdminActivityListQuery({
    variables: {
      filter,
      limit: { limit: perPage, skip: pagination.targetSkip },
    },
    fetchPolicy: "network-only",
  });

  const selectedActivity = useMemo<AdminActivityFragmentFragment>(
    () => activities.find((ac) => ac.id === activityToDelete),
    [activities, activityToDelete]
  );

  const [deleteActivityMutation] = useAdminDeleteActivityMutation({
    onCompleted() {
      toast({ status: "success", title: "Deleted activity!" });
      setActivityToDelete(null);
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error deleting activity.",
      });
      setActivityToDelete(null);
    },
    refetchQueries: ["AdminActivityList", "AdminActivityCount"],
  });
  const onActivityDeletePick = useCallback(
    (id: string) => {
      setActivityToDelete(id);
    },
    [setActivityToDelete]
  );

  const onActivityDeleteClose = useCallback(() => {
    setActivityToDelete(null);
  }, [setActivityToDelete]);

  const onActivityDelete = useCallback(() => {
    deleteActivityMutation({ variables: { id: activityToDelete } });
  }, [activityToDelete]);

  return (
    <>
      <CreateActivityModal {...createDisclosure} />
      <ConfirmDialog
        onConfirm={onActivityDelete}
        isOpen={!!activityToDelete}
        onClose={onActivityDeleteClose}
      >
        {tActivity("delete-confirm", { name: selectedActivity?.name })}
      </ConfirmDialog>
      <Flex mb={2} justify="space-between" align="center">
        <Heading>{tActivity("activities")}</Heading>
        <Button onClick={createDisclosure.onOpen} isDisabled={!canEditActivity}>
          {tCommon("create")}
        </Button>
      </Flex>
      <Divider mb={4} />
      <Filter onFilter={setFilter} mb={4}>
        <HStack>
          <FormInput name="name" label={tActivity("name")} w="50%" />
          <FormInput name="verb" label={tActivity("verb")} w="50%" />
        </HStack>
      </Filter>
      <ActivityGrid
        mb={6}
        activities={activities}
        getHref={(ac) => `/admin/activities/${ac.id}`}
        actions={(ac) => (
          <HStack spacing={0}>
            <IconButton
              size="sm"
              colorScheme="red"
              aria-label={tActivity("delete-activity")}
              title={tActivity("delete-activity")}
              isDisabled={!canEditActivity}
              onClick={() => onActivityDeletePick(ac.id)}
              icon={<DeleteIcon />}
            />
            <Link href={`/admin/activities/${ac.id}`}>
              <IconButton
                size="sm"
                aria-label={
                  canEditActivity
                    ? tActivity("edit-activity")
                    : tActivity("view-activity")
                }
                title={
                  canEditActivity
                    ? tActivity("edit-activity")
                    : tActivity("view-activity")
                }
                icon={canEditActivity ? <EditIcon /> : <InfoIcon />}
              />
            </Link>
          </HStack>
        )}
      />
      <Pagination {...pagination} />
    </>
  );
};
