import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../api/authApi";
import InputField from "../components/shared/FormHelpers";
import { loginSchema } from "../validators/loginSchema";

export type LoginFormFields = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormFields>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormFields) => {
    try {
      // const payload = await loginUser(data).unwrap();
      // console.log(payload);
      toast.success("Successfully logged in", {
        onClose: () => navigate("/home"),
      });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              sx={{ margin: "10px 0" }}
              errorMessage={errors.username?.message}
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
              label="Password"
              placeholder="Enter password"
            />
          )}
        />
        {!isLoading && (
          <Button
            sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
            type="submit"
          >
            Login
          </Button>
        )}
        {isLoading && (
          <CircularProgress
            sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        )}
      </form>
      <div
        onClick={() => navigate("/auth/register")}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <div>You don't have account yet?</div>
        <div>Register now!</div>
      </div>
    </>
  );
};

export default LoginPage;
