import React, { Component } from "react";
//import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
class ModalBenefitPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      Plan_Name: "",
      Deductable: " ",
      Percentage_CoPay: " ",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        id: "",
        Plan_Name: "",
        Deductable: " ",
        Percentage_CoPay: " ",
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
    let arrInput = ["id", "Plan_Name", "Deductable", "Percentage_CoPay"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter :" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNew = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api new a user modal
      this.props.createNewModel(this.state);
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
          Create a new Benefit Plans
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
                  <label>Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Plan_Name");
                    }}
                    value={this.state.Plan_Name}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Deductable</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Deductable");
                    }}
                    value={this.state.Deductable}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Percentage CoPay</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Percentage_CoPay");
                    }}
                    value={this.state.Percentage_CoPay}
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
              this.handleAddNew();
            }}
          >
            Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalBenefitPlans);
