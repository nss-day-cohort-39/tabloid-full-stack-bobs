import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import {
  CardImg,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button,
} from "reactstrap";

export default () => {
  const { id } = useParams();
  const { getUserProfileByUserId } = useContext(UserProfileContext);
  const [user, setUser] = useState({ userType: {} });
  const history = useHistory();

  useEffect(() => {
    getUserProfileByUserId(parseInt(id)).then(setUser);
  }, []);

  return (
    <>
      <Card>
        {
          (user.imageLocation)
            ?
            (
              <CardImg top src={user.imageLocation} alt={user.displayName} />
            )
            : (
              <CardImg
                top
                src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              />
            )
        }
        <CardBody>
          <CardText>Name: {user.fullName}</CardText>
          <CardTitle>Display Name : {user.displayName}</CardTitle>
          <CardText>Email: {user.email}</CardText>
          <CardText>User Type: {user.userType.name}</CardText>
          <CardText>Date Joined: {user.createDateTime}</CardText>
        </CardBody>
        <CardFooter>
          <Button onClick={() => history.push("/userProfiles")}>Back</Button>
        </CardFooter>
      </Card>
    </>
  );
};
