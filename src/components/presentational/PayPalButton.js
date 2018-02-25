import React from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'

const Button = paypal.Button.driver('react', { React, ReactDOM })

export default class PayPalButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      env: this.props.env,

      client: {
        sandbox: this.props.sandboxID,
        production: this.props.productionID
      },
      amount: this.props.amount,
      currency: this.props.currency,
      commit: this.props.commit
    }
  }

  payment(data, actions) {
    return actions.payment.create({
      transactions: [
        {
          amount: { total: this.state.amount, currency: this.state.currency }
        }
      ]
    })
  }

  onAuthorize(data, actions) {
    return actions.payment.execute().then((payment_data)=>{
      console.log('pagoHecho')
      var payment = {}
      payment.paid = true
      payment.cancelled = false
      payment.payerID = data.payerID
      payment.paymentID = data.paymentID
      payment.paymentToken = data.paymentToken
      payment.returnUrl = data.returnUrl
      // getting buyer's shipping address and email
      payment.address = payment_data.payer.payer_info.shipping_address
      payment.email = payment_data.payer.payer_info.email
      this.props.pagoHecho(payment)

    })
      .catch(err => {
        console.log ('error en PayPal'+err)
        throw err
      })
  }

  render() {
    return (
      <Button
        commit={ this.state.commit }
        locale= 'es_ES' //espaniolo
        style={{
          layout: 'vertical',  // horizontal | vertical
          size:   'responsive',    // medium | large | responsive
          shape:  'pill',      // pill | rect
          color:  'black'       // gold | blue | silver | black
        }}
        env={ this.state.env }
        client={ this.state.client }

        payment={ (data, actions) => this.payment(data, actions) }
        onAuthorize={ (data, actions) => this.onAuthorize(data, actions) }
        onCancel={this.props.onCancel}
        onError = {this.props.onError}
      />
    )
  }
}

PayPalButton.propTypes = {
  env: PropTypes.string.isRequired,
  sandboxID: PropTypes.string,
  productionID: PropTypes.string,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  commit: PropTypes.bool.isRequired
}
