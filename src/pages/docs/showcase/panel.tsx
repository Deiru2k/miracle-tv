import React from "react";
import { Form } from "react-final-form";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { createShowcase } from "miracle-tv-shared/showcase/create";
import { UserEditForm } from "miracle-tv-client/UserSettings/UserEditForm";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

export default createShowcase(
  <Panel>
    <Heading mb={4}>Panel Content</Heading>
    <Box w="55vw">
      <Form onSubmit={() => {}}>{() => <UserEditForm />}</Form>
    </Box>
  </Panel>,
  { title: "Panel" }
);
