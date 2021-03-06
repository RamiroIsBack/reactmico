import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Mapa } from "../presentational";
import { withScriptjs } from "react-google-maps";

class MapaContainer extends Component {
  componentWillMount() {}
  handleClick(id) {
    this.props.markerClicked(id);
  }

  render() {
    return (
      <div>
        <div className="">
          <Mapa
            ferias={this.props.ferias.listaFerias}
            lengua={this.props.navigation.lengua}
            handleClick={this.handleClick.bind(this)}
            containerElement={
              <div
                style={{
                  height: "300px",
                  minWidth: "300px",
                  maxWidth: "1200px"
                }}
              />
            }
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    markerClicked: (id, params) => dispatch(actions.markerClicked(id, params))
  };
};

const stateToProps = state => {
  return {
    navigation: state.navigation,
    ferias: state.feria
  };
};
//it would be null at d first argument cos i was not registering
//for listening d store, only dispatching actions but NOW I DO to get the
//creaciones from firebase data base
export default connect(
  stateToProps,
  dispatchToProps
)(withScriptjs(MapaContainer));
