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
import Transactions from 'components/Transactions';
// import { withEthereum } from 'react-ethereum-provider';
// import { withTulipArtist } from '../WithTulipArtist';

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

const Message = styled.div`
  font-size: 18px;
  padding: 20px;
`;

const TinyPrint = styled.div`
  font-size: 10px;
  color: #ECF0F1;
`;

const ExperimentFrame = styled.div`
`;

class Experiment extends React.Component {

  constructor(props) {
    super(props);

    const population = [
      '259461380775dfb1758a95f88ebad9a6ff71f6f490006ec68449ddb61f00e1ba',
      '259a61260073dfb1758a90f8ffbad8a0ff71f6b08c006e958449ddbe1f0001ba',
      'fb0c4438c250f2d8650fb84f8e4ce971cd59a9f46599c2c6d400ddb61d00e1eb',
      'e347b05b2ba209d8ff00b84f8ec8be57cd59ff97116bf8a0504cddbe1f00ffba',
      '2c81ac9600ae9100004970b7c3c8a2ebca6a925f3c003e7f4700bdcfd7ffffba',
      '5d0030aa54b2f08d650f007b233fe9716356a8f76599c7c6cf00ddaf1d00e1eb',
    ];

    this.state = {
      account: null,
      genome: population[0],
      foundation: population[1],
      inspiration: population[2],
      population,
      transactions: [],
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
      if (rand < 0.99) {
        genes[i] = rand < 0.7 ? foundation[i] : inspiration[i];
        if (rand < 0.2) {
          genes[i] += (Math.random() * 16) - 8;
        }
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
    const { account, genome } = this.state;
    const { ethereum: { tulipArtist } } = this.props;
    const web3 = this.props.ethereum.connection.web3;

    tulipArtist.methods.originalArtwork(
      `0x${genome}`, account).send({
        gasLimit: 190000,
        value: web3.utils.toWei('1', 'finney'),
        from: account,
      },
      (err, res) => {
        this.setState({ transactions: this.state.transactions.concat([res]) });
      });
  }

  render() {
    const { genome, foundation, inspiration, transactions } = this.state;
    const { ethereum, ethereum: { block, account } } = this.props;

    return (
      <ExperimentFrame>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={5} onClick={() => this.onChangeFoundation()}>
                <Title>Foundation</Title>
                <Tulip genome={foundation} width={200} className="parent-tulip" />
              </Col>
              <Col md={2}>
                <Plus className="fui-plus" />
              </Col>
              <Col md={5} onClick={() => this.onChangeInspiration()}>
                <Title className="text-right">Inspiration</Title>
                <Tulip genome={inspiration} width={200} className="float-right parent-tulip" />
              </Col>
              <Col md={12} className="text-center">
                <button className="btn btn-primary mt-3" onClick={() => this.paintNewTulip()}>
                  <span className="fui-triangle-down mr-3" />
                  Paint new sample
                  <span className="fui-triangle-down ml-3" />
                </button>
              </Col>
              <Col md={12}>
                <br />
                <Tulip genome={genome} width={562} />
              </Col>
              <Col md={12}>
                <Transactions transactions={transactions}>
                  <Message>
                    Congratulations! Wait for the arrival of your new painting over
                    at <a href={`/collection/${account}`}>your collection</a>.
                  </Message>
                </Transactions>
                {ethereum && ethereum.connected ?
                  (<div>
                    <button className="btn btn-block btn-lg btn-inverse mt-3" onClick={() => this.claimTulip()}>
                      Claim this tulip
                    </button>
                  </div>
                ) : (
                  <div>
                    Please connect to MetaMask to claim this tulip.
                  </div>
                )}
                <TinyPrint>
                  { account } - block #{block}
                </TinyPrint>
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
      </ExperimentFrame>
    );
  }
}

Experiment.propTypes = {
  ethereum: PropTypes.object.isRequired,
};

export default Experiment;
