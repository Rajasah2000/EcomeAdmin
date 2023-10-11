import React, { createContext, useContext, useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Authservice from "../Service/Authservice";

const AuthContext = createContext();

export const useContextProvider = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(
    () => localStorage.getItem("loginStatus") || false
  );

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, [loginStatus]);

  const fetchUserDetails = async () => {
    console.log("LOginSTATAUS", loginStatus);
    Authservice.AdminProfile()
      .then((res) => {
        console.log("PROFILERES", res);
        if (res && res.status) {
          setUserDetails(res?.data[0]);
          setLoginStatus(true);
        } else {
          setUserDetails(null);
          setLoginStatus(false);
          localStorage.clear();
        }
      })
      .catch((err) => {
        console.log(err);
        setUserDetails(null);
        setLoginStatus(false);
        localStorage.clear();
      });
  };

  return (
    <AuthContext.Provider
      value={{ loginStatus, setLoginStatus, userDetails, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
