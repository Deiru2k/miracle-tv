import { Button } from "@chakra-ui/button";
import { Heading, Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { DateTime } from "luxon";
import { useCallback } from "react";
import { Form } from "react-final-form";
import { FormInput } from "../form/FormInput";

type Props = {
  onPasswordCheck: (password: string) => void;
};

type ChannelPasswordForm = {
  password: string;
};

export const ChannelPassword = ({ onPasswordCheck }: Props) => {
  const checkPassword = useCallback(
    (values: ChannelPasswordForm) => {
      if (values.password) {
        onPasswordCheck(values.password);
      }
    },
    [onPasswordCheck]
  );
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      <Form<ChannelPasswordForm> onSubmit={checkPassword}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Heading size="md" mb={2}>
              This channel requires a password to view.
            </Heading>
            <FormInput
              name="password"
              type="password"
              label="Password"
              isRequired
              w="100%"
            />
            <Flex w="100%" justify="center">
              <Button type="submit">Enter</Button>
            </Flex>
          </form>
        )}
      </Form>
      <Box></Box>
    </Flex>
  );
};
