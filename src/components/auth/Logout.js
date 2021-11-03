import React, { Component } from "react";

import "../../App.css";

class Logout extends Component {

    render() {
        return (
            <div>
                <div>
                    <button className="logButton" onClick={this.props.signout}>Sigh out</button>
                </div>
            </div>
        );
    }
}

export default Logout;
