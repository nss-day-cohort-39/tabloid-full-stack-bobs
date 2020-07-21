import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const [userProfiles, setUserProfiles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        if (userProfile.isActive === false) {
          return alert("Invalid email or password")
        } else {
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
        }
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) =>
        saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getAllUserProfiles = () => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUserProfiles)
    );
  };

  const getUserProfileByUserId = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/getById/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getActiveUserProfiles = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/activeUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUserProfiles)
    );
  };

  const getDeactivatedUserProfiles = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/deactivatedUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUserProfiles)
    );
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      }).then((resp) => resp.json())
    );
  };

  const deactivateUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${userProfile.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getActiveUserProfiles();
        } else {
          throw new Error("Unauthorized");
        }
      })
    )
  };

  const reactivateUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/reactivateUser/${userProfile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getDeactivatedUserProfiles();
        } else {
          throw new Error("Unauthorized");
        }
      })
    )
  };



  const updateUser = (userProfile) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${userProfile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      }).then(getAllUserProfiles)
    );

  return (
    <UserProfileContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        getToken,
        getAllUserProfiles,
        getUserProfile,
        userProfiles,
        getUserProfileByUserId,
        deactivateUser,
        reactivateUser,
        updateUser,
        getActiveUserProfiles,
        getDeactivatedUserProfiles
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
          <Spinner className="app-spinner dark" />
        )}
    </UserProfileContext.Provider>
  );
}
