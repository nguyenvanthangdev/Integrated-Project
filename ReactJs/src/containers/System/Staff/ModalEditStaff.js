import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      First_Name: "",
      Last_Name: " ",
      City: " ",
      Email: "",
      Phone_Number: " ",
      Gender: " ",
      Shareholder_Status: " ",
      idEmployee: "",
      SSN: "",
      Pay_Rate: " ",
      Vacation_Days: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        First_Name: user.First_Name,
        Last_Name: user.Last_Name,
        City: user.City,
        Email: user.Email,
        Phone_Number: user.Phone_Number,
        Gender: user.Gender,
        Shareholder_Status: user.Shareholder_Status,
        idEmployee: user.idEmployee,
        SSN: user.SSN,
        Pay_Rate: user.Pay_Rate,
        Vacation_Days: user.Vacation_Days,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "id",
      "First_Name",
      "Last_Name",
      "City",
      "Email",
      "Phone_Number",
      "Gender",
      "Shareholder_Status",
      "idEmployee",
      "SSN",
      "Pay_Rate",
      "Vacation_Days",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      // Call API to edit user modal
      this.props.doEdit(this.state);
      this.toggle();
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg" centered>
        <ModalHeader toggle={this.toggle}>Edit a new Staff</ModalHeader>
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
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "First_Name");
                    }}
                    value={this.state.First_Name}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Last_Name");
                    }}
                    value={this.state.Last_Name}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "City");
                    }}
                    value={this.state.City}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Email");
                    }}
                    value={this.state.Email}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Phone_Number");
                    }}
                    value={this.state.Phone_Number}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Gender");
                    }}
                    value={this.state.Gender}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Shareholder Status</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Shareholder_Status");
                    }}
                    value={this.state.Shareholder_Status}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>ID Employee</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "idEmployee");
                    }}
                    value={this.state.idEmployee}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>SSN</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "SSN");
                    }}
                    value={this.state.SSN}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Pay Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Pay_Rate");
                    }}
                    value={this.state.Pay_Rate}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Vacation Days</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Vacation_Days");
                    }}
                    value={this.state.Vacation_Days}
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
            onClick={this.handleSaveUser}
          >
            Save changes
          </Button>
          <Button className="btn px-3" color="secondary" onClick={this.toggle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditStaff);
