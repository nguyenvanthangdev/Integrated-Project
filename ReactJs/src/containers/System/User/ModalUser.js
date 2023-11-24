import React, { Component } from "react";
//import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User_Name: "",
      Password: "",
      Email: "",
      Active: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        User_Name: "",
        Password: "",
        Email: "",
        Active: "",
      });
    });
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
    let arrInput = ["User_Name", "Password", "Email", "Active"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter :" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api new a user modal
      this.props.createNewUser(this.state);
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
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "User_Name");
                    }}
                    value={this.state.User_Name}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Password");
                    }}
                    value={this.state.Password}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Email");
                    }}
                    value={this.state.Email}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Active</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Active"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Active");
                    }}
                    value={this.state.Active}
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
              this.handleAddNewUser();
            }}
          >
            Add New
          </Button>{" "}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
