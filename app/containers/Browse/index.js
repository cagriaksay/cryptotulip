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
import PropTypes from 'prop-types';
import { map, omit, sortBy, assign } from 'lodash';
import { withTulipArtist } from 'components/WithTulipArtist';
import Navigation from 'components/Navigation';
import Tulip from 'components/Tulip';


const Header = styled.h1`
  margin-top: 20px;
  margin-bottom: 0px;
  font-family: 'Lora';
  font-size: 25px;
  width: 100%;
`;

const Arrows = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const TulipBox = styled.div`
  display: inline-block;
  margin: 10px;
`;

const CollectionFrame = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const PAGE_SIZE = 100;

class Browse extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { account: '' };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchTulips(nextProps);
  }

  fetchTulips(props) {
    const { ethereum: { tulipArtist }, match: { params: { page } } } = props;

    this.tulips = {};
    const tokens = Array.from(Array(PAGE_SIZE).keys()).map((i) => 1 + i + ((page || 0) * PAGE_SIZE));
    let tokensToGet = tokens.length;

    map(tokens, (t) => {
      tulipArtist.methods.getTulip(t).call(
        (err2, res2) => {
          this.tulips[t] = assign({}, { id: t }, omit(res2, '0', '1', '2', '3', '4'));
          tokensToGet -= 1;
          if (tokensToGet === 0) {
            this.setState({ tulips: this.tulips });
          }
        });
    });
  }


  render() {
    const { account, tulips } = this.state;
    const page = parseInt(this.props.match.params.page, 10) || 0;
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
                  Browse {1 + (page * PAGE_SIZE)} - {((page + 1) * PAGE_SIZE)}
                </Header>
                <Arrows>
                  {page > 0 &&
                    <a className="btn btn-lg btn-primary" href={`/browse/${page - 1}`}><span className="fui-arrow-left" /></a>
                  }
                  <a className="btn btn-lg btn-primary float-right" href={`/browse/${page + 1}`}><span className="fui-arrow-right" /></a>
                </Arrows>

                <CollectionFrame>
                  {map(sortBy(tulips, (t) => parseInt(t.id, 10)), (t, i) => (
                    <TulipBox key={i}>
                      <a href={`/tulip/${t.id}`} >
                        <Tulip genome={t.genome} width={250} />
                        <span>{t.id}</span>
                      </a>
                    </TulipBox>
                  ))}
                  {(!tulips || tulips.length === 0) &&
                    <h3>
                      no tulips here.
                    </h3>
                  }
                </CollectionFrame>
              </Row>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

Browse.propTypes = {
  match: PropTypes.object.isRequired,
};


export default withTulipArtist()(Browse);
