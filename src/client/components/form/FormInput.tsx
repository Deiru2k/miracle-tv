import React from "react";
import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Input } from "@chakra-ui/input";
import { InputProps } from "@chakra-ui/react";

type Props = {
  name: string;
  label?: string;
  error?: string;
  type?: string;
  inputProps?: InputProps;
} & FormControlProps &
  FormGroupChakraProps;

export const FormInput = ({
  name,
  type: inputType,
  inputProps,
  ...formGroupProps
}: Props) => {
  const { input } = useField(name);

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Input {...input} type={inputType} {...inputProps} />
    </FormGroup>
  );
};
