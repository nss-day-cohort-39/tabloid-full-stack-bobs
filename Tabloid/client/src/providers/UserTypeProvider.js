/* 
Author(s): Alex Curnow
Component Responsibilty: Pulls user types into the front end of the app and
sets them for use elsewhere. 
*/
import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UserTypeContext = createContext();

export const UserTypeProvider = (props) => {
  const [userTypes, setUserTypes] = useState([]);
  const { getToken } = useContext(UserProfileContext);

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
