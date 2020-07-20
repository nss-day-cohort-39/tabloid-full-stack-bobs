import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Table, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import { EditUserProfileForm } from "../EditUserProfileForm";

export default () => {
  const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);
  const history = useHistory();

  const [selectedUser, setSelectedUser] = useState({});

  const [editModal, setEditModal] = useState(false);

  const toggleEditModal = () => setEditModal(!editModal);

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
              <>
                <tr
                  key={profile.id}
                  onClick={() => history.push(`/userProfile/${profile.id}`)}
                >
                  <td>{profile.fullName}</td>
                  <td>{profile.displayName}</td>
                  <td>{profile.userType.name}</td>
                </tr>
                <Button
                  onClick={() => {
                    setSelectedUser(profile);
                    toggleEditModal();
                  }}
                >
                  Edit
                </Button>
              </>
            );
          })}
        </tbody>
      </Table>
      <Modal isOpen={editModal}>
        <ModalHeader>Edit User Type</ModalHeader>
        <ModalBody>
          <EditUserProfileForm
            userProfile={selectedUser}
            toggle={toggleEditModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
