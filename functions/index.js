'use strict'

const nodemailer = require('nodemailer');
const functions = require('firebase-functions');


// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Sends an email confirmation when a user buys a product or when mico sends that product
exports.sendEmailPreparingPackage = functions.database.ref('/users/{uid}/pedidos/{pushId}').onWrite(event => {

  //this gets the uid of the person changing the /pedidos  ????
  const uid = event.params.uid
  const pushId = event.params.pushId
  console.log('uid: ', uid)
  console.log('pushId: ',pushId)
  const snapshot = event.data
  const val = snapshot.val()
  console.log('val: ',val)
  console.log('val.datosCompra: ',val.datosCompra)
  console.log('val.datosCompra.payerEmail: ',val.datosCompra.payerEmail)
  const pedidoMail = val.datosCompra.payerEmail

  if (!snapshot.changed('subscribedToMailingList')) {
    return
  }

  const mailOptions = {
    from: '"Mico diseno textil" <pedidos@micotextil.com>',
    to: pedidoMail,
    bcc:'mico.textil@gmail.com',//cambiar esto para el personal de alba
    replyTo: 'pedidos@micotextil.com',
  }
  console.log(val.datosCompra.localizador)
  console.log(val.datosCompra.urlMensajeria)
  // si el paquete ha sido enviado hay un localizador
  if (val.datosCompra.localizador && !val.datosCompra.entregado) {
    mailOptions.subject = val.datosEnvio.nombreCompletoEnvio+ ' tu paquete desde Mico ha sido enviado!'
    mailOptions.text = 'dentro de poco recibiras tu paquete en '+ val.datosEnvio.calle+', hasta entonces puedes consultar el estado de tu envio en la seccion de pedidos en tu apartado personal como amigo de Mico y con este localizador/cogido de envio: '+val.datosCompra.localizador+' puedes ver el seguimiento de tu paquete en la pagina web '+val.datosCompra.urlMensajeria
    mailOptions.html =
      '<div style ="margin:5px; max-width: 600px ">'
       +'<div style = "max-width: 550px; margin:8px">'
       +' <a href="http://www.micotextil.com/" style = "float:right"> <img src="cid:logo@micotextil.com"  height="82" width="82"/> </a>'
       +'<p>Hola '+val.datosEnvio.nombreCompletoEnvio+' !</p> <hr></hr>'

       +'<p>Dentro de poco recibiras tu paquete en <b style="font-size:17px">'+val.datosEnvio.calle+'</b> </p>'
       +'<p> hasta entonces puedes consultar el estado de tu envio en la seccion de pedidos en tu apartado personal como amigo de Mico</p> </br>'

       +'<p>Y con este localizador/cogido de envio: <b style="font-size:19px"> '+ val.datosCompra.localizador +' </b> puedes ver el seguimiento de tu paquete en la pagina web</p>'

       +'<a href="'+val.datosCompra.urlMensajeria+'">'+val.datosCompra.urlMensajeria+'</a>'
       +'</div>'

       +'<div style = "max-width: 550px; margin:8px">'
       +'<p>Disfruta de tu compra! </p>'

       +' <a href="http://www.micotextil.com/"><img src="cid:logo@micotextil.com" height="150" width="150"/> </a>'
       +'<div style="opacity: 0.7">'
       +'<p>Cualquier problema que surja con el pedido, no dudes en contestar a este email a la dirección de correo pedidos@micotextil.com </p>'
       +'</div>'
       +'</div>'
       +'</div>'

    // An array of attachments
    mailOptions.attachments= [

      // File Stream attachment
      {
        filename: 'mico.jpg',
        path: __dirname + '/assets/mico_disegno_textil.jpg',
        cid: 'logo@micotextil.com' // should be as unique as possible
      },

    ]

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('paquete enviado message sent', val.datosCompra.payerEmail)
    }).catch(error => {
      console.error('There was an error while sending the email:', error)
    })
  }else if (val.datosCompra.entregado){

    mailOptions.subject = val.datosEnvio.nombreCompletoEnvio+', tu paquete ha sido entregado!'
    mailOptions.text = 'Holaa, tu paquete ha sido entregado en la calle '+ val.datosEnvio.calle+' , si no has recibido el paquete o algún justificante de entrega, porfavor ponte en contacto con la empresa de mensajería através de su pagina web: '+val.datosCompra.urlMensajeria+' con el localizador: '+ val.datosCompra.localizador
    mailOptions.html =
       '<div style ="margin:5px; max-width: 600px ">'
       +'<div style = "max-width: 550px; margin:8px">'
       +' <a href="http://www.micotextil.com/" style = "float:right"> <img src="cid:logo@micotextil.com"  height="82" width="82"/> </a>'
       +'<p>Hola '+val.datosEnvio.nombreCompletoEnvio+' !</p> <hr></hr>'

       +'<p>tu paquete ha sido entregado en la calle <b style="font-size:17px">'+val.datosEnvio.calle+'</b> </p>'

       +'<p>si no has recibido el paquete o algún justificante de entrega, porfavor ponte en contacto con la empresa de mensajería con el localizador: <b style="font-size:19px"> '+ val.datosCompra.localizador +' </b> através de su pagina web:" </p>'

       +'<a href="'+val.datosCompra.urlMensajeria+'">'+val.datosCompra.urlMensajeria+'</a>'
       +'</div>'

       +'<div style = "max-width: 550px; margin:8px">'
       +'<p>Gracias otra vez por tu compra! </p>'

       +' <a href="http://www.micotextil.com/"><img src="cid:logo@micotextil.com" height="150" width="150"/> </a>'
       +'<div style="opacity: 0.7">'
       +'<p>Cualquier problema que surja con el pedido, no dudes en contestar a este email a la dirección de correo pedidos@micotextil.com </p>'
       +'</div>'
       +'</div>'
       +'</div>'

    // An array of attachments
    mailOptions.attachments= [

      // File Stream attachment
      {
        filename: 'mico.jpg',
        path: __dirname + '/assets/mico_disegno_textil.jpg',
        cid: 'logo@micotextil.com' // should be as unique as possible
      },

    ]

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('paquete entregado email sent to:', val.datosCompra.payerEmail)
    }).catch(error => {
      console.error('There was an error while sending the email:', error)
    })

  } else{

    // el paquete se est'a preparando
    mailOptions.subject = val.datosEnvio.nombreCompletoEnvio+', estamos preparando tu envio!'
    mailOptions.text = 'Holaa, en breve nos pondremos manos a la obra para que puedas tener tu compra lo mas pronto posible en '+ val.datosEnvio.calle+' , si quieres cambiar esta direccion, mandanos un correo a pedidos@micotextil.com , si cambias tu direccion en tu perfil como amigo de Mico, afectara para futuros envios pero no para este '
    mailOptions.html =
       '<div style ="margin:5px; max-width: 600px ">'
       +'<div style = "max-width: 550px; margin:8px">'
       +' <a href="http://www.micotextil.com/" style = "float:right"> <img src="cid:logo@micotextil.com"  height="82" width="82"/> </a>'
       +'<p>Hola '+val.datosEnvio.nombreCompletoEnvio+' !</p> <hr></hr>'

       +'<p>en breve nos pondremos manos a la obra para que puedas tener tu compra lo mas pronto posible en <b style="font-size:17px">'+val.datosEnvio.calle+'</b> </p>'

       +'<p>si quieres cambiar esta direccion, mandanos un correo a pedidos@micotextil.com , con el asunto : "cambio de direccion" </p>'

       +'<p> si cambias tu direccion en tu perfil como amigo de Mico, afectara para futuros envios pero no para este </p>'
       +'</div>'

       +'<div style = "max-width: 550px; margin:8px">'
       +'<p>Gracias por tu compra! </p>'

       +' <a href="http://www.micotextil.com/"><img src="cid:logo@micotextil.com" height="150" width="150"/> </a>'
       +'<div style="opacity: 0.7">'
       +'<p>Cualquier problema que surja con el pedido, no dudes en contestar a este email a la dirección de correo pedidos@micotextil.com </p>'
       +'</div>'
       +'</div>'
       +'</div>'

    // An array of attachments
    mailOptions.attachments= [

      // File Stream attachment
      {
        filename: 'mico.jpg',
        path: __dirname + '/assets/mico_disegno_textil.jpg',
        cid: 'logo@micotextil.com' // should be as unique as possible
      },

    ]

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('preparando envio email sent to:', val.datosCompra.payerEmail)
    }).catch(error => {
      console.error('There was an error while sending the email:', error)
    })
  }
})
