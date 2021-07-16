import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  HelpTextProps,
} from "@chakra-ui/form-control";

export type FormGroupChakraProps = {
  labelProps?: FormLabelProps;
  errorProps?: HelpTextProps;
};

type Props = {
  name: string;
  label?: string;
  error?: string;
  children: React.ReactNode | React.ReactNode[];
} & FormGroupChakraProps &
  FormControlProps;

export const FormGroup = ({
  name,
  label,
  error,
  children,
  labelProps,
  errorProps,
  ...controlProps
}: Props) => {
  return (
    <FormControl id={name} {...controlProps} pt={0} mt={0}>
      {!!label && (
        <FormLabel {...labelProps} pt={0} mt={0}>
          {label}
        </FormLabel>
      )}
      {children}
      {!!error && (
        <FormHelperText {...errorProps} color="error">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
