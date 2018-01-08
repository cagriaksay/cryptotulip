/**
 *
 * TulipPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { omit, assign } from 'lodash';
import Tulip from 'components/Tulip';
import { withTulipArtist } from 'components/WithTulipArtist/index';
import styled from 'styled-components';
import { Grid, Row, Col, FormControl, FormGroup } from 'react-bootstrap';
import Navigation from 'components/Navigation';
import { GAS_PRICE } from '../../components/constants';


const TulipFrame = styled.div`
  margin: 50px auto;
`;

class Commission extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = { foundation: '', inspiration: '' };
  }

  handleFoundation(event) {
    const { ethereum: { tulipArtist } } = this.props;
    const id = event.target.value;

    tulipArtist.methods.getTulip(id).call(
      (err, res) => {
        this.setState({ foundation: assign({}, omit(res, '0', '1', '2', '3', '4'), { id }) });
      });
  }

  handleInspiration(event) {
    const { ethereum: { tulipArtist } } = this.props;
    const id = event.target.value;

    tulipArtist.methods.getTulip(id).call(
      (err, res) => {
        this.setState({ inspiration: assign({}, omit(res, '0', '1', '2', '3', '4'), { id }) });
      });
  }

  handleCommission() {
    const { foundation, inspiration } = this.state;
    const { ethereum: { tulipArtist, account, connection: { web3 } } } = this.props;

    if (!foundation.genome || !inspiration.genome) {
      return;
    }

    tulipArtist.methods.commissionArt(
      foundation.id, inspiration.id).send({
        gas: 158267,
        gasPrice: GAS_PRICE,
        value: web3.utils.toWei('1', 'finney'),
        from: account,
      },
      (err, res) => {
        // eslint-disable-next-line
        alert(res);
      }).on('receipt', (receipt1) => {
        // receipt example
        // eslint-disable-next-line
        console.log(receipt1);
      });
  }


  render() {
    const { foundation, inspiration } = this.state;
    const { ethereum, ethereum: { account, tulipIds } } = this.props;

    return (
      <div>
        <Navigation account={account} />
        <Grid>
          <Row>
            <Col md={4}>
              <h4>Foundation</h4>
              {tulipIds ? (
                <FormGroup>
                  <FormControl componentClass="select" defaultValue={0} placeholder="select" onChange={(e) => this.handleFoundation(e)} className="form-control select select-primary select-block mbl">
                    <option disabled value={0}>Select one of your own tulips</option>
                    {tulipIds.map((id) => (
                      <option key={id} value={id}>Tulip #{id} </option>
                    ))}
                  </FormControl>
                </FormGroup>
              )
              : (
                <h3>You need to own a Tulip to commission a new one.</h3>
              )}

            </Col>
            <Col md={4}>
            </Col>
            <Col md={4}>
              <h4>Inspiration</h4>
              <input
                type="text"
                name="inspiration"
                onChange={(e) => this.handleInspiration(e)}
                className="form-control"
                placeholder="browse for inspiration, type in their id here"
              />
            </Col>


            <Col md={4} className="text-center">
              {foundation.genome &&
              <TulipFrame>
                <Tulip genome={foundation.genome} width={300} />
                #
                {foundation.id}
              </TulipFrame>}
            </Col>
            <Col md={4}>
            </Col>
            <Col md={4} className="text-center">
              {inspiration.genome &&
              <TulipFrame>
                <Tulip genome={inspiration.genome} width={300} />
                #
                {inspiration.id}
              </TulipFrame>}
            </Col>

          </Row>
          <Row>
            {ethereum && ethereum.connected ?
              foundation.genome && inspiration.genome && (
                <button className="btn btn-block btn-lg btn-inverse mt-3" onClick={() => this.handleCommission()}>
                Commission a tulip
              </button>) : (
                <div>
                  Please connect to MetaMask to commission a tulip.
                </div>
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

Commission.propTypes = {
  ethereum: PropTypes.object.isRequired,
};

export default withTulipArtist()(Commission);
