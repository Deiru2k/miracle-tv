import { gql } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { UpdateActivityInput } from "miracle-tv-shared/graphql";
import {
  useAdminActivityPageQuery,
  useAdminUpdateActivityMutation,
} from "miracle-tv-shared/hooks";
import { useCallback, useMemo } from "react";
import { Form } from "react-final-form";
import { ActivityForm } from "./ActivityForm";
import { ADMIN_ACTIVITY_FRAGMENT } from "./const";

gql`
  query AdminActivityPage($id: ID!) {
    activity(id: $id) {
      ...AdminActivityFragment
    }
  }
  mutation AdminUpdateActivity($input: UpdateActivityInput!) {
    updateActivity(input: $input) {
      ...AdminActivityFragment
    }
  }
  ${ADMIN_ACTIVITY_FRAGMENT}
`;

type Props = {
  id: string;
};

export const AdminActivityPage = ({ id }: Props) => {
  const toast = useToast();
  const { data: { activity } = {} } = useAdminActivityPageQuery({
    variables: { id },
  });

  const formData: UpdateActivityInput = useMemo(
    () => ({
      id: activity?.id,
      name: activity?.name,
      verb: activity?.verb,
      image: activity?.image?.id,
      icon: activity?.icon?.id,
    }),
    [activity]
  );

  const [updateActivityMutation] = useAdminUpdateActivityMutation({
    onCompleted() {
      toast({ status: "success", title: "Updated activity!" });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error updating activity.",
      });
    },
  });

  const updateActivity = useCallback(
    (input: UpdateActivityInput) => {
      return updateActivityMutation({ variables: { input } });
    },
    [updateActivityMutation]
  );

  return (
    <>
      <Heading>Activity: {activity?.name}</Heading>
      <Form<UpdateActivityInput>
        onSubmit={updateActivity}
        initialValues={formData}
      >
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <ActivityForm />
            <Box
              display="inline-block"
              position="sticky"
              float="right"
              bottom={0}
            >
              <Button type="submit" mt={6} isDisabled={pristine}>
                Update profile
              </Button>
            </Box>
          </form>
        )}
      </Form>
    </>
  );
};
