import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useContextProvider } from "../Context/ContextProvider";

const PrivateRoutes = () => {
  // const { loginStatus } = useContextProvider();
  const status = localStorage.getItem("loginStatus");

  return status ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
