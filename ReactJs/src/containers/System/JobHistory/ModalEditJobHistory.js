import React, { Component } from "react";
//import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditJobHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      Employee_ID: "",
      Department: " ",
      Division: " ",
      Start_Date: "",
      End_Date: " ",
      Job_Category: " ",
      Location: "",
    };
  }
  async componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        Employee_ID: user.Employee_ID,
        Department: user.Department,
        Division: user.Division,
        Start_Date: user.Start_Date,
        End_Date: user.End_Date,
        Job_Category: user.Job_Category,
        Location: user.Location,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "id",
      "Employee_ID",
      "Department",
      "Division",
      "Start_Date",
      "End_Date",
      "Job_Category",
      "Location",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter :" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api edit user modal
      this.props.doEdit(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a new Job History
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "id");
                    }}
                    value={this.state.id}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Employee_ID");
                    }}
                    value={this.state.Employee_ID}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Department");
                    }}
                    value={this.state.Department}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Division</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Division");
                    }}
                    value={this.state.Division}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Start_Date");
                    }}
                    value={this.state.Start_Date}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "End_Date");
                    }}
                    value={this.state.End_Date}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Job Category</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Job_Category");
                    }}
                    value={this.state.Job_Category}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Location");
                    }}
                    value={this.state.Location}
                  />
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn px-3"
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>
          <Button
            className="btn px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEditJobHistory);
