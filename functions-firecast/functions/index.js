'use strict'
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

// Sends an email confirmation when a user buys a product or when mico sends that product
exports.sendEmailPreparingPackage = functions.database.ref('/users/{uid}/pedidos/{pushId}').onWrite(event => {

  //this gets the uid of the person changing the /pedidos  ????
  const uid = event.params.uid
  const pushId = event.params.pushId
  console.log('uid: ', uid)
  console.log('pushId: ',pushId)
  const snapshot = event.data
  const val = snapshot.val()
  const pedidoMail = val.datosCompra.payerEmail

  if (!snapshot.changed('subscribedToMailingList')) {
    return
  }

  const mailOptions = {
    from: '"Mico diseno textil" <pedidos@micotextil.com>',
    to: pedidoMail
  }
  console.log(val.datosCompra.localizador)
  console.log(val.datosCompra.urlMensajeria)
  // si el paquete ha sido enviado hay un localizador
  if (val.datosCompra.localizador) {
    mailOptions.subject = val.datosEnvio.nombreCompletoEnvio+ ' tu paquete desde Mico ha sido enviado!'
    mailOptions.text = 'dentro de poco recibiras tu paquete en '+ val.datosEnvio.calle+', hasta entonces puedes consultar el estado de tu envio en la seccion de pedidos en tu apartado personal como amigo de Mico y con este localizador/cogido de envio: '+val.datosCompra.localizador+' puedes ver el seguimiento de tu paquete en la pagina web '+val.datosCompra.urlMensajeria
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('paquete enviado message sent', val.datosCompra.payerEmail)
    }).catch(error => {
      console.error('There was an error while sending the email:', error)
    })
  }else{

    // el paquete se est'a preparando
    mailOptions.subject = val.datosEnvio.nombreCompletoEnvio+', estamos preparando tu envio!'
    mailOptions.text = 'Holaa, en breve nos pondremos manos a la obra para que puedas tener tu compra lo mas pronto posible en '+ val.datosEnvio.calle+' , si quieres cambiar esta direccion, mandanos un correo a mico@mico.com , si cambias tu direccion en tu perfil como amigo de Mico, afectara para futuros envios pero no para este '
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('preparando envio email sent to:', val.datosCompra.payerEmail)
    }).catch(error => {
      console.error('There was an error while sending the email:', error)
    })
  }
})
