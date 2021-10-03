import React, { Component, createRef } from 'react';
import ReactDOM from "react-dom"
import { Redirect } from 'react-router';

class PayPal extends Component {
    constructor(props) {
        super(props);
        this.paypal = createRef();
        this.state = {
            message: "",
            redirect: false
        }

    }

    componentDidMount() {
        console.log("Updating the window.paypal");
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "",
                                amount: {
                                    currency_code: "AUD",
                                    value: 0.02
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.setState({
                        message: "Payment is Successfull!! Thanks for placing an order."
                    });
                    setTimeout(() => this.setState({ redirect: true }), 5000);
                },
                onError: (err) => {
                    this.setState({
                        message: "Payment is Unsuccessfull! Please try again after sometime."
                    });
                }
            }).render(this.paypal.current);
    }


    render() {

        if (this.state.redirect) {
            return <Redirect to="/home" />;
        }
        else {
            return (
                <div>
                    {this.state.message.length > 0 && <div key="message" className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>}
                    <div id="paypal-button-container" ref={this.paypal}></div>
                </div>
            );
        }
    }
}

export default PayPal;