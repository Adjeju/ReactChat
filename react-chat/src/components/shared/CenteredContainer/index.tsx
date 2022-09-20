import { Box } from "@mui/material";
import React from "react";

type CenteredContainerProps = {
  children: React.ReactNode;
};

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "300px",
        background: "white",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredContainer;
