import React, {Component} from 'react';
import Person from "./Person";

class Profile extends Component {
    render() {
        return (
            <div className="Profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Profile;