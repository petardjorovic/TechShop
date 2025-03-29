import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { getAllUsers } from "../../services/adminService";
import "./UsersComponent.scss";
import DeleteUserModal from "./Modals/DeleteUserModal";
import { toast } from "react-toastify";

function UsersComponent() {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    dispatch(showLoader(true));
    const res = await getAllUsers();
    dispatch(showLoader(false));
    if (res.status === "success") setAllUsers(res.allUsers);
  };

  const openDeleteModal = (user) => {
    if (user.role === "admin") {
      toast.info("Cannot delete admin");
      return;
    }
    setCurrentUser(user);
    setIsDeleteModal(true);
  };

  const displayAllUsers = () => {
    return allUsers.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.status ? "Active" : "Inactive"}</td>
          <td>{user.role}</td>
          <td>
            <div className="btns-wrapper">
              <button className="btn btn-warning">Edit</button>
              <button
                className="btn btn-danger"
                onClick={() => openDeleteModal(user)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="table-users">
      <table className="table table-striped table-bordered table-hover table-dark">
        <thead>
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{allUsers.length > 0 && displayAllUsers()}</tbody>
      </table>
      {isDeleteModal && (
        <DeleteUserModal
          currentUser={currentUser}
          setIsDeleteModal={setIsDeleteModal}
          rerenderView={fetchUsers}
        />
      )}
    </div>
  );
}

export default UsersComponent;
