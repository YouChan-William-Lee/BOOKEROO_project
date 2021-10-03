import React, { Component, createRef } from 'react';
import ReactDOM from "react-dom"

class PayPal extends Component {
    constructor(props) {
        super(props);
        this.paypal = createRef();
        this.state = {
            isConfirm: false
        }

    }

    componentDidUpdate(prevProps, prevState) {
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
                                    value: 12.00
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                }
            }).render(this.paypal.current);
    }

    onConfirm = () => {
        this.setState({
            isConfirm: true
        });
    }

    render() {

        return (
            <div>
                {this.state.isConfirm ? (<div id="paypal-button-container" ref={this.paypal}></div>) :
                    (<button type="button" class="btn btn-primary" onClick={this.onConfirm}>Confirm</button>)}

                {/* <div ></div> */}
                {/* <PayPalButton
                    createOrder={(data, actions) => this.createOrder(data, actions)}
                    onApprove={(data, actions) => this.onApprove(data, actions)}
                /> */}

            </div>
        );
    }
}

export default PayPal;

    // createOrder(data, actions) {
    //     return actions.order.create({
    //         purchase_units: [
    //             {
    //                 amount: {
    //                     value: "10.00",
    //                 },
    //             },
    //         ],
    //     });
    // }

    // onApprove(data, actions) {
    //     return actions.order.capture();
    // }