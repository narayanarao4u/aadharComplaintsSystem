import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { baseURL, api } from "../api";
import { ToastContainer, toast } from "react-toastify";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("token"),
  msg: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        msg: "LOGIN",
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: null, token: null, msg: "LOGOUT" };
    case "ERROR":
      return { ...state, msg: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const URL = `${baseURL}auth/user`;

    if (token) {
      axios
        .get(URL, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data) {
            dispatch({ type: "LOGIN", payload: { user: response.data, token } });
          }
        })
        .catch((error) => {
          dispatch({ type: "ERROR", payload: error.msg });
          console.error(error);
          toast(error.msg);
        });
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
