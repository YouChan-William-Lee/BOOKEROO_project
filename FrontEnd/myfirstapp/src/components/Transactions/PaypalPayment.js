import React, { Component } from 'react';
import PayPal from './PayPal';

class PaypalPayment extends Component {
    constructor() {
        super();
        this.state = {
            total: 0.00,
            itemName: ""
        }
    }

    onAdd = (name, unit, value) => {
        this.setState({
            total: unit * value,
            itemName: name
        })
    }

    render() {
        const { total, itemName } = this.state
        console.log(total);
        return (
            <div>
                <h1>This is paypal checkout page</h1>
                <PayPal totalAmount={total} itemName={itemName} />
            </div>
        );
    }
}

export default PaypalPayment;