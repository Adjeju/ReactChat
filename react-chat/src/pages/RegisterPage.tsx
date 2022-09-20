import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import InputField from "../components/shared/FormHelpers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../validators/registrationSchema";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../api/authApi";
import { useNavigate } from "react-router";

export type RegistrationFormFields = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationFormFields>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onRegistrationSubmit = async ({
    password,
    email,
    username,
  }: RegistrationFormFields) => {
    try {
      // await registerUser({
      //   email,
      //   username,
      //   password,
      // }).unwrap();
      toast.success("You have been succesfully registrated", {
        onClose: () => navigate("/auth/login"),
      });
      // toast.success("We have sent you activation link on email", {
      //   onClose: () => navigate("/auth/login"),
      // });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mb: "15px" }}>
        Registration
      </Typography>
      <form onSubmit={handleSubmit(onRegistrationSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              sx={{ margin: "10px 0" }}
              errorMessage={errors.email?.message}
              label="Email"
              placeholder="Enter email"
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              errorMessage={errors.username?.message}
              sx={{ margin: "10px 0" }}
              label="Username"
              placeholder="Enter username"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              sx={{ margin: "10px 0" }}
              errorMessage={errors.password?.message}
              label="Passwod"
              placeholder="Enter password"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              sx={{ margin: "10px 0" }}
              errorMessage={errors.confirmPassword?.message}
              label="Repeat password"
              placeholder="Confirm password"
            />
          )}
        />
        {!isLoading && (
          <Button
            sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
            type="submit"
          >
            Register
          </Button>
        )}
        {isLoading && (
          <CircularProgress
            sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        )}
      </form>
    </>
  );
};

export default RegisterPage;
