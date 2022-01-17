import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import { identity } from "ramda";

export type FormTextareaProps = {
  name: string;
  label?: string;
  error?: string;
  help?: string | React.ReactNode;
  rows?: number;
  inputProps?: TextareaProps;
  parse?: (v: any) => any;
} & FormControlProps &
  FormGroupChakraProps;

export const FormTextarea = ({
  name,
  inputProps,
  parse = identity,
  rows,
  ...formGroupProps
}: FormTextareaProps) => {
  const { input } = useField(name, { parse });

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Textarea {...input} {...inputProps} rows={rows} />
    </FormGroup>
  );
};
