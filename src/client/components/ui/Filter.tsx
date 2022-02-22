import { Button, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

type Props<T = any> = {
  initialValues?: Partial<T>;
  defaultValues?: Partial<T>;
  onFilter: (values: T) => void;
  children: React.ReactNode;
  refetch?: () => void;
} & FlexProps;

export const Filter = <T extends any>({
  onFilter,
  initialValues,
  defaultValues,
  children,
  refetch,
  ...props
}: Props<T>) => {
  const { t: tFilter } = useTranslation("filter");
  return (
    <Form<T> initialValues={initialValues} onSubmit={onFilter}>
      {({ handleSubmit, pristine, form: { reset } }) => (
        <Flex w="100%" mb={2} {...props}>
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
                  reset(defaultValues);
                  handleSubmit(defaultValues);
                }}
                mr={2}
              >
                {tFilter("clear")}
              </Button>
              <Button colorScheme="primary" type="submit">
                {tFilter("apply")}
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Form>
  );
};
