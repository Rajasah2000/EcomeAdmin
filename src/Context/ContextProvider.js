import React, { createContext, useContext, useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Authservice from "../Service/Authservice";
import toast from "react-hot-toast";
import Helpers from "../Utils/Helpers";

const AuthContext = createContext();

export const useContextProvider = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(
    () => localStorage.getItem("loginStatus") || false
  );

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //  let id = reactLocalStorage.get("id");
  //  console.log('idfsfsdfdsf', id);
  //   fetchUserDetails(id);
  // }, []);

  // const fetchUserDetails = async (id) => {
  //   try {
  //     const res = await Helpers(`http://localhost:3004/api/admin/user-profile/${id}`, 'GET');
  //     if (res && res?.status) {
  //       console.log("UserData", res);
  //     } else {
  //       console.log("Error to fetch profile data");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{ loginStatus, setLoginStatus, userDetails,setUserDetails, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
