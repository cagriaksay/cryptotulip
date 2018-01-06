/**
 *
 * TulipPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import Tulip from 'components/Tulip';
import { withTulipArtist } from 'components/WithTulipArtist/index';
import styled from 'styled-components';
import { Grid, Row } from 'react-bootstrap';


const TulipFrame = styled.div`
  margin: 50px auto;
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
        this.setState({ tulip: omit(res, '0', '1', '2', '3', '4') });
      });
  }


  render() {
    const { match: { params: { id } } } = this.props;
    const { tulip } = this.state;

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
        <Row>
          <TulipFrame>
            <Tulip genome={tulip.genome} width={600} />
            #
            {id}
          </TulipFrame>
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
