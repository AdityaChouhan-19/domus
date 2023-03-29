import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [filterSelect, setFilterSelect] = useState(0);
  const filterType = [
    { value: 0, type: "filter select" },
    { value: 1, type: "price from high to low" },
    { value: 2, type: "price from low to high" },
    { value: 3, type: "data from new to old" },
    { value: 4, type: "data from old to new" },
  ];
  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        filterType,
        filterSelect,
        setFilterSelect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
