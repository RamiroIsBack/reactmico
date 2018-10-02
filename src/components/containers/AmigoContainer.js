import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { AmigoNavContainer } from "./";
import history from "../../utils/history";

class AmigoContainer extends Component {
  componentWillMount() {
    if (this.props.users.currentUser === null) {
      this.props.toggleModal("closeEntrar");
      window.scrollTo(0, 0);
      history.push("/");
    } else {
      this.props.currentUserToDB(this.props.users.currentUser);
    }
  }

  cierraDialogosNavbar(event) {
    this.props.toggleModal("closeDropdowns");
  }
  logout() {
    this.props.logout();
    //make it start at the top of the page every time
    window.scrollTo(0, 0);
    //routing programatically, now i can prevent if there is an error
    history.push("/");
  }

  render() {
    let paddingTop = {};
    if (this.props.navigation) {
      if (this.props.navigation.sticky) {
        paddingTop = this.props.navigation.paddingTop4navbar;
      } else {
        paddingTop = { paddingTop: 0 };
      }
    }

    return (
      <div
        onClick={this.cierraDialogosNavbar.bind(this)}
        id="AmigoContainer"
        style={paddingTop}
      >
        <AmigoNavContainer logout={this.logout.bind(this)} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    users: state.user,
    navigation: state.navigation
  };
};

const dispatchToProps = dispatch => {
  return {
    loginUser: credentials => dispatch(actions.loginUser(credentials)),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    logout: () => dispatch(actions.logout()),
    currentUserToDB: user => dispatch(actions.currentUserToDB(user))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(AmigoContainer);
