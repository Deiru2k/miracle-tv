import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Form } from "react-final-form";

type Props<T = any> = {
  defaultValues?: Partial<T>;
  onFilter: (values: T) => void;
  children: React.ReactNode;
  refetch?: () => void;
};

export const Filter = <T extends any>({
  onFilter,
  defaultValues,
  children,
  refetch,
}: Props<T>) => {
  return (
    <Form<T> initialValues={defaultValues} onSubmit={onFilter}>
      {({ handleSubmit, pristine, form: { reset } }) => (
        <Flex w="100%" mb={2}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              if (pristine) {
                refetch?.();
              }
            }}
            style={{ width: "100%" }}
          >
            {children}
            <Flex justify="flex-end" width="100%" mt={2}>
              <Button
                colorScheme="red"
                onClick={() => {
                  reset({});
                  handleSubmit({});
                }}
                mr={2}
              >
                Clear filter
              </Button>
              <Button colorScheme="primary" type="submit">
                Filter
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Form>
  );
};
