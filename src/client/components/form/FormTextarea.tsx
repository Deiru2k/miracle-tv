import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import { identity } from "ramda";

type Props = {
  name: string;
  label?: string;
  error?: string;
  inputProps?: TextareaProps;
  parse?: (v: any) => any;
} & FormControlProps &
  FormGroupChakraProps;

export const FormTextarea = ({
  name,
  inputProps,
  parse = identity,
  ...formGroupProps
}: Props) => {
  const { input } = useField(name, { parse });

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Textarea {...input} {...inputProps} />
    </FormGroup>
  );
};
