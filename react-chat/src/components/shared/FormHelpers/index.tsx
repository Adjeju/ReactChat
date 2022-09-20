import { TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export type InputFieldProps = TextFieldProps & {
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  variant?: string;
};

export const InputField = React.forwardRef<TextFieldProps, InputFieldProps>(
  (
    { label, errorMessage, placeholder, variant = "outlined", ...rest },
    ref
  ) => {
    return (
      <>
        <TextField
          {...rest}
          inputRef={ref}
          fullWidth
          error={!!errorMessage}
          label={label}
          placeholder={placeholder}
          variant={variant}
        />
        {errorMessage && (
          <Box sx={{ color: "red", mb: "5px" }}>{errorMessage}</Box>
        )}
      </>
    );
  }
);

export default InputField;
