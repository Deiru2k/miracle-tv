import { FormControlProps } from "@chakra-ui/form-control";
import { useField } from "react-final-form";
import { FormGroup, FormGroupChakraProps } from "./FormGroup";
import { Textarea, TextareaProps } from "@chakra-ui/react";

type Props = {
  name: string;
  label?: string;
  error?: string;
  inputProps?: TextareaProps;
} & FormControlProps &
  FormGroupChakraProps;

export const FormTextarea = ({
  name,
  inputProps,
  ...formGroupProps
}: Props) => {
  const { input } = useField(name);

  return (
    <FormGroup name={name} {...formGroupProps}>
      <Textarea {...input} {...inputProps} />
    </FormGroup>
  );
};
