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

export type FormGroupProps = {
  name: string;
  label?: string;
  error?: string;
  help?: string | React.ReactNode;
  hideLabel?: boolean;
  isInline?: boolean;
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
  isInline = false,
  help,
  hideLabel = false,
  ...controlProps
}: FormGroupProps) => {
  const inlineLabelStyle = isInline
    ? {
        display: "inline-block",
        marginBottom: 0,
      }
    : {};
  const inlineFormControlStyle = isInline
    ? {
        display: "inline-flex",
        justify: "center",
        align: "center",
      }
    : {};
  return (
    <FormControl
      id={name}
      pt={0}
      mt={0}
      {...controlProps}
      {...inlineFormControlStyle}
    >
      {!!label && !hideLabel && (
        <FormLabel pt={0} mt={0} mb={1} {...labelProps} {...inlineLabelStyle}>
          {label}
        </FormLabel>
      )}
      {children}
      {!!error && (
        <FormHelperText {...errorProps} color="error" mt={1}>
          {error}
        </FormHelperText>
      )}
      {!!help && <FormHelperText mt={1}>{help}</FormHelperText>}
    </FormControl>
  );
};
