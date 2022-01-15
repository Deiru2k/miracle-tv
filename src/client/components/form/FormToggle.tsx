import React from "react";
import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Switch, SwitchProps } from "@chakra-ui/react";

type Props = {
  name: string;
  label?: string;
  error?: string;
  help?: string;
  inputProps?: SwitchProps;
} & FormControlProps &
  FormGroupChakraProps;

export const FormToggle = ({ name, inputProps, ...formGroupProps }: Props) => {
  const { input } = useField(name, { type: "checkbox" });

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Switch
        {...input}
        {...inputProps}
        isDisabled={formGroupProps.isDisabled}
        defaultChecked={input.checked}
        isChecked={input.checked}
      />
    </FormGroup>
  );
};
