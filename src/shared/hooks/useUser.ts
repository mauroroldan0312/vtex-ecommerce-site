import {
  ApolloError,
  OperationVariables,
  QueryResult,
  useLazyQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN_QUERY, ME_QUERY } from "../graphql";
import { useUserStore } from "../store";
import { UserType } from "../models";
import { getFromSessionStorage } from "../utils";
import { useNavigate } from "react-router-dom";

export interface UseUserType {
  stateLogin: QueryResult<any, OperationVariables>;
  stateMe: QueryResult<any, OperationVariables>;
  user: UserType | null;
  loading: boolean;
  error: ApolloError | undefined;
  userName: string;
  password: string;
  handleGetCurrentSession: () => void;
  handleLogin: () => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

export const useUser = (): UseUserType => {
  const [login, stateLogin] = useLazyQuery(LOGIN_QUERY);
  const [me, stateMe] = useLazyQuery(ME_QUERY);
  const { user, token, handleSetToken, handleSetUser } = useUserStore();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loading = stateMe.loading || stateLogin.loading;
  const error = stateMe.error || stateLogin.error;

  const handleLogin = () => {
    login({ variables: { userName, password } });
  };

  const handleGetMe = (tokenSession: string) => {
    me({
      context: {
        headers: {
          Authorization: `Bearer ${tokenSession}`,
        },
      },
    });
  };

  const handleGetCurrentSession = () => {
    const token = getFromSessionStorage("token");
    console.log(token);
    if (token) {
      handleSetToken(token);
      handleGetMe(token);
    }
  };

  useEffect(() => {
    if (stateLogin && stateLogin.data) {
      console.log(stateLogin.data.login.token);
      handleSetToken(stateLogin.data.login.token);
      handleSetUser(stateLogin.data.login.user);
      navigate("/products");
    }
  }, [stateLogin]);

  useEffect(() => {
    if (stateMe && stateMe.data) {
      console.log(stateMe.data.me);
      handleSetUser(stateMe.data.me);
      navigate("/products");
    }
  }, [stateMe]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      handleGetCurrentSession();
    }
  }, [token]);

  return {
    user,
    error,
    loading,
    stateLogin,
    stateMe,
    userName,
    password,
    handleGetCurrentSession,
    handleLogin,
    setUsername,
    setPassword,
  };
};
