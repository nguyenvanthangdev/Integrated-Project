import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Dashboard.scss";
import { getAllUsers, countUser } from "../../../services/userService";
// import { emitter } from "../../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      userCount: 0,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
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
                    <div className="text-xs font-weight-bold text-black mb-1 h4">
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
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Earnings (Annual)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $215,000
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
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Pending Requests
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
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
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Pending Requests
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Earnings Overview
                </h6>
                <div className="dropdown no-arrow">
                  <a
                    className="dropdown-toggle"
                    href="#!"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#!">
                      Action
                    </a>
                    <a className="dropdown-item" href="#!">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#!">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Revenue Sources
                </h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#!">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#!">
                      Action
                    </a>
                    <a className="dropdown-item" href="#!">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#!">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                  <canvas id="myPieChart"></canvas>
                </div>
                <div className="mt-4 text-center small">
                  <span className="mr-2">
                    <i className="fas fa-circle text-primary"></i> Direct
                  </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-success"></i> Social
                  </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-info"></i> Referral
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row h-10">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
              </div>
              <div className="card-body">
                <h4 className="small font-weight-bold">
                  Server Migration <span className="float-right">20%</span>
                </h4>
                <div className="progress mb-4">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 className="small font-weight-bold">
                  Sales Tracking <span className="float-right">40%</span>
                </h4>
                <div className="progress mb-4">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style="width: 40%"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 className="small font-weight-bold">
                  Customer Database <span className="float-right">60%</span>
                </h4>
                <div className="progress mb-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style="width: 60%"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 className="small font-weight-bold">
                  Payout Details <span className="float-right">80%</span>
                </h4>
                <div className="progress mb-4">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style="width: 80%"
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <h4 className="small font-weight-bold">
                  Account Setup <span className="float-right">Complete!</span>
                </h4>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style="width: 100%"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card bg-primary text-white shadow">
                  <div className="card-body">
                    Primary
                    <div className="text-white-50 small">#!4e73df</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-success text-white shadow">
                  <div className="card-body">
                    Success
                    <div className="text-white-50 small">#!1cc88a</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-info text-white shadow">
                  <div className="card-body">
                    Info
                    <div className="text-white-50 small">#!36b9cc</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-warning text-white shadow">
                  <div className="card-body">
                    Warning
                    <div className="text-white-50 small">#!f6c23e</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-danger text-white shadow">
                  <div className="card-body">
                    Danger
                    <div className="text-white-50 small">#!e74a3b</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-secondary text-white shadow">
                  <div className="card-body">
                    Secondary
                    <div className="text-white-50 small">#!858796</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-light text-black shadow">
                  <div className="card-body">
                    Light
                    <div className="text-black-50 small">#!f8f9fc</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-dark text-white shadow">
                  <div className="card-body">
                    Dark
                    <div className="text-white-50 small">#!5a5c69</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
