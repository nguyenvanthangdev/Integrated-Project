import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Dashboard.scss";
import { getAllUsers, countUser } from "../../../services/userService";
// import { emitter } from "../../../utils/emitter";
import { getAll, SumPayRates } from "../../../services/payRatesServices";
import {
  getAllPersonal,
  CountPersonalGenderFemale,
  CountPersonalGenderMale,
} from "../../../services/personalServices";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      arrPayRates: [],
      userCount: 0,
      sumPayRates: 0,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
    await this.getAllPayRatesFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      await this.getCountUser();
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  getCountUser = async () => {
    try {
      let response = await countUser();
      this.setState({
        userCount: response.count,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  getAllPayRatesFromReact = async () => {
    let response = await getAll("ALL");
    if (response && response.errCode === 0) {
      await this.getSumPayRates();
      this.setState({
        arrPayRates: response.users,
      });
    }
  };
  getSumPayRates = async () => {
    try {
      let response = await SumPayRates();
      this.setState({
        sumPayRates: response.sum,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4 my-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div class="text-xs font-weight-bold text-danger mb-1 h4">
                      User
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {this.state.userCount}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-user fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success mb-1 h4">
                      Pay Rates
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $ {this.state.sumPayRates}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning mb-1 h4">
                      Male Gender
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-mars fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary mb-1 h4">
                      Female Gender
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-venus fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
