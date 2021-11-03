import React, { Component } from "react";

import './Menu.css';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: !this.state.showMenu }, () => {
            document.addEventListener('click', this.closeMenu, true);
        });
    }

    closeMenu(event) {
        if (!event.target.closest('.menu') && !event.target.closest('.dropbtn')) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
            //console.log("closeMenu");
        }
    }

    render() {

        return (
            <div className="dropdown">
                <button
                    onClick={(e) => { this.toggleMenu(e) }}
                    className="dropbtn"
                >
                    {this.props.user}<i className='fas fa-angle-down'></i>
                </button>
                {this.state.showMenu ?
                    (<div className="menu">
                        <button onClick={() => { this.props.signout() }} className="signoutbtn">Sign out<i className="fas fa-sign-out-alt"></i></button>
                    </div>) : ""
                }
            </div>
        )
    }
}

export default Menu;