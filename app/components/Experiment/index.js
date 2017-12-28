/**
*
* Experiment
*
*/

import React from 'react';
import Tulip, { stringToGenes, genesToString } from 'components/Tulip';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';

const Title = styled.div`
  font-family: 'Courgette';
`;

const Controls = styled.div`
  margin-top:315px;
`;

const SliderContainer = styled.div`
  margin-top: 2px;
`;

const Divider = styled.div`
  height: 1px;
  margin: 8px 0px;
  border-top: 1px solid #ECF0F1;
`;

const Plus = styled.span`
  font-size: 80px;
  line-height: 200px;
  vertical-align: sub;
`;

class Experiment extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      genome: '2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00', // '0'.repeat(GENOME_LENGTH),
      population: [
        '2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00',
        'caa3439b66b98710b7a6cafdc6a53f8a2c82e54d603b2167b38369aafb489e0',
        '7e76a9c8ca7542bb3b2887affff240c8fd005e62eff99b61b090fff000009a00',
      ],
    };
  }

  onSliderChanged(index, value) {
    const { genome } = this.state;

    const genes = stringToGenes(genome);
    genes[index] = value;
    this.setState({
      genome: genesToString(genes),
    });
  }

  render() {
    const { genome } = this.state;

    return (
      <div>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={5}>
                <Title>Foundation</Title>
                <Tulip genome="2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00" width={200} />
              </Col>
              <Col md={2}>
                <Plus className="fui-plus" />
              </Col>
              <Col md={5}>
                <Title className="text-right">Inspiration</Title>
                <Tulip genome="2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00" width={200} className="float-right" />
              </Col>
              <Col md={12}>
                <button className="btn btn-block btn-lg btn-inverse mt-3">
                  <span className="fui-triangle-down mr-5" />
                  Paint New Tulip
                  <span className="fui-triangle-down ml-5" />
                </button>
              </Col>
              <Col md={12}>
                <br />
                <Tulip genome={genome} width={562} />
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Controls>
              {genome.match(/.{2}/g).map((g, i) => (
                <SliderContainer
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${i}`}
                >
                  <Slider min={0} max={255} step={1} value={parseInt(g, 16)} onChange={(v) => this.onSliderChanged(i, v)} tooltip />
                  {i % 8 === 7 ? (<Divider />) : ''}
                </SliderContainer>
              ))}
            </Controls>
          </Col>
        </Row>
      </div>
    );
  }
}

Experiment.propTypes = {

};

export default Experiment;
