import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Table } from "reactstrap";
import { useHistory } from "react-router-dom";

export default () => {
  const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);
  const history = useHistory();

  useEffect(() => {
    getAllUserProfiles();
  }, []);

  return (
    <>
      <h1>User Profiles</h1>
      <Table hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Display Name</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((profile) => {
            return (
              <tr
                key={profile.id}
                onClick={() => history.push(`/userProfile/${profile.id}`)}
              >
                <td>{profile.fullName}</td>
                <td>{profile.displayName}</td>
                <td>{profile.userType.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
