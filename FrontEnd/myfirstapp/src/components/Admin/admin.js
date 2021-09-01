import React, {Component} from 'react';
import CreatePersonButton from "../Persons/CreatePersonButton";
import Person from "../Persons/Person";

class Admin extends Component {
    render() {
        return (
            <div className="Persons">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Admin</h1>
                            <br />
                            <CreatePersonButton />
                            <br />
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;