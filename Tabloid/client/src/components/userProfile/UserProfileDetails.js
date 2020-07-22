/* 
Author(s): Calvin Curry
Component Responsibility: Creates a profile card that
displays details about a single user. 
*/
import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import {
  CardImg,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Spinner,
} from "reactstrap";

export default () => {
  const { id } = useParams();
  const { getUserProfileByUserId } = useContext(UserProfileContext);
  const [user, setUser] = useState({ userType: {} });
  const [isLoading, setisLoading] = useState(true)
  const history = useHistory();

  useEffect(() => {
    getUserProfileByUserId(parseInt(id)).then(setUser)
      .then(() => {
        setisLoading(false)
      })
  }, []);

  return (
    <>
      {
        (isLoading)
          ? <Spinner className="userProfileDetailsSpinner" />
          : (
            <Card className="userProfileDetailsCard">
              {user.imageLocation &&
                <CardImg
                  className="userProfileDetailsImage"
                  src={user.imageLocation}
                  alt={user.displayName}
                />
              }
              {(!user.imageLocation) &&
                <CardImg
                  className="userProfileDetailsImage"
                  src="https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                  alt={user.displayName}
                />
              }
              <CardBody className="userProfileCardBody">
                <CardText><strong>Name:</strong> {user.fullName}</CardText>
                <CardTitle><strong>Display Name:</strong> {user.displayName}</CardTitle>
                <CardText><strong>Email:</strong> {user.email}</CardText>
                <CardText><strong>User Type:</strong> {user.userType.name}</CardText>
                <CardText><strong>Date Joined:</strong> {user.createDateTime}</CardText>
                <Button className="userProfileCardButton" onClick={() => history.goBack()}>Back</Button>
              </CardBody>
            </Card>
          )
      }
    </>
  );
};
