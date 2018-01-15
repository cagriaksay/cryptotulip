/**
 *
 * TulipPage
 *
 */

 /* eslint-disable no-script-url */

import React from 'react';
import PropTypes from 'prop-types';
import { omit, assign } from 'lodash';
import Tulip from 'components/Tulip';
import Transactions from 'components/Transactions';
import { withTulipArtist } from 'components/WithTulipArtist/index';
import styled from 'styled-components';
import { Grid, Row } from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import { GAS_PRICE } from '../../components/constants';


const TulipFrame = styled.div`
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.div`
  font-family: 'Courgette';
`;

const Generation = styled.div`
  width: 100%;
  text-align: center;
  font-family: 'Courgette';
`;

const Back = styled.a`
  top: 10px;
  left: 10px;
  position: absolute;
  color: #95A5A6;
`;

class TulipPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = { tulip: null, title: 'untitled', transactions: [] };
  }

  componentWillReceiveProps(nextProps) {
    const { ethereum: { tulipArtist }, match: { params: { id } } } = nextProps;

    tulipArtist.methods.getTulip(id).call(
      (err, res) => {
        this.setState({ tulip: assign({}, { id }, omit(res, '0', '1', '2', '3', '4')) });

        tulipArtist.methods.getTulip(res.foundation).call(
          (err2, res2) => {
            this.setState({ foundation: assign({}, { id: res.foundation }, omit(res2, '0', '1', '2', '3', '4')) });
          });

        tulipArtist.methods.getTulip(res.inspiration).call(
          (err2, res2) => {
            this.setState({ inspiration: assign({}, { id: res.inspiration }, omit(res2, '0', '1', '2', '3', '4')) });
          });

        tulipArtist.methods.tokenMetadata(id).call(
          (err2, res2) => {
            this.setState({ title: res2 });
          });
      });
  }

  handleReveal(id) {
    const { ethereum: { tulipArtist, account } } = this.props;

    tulipArtist.methods.revealArt(id)
      .send({
        gasLimit: 241293,
        gasPrice: GAS_PRICE,
        from: account,
      },
      (err, res) => {
        this.setState({ transactions: this.state.transactions.concat([res]) });
      });
  }

  dataChanged(data) {
    const { ethereum: { tulipArtist, account }, match: { params: { id } } } = this.props;
    const { message } = data;

    tulipArtist.methods.nameArt(
      id, message).send({
        gas: 158267,
        gasPrice: GAS_PRICE,
        from: account,
      },
      (err, res) => {
        this.setState({ transactions: this.state.transactions.concat([res]) });
      });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { tulip, foundation, inspiration, title, transactions } = this.state;

    if (tulip !== null && !tulip.genome) {
      return (
        <div className="text-center">
          No such tulip.
        </div>
      );
    }

    if (tulip === null) {
      return (
        <div className="text-center">
          loading from the blockchain...
        </div>
      );
    }

    return (
      <Grid>
        <Back href="javascript:history.back()">
          <span className="fui-cross"></span>
        </Back>
        <Row>
          <TulipFrame>
            <Tulip genome={tulip.genome} width={600} id={tulip.id} onReveal={(revealId) => this.handleReveal(revealId)} />
            #
            {id}
            &nbsp;
            <InlineEdit
              activeClassName="editing"
              text={title || 'untitled'}
              paramName="message"
              change={(d) => this.dataChanged(d)}
            />
          </TulipFrame>
        </Row>
        <Row>
          <Transactions transactions={transactions} />
          <Generation>
            generation {tulip.generation}
          </Generation>
          {foundation && foundation.genome &&
            <TulipFrame>
              <Title>foundation</Title>
              <Tulip genome={foundation.genome} width={200} id={foundation.id} />
              #
              {foundation.id}
            </TulipFrame>
          }
          {inspiration && inspiration.genome && (
            <TulipFrame>
              <Title>inspiration</Title>
              <Tulip genome={inspiration.genome} width={200} id={inspiration.id} />
              #
              {inspiration.id}
            </TulipFrame>
          )}
        </Row>
      </Grid>
    );
  }
}

TulipPage.propTypes = {
  match: PropTypes.object.isRequired,
  ethereum: PropTypes.object.isRequired,
};

export default withTulipArtist()(TulipPage);
