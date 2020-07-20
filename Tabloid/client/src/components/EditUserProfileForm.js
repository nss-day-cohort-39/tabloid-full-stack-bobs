import React, { useContext, useState, useEffect } from "react";
import { Button, Form } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { UserTypeContext } from "../providers/UserTypeProvider";

export const EditUserProfileForm = ({ userProfile, toggle }) => {
  const { updateUser } = useContext(UserProfileContext);
  const [updatedUser, setUpdatedUser] = useState(userProfile);

  const { userTypes, getAllUserTypes } = useContext(UserTypeContext);

  const handleControlledInputChange = (event) => {
    const newUserProfile = Object.assign({}, updatedUser);
    newUserProfile[event.target.name] = event.target.value;
    setUpdatedUser(newUserProfile);
  };

  useEffect(() => {
    getAllUserTypes();
  }, []);

  const editUser = () => {
    updatedUser.userTypeId = parseInt(updatedUser.userTypeId);
    updateUser(updatedUser).then(toggle);
  };

  return (
    <form className="editUserForm">
      <fieldset>
        <div className="form-group">
          <select
            name="userTypeId"
            required
            className="form-control"
            onChange={handleControlledInputChange}
          >
            <option value="0">Select New User Type</option>
            {userTypes.map((userType) => (
              <option key={userType.id} value={userType.id}>
                {userType.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          editUser();
        }}
      >
        Save Updates
      </Button>
      <Button onClick={toggle}>Cancel</Button>
    </form>
  );
};
