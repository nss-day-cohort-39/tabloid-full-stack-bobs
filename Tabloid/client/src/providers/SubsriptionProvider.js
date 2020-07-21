import React, { useState, useContext, createContext } from "react";
import { UserProfileProvider, UserProfileContext } from "./UserProfileProvider";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = (props) => {

    const [subscriptions, setSubscriptions] = useState([]);

    const { getToken } = useContext(UserProfileContext);

    const getAllSubscriptions = () =>
        getToken().then((token) =>
        fetch("/api/subscription", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(setSubscriptions)
      );

      const getSubscriptionsBySubscriberId = (id) => {
        return getToken().then((token) =>
          fetch(`/api/subscription/getbysubscriberid/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then(setSubscriptions)
        );
      }

      const getSubscriptionsByProviderId = (id) => {
        return getToken().then((token) =>
          fetch(`/api/subscription/getbyproviderid/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then(setSubscriptions)
        );
      }

    const addSubscription = (subscription) =>
        getToken().then((token) =>
        fetch("/api/subscription", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
        }).then((resp) => {
            if (resp.ok) {
            getAllSubscriptions();
            } else {
            throw new Error("Unauthorized");
            }
        })
    );

    const updateSubscription = (subscription) => {
        return getToken().then((token) =>
          fetch(`/api/subscription/${subscription.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          }).then((resp) => {
            if (resp.ok) {
              getAllSubscriptions();
            } else {
              throw new Error("Unauthorized");
            }
          })
        );
      };

      return (
        <SubscriptionContext.Provider
          value={{
            getAllSubscriptions,
            subscriptions,
            getSubscriptionsBySubscriberId,
            getSubscriptionsByProviderId,
            addSubscription,
            updateSubscription
          }}
        >
          {props.children}
        </SubscriptionContext.Provider>
      );
    };