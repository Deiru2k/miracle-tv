import React from "react";
import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Input } from "@chakra-ui/input";
import { InputProps } from "@chakra-ui/react";
import { identity } from "ramda";

type Props = {
  name: string;
  placeholder?: string;
  label?: string;
  error?: string;
  help?: string | React.ReactNode;
  type?: string;
  hideLabel?: boolean;
  inputProps?: InputProps;
  parse?: (v: any) => any;
} & FormControlProps &
  FormGroupChakraProps;

export const FormInput = ({
  name,
  type: inputType,
  inputProps,
  placeholder,
  parse = identity,
  ...formGroupProps
}: Props) => {
  const { input } = useField(name, { parse });
  const inputPlaceholder =
    formGroupProps.hideLabel && formGroupProps.label
      ? formGroupProps.label
      : placeholder;

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Input
        {...input}
        aria-label={formGroupProps.label}
        placeholder={inputPlaceholder}
        type={inputType}
        {...inputProps}
      />
    </FormGroup>
  );
};
