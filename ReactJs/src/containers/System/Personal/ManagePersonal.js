import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../User/UserManage.scss";
import { toast } from "react-toastify";
import {
  getAllPersonal,
  createNewPersonal,
  deletePersonal,
  editPersonal,
} from "../../../services/personalServices";
import ModalPersonal from "./ModalPersonal";
import ModalEditPersonal from "./ModalEditPersonal";
import { emitter } from "../../../utils/emitter";
class ManagePersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModaEditlUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModaEditlUser: !this.state.isOpenModaEditlUser,
    });
  };
  getAllUsersFromReact = async () => {
    let response = await getAllPersonal("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  createNewModel = async (data) => {
    try {
      let response = await createNewPersonal(data);
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        toast.success("Success !");
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed !");
    }
  };
  handleDelete = async (user) => {
    try {
      let res = await deletePersonal(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
        toast.success("Delete success !");
      } else {
        toast.error(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Failed !");
    }
  };
  handEditUser = (user) => {
    this.setState({
      isOpenModaEditlUser: true,
      userEdit: user,
    });
  };
  doEdit = async (user) => {
    try {
      let res = await editPersonal(user);

      if (res && res.errCode === 0) {
        this.setState({
          isOpenModaEditlUser: false,
        });
        await this.getAllUsersFromReact();
        toast.success(res.message);
      } else {
        toast.error("Failed !");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed !");
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalPersonal
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewModel={this.createNewModel}
        />

        {this.state.isOpenModaEditlUser && (
          <ModalEditPersonal
            isOpen={this.state.isOpenModaEditlUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            doEdit={this.doEdit}
          />
        )}
        <div className="title text-center my-5">Manage Personal</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mx-5"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Create new Personal
          </button>
        </div>
        <div className="users-table mt-3 mx-5">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">City</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Gender</th>
                <th scope="col">Shareholder Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  const gender = item.Gender ? "Male" : "Female";
                  const shareholderStatus = item.Shareholder_Status
                    ? "Yes"
                    : "No";
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.First_Name}</td>
                      <td>{item.Last_Name}</td>
                      <td>{item.City}</td>
                      <td>{item.Email}</td>
                      <td>{item.Phone_Number}</td>
                      <td>{gender}</td>
                      <td>{shareholderStatus}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning px-3 mx-2"
                          onClick={() => this.handEditUser(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger px-3"
                          onClick={() => this.handleDelete(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePersonal);
