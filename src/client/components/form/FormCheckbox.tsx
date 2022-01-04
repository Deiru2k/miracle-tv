import React from "react";
import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps, FormGroupProps } from "./FormGroup";
import { Checkbox, CheckboxProps } from "@chakra-ui/react";

type Props = {
  name: string;
  label?: string;
  error?: string;
  help?: string;
  inputProps?: CheckboxProps;
  uncheckUndefined?: boolean;
} & FormControlProps &
  FormGroupChakraProps &
  Omit<FormGroupProps, "children">;

export const FormCheckbox = ({
  name,
  inputProps,
  uncheckUndefined = false,
  ...formGroupProps
}: Props) => {
  const { input } = useField(name, { type: "checkbox" });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = event;
    if (!checked && uncheckUndefined) {
      input.onChange("");
    } else {
      input.onChange(event);
    }
  };
  return (
    <FormGroup name={name} {...formGroupProps}>
      <Checkbox
        {...input}
        {...inputProps}
        onChange={onChange}
        defaultChecked={input.checked}
        isChecked={input.checked}
      />
    </FormGroup>
  );
};
