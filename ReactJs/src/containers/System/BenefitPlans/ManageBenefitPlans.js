import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../User/UserManage.scss";

import {
  getAll,
  createNew,
  deleteBenefitPlans,
  editBenefitPlans,
} from "../../../services/benefitPlansServices";
import ModalBenefitPlans from "./ModalBenefitPlans";
import { emitter } from "../../../utils/emitter";
import ModalEditBenefitPlans from "./ModalEditBenefitPlans";
class ManageBenefitPlans extends Component {
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
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDelete = async (user) => {
    try {
      let res = await deleteBenefitPlans(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
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
      let res = await editBenefitPlans(user);

      if (res && res.errCode === 0) {
        this.setState({
          isOpenModaEditlUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalBenefitPlans
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewModel={this.createNewModel}
        />

        {this.state.isOpenModaEditlUser && (
          <ModalEditBenefitPlans
            isOpen={this.state.isOpenModaEditlUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            doEdit={this.doEdit}
          />
        )}
        <div className="title text-center my-5">Manage Benefit Plans</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mx-5"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Create new Benefit Plans
          </button>
        </div>
        <div className="users-table mt-3 mx-5">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Plan Name</th>
                <th scope="col">Deductable</th>
                <th scope="col">Percentage CoPay</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.Plan_Name}</td>
                      <td>{item.Deductable}</td>
                      <td>{item.Percentage_CoPay}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBenefitPlans);
