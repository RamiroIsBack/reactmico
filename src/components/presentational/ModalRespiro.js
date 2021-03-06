import React from "react";

class ModalRespiro extends React.Component {
  handleClick() {
    this.props.politica();
  }

  render() {
    let mensaje = this.props.mensajeTiendaInactiva;
    if (this.props.mensajeTiendaInactivaGalego) {
      mensaje = this.props.mensajeTiendaInactivaGalego;
    }

    var backdropStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.25)",
      zIndex: 67
    };
    var stiloModal = {
      position: "absolute",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: 300,
      minHeight: 100,
      margin: "0 auto",
      zIndex: 68,
      top: "250px",
      left: "20px",
      right: "20px",
      border: "1px solid black",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "5px",
      outline: "none"
    };

    return (
      <div style={backdropStyle}>
        <div style={stiloModal}>
          <div style={{ padding: 10 }}>
            {mensaje.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalRespiro;
