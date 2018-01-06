/**
 *
 * MyCollection
 *
 */

 /* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Collection from 'components/Collection';
import PropTypes from 'prop-types';
import { map, omit } from 'lodash';
import { withTulipArtist } from 'components/WithTulipArtist';
import Navigation from 'components/Navigation';

const Header = styled.h1`
  margin-top: 20px;
  margin-bottom: 0px;
  font-family: 'Lora';
  font-size: 25px;
  width: 100%;
`;


class MyCollection extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { account: '' };
  }

  componentWillReceiveProps(nextProps) {
    const { ethereum: { tulipArtist, account, tulips: myTulips }, match: { params: { id } } } = nextProps;

    this.tulips = {};

    if (account === id) {
      this.setState({ tulips: myTulips, account: id });
      return;
    }

    this.setState({ account: id });

    tulipArtist.methods.getAllTokens(id).call(
      (err, res) => {
        const tokens = res;
        let tokensToGet = tokens.length;
        map(tokens, (t) => {
          tulipArtist.methods.getTulip(t).call(
            (err2, res2) => {
              this.tulips[t] = omit(res2, '0', '1', '2', '3', '4');
              tokensToGet -= 1;
              if (tokensToGet === 0) {
                this.setState({ tulips: this.tulips });
              }
            });
        });
      });
  }

  render() {
    const { account } = this.state;

    return (
      <div>
        <Navigation account={account} />
        <Grid>
          <Helmet>
            <title>CryptoTulip &mdash; Collection {account}</title>
            <meta name="description" content="digital art on the blockchain." />
          </Helmet>

          <Row>
            <Col md={12}>
              <Row>
                <Header>
                  Collection {account}
                </Header>
                <Collection />
              </Row>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

MyCollection.propTypes = {
  match: PropTypes.object.isRequired,
  ethereum: PropTypes.object.isRequired,
};


export default withTulipArtist()(MyCollection);
