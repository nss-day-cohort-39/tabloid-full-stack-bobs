import React, { useState, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./UserProfileProvider";

export const UserTypeContext = createContext();

export const UserTypeProvider = (props) => {
  const [userTypes, setUserTypes] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  const getAllUserTypes = () =>
    getToken().then((token) =>
      fetch("/api/usertype", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setUserTypes)
    );

  return (
    <UserTypeContext.Provider
      value={{
        userTypes,
        getAllUserTypes,
      }}
    >
      {props.children}
    </UserTypeContext.Provider>
  );
};
