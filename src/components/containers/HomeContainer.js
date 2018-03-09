import React, { Component } from 'react'
import style from './styles'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class HomeContainer extends Component {
  constructor(){
    super()
    this.state={
      loading:true,
    }
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.handleLeavingApp.bind(this))
    window.addEventListener('popstate',this.handleBackButton.bind(this))

    let albaAgrees = false
    if(albaAgrees){
      // url (required), options (optional)
      fetch('https://www.instagram.com/explore/tags/micodise%C3%B1otextil/?__a=1')
        .then((response) => response.json())
        .then((responseJson) => {
          let feed = []
          responseJson.graphql.hashtag.edge_hashtag_to_media.edges.forEach((prenode,i)=>{

            feed.push({
              owner:prenode.node.owner.id,//id: "3704130568" es micotextil, poner primero los usuarios
              caption:prenode.node.edge_media_to_caption.edges[0].node.text,
              imgUrl: prenode.node.thumbnail_resources[4].src,//cojo 640x640

            })
          })

          this.props.loadFromInstagram(feed)
        })
        .catch((error) => {
          console.log('algo fue mal al cargar desde instagram'+error)
        })
    }
  }
  handleLeavingApp(event){
    console.log('back button pressed')//this triggers in the browser just when leaving the page!!
  }
  handleBackButton(event){
    if (event){
      var isMobile = false
      if (/Mobile|mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        isMobile = true
      }

      if (isMobile){
        //doesnt work good cos triggers many times and ruins the backbutton functionality
        //window.scrollTo(0, 0)
        //history.push('/')
      }else{
        this.props.navActive('', 'navbarMicoFront') //only gets selected for desktop
      }
    }
  }

  dameEstilo( url){
    var estiloYBackgroundCreaciones = {
      padding: '0px',
      border: 'none',
      borderRadius:'10px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(' + url + ')',
      height: '500px',

    }
    return estiloYBackgroundCreaciones
  }

  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')
  }
  handleClick(event){
    if (event.target.id ==='creaciones'){
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }else if (event.target.id ==='ferias'){
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }else if (event.target.id ==='conocenos'){
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
  }
  handleImageLoaded(){

    this.setState({loading:false})

    if (!this.props.creacion.creacionesLoaded){
      //en la accion ya lo pone a true
      this.props.getCreaciones()
        .then(response =>{
          this.props.startCarousellWithTimeOut(0,this.props.creacion.listaCreacionesSinOrdenar.length)
          console.log('starting carousell')
        })
        .catch(err=>{
          console.log(err.message+ 'fallo en getCreaciones()')
        })
    }else if(this.props.creacion.carousellItem.pic === ''){
      this.props.startCarousellWithTimeOut(0,this.props.creacion.listaCreacionesSinOrdenar.length)
    }
  }
  getInstagramFeed(){
    let instagramFeedComponentsList=[]
    let albaAgrees = false
    if(albaAgrees){
      if (this.props.enlaces.instagramFeedList.length !== 0){
        let postList = this.props.enlaces.instagramFeedList
        let postListSorted = []
        let postPropio = []
        let postUsers = []
        for(let s = 0;s< postList.length;s++){
          if(postList[s].owner === '3704130568'){
            postPropio.push(postList[s])
          }
          else{
            postUsers.push(postList[s])
          }
        }
        postListSorted=postUsers.concat(postPropio)

        for (let i= 0; i < postListSorted.length ; i++){
          let post = postListSorted[i]

          //owner    //id: "3704130568" es micotextil, poner primero los usuarios
          //caption  //text,
          //imgUrl   //photo
          instagramFeedComponentsList.push(
            <div style = {{padding:'1px',backgroundColor:'rgb(229, 233, 230)'}} key = {i}>
              <img style = {{width:'100%'}} src= {post.imgUrl}></img>
              <p style = {{fontSize:'12px'}}>{post.caption}</p>
            </div>
          )
        }
      }
    }
    return instagramFeedComponentsList
  }

  render() {

    var conocenosContenido = {}
    let urlPicConocenos = ''
    let headerConocenos = ''

    var feriasContenido = {}
    let urlPicFerias = ''
    let headerFerias = ''

    var creacionesContenido = {}
    let urlPicCreaciones = ''
    let headerCreaciones = ''

    let carousellItem = {}

    if (this.props.storeContenidos.listaContenidos.length !==0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id === 'creaciones'){
          creacionesContenido = this.props.storeContenidos.listaContenidos[i]
          if(creacionesContenido.headerFoto){
            urlPicCreaciones = creacionesContenido.headerFoto.urlPicCreaciones
            headerCreaciones=creacionesContenido.headerFoto.headerCreaciones

          }

        }
        if (this.props.storeContenidos.listaContenidos[i].id === 'ferias'){
          feriasContenido = this.props.storeContenidos.listaContenidos[i]
          if(feriasContenido.headerFoto){
            urlPicFerias = feriasContenido.headerFoto.urlPicFerias
            headerFerias=feriasContenido.headerFoto.headerFerias
          }

        }

        if (this.props.storeContenidos.listaContenidos[i].id === 'conocenos'){
          conocenosContenido = this.props.storeContenidos.listaContenidos[i]
          if(conocenosContenido.headerFoto){
            urlPicConocenos = conocenosContenido.headerFoto.urlPicConocenos
            headerConocenos=conocenosContenido.headerFoto.headerConocenos
          }

        }


      }

    }
    carousellItem = this.props.creacion.carousellItem
    let instagramFeedComponentsList = this.getInstagramFeed()

    let paddingTop = {}
    if(this.props.navigation){
      if(this.props.navigation.sticky){
        paddingTop = this.props.navigation.paddingTop4navbar
      }else{
        paddingTop = {paddingTop:0}
      }
    }

    let backgrounImageObject= {
      backgroundImage: 'url('+this.props.creacion.carousellBackground.urlPic+')',
    }
    return (
      <div>
        {this.state.loading &&
          <div style= {{textAlign:'center',marginTop:'150px'}}>
            <img id='faviconFliping' src='/favicon.ico' style= {{maxHeight :'150px',maxWidth :'150px'}}/>
          </div>
        }
        <div
          className ='home__container'
          style = {paddingTop}
          onClick = {this.cierraDialogosNavbar.bind(this)}
        >



          <div className='home__carousell__container' style={backgrounImageObject}>

          </div>

          <div className = 'home__diseno__container'  >
            <NavLink className ='' to='/Diseños' id= 'creaciones' onClick = {this.handleClick.bind(this)} style={style.home.navlinkBtn}>
              <div style= {{position: 'relative', top: 0, left: 0}}>
                <img
                  alt=''
                  src={urlPicCreaciones}
                  className =''
                  id= 'creaciones'
                  style= {{maxWidth: '100%',minHeight : '200px', maxHeight : '300px', position: 'relative', top: 0, left: 0}}
                  onLoad={this.handleImageLoaded.bind(this)}
                >
                </img>

                { this.props.creacion.carousellItem.pic !== '' &&
                  <img src= {carousellItem.pic} className='' alt='' draggable = 'false'
                    style= {{maxWidth:'100%', maxHeight : '100px', position: 'absolute', bottom: 4, left: '44%', borderRadius:'50px'}}
                  />
                }

                <div className = '' id= 'creaciones' style = {{padding: '0px', top: 0, left:'25%', right: '25%', position: 'absolute'}}>
                  <h3  style = {{backgroundColor: 'rgba(0, 0, 0, 0.6)' ,borderRadius:'4px', padding: '0px',marginTop : 5,whiteSpace: 'initial', display: 'inline-block' ,color:'white'}} >{headerCreaciones} </h3>
                </div>
              </div>
            </NavLink>
          </div>

          <hr/>


          <div className = 'home__feria__container' >
            <NavLink className =' ' to='/Ferias' id= 'ferias' onClick = {this.handleClick.bind(this)} style={{position:'relative',display:'inline-block'}}>
              <img alt='' src={urlPicFerias}  className ='img-rounded' id= 'ferias' style= {{maxHeight : '300px', maxWidth: '100%', position: 'relative'}}>
              </img>
              <div className = '' id= 'ferias' style = {{position: 'absolute',padding: '0px', top: 0, left: 10, right: 10}}>
                <h3  style = {{backgroundColor: 'rgba(0, 0, 0, 0.6)' ,borderRadius:'4px', padding: '0px',marginTop : 5, overflow: 'hidden', display: 'inline-block',color:'white'}}>{headerFerias}</h3>
              </div>
            </NavLink>
            <br/>
          </div>

          <div className = 'home__conocenos__container'  >
            <NavLink className ='' to='/Conocenos' id= 'conocenos' onClick = {this.handleClick.bind(this)} style={{position:'relative',display:'inline-block'}}>
              <img
                alt=''
                src={urlPicConocenos}
                id= 'conocenos'
                className =''
                style= {{maxHeight : '300px', maxWidth: '100%', position: 'relative'}}>
              </img>
              <div className = '' id= 'conocenos' style = {{padding: '0px', top: 0, left: 10, right: 10 , position: 'absolute'}}>
                <h3  style = {{backgroundColor: 'rgba(0, 0, 0, 0.6)' ,borderRadius:'4px', padding: '0px',marginTop : 5, overflow: 'hidden', display: 'inline-block',color:'white'}}>{headerConocenos}</h3>
              </div>
            </NavLink>
          </div>


          <div className = 'instagram__foto__container'>
            {instagramFeedComponentsList}
          </div>
        </div>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    getCreaciones:()=>dispatch (actions.getCreaciones()),
    getContenidos:()=>dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    startCarousellWithTimeOut:(pic,length) => dispatch(actions.startCarousellWithTimeOut(pic,length)),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
    loadFromInstagram: (feedList) => dispatch(actions.loadFromInstagram(feedList)),
  }
}

const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    creacion:state.creacion,
    storeContenidos:state.contenidos,
    enlaces:state.enlaces,
    navigation:state.navigation,

  }
}
//                                   ****dispatchToProps
export default connect (stateToProps,dispatchToProps)(HomeContainer)
