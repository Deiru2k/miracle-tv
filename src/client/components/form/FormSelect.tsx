import React from "react";
import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Select, SelectProps } from "miracle-tv-client/components/ui/Select";

export type FormSelectProps = {
  name: string;
  placeholder?: string;
  label?: string;
  help?: string;
  error?: string;
  type?: string;
  hideLabel?: boolean;
  inputProps?: Partial<SelectProps>;
  options: SelectProps["options"];
  onSearch?: (query: string) => void;
  isLoading?: boolean;
} & FormControlProps &
  FormGroupChakraProps;

export const FormSelect = ({
  name,
  type: inputType,
  inputProps,
  placeholder,
  options,
  onSearch,
  isLoading,
  isDisabled,
  ...formGroupProps
}: FormSelectProps) => {
  const { input } = useField(name);
  const inputPlaceholder =
    formGroupProps.hideLabel && formGroupProps.label
      ? formGroupProps.label
      : placeholder;

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Select
        options={options}
        value={input.value}
        onChange={input.onChange}
        placeholder={inputPlaceholder}
        onSearch={onSearch}
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...inputProps}
      />
    </FormGroup>
  );
};
