import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../User/UserManage.scss";
import {
  getAll,
  createNew,
  deleteEmployee,
  editEmployee,
} from "../../../services/employeeServices";
import ModalEmployee from "./ModalEmployee";
import { emitter } from "../../../utils/emitter";
import ModalEditEmployee from "./ModalEditEmployee";
import { toast } from "react-toastify";
class ManageEmployee extends Component {
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
    let response = await getAll("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  createNewModel = async (data) => {
    try {
      let response = await createNew(data);
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
      let res = await deleteEmployee(user.id);
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
      let res = await editEmployee(user);

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
        <ModalEmployee
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewModel={this.createNewModel}
        />
        {this.state.isOpenModaEditlUser && (
          <ModalEditEmployee
            isOpen={this.state.isOpenModaEditlUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            doEdit={this.doEdit}
          />
        )}
        <div className="title text-center my-5">Manage Employee</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mx-5"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Create new Employee
          </button>
        </div>
        <div className="users-table mt-3 mx-5">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID Employee Number</th>
                <th scope="col">ID Employee</th>
                <th scope="col">Last Name</th>
                <th scope="col">First Name</th>
                <th scope="col">SSN</th>
                <th scope="col">Pay Rate</th>
                <th scope="col">Vacation Days</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.idEmployee}</td>
                      <td>{item.Last_Name}</td>
                      <td>{item.First_Name}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);
