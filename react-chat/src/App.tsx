import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthPage, LoginPage, RegisterPage } from "./pages";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route index element={<Navigate to={"/auth/login"} />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/home" element={<div>Home page</div>} />
      </Routes>
    </>
  );
};

export default App;
