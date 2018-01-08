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
import { withTulipArtist } from 'components/WithTulipArtist/index';
import styled from 'styled-components';
import { Grid, Row } from 'react-bootstrap';


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

    this.state = { tulip: null };
  }

  componentWillReceiveProps(nextProps) {
    const { ethereum: { tulipArtist }, match: { params: { id } } } = nextProps;

    tulipArtist.methods.getTulip(id).call(
      (err, res) => {
        this.setState({ tulip: assign({}, { id }, omit(res, '0', '1', '2', '3', '4')) });

        tulipArtist.methods.getTulip(res.foundation).call(
          (err2, res2) => {
            this.setState({ foundation: assign({}, { id }, omit(res2, '0', '1', '2', '3', '4')) });
          });

        tulipArtist.methods.getTulip(res.inspiration).call(
          (err2, res2) => {
            this.setState({ inspiration: assign({}, { id }, omit(res2, '0', '1', '2', '3', '4')) });
          });
      });
  }

  handleReveal(id) {
    const { ethereum: { tulipArtist, account } } = this.props;

    tulipArtist.methods.revealArt(id)
      .send({
        gasLimit: 241293,
        from: account,
      },
      (err, res) => {
        // eslint-disable-next-line
        console.log(err + res);
      }).on('receipt', (receipt) => {
        // eslint-disable-next-line
        console.log(receipt);
      });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { tulip, foundation, inspiration } = this.state;

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
          </TulipFrame>
        </Row>
        <Row>
          <Generation>
            generation {tulip.generation}
          </Generation>
          {foundation && foundation.genome &&
            <TulipFrame>
              <Title>foundation</Title>
              <Tulip genome={foundation.genome} width={200} id={foundation.id} />
            </TulipFrame>
          }
          {inspiration && inspiration.genome && (
            <TulipFrame>
              <Title>inspiration</Title>
              <Tulip genome={inspiration.genome} width={200} id={inspiration.id} />
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
