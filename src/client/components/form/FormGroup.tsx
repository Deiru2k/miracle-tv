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
  help?: string | React.ReactNode;
  hideLabel?: boolean;
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
  help,
  hideLabel = false,
  ...controlProps
}: Props) => {
  return (
    <FormControl id={name} pt={0} mt={0} {...controlProps}>
      {!!label && !hideLabel && (
        <FormLabel pt={0} mt={0} mb={3.5} {...labelProps}>
          {label}
        </FormLabel>
      )}
      {children}
      {!!error && (
        <FormHelperText {...errorProps} color="error">
          {error}
        </FormHelperText>
      )}
      {!!help && <FormHelperText>{help}</FormHelperText>}
    </FormControl>
  );
};
