/**
*
* Navigation
*
*/

import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class Navigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { account, blockNumber } = this.props;

    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">CryptoTulip</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Header>
          <Nav pullRight className="inline">
            <NavItem className="inline" eventKey={1} href={`/collection/${account}`}>My Collection</NavItem>
            <NavItem className="inline" eventKey={2} href="/browse">Browse</NavItem>
            <NavItem className="inline" eventKey={3} href="/commission">Commission</NavItem>
            <NavItem className="inline" eventKey={3} href="/gift">Gift</NavItem>
          </Nav>
          {blockNumber}
        </Navbar.Header>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  account: PropTypes.string,
  blockNumber: PropTypes.string,
};

export default Navigation;
