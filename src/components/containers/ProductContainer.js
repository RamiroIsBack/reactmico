import React, { Component } from "react";
import actions from "../../actions";
import { connect } from "react-redux";
import { MagnifyingProduct, ProductSpecification } from "../presentational";

class ProductContainer extends Component {
  componentWillMount() {}
  compoenentDidMount() {
    //make it start at the top of the page every time
    window.scrollTo(0, 0);
  }
  compoenentDidUpdate() {
    //make it start at the top of the page every time
    window.scrollTo(0, 0);
  }

  selectProduct(selectedProduct) {
    this.props.navActive("carro", "navbarMicoFront");
    this.props.productToCart(selectedProduct);
    setTimeout(() => {
      if (this.props.users.currentUser) {
        this.props.loadCarro(this.props.carro.cartList, false);
      }
    }, 800);
  }

  cierraDialogosNavbar(event) {
    this.props.toggleModal("closeDropdowns");
  }

  render() {
    let artesania = {};
    //selectedFoto es el key del valor del state en el store
    var product = this.props.productToshow.selectedFoto;
    if (product === null) {
      //routing programatically, now i can prevent if there is an error
      //history.push('/Productos')
      return null;
    }
    if (this.props.storeContenidos.listaContenidos.length !== 0) {
      for (
        let i = 0;
        i < this.props.storeContenidos.listaContenidos.length;
        i++
      ) {
        if (this.props.storeContenidos.listaContenidos[i].id === "artesania") {
          artesania = this.props.storeContenidos.listaContenidos[i];
          break;
        }
      }
    }

    return (
      <div onClick={this.cierraDialogosNavbar.bind(this)}>
        <div className="container-fluid col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <MagnifyingProduct
            propiedades={product}
            whenClicked={this.selectProduct.bind(this)}
          />
        </div>
        {artesania.headerFoto && (
          <div className="container-fluid col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <ProductSpecification
              propiedades={product}
              contenido={artesania}
              lengua={this.props.navigation.lengua}
            />
          </div>
        )}
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getContenidos: () => dispatch(actions.getContenidos()),
    productToCart: selectedProduct =>
      dispatch(actions.productToCart(selectedProduct)),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    navActive: (activeTab, params) =>
      dispatch(actions.navActive(activeTab, params)),
    loadCarro: (carro, justLogedIn) =>
      dispatch(actions.loadCarro(carro, justLogedIn))
  };
};

//state is d store in this case for convenction
//cojo el producto d state(store) y lo paso a props xa cogerlo
const stateToProps = state => {
  return {
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    productToshow: state.product,
    storeContenidos: state.contenidos,
    users: state.user,
    navigation: state.navigation,
    carro: state.carro
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(ProductContainer);
