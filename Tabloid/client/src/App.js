import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from "./providers/PostProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { TagProvider } from "./providers/TagProvider";
import { CommentProvider } from "./providers/CommentProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <TagProvider>
            <CommentProvider>
              <CategoryProvider>
                <Header />
                <ApplicationViews />
              </CategoryProvider>
            </CommentProvider>
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
