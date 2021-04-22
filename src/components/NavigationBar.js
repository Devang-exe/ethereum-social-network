import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Identicon from 'identicon.js';

class NavigationBar extends Component {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" className="shadow">

        <Navbar.Brand href="/">Ethereum Social Network</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">

            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/me">My Profile</Nav.Link>

            { this.props.account
              ? <img
                  alt="account-avatar"
                  className="ml-2 mt-auto mb-auto"
                  width="30"
                  height="30"
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
              : <span></span>
            }

          </Nav>
        </Navbar.Collapse>

      </Navbar>

    );
  }
}

export default NavigationBar;
