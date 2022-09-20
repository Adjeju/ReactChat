import React from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import CenteredContainer from "../components/shared/CenteredContainer";

const AuthPage = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(38deg, rgba(4,10,112,1) 0%, rgba(0,212,255,1) 100%)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CenteredContainer>
        <Outlet />
      </CenteredContainer>
    </Box>
  );
};

export default AuthPage;
