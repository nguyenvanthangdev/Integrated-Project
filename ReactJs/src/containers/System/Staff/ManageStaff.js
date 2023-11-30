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
import {
  getAll,
  createNew,
  deleteEmployee,
  editEmployee,
} from "../../../services/employeeServices";
import ModalStaff from "./ModalStaff";
import ModalEditStaff from "./ModalEditStaff";
import { emitter } from "../../../utils/emitter";
class ManagePaRates extends Component {
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
    let getAllEmployee = await getAll("ALL");
    let response = await getAllPersonal("ALL");

    if (
      getAllEmployee &&
      getAllEmployee.errCode === 0 &&
      response &&
      response.errCode === 0
    ) {
      let mergedUsers = getAllEmployee.users.map((user) => {
        let matchedUser = response.users.find((u) => u.id === user.id);
        return { ...user, ...matchedUser };
      });

      this.setState({
        arrUsers: mergedUsers,
      });
    }
  };
  createNewModel = async (data) => {
    try {
      let response1 = await createNewPersonal(data);
      let response2 = await createNew(data);

      if (
        response1 &&
        response1.errCode === 0 &&
        response2 &&
        response2.errCode === 0
      ) {
        await this.getAllUsersFromReact();
        toast.success("Success !");
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      } else {
        toast.error(response1.errMessage);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed !");
    }
  };
  handleDelete = async (user) => {
    try {
      let res1 = await deletePersonal(user.id);
      let res2 = await deleteEmployee(user.id);
      if (res1 && res1.errCode === 0 && res2 && res2.errCode === 0) {
        await this.getAllUsersFromReact();
        toast.success("Delete success !");
      } else {
        toast.error(res1.errMessage);
      }
      console.log(res1, res2);
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
      let res1 = await editPersonal(user);
      let res2 = await editEmployee(user);
      if (res1 && res1.errCode === 0 && res2 && res2.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
        toast.success(res1.message);
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
    let uniqueLastNames = [];
    arrUsers.forEach((item) => {
      if (!uniqueLastNames.includes(item.Last_Name)) {
        uniqueLastNames.push(item.Last_Name);
      }
    });
    return (
      <div className="user-container">
        <ModalStaff
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewModel={this.createNewModel}
        />

        {this.state.isOpenModaEditlUser && (
          <ModalEditStaff
            isOpen={this.state.isOpenModaEditlUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            doEdit={this.doEdit}
          />
        )}
        <div className="title text-center my-5">Manage Staff</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mx-5"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Create new Staff
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
                <th scope="col">ID Employee</th>
                <th scope="col">SSN</th>
                <th scope="col">Pay Rate</th>
                <th scope="col">Vacation Days</th>
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

                  if (!uniqueLastNames.includes(item.Last_Name)) {
                    return null;
                  }
                  uniqueLastNames = uniqueLastNames.filter(
                    (lastName) => lastName !== item.Last_Name
                  );
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
                      <td>{item.idEmployee}</td>
                      <td>{item.SSN}</td>
                      <td>{item.Pay_Rate}</td>
                      <td>{item.Vacation_Days}</td>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePaRates);
