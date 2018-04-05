import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalPoliticaPrivacidad extends React.Component {

  handleClick(){
    alert('politica de datossss')
  }


  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }

    var stiloModal ={
      position: 'absolute',
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',
      backgroundColor:'white',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      maxWidth: 700,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '60px',
      left: '20px',
      right: '20px',
      bottom: '20px',
      //border                     : '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }

    stiloModal.backgroundColor = 'white'

    let condiciones = `Los mayores de trece años podrán registrarse en micotextil.com como usuarios sin el previo consentimiento de sus padres o tutores.
En el caso de los menores de trece años se requiere el consentimiento de los padres o tutores para el tratamiento de sus datos personales.
En ningún caso se recabarán del menor de edad datos relativos a la situación profesional, económica o a la intimidad de los otros miembros de la familia, sin el consentimiento de estos.
Si eres menor de trece años y has accedido a este sitio web sin avisar a tus padres no debes registrarte como usuario.

Por mi parte, nunca solicito información personal a menos que realmente sea necesaria para prestarte los servicios requeridos.
Nunca comparto información personal de mis usuarios con nadie, excepto para cumplir con la ley o en caso que cuente con tu autorización expresa. ley vigente desde mayo 2018 (Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas)
Nunca utilizo tus datos personales con una finalidad diferente a la expresada en esta política de privacidad.`
    let principios = `Principio de licitud, lealtad y transparencia: siempre voy a requerir tu consentimiento para el tratamiento de tus datos personales para uno o varios fines específicos que te informaré previamente con absoluta transparencia.

Principio de minimización de datos: solo voy a solicitar datos estrictamente necesarios para la venta de diseños.

Principio de limitación del plazo de conservación: los datos serán mantenidos durante no más tiempo del necesario para los fines del tratamiento, en función a la finalidad, después de una inactividad de más de 2 años, se eliminan los datos del usuario en cuestión.

Principio de integridad y confidencialidad: tus datos serán tratados de tal manera que se garantice una seguridad adecuada de los datos personales y se garantice confidencialidad. Debes saber que tomo todas las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de mis usuarios por parte de terceros.`
    let finalidad = `Te pido tus datos personales para el tratamiento y envio de los diseños que compres, nada más y nada menos. No pido ni almaceno datos bancarios puesto que esa parte del proceso se hace através de PayPal que proporciona una forma segura y encapsulada de compra, para que tus datos bancarios no puedan ser accesibles por terceras personas, ni siquiera por esta web.

También se recogen otros datos no vincualdos a la persona mediante cookies que se descargan através del navegador y que detallo en la política de cookies.

Con respecto a las redes sociales, cada una tiene su propia política de tratamiento de datos que deberás aceptar cuando hagas uso de ellas. Por mi parte NO uso tus datos personales en las redes sociales, solamente si me sigues en instagram o facebook, verás que informo de actividades, ferias o productos Micotextil. En ningún caso utilizaré los perfiles de seguidores en redes sociales para enviar publicidad de manera individual.

En ningún caso cederé tus datos personales a terceros salvo a la compañia de transportes para mandarte el producto.`
    let derechos=`La legislación vigente reconoce una serie de derechos que tienes como Usuario que ha prestado sus datos, que son son:

Solicitar el acceso a los datos personales relativos al interesado.
Solicitar su rectificación o supresión.
Solicitar la limitación de su tratamiento.
Oponerse al tratamiento.
Solicitar a la portabilidad de los datos.
El ejercicio de estos derechos es personal y debe por tanto ser ejercido directamente por el interesado. La rectificación o liminatación podrás hacerlo tu mismo desde tu apartado de cliente. La supresión se realizará mediante correo electrónico en un espacio breve de tiempo, siempre y cuando no haya un trámite pendiente, en ese caso se eliminarían tus datos al haber finalizado la transacción.

No puedo proporcionar portabilidad de datos a otras empresas puesto que me cedes los datos para un determinado propósito y no trabajo más que con la empresa de transportes.

Y porsupuesto siempre puedes ponerte en contacto conmigo para realizar cualquier trámite relativo a la privacidad de datos al correo contacto@micotextil.com`

    let legitimacion =`La base legal para el tratamiento de tus datos es el consentimiento.
Para registrarte se requiere tu consentimiento con esta política de privacidad.

Los datos personales que me proporciones se conservarán hasta que me pidas que los elimine o al pasar más de 2 años de inactividad de la cuenta.`

    let navegacion =`Al navegar por micotextil.com se pueden recoger datos no identificables con la persona, que pueden incluir, direcciones IP, ubicación aproximada, un registro de cómo se navega por la página, y otros datos que no pueden ser utilizados para identificar al usuario.

Entre los datos no identificativos están también los relacionados a tus hábitos de navegación a través de Google analytics`

    let seguridad =`Me comprometo al uso y tratamiento correcto de los datos personales de los usuarios, respetando su confidencialidad y utilizándolos solamente con la finalidad con la que se recogieron. Y también a cumplir mi obligación de guardarlos y adaptar todas las medidas para evitar la alteración, pérdida, tratamiento o acceso no autorizado, tal y como establece la normativa vigente de protección de datos.

Fíjate que además esta web incluye un certificado SSL
Se trata de un protocolo de seguridad que hace que tus datos viajen de manera íntegra, segura y totalmente cifrada o encriptada.

Lógicamente, no se puede garantizar la absoluta inexpugnabilidad de Internet y por tanto la violación de los datos mediante accesos fraudulentos por parte de terceros como hackers y otros.`

    let exactitud =`Como usuario, aceptas proporcionar información completa y corrercta y eres el único responsable de la veracidad de los datos que mandes a micotextil.com.

Es decir, que los usuarios garantizan y responden, en cualquier caso, de la exactitud, vigencia y autenticidad de los datos personales facilitados, y se comprometen a mantenerlos debidamente actualizados.
`

    let conclusion =`Es necesario que la hayas leído y estés conforme con estas condiciones sobre la protección de datos de carácter personal, aceptando y consintiendo el tratamiento de los mismos por mi parte (Alba Gomez Sanz), en la forma y para las finalidades que te he indicado en esta política y en el aviso legal.

El consentimiento que me prestas, tanto para el tratamiento como para la cesión de tus datos, es revocable en cualquier momento, por correo electrónico o mediante las funcionalidades de la web y si tienes cualquier duda o comentario sobre esta política de privacidad, no dudes en preguntarme.
Por último y no menos importante, quiero confirmarte que no realizo prácticas de SPAM, por lo que no envío correos comerciales por vía electrónica que no se hayan identificado debidamente y además no hayan sido previamente solicitados o autorizados por el Usuario.
`

    let UsoCookies = `micotextil.com utiliza cookies propias y de terceros para conseguir que tengas una mejor experiencia de navegación, puedas compartir contenido en redes sociales y también para obtener estadísticas y hábitos de navegación de los usuarios de esta web.

    si continuas navegando, estarás prestando tu consentimiento para el empleo de estas cookies.

    Como usuario, puedes rechazar el tratamiento de los datos o la información bloqueando estas cookies mediante la configuración de tu navegador, pero si lo haces la página no funcionará al 100%.
Por eso es importante que leas esta política de cookies y comprendas que si continúas navegando, consideraré que aceptas su uso. Puedes cambiar la configuración de tu navegador para que te avise de la recepción de cookies en tu disco duro o desactivar si quieres la capacidad de almacenar dichas cookies en tu disco duro.

Las cookies no suelen almacenar información sensible sobre ti como tarjetas de crédito o datos bancarios, fotografías o información personal, etc. Los datos que guardan son de carácter técnico, estadísticos, preferencias personales, personalización de contenidos y cosas así.
El servidor web no te asocia a ti como persona, sino a tu navegador web.

En micotextil.com se utilizan cookies propias:
Inicio de sesión através del servidor de autenticación y base de datos Firebase de Google.
preferencias para recordar los ajustes de preferencias en cuestión de idioma o que diseños de la página tienes en tu carro o has visitado con anterioridad.

También se usan cookies de terceros:
Google analytics y Google Maps al cargar sus funcionalidades.
Al iniciar sesión con Facebook también tendrá sus propias cookies
Al iniciar sesión con Google las cookies propias de Google+
Al realizar el pago , las cookies que usa Paypal para su transacción
 `
    if(this.props.politica){
      if (this.props.politica.privacidad){
        condiciones = this.props.politica.privacidad.condiciones
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.condicionesGalego){
          condiciones = this.props.politica.privacidad.condicionesGalego
        }
        principios = this.props.politica.privacidad.principios
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.principiosGalego){
          principios = this.props.politica.privacidad.principiosGalego
        }
        finalidad = this.props.politica.privacidad.finalidad
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.finalidadGalego){
          finalidad = this.props.politica.privacidad.finalidadGalego
        }
        derechos = this.props.politica.privacidad.derechos
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.derechosGalego){
          derechos = this.props.politica.privacidad.derechosGalego
        }
        legitimacion = this.props.politica.privacidad.legitimacion
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.legitimacionGalego){
          legitimacion = this.props.politica.privacidad.legitimacionGalego
        }
        navegacion = this.props.politica.privacidad.navegacion
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.navegacionGalego){
          navegacion = this.props.politica.privacidad.navegacionGalego
        }
        seguridad = this.props.politica.privacidad.seguridad
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.seguridadGalego){
          seguridad = this.props.politica.privacidad.seguridadGalego
        }
        exactitud = this.props.politica.privacidad.exactitud
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.exactitudGalego){
          exactitud = this.props.politica.privacidad.exactitudGalego
        }
        conclusion = this.props.politica.privacidad.conclusion
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.conclusionGalego){
          conclusion = this.props.politica.privacidad.conclusionGalego
        }
        UsoCookies = this.props.politica.privacidad.UsoCookies
        if(this.props.lengua ==='ga' && this.props.politica.privacidad.UsoCookiesGalego){
          UsoCookies = this.props.politica.privacidad.UsoCookiesGalego
        }
      }
    }

    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
              style= {style.modal.btnClose}></button>
            <div className = 'col-xs-11 col-sm-11 col-md-11 col-lg-11' style = {style.modal.formContainer}>
              {!this.props.showOnlyCookies &&
                  <div>
                    <div className='col-sm-12 '>
                      <h3>Politica de privacidad de datos y cookies</h3>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 '>
                      <p>Aquí podrás ver como se piden, gestionan, almacenan y utilizan tus datos como usuario de esta página web.</p>
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Condiciones</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {condiciones.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Principios</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 '>
                      <p style = {{whiteSpace: 'pre-line'}}>{principios}
                      </p>

                    </div>

                    <div className='col-sm-12 '>
                      <h4>Identidad de la responsable de los datos:</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                      <h5>Alba Gomez Sanz</h5>
                      <h5>DNI: 53183645D</h5>
                      <a href={'mailto: contacto@micotextil.com'} style={{color: 'black'}}>
                        <h5>contacto@micotextil.com</h5>
                      </a>
                    </div>
                    <div className='col-sm-12 '>

                      <h4>Finalidad</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {finalidad.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>
                    <div className='col-sm-12 '>
                      <h4>Legitimacion</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {legitimacion.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Derechos</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {derechos.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Navegacion</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {navegacion.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Seguridad</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {seguridad.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Exactitud</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {exactitud.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>

                    <div className='col-sm-12 '>
                      <h4>Conclusion</h4>
                      <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
                    </div>
                    <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                      {conclusion.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>})}
                    </div>
                  </div>
              }
              <div className='col-sm-12 '>
                <h4>Uso de cookies</h4>
                <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
              </div>
              <div className='col-sm-12 ' style={{ marginBottom: 10}}>
                {UsoCookies.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>})}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

//I tihk I don't need this cos it's only to put children to it
/*Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}*/

export default ModalPoliticaPrivacidad
