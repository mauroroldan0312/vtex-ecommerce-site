import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext, useUserStore } from "../shared";
import { getFromSessionStorage } from "../shared/utils";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { handleGetCurrentSession } = useUserContext();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getFromSessionStorage("token");

    if (!token) {
      navigate("/login");
    } else {
      handleGetCurrentSession();
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default RequireAuth;
