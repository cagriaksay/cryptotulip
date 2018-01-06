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

const ExperimentFrame = styled.div`
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
      account: null,
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

  // componentWillReceiveProps(nextProps) {
  //   const { ethereum } = nextProps;
  //   const { account } = this.state;
  //   const newAccount = ethereum.accounts.value[0];

  //   if (newAccount !== account) {
  //     const web3 = ethereum.connection.web3;

  //     // eslint-disable-next-line
  //     this.tulipArtist = new web3.eth.Contract(ABI,
  //       '0xecfcab0a285d3380e488a39b4bb21e777f8a4eac', {
  //         from: newAccount,
  //         gasPrice: '25000000000',
  //       });

  //     this.tulips = {};

  //     this.tulipArtist.methods.getAllTokens(newAccount).call(
  //       (err, res) => {
  //         const tokens = res;
  //         let tokensToGet = tokens.length;
  //         map(tokens, (t) => {
  //           this.tulipArtist.methods.getTulip(t).call(
  //             (err2, res2) => {
  //               this.tulips[t] = omit(res2, '0', '1', '2', '3', '4');
  //               tokensToGet -= 1;
  //               if (tokensToGet === 0) {
  //                 this.setState({ tulips: this.tulips });
  //               }
  //             });
  //         });
  //       });

  //     this.setState({ account: newAccount });
  //   }
  // }

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
      if (rand < 0.95) {
        genes[i] = rand < 0.7 ? foundation[i] : inspiration[i];
        if (rand < 0.1) {
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


    const receipt = tulipArtist.methods.originalArtwork(
      `0x${genome}`, account).send({
        value: web3.utils.toWei('10', 'finney'),
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

    //   contract.functionName.sendTransaction(parameter_1,parameter_2,parameter_n,{
    //     from:web3.eth.accounts[0],
    //     gas:4000000},function (error, result){ //get callback from function which is your transaction key
    //         if(!error){
    //             console.log(result);
    //         } else{
    //             console.log(error);
    //         }
    // });
    return receipt;
  }

  render() {
    const { genome, foundation, inspiration, account } = this.state;
    const { ethereum } = this.props;

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
              <Col md={12}>
                <button className="btn btn-block btn-lg btn-inverse mt-3" onClick={() => this.paintNewTulip()}>
                  <span className="fui-triangle-down mr-5" />
                  Paint new tulip
                  <span className="fui-triangle-down ml-5" />
                </button>
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
                { account }
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
