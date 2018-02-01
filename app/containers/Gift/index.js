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
import Transactions from 'components/Transactions';
import { GAS_PRICE } from '../../components/constants';


const TulipFrame = styled.div`
  margin: 50px auto;
`;

const Message = styled.div`
  font-size: 18px;
  padding: 20px;
`;


class Gift extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = { foundation: '', transactions: [], destinationAccount: null };
  }

  handleFoundation(event) {
    const { ethereum: { tulipArtist } } = this.props;
    const id = event.target.value;

    tulipArtist.methods.getTulip(id).call(
      (err, res) => {
        this.setState({ foundation: assign({}, omit(res, '0', '1', '2', '3', '4'), { id }) });
      });
  }

  handleAccount(event) {
    const { ethereum: { connection: { web3 } } } = this.props;
    const accountAddress = event.target.value;
    const isValid = web3.utils.isAddress(accountAddress);

    this.setState({ destinationAccount: isValid ? accountAddress : null });
  }

  handleGift() {
    const { foundation, destinationAccount } = this.state;
    const { ethereum: { tulipArtist, account } } = this.props;

    if (!foundation.genome) {
      return;
    }

    tulipArtist.methods.transfer(
      destinationAccount,
      foundation.id).send({
        gas: 100000,
        gasPrice: GAS_PRICE,
        from: account,
      },
      (err, res) => {
        this.setState({ transactions: this.state.transactions.concat([res]) });
      });
  }


  render() {
    const { foundation, transactions, destinationAccount } = this.state;
    const { ethereum, ethereum: { account, tulipIds } } = this.props;

    return (
      <div>
        <Navigation account={account} />
        <Grid>
          <Row>
            <Col md={4}>
              You can gift a Tulip to another address.
            </Col>
          </Row>
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
                <h3>You need to own a Tulip to gift it.</h3>
              )}

            </Col>
            <Col md={8}>
              <h4>Destination ETH Address</h4>
              <input
                type="text"
                name="destination"
                onChange={(e) => this.handleAccount(e)}
                className="form-control"
                placeholder="paste their address here"
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
            <Col md={8}>
              <Transactions transactions={transactions}>
                <Message>
                  Congratulations! Your gift will arrive
                  at <a href={`/collection/${destinationAccount}`}>their collection</a>.
                </Message>
              </Transactions>

              {ethereum && ethereum.connected ?
                foundation.genome && destinationAccount && (
                  <button className="btn btn-block btn-lg btn-inverse mt-3" onClick={() => this.handleGift()}>
                  Gift this tulip
                </button>) : (
                  <div>
                    Please connect to <a href="https://metamask.io/" target="_blank">
                    MetaMask</a> to gift a tulip.
                  </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Gift.propTypes = {
  ethereum: PropTypes.object.isRequired,
};

export default withTulipArtist()(Gift);
