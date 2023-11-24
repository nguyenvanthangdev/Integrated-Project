import React, { Component } from "react";
//import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      First_Name: "",
      Last_Name: "",
      City: "",
      Email: "",
      Phone_Number: "",
      Gender: "",
      Shareholder_Status: "",
    };
  }
  async componentDidMount() {
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
      "First_Name",
      "Last_Name",
      "City",
      "Email",
      "Phone_Number",
      "Gender",
      "Shareholder_Status",
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
          Edit a new Personal
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                {/* <div className="form-group col-md-12">
                  <label>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "id");
                    }}
                    value={this.state.id}
                  />
                </div> */}
              </div>
              <div className="form-row">
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
              </div>
              <div className="form-row">
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
              </div>
              <div className="form-row">
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
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPersonal);
