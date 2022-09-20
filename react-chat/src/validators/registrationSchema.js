import * as yup from "yup";

export const registrationSchema = yup.object({
  email: yup.string().email("Invalid email").required("This field is required"),
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});
