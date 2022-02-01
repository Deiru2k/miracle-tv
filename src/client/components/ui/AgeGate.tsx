import { Button } from "@chakra-ui/button";
import { Heading, Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { DateTime } from "luxon";
import { useCallback } from "react";
import { Form } from "react-final-form";
import { FormInput } from "../form/FormInput";

type Props = {
  onAgeSet: () => void;
  description?: string;
};

type AgeGateForm = {
  year: string;
  month: string;
  day: string;
};

export const AgeGate = ({ onAgeSet, description }: Props) => {
  const toast = useToast();
  const onAgeCheck = useCallback(
    (values: AgeGateForm) => {
      const date = DateTime.fromFormat(
        `${values.year}-${values.month}-${values.day}`,
        "yyyy-M-d"
      );
      console.log(date);
      console.log(date.isValid);
      console.log(Math.abs(date.diffNow("years").years));
      if (date.isValid && Math.abs(date.diffNow("years").years) >= 18) {
        onAgeSet();
      } else {
        toast({ status: "warning", title: "Incorrect date" });
      }
    },
    [onAgeSet, toast]
  );
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      <Form<AgeGateForm> onSubmit={onAgeCheck}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Heading size="md" mb={2}>
              This content is marked as sensitive. Please, enter your date of
              birth to continue.
            </Heading>
            {description && (
              <>
                <Text fontWeight="bold" mr={1}>
                  Content warning:
                </Text>
                <Text mb={2}>{description}</Text>
              </>
            )}
            <HStack mb={2}>
              <FormInput name="year" type="number" label="Year" isRequired />
              <FormInput name="month" type="number" label="Month" isRequired />
              <FormInput name="day" type="number" label="Day" isRequired />
            </HStack>
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
