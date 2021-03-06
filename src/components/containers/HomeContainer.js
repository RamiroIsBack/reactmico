import React, { Component } from "react";

import { connect } from "react-redux";
import actions from "../../actions";

import { CarousellContainer } from "./";
class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleLeavingApp.bind(this));

    let albaAgrees = false;
    if (albaAgrees) {
      // url (required), options (optional)
      fetch(
        "https://www.instagram.com/explore/tags/micodise%C3%B1otextil/?__a=1"
      )
        .then(response => response.json())
        .then(responseJson => {
          let feed = [];
          responseJson.graphql.hashtag.edge_hashtag_to_media.edges.forEach(
            (prenode, i) => {
              feed.push({
                owner: prenode.node.owner.id, //id: "3704130568" es micotextil, poner primero los usuarios
                caption: prenode.node.edge_media_to_caption.edges[0].node.text,
                imgUrl: prenode.node.thumbnail_resources[4].src //cojo 640x640
              });
            }
          );

          this.props.loadFromInstagram(feed);
        })
        .catch(error => {
          console.log("algo fue mal al cargar desde instagram" + error);
        });
    }

    this.intervalId = setInterval(this.nextPicCarousell.bind(this), 6000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  nextPicCarousell() {
    if (
      this.props.storeContenidos.carousellBackground.carousellLength ===
      this.props.storeContenidos.carousellBackground.num
    ) {
      this.props.moveCarousell(0);
    } else {
      this.props.moveCarousell(
        this.props.storeContenidos.carousellBackground.num
      );
    }
  }

  handleLeavingApp() {
    //console.log('back button pressed')//this triggers in the browser just when leaving the page!!
  }

  dameEstilo(url) {
    var estiloYBackgroundCreaciones = {
      padding: "0px",
      border: "none",
      borderRadius: "10px",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: "url(" + url + ")",
      height: "500px"
    };
    return estiloYBackgroundCreaciones;
  }

  cierraDialogosNavbar(event) {
    this.props.toggleModal("closeDropdowns");
  }
  handleClick() {}

  getInstagramFeed() {
    let instagramFeedComponentsList = [];
    let albaAgrees = false;
    if (albaAgrees) {
      if (this.props.enlaces.instagramFeedList.length !== 0) {
        let postList = this.props.enlaces.instagramFeedList;
        let postListSorted = [];
        let postPropio = [];
        let postUsers = [];
        for (let s = 0; s < postList.length; s++) {
          if (postList[s].owner === "3704130568") {
            postPropio.push(postList[s]);
          } else {
            postUsers.push(postList[s]);
          }
        }
        postListSorted = postUsers.concat(postPropio);

        for (let i = 0; i < postListSorted.length; i++) {
          let post = postListSorted[i];

          //owner    //id: "3704130568" es micotextil, poner primero los usuarios
          //caption  //text,
          //imgUrl   //photo
          instagramFeedComponentsList.push(
            <div
              style={{ padding: "1px", backgroundColor: "rgb(229, 233, 230)" }}
              key={i}
            >
              <img
                alt="imagenInsta"
                style={{ width: "100%" }}
                src={post.imgUrl}
              />
              <p style={{ fontSize: "12px" }}>{post.caption}</p>
            </div>
          );
        }
      }
    }
    return instagramFeedComponentsList;
  }

  render() {
    var micoContenido = {};
    let headlineMico = "";
    let desarrolloMico = "";
    if (this.props.storeContenidos.listaContenidos.length !== 0) {
      for (
        let i = 0;
        i < this.props.storeContenidos.listaContenidos.length;
        i++
      ) {
        if (this.props.storeContenidos.listaContenidos[i].id === "mico") {
          micoContenido = this.props.storeContenidos.listaContenidos[i];
          if (micoContenido.descripcion) {
            if (this.props.navigation.lengua === "ga") {
              headlineMico = micoContenido.descripcion.headlineMicoGalego
                ? micoContenido.descripcion.headlineMicoGalego
                : micoContenido.descripcion.headlineMico;
              desarrolloMico = micoContenido.descripcion.desarrolloMicoGalego
                ? micoContenido.descripcion.desarrolloMicoGalego
                : micoContenido.descripcion.desarrolloMico;
            } else {
              headlineMico = micoContenido.descripcion.headlineMico;
              desarrolloMico = micoContenido.descripcion.desarrolloMico;
            }
          }
        }
      }
    }

    let instagramFeedComponentsList = this.getInstagramFeed();

    let loading = true;
    if (this.props.storeContenidos.carousellBackground.urlPic !== "") {
      loading = false;
    }
    let backgrounImageObject = {
      backgroundImage:
        "url(" + this.props.storeContenidos.carousellBackground.urlPic + ")"
      //TODO::::meter animacion cada vez q cambie de foto
    };
    return (
      <div>
        <div
          className="home__container"
          onClick={this.cierraDialogosNavbar.bind(this)}
        >
          <div className="home__carousell__container">
            {loading && (
              <div style={{ textAlign: "center", marginTop: "150px" }}>
                <img
                  id="faviconFliping"
                  src="/favicon.ico"
                  alt="cargando"
                  style={{ maxHeight: "150px", maxWidth: "150px" }}
                />
              </div>
            )}
            <CarousellContainer
              backgrounImageObject={backgrounImageObject}
              loading={loading}
            />
          </div>

          <div className="instagram__foto__container">
            {instagramFeedComponentsList}
          </div>

          <div className="home__copy__container">
            <h3>{headlineMico}</h3>
            <p>{desarrolloMico}</p>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getCreaciones: () => dispatch(actions.getCreaciones()),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    navActive: (activeTab, params) =>
      dispatch(actions.navActive(activeTab, params)),
    loadFromInstagram: feedList =>
      dispatch(actions.loadFromInstagram(feedList)),
    moveCarousell: pic => dispatch(actions.moveCarousell(pic))
  };
};

const stateToProps = state => {
  return {
    navigation: state.navigation,
    creacion: state.creacion,
    storeContenidos: state.contenidos,
    enlaces: state.enlaces
  };
};
//                                   ****dispatchToProps
export default connect(
  stateToProps,
  dispatchToProps
)(HomeContainer);
