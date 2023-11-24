import React, { Component } from "react";
//import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditPayRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      Pay_Rate_Name: "",
      Value: " ",
      Tax_Percentage: " ",
      Pay_Type: "",
      Pay_Amount: " ",
      PT_Level_C: " ",
    };
  }
  async componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        Pay_Rate_Name: user.Pay_Rate_Name,
        Value: user.Value,
        Tax_Percentage: user.Tax_Percentage,
        Pay_Type: user.Pay_Type,
        Pay_Amount: user.Pay_Amount,
        PT_Level_C: user.PT_Level_C,
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
      "Pay_Rate_Name",
      "Value",
      "Tax_Percentage",
      "Pay_Type",
      "Pay_Amount",
      "PT_Level_C",
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
          Edit a new Pay Rates
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Pay Rate Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Pay_Rate_Name");
                    }}
                    value={this.state.Pay_Rate_Name}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Value</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Value");
                    }}
                    value={this.state.Value}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Tax Percentage</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Tax_Percentage");
                    }}
                    value={this.state.Tax_Percentage}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Pay Type</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Pay_Type");
                    }}
                    value={this.state.Pay_Type}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Pay Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "Pay_Amount");
                    }}
                    value={this.state.Pay_Amount}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>PT Level C</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "PT_Level_C");
                    }}
                    value={this.state.PT_Level_C}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPayRates);
