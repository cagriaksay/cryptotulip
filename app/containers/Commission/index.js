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


  render() {
    const { foundation, inspiration } = this.state;
    const { ethereum: { account, tulipIds } } = this.props;

    return (
      <div>
        <Navigation account={account} />
        <Grid>
          <Row>
            <Col md={4}>
              <h4>Foundation</h4>
              {tulipIds ? (
                <FormGroup>
                  <FormControl componentClass="select" placeholder="select" onChange={(e) => this.handleFoundation(e)} className="form-control select select-primary select-block mbl">
                    <optgroup label="your tulips">
                      {tulipIds.map((id) => (
                        <option value={id}>Tulip #{id} </option>
                      ))}
                    </optgroup>
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
              <input type="text" name="inspiration" onChange={(e) => this.handleInspiration(e)} className="form-control" />
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
        </Grid>
      </div>
    );
  }
}

Commission.propTypes = {
  ethereum: PropTypes.object.isRequired,
};

export default withTulipArtist()(Commission);
