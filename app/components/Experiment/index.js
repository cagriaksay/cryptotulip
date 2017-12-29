/**
*
* Experiment
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Tulip, { stringToGenes, genesToString, GENOME_LENGTH } from 'components/Tulip';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';
import { sample } from 'underscore';
import { withEthereum } from 'react-ethereum-provider';

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

const PaintButton = styled.button`
  cursor: pointer;
`;

class Experiment extends React.Component {

  constructor(props) {
    super(props);

    const population = [
      '2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00',
      'caa3439b66b98710b7a6cafdc6a53f8a2c82e54d603b2167b38369aafb489e0',
      '7e76a9c8ca7542bb3b2887affff240c8fd005e62eff99b61b090fff000009a00',
    ];

    this.state = {
      genome: '2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00', // '0'.repeat(GENOME_LENGTH),
      foundation: sample(population),
      inspiration: sample(population),
      population,
    };

    // if (typeof document.web3 !== 'undefined') {
    //   this.web3 = new Web3(document.web3.currentProvider);
    // } else {
    //   const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    //   this.web3 = new Web3(provider);
    // }
  }

  onSliderChanged(index, value) {
    const { genome } = this.state;

    const genes = stringToGenes(genome);
    genes[index] = value;
    this.setState({
      genome: genesToString(genes),
    });
  }

  onChangeFoundation() {
    this.setState({
      foundation: sample(this.state.population),
    });
  }

  onChangeInspiration() {
    this.setState({
      inspiration: sample(this.state.population),
    });
  }

  crossBreed(foundation, inspiration) {
    const genes = new Uint8Array(GENOME_LENGTH);
    for (let i = 0; i < GENOME_LENGTH; i += 1) {
      const rand = Math.random();
      if (rand < 0.9) {
        genes[i] = rand < 0.7 ? foundation[i] : inspiration[i];
      } else {
        genes[i] = Math.random() * 256;
      }
    }
    return genes;
  }

  paintNewTulip() {
    const { foundation, inspiration, population } = this.state;

    const fgenes = stringToGenes(foundation);
    const igenes = stringToGenes(inspiration);
    const genes = genesToString(this.crossBreed(fgenes, igenes));
    population.push(genes);
    this.setState({
      genome: genes,
    });
  }

  claimTulip() {
    // const { ethereum } = this.props;
    // ethereum
  }

  render() {
    const { genome, foundation, inspiration } = this.state;
    const { ethereum } = this.props;

    return (
      <div>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={5} onClick={() => this.onChangeFoundation()}>
                <Title>Foundation</Title>
                <Tulip genome={foundation} width={200} />
              </Col>
              <Col md={2}>
                <Plus className="fui-plus" />
              </Col>
              <Col md={5} onClick={() => this.onChangeInspiration()}>
                <Title className="text-right">Inspiration</Title>
                <Tulip genome={inspiration} width={200} className="float-right" />
              </Col>
              <Col md={12}>
                <PaintButton className="btn btn-block btn-lg btn-inverse mt-3" onClick={() => this.paintNewTulip()}>
                  <span className="fui-triangle-down mr-5" />
                  Paint New Tulip
                  <span className="fui-triangle-down ml-5" />
                </PaintButton>
              </Col>
              <Col md={12}>
                <br />
                <Tulip genome={genome} width={562} />
              </Col>
              <Col md={12}>
                {ethereum && ethereum.connected ?
                  (<button className="btn btn-block btn-lg btn-inverse mt-3" onClick={() => this.claimTulip()}>
                    Claim this tulip
                  </button>) : (
                    <div>
                      Please connect to MetaMask to claim this tulip.
                    </div>
                )}
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
  ethereum: PropTypes.object.isRequired,
};

export default withEthereum()(Experiment);
