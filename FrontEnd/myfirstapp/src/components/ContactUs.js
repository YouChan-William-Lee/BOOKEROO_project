import React, { Component } from 'react'
import "../Stylesheets/ContactUs.css"

class ContactUs extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            theIssue: "",
            description: ""
        }
    }

    handleNewContact = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="row">
                                <h1 className="display-1"><strong>Conact Us</strong></h1>
                            </div>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="row mt-3 mb-5">

                            <div className="col-md-4"></div>
                            <div className="col-md-10 offset-3">
                                <form>
                                    {/* Email address */}
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleNewContact} />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>

                                    {/* Drop down options */}
                                    <div class="form-group">
                                    <select class="form-control form-control-lmd" name="theIssue" value={this.state.theIssue} onChange={this.handleNewContact}>
                                        <option selected disabled>What is this about?</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                        <option>Option 4</option>
                                    </select>
                                    </div>

                                    {/* Description textbox */}
                                    <div class="form-group">
                                        <textarea class="form-control" name="description" id="exampleFormControlTextarea1" rows="3" placeholder="Description..." value={this.state.description} onChange={this.handleNewContact}></textarea>
                                    </div>

                                    {/* Submit button */}
                                    <div className="row contactUsSubmitButton">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-4"></div>
                        </div>



                    </div>
                </div>
            </div>
        )
    }
}
export default ContactUs;