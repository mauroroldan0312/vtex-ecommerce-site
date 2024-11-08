import { createContext, ReactNode, useContext } from "react";
import { useUser, UseUserType } from "../hooks";

export interface UserContextType extends UseUserType {}

const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const context = useUser();

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
};
