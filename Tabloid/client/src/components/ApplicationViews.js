import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Hello from "./Hello";
import PostList from "./post/PostList";
import PostDetails from "./post/PostDetails";
import { CategoryList } from "./category/CategoryList";
import { TagList } from "./tag/TagList";
import UserProfileList from "./userProfile/UserProfileList";
import UserProfileDetails from "./userProfile/UserProfileDetails";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/userProfiles">
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfile/:id">
          {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
}
