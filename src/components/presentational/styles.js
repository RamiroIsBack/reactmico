export default {
  // the margin top here at universal is for the navbar
  universal:{
    marginTop:20,
  },
  carroProduct : {
    texto:{
      //fontFamily: 'monospace',
      //fontWeight: 'bold',
      fontSize: '20px',
    },
    btnPedido:{
      //textAlign :'center',
      fontSize: '13px',
      fontWeight: 'bold',
      backgroundColor: 'black',
      //width : '100%',
      marginRight: '5px',
      whiteSpace: 'initial',
      color : 'white'
    },

  },
  product:{
    borderRadius:'10px',
    minHeight: '300px',
  },
  foto:{
    container:{
      //display : 'inline-block',
      //display : 'block',
      padding: '2px',
      border: 'none',
      borderRadius:'10px',
      marginBottom: '2px'
      //verticalAlign: 'top',
      //margin: 'auto',
      //a una mala hago esto pa dejarlo fijo
      //width:'330px',
      //height: '230px',
    },
    panel:{
      display : 'inline-block',
      padding: '0px',
      border: '1px solid #2C6549',
      borderRadius:'10px',
    },
    /*cover: {
      //backgroundPosition: 'center',
      //backgroundSize: 'cover',
      //backgroundRepeat: 'no-repeat',
      maxWidth: 290,
      maxHeight: 200,
      borderRadius:'10px'
    },*/
    footName:{
      marginTop : '1px',
      marginLeft : '10px',
      marginBottom: '15px',
      fontWeight : 'bold',
    },
    footPrice:{
      marginRight : '10px',
      marginTop : '1px',
      marginBottom: '15px',
    }
  },

  sidebar:{
    container:{
      marginTop : 80,
      background: 'none'

    }
  },
  explanation:{
    container:{
      padding: 16,
      background: '#C4F4D0',
      marginTop:12,
      border:'2px solid #73FA95'
    },
  },
  feria:{
    container:{
      //padding: 16,

      //marginTop:6,
      //borderBottom: '1px solid'
    },
    headlineContainer:{
      //marginTop: 50,
      //marginBottom: 20,
      //paddingRight: 30,
      paddingTop: 60,
      paddingBottom: 30,
      marginRight:10,
      backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2FbacklineFeria4.png?alt=media&token=30b4db56-d8d6-4aa0-8f18-439664171d36)',
      backgroundPosition: 'right bottom',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      opacity: 0.8,
      overflow: 'auto',
      borderRadius: '5px',
      maxWidth: 1600,

    },
    mapsLink:{

      paddingRight: 5,
      paddingTop: 10,
      opacity: 0.9,
      //display : 'block',
      //overflow: 'auto',
      //borderRadius: '5px',
      maxWidth: 100,

    },
    btnlink:{
      textAlign :'center',
      fontSize: '13px',
      //fontWeight: 'bold',
      backgroundColor: 'black',
      width : '100%',
      margin: 'auto',
      //marginRight: '4px',

    },
    header:{
      marginTop:0,
      marginBottom:0
    },
    title:{
      //textDecoration:'none',
      //color:'red'
      fontWeight: 400,
    },
    texto:{
      fontStyle: 'italic',
      fontWeight: 300,

    },
    textoSecundario:{
      font: '12px Georgia',
      fontWeight: 200
    }
  },
  modal:{
  // The gray background
    backdropStyle :{
      position: 'fixed',
      //display : 'block',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.75)',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6667,
      padding: 60
    },

    // The modal "window"
    modalStyle : {
      backgroundColor: '#fff',
      borderRadius: 10,
      maxWidth: 700,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      padding: 15
    },
    btnClose : {
      backgroundColor: 'rgba(255,255,255,0.75)',
      paddingRight: '18px',
      paddingLeft: '18px',
      borderRadius: '5px',
      fontSize: '19px',
      border: 'none',
    },
    formContainer : {
      backgroundColor: 'rgba(255,255,255,0.75)',
      position: 'absolute',
      height: '100%',
      overflowY:'auto',
      overflowX:'hidden',
      borderRadius: '5px',
      paddingLeft: '8px',
    },
    btnRegistrarse: {
      fontSize: '19px',
      backgroundColor: 'black',
      color:'white',
      width: '95%',
      marginLeft: 10,
    },
    btnNewsletter: {
      textDecoration:'none',
      cursor: 'pointer',
      padding: '2px',
      border: 'none',
      borderRadius:'5px',
      color :'white',
      fontSize: '16px',
      backgroundColor: 'black',
    },
  },
}
