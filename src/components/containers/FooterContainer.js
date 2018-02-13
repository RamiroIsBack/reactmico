import React, { Component } from 'react'
import actions from '../../actions'
import {connect} from 'react-redux'



class FooterContainer extends Component {

  componentWillMount() {
    if (this.props.storeEnlaces.enlacesLoaded == false){
      //en la accion ya lo pone a true
      this.props.getEnlaces()
    }

  }
  moveUp(event){
    //make it start at the top of the page every time
    window.scrollTo(0, 0)
  }
  resdesSociales(event){
    let urlToGo= event.target.id
    window.open(urlToGo,'_blank')
  }
  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')
  }
  render() {
    let contactMail = ''
    let contactHours= ''
    let contactPhone=''
    let contactPost= ''
    let urlYoutube = ''
    let urlInstagram = ''
    let urlFacebook = ''
    let urlTwiter = ''

    if (this.props.storeEnlaces.listaEnlaces.length !=0){
      for (let i = 0 ; i < this.props.storeEnlaces.listaEnlaces.length ; i++) {

        if (this.props.storeEnlaces.listaEnlaces[i].id == 'contact'){
          contactMail = this.props.storeEnlaces.listaEnlaces[i].contactMail
          contactHours = this.props.storeEnlaces.listaEnlaces[i].contactHours
          contactPhone = this.props.storeEnlaces.listaEnlaces[i].contactPhone
          contactPost = this.props.storeEnlaces.listaEnlaces[i].contactPost
        }
        if (this.props.storeEnlaces.listaEnlaces[i].id == 'youtube'){
          urlYoutube = this.props.storeEnlaces.listaEnlaces[i].urlYoutube
        }
        if (this.props.storeEnlaces.listaEnlaces[i].id == 'instagram'){
          urlInstagram = this.props.storeEnlaces.listaEnlaces[i].urlInstagram
        }
        if (this.props.storeEnlaces.listaEnlaces[i].id == 'facebook'){
          urlFacebook = this.props.storeEnlaces.listaEnlaces[i].urlFacebook
        }
        if (this.props.storeEnlaces.listaEnlaces[i].id == 'twiter'){
          urlTwiter = this.props.storeEnlaces.listaEnlaces[i].urlTwiter
        }
      }
    }
    return (
      <div onClick = {this.cierraDialogosNavbar.bind(this)} style= {{position: 'relative', marginTop :-180, height:180,paddingTop:10}}>
        <button type='button' className='btn btn-primary glyphicon glyphicon-chevron-up' onClick = {this.moveUp.bind(this)}
          style={{backgroundColor: 'transparent', color: 'black',fontSize: 13,border:'none',padding:'2px', marginBottom:0}}> volver arriba</button>
        <div className='container' style={{backgroundColor: 'rgba(0,0,0,0.90)',height:160, width:'100%'}}>
          <div className='container-fluid col-xs-12 col-sm-4 col-md-4 col-lg-4' style={{padding: 0}}>
            <p style={{color: 'white', textAlign:'center'}}>Contacta con Mico:</p>
            <div style={{textAlign:'center'}}>
              <a href={'mailto:' + contactMail} style={{color: 'white'}}>{contactMail}</a>
              <hr style={{padding: 0 ,marginRight:12,marginLeft: 12,marginTop: 0, marginBottom: 0}} />
            </div>
            { contactPhone != 'no' &&
              <div style={{textAlign:'center'}}>
                <a href={'tel:' + contactPhone} style={{color: 'white'}}>{contactPhone}</a>
                <hr style={{padding: 0 ,marginRight:12,marginLeft: 12,marginTop: 0, marginBottom: 0}} />
              </div>
            }

            <p style={{color: 'white', textAlign:'center'}}>{contactHours}</p>

          </div>
          <div className='container-fluid col-xs-6 col-sm-4 col-md-4 col-lg-4' style={{padding: 0}}>
            <p style={{color: 'white', textAlign:'center'}}>Síguenos en:</p>

            <div className='container-fluid col-xs-6 col-sm-6 col-md-6 col-lg-6' style={{padding: 0}}>
              { urlFacebook != 'no' &&
                <div style={{marginLeft:5, marginBottom: 5, textAlign:'center'}}>
                  <a style={{color: 'white', cursor: 'pointer',padding: '2px',border: 'none',borderRadius:'5px',}} id= {urlFacebook} onClick = {this.resdesSociales.bind(this)}>
                    <img role='presentation' src='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/facebook.png?alt=media&token=076f6504-5890-4f3b-9295-d7cf522cfa8f' className ='img-rounded' style={{height:25}} id= {urlFacebook}>
                    </img> Facebook
                  </a>
                </div>
              }
              { urlTwiter != 'no' &&
                <div style={{marginLeft:5, marginBottom: 5, textAlign:'center'}}>
                  <a style={{color: 'white', cursor: 'pointer',padding: '2px',border: 'none',borderRadius:'5px',}} id={urlTwiter} onClick = {this.resdesSociales.bind(this)}>
                    <img role='presentation' src='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/twitter.png?alt=media&token=720aa952-6a8e-4c0e-b655-046761141a07' className ='img-rounded' style={{height:25}} id='twiter'>
                    </img> Twiter
                  </a>
                </div>

              }
            </div>

            <div className='container-fluid col-xs-6 col-sm-6 col-md-6 col-lg-6' style={{padding: 0}}>
              { urlInstagram != 'no' &&
                <div style={{marginLeft:5, marginBottom: 5, textAlign:'center'}}>
                  <a style={{color: 'white', cursor: 'pointer',padding: '2px',border: 'none',borderRadius:'5px',}} id={urlInstagram} onClick = {this.resdesSociales.bind(this)}>
                    <img role='presentation' src='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/instagram.png?alt=media&token=ab825d56-382c-4dae-97da-ea5806837de1' className ='img-rounded' style={{height:25}} id='instagram'>
                    </img> Instagram
                  </a>
                </div>
              }
              { urlYoutube != 'no' &&

                <div style={{marginLeft:5, marginBottom: 5, textAlign:'center'}}>
                  <a style={{color: 'white', cursor: 'pointer',padding: '2px',border: 'none',borderRadius:'5px',}} id={urlYoutube} onClick = {this.resdesSociales.bind(this)}>
                    <img role='presentation' src='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/youtube.png?alt=media&token=16854bdb-78a8-4ed4-b13e-cde1be1ef582' className ='img-rounded' style={{height:25}} id='youtube'>
                    </img> Youtube
                  </a>
                </div>
              }
            </div>


          </div>
          <div className='container-fluid col-xs-6 col-sm-4 col-md-4 col-lg-4' style={{padding: 0,}}>
            <p className='text-muted pull-right' style={{color: 'white', textAlign:'center'}}>© 2011 Mico diseño textil </p>
          </div>

        </div>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    //TODO el pay, order, recoger en feria
    //pay: (cartList) =>dispatch(actions.pay(cartList))
    getEnlaces:()=>dispatch(actions.getEnlaces()),
    getContenidos:()=>dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
  }
}


const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,
    storeEnlaces:state.enlaces,
  }
}

export default connect (stateToProps,dispatchToProps)(FooterContainer)
