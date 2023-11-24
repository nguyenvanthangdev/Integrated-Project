import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/User/UserManage";
import Header from "../containers/Header/Header";
import ManagePaRates from "../containers/System/PayRates/ManagePayRates";
import ManageEmployee from "../containers/System/Employee/ManageEmployee";
import Dashboard from "../containers/System/Dashboard/Dashboard";
import ManagePersonal from "../containers/System/Personal/ManagePersonal";
import ManageJobHistory from "../containers/System/JobHistory/ManageJobHistory";
import ManageBenefitPlans from "../containers/System/BenefitPlans/ManageBenefitPlans";
import ManageStaff from "../containers/System/Staff/ManageStaff";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/dashboard" component={Dashboard} />
              <Route path="/system/user-manage" component={UserManage} />
              <Route
                path="/system/manage-pay-rates"
                component={ManagePaRates}
              />
              <Route
                path="/system/manage-employee"
                component={ManageEmployee}
              />
              <Route
                path="/system/manage-personal"
                component={ManagePersonal}
              />
              <Route
                path="/system/manage-job-history"
                component={ManageJobHistory}
              />
              <Route
                path="/system/manage-benefit-plans"
                component={ManageBenefitPlans}
              />
              <Route path="/system/manage-staff" component={ManageStaff} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
