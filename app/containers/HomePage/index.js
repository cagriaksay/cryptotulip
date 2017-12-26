import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-bootstrap';

import Logo from 'components/Logo';
import { Helmet } from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.css';


const Header = styled.h1`
  margin-top: 50px;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Grid>
        <Helmet>
          <title>CryptoTulip</title>
          <meta name="description" content="first digital artist on the blockchain." />
        </Helmet>
        <Row>
          <Col xs={3}>
            <Logo />
          </Col>
          <Col xs={6} xsOffset={3}>
            <Header>
              Welcome to Tulip Artist, first digital artist on the blockchain.
            </Header>
          </Col>
        </Row>
        <div className="row h1 pipe">
          This is not a tulip.
        </div>
      </Grid>
    );
  }
}
