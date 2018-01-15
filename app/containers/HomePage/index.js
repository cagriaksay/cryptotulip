import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-bootstrap';

import Logo from 'components/Logo';
import Experiment from 'components/Experiment';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withTulipArtist } from 'components/WithTulipArtist';
import Navigation from 'components/Navigation';

/* eslint-disable jsx-a11y/accessible-emoji */

const Header = styled.h1`
  margin-top: 20px;
  margin-bottom: 0px;
  font-family: 'Lora';
  font-size: 38px;
  width: 100%;
`;

const List = styled.ul`
  font-size: 18px;
`;

const Vert = styled.div`
  height: 50px;
  width: 1px;
`;

const Num = styled.span`
  font-size: 30px;
  font-weight: 600;
  line-height: 40px;
  padding-right: 15px;
`;

const Faq = styled.div`
  font-size: 16px;
`;

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { ethereum, ethereum: { account } } = this.props;

    return (
      <div>
        <Navigation account={account} />
        <Grid>
          <Helmet>
            <title>CryptoTulip</title>
            <meta name="description" content="digital art on the blockchain." />
          </Helmet>

          <Row>
            <Col md={3}>
              <Logo />
              <Row>
                <Vert />
                <Header>
                CryptoTulip &mdash; digital art on the blockchain.
                </Header>
                <List>
                  <li>🎨 CryptoTulip is a smart contract that paints minimalist abstracts called <b>tulips</b>. </li>
                  <li>🌷 <b>Tulips</b> are collectable and genetically breedable.</li>
                </List>
              </Row>
            </Col>
            <Col md={1} />
            <Col md={8}>
              <Row>
                <Header>
                  First month only: claim generation zero tulips
                </Header>
                For a limited time, you can claim up to 10 tulips of your own design.
                <br />
                <br />
                <Experiment ethereum={ethereum} />
              </Row>

              <Vert />

              <Row>
                <Header>
                  Creative process:
                </Header>
                <List>
                  <li><Num>1</Num> Commission a tulip from the CryptoTulip contract.</li>
                  <li><Num>2</Num> Provide one of your own as foundation, another tulip for inspiration. </li>
                  <li><Num>3</Num> CryptoTulip will combine their genes and reveal your unique tulip.</li>
                </List>
              </Row>
              <Vert />
              <Vert />
              <Vert />
              <Vert />

              <Row>
                <Vert />
                <Header>
                  FAQ
                </Header>
                <List>
                  <Faq>
                    <li><b>How do I start?</b><br />
                      <il>
                        <li>1- Install Metamask <a href="https://metamask.io/" target="_black">https://metamask.io/</a> and create a wallet.</li>
                        <li>2- Switch to Rinkeby network [IMPORTANT]</li>
                        <li>3- Visit <a href="https://faucet.rinkeby.io/" target="_blank">https://faucet.rinkeby.io/</a> and follow instructions on the page to get some test money for your account: publicly post your address on one of the social networks (e.g. google+) and copy the post link here.</li>
                        <li>4- Check your Metamask wallet. If you see a balance, you are ready to play.</li>
                        <li>5- Please note that your every action will take affect after your transaction is approved (usually 15 seconds to a minute). Sometimes you need to refresh the page a few times.</li>
                        <li>6- Send me your feedback! This is an early alpha and nothing is polished. Imagine the UX was smoother.</li>
                      </il>
                    </li>
                    <li><b>Why don&apos;t these tulips look anything like tulips?</b><br />
                    CryptoTulip is a minimalist deconstructionist. Its work will be abstract and unique.</li>
                    <li><b>Why is this  &ldquo;art&rdquo;  ugly?</b><br />
                    CryptoTulip can make a great number of unique paintings. We&apos;re optimistic one or two will look great!</li>
                    <li><b>How do I own a tulip artwork?</b><br />
                    Tulips are ERC721 tokens. Your ownership is recorded on Ethereum.
                    All the information about your tulip is stored on the blockchain.</li>
                    <li><b>How do I buy a tulip?</b><br />
                    During the first month, you can design a tulip and claim it for yourself.
                    After that, all new tulips must be painted by CryptoTulip.
                    </li>
                    <li><b>How much does it cost?</b><br />
                    Artist&apos;s commission is 1 finney right now (one thousanth of ETH). Other operations cost only gas.&nbsp;
                    <b>Please keep in mind that this is for fun and tulips are worthless.</b>
                    </li>
                    <li><b>Can we undo anything at all?</b><br />
                    Unfortunately no! It&apos;s important to note that all interactions with CryptoTulip are final.
                    There&apos;s no way to roll back your actions. Please be careful.
                    </li>
                  </Faq>
                </List>

                <Vert />
                <Vert />
                <Vert />

              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  ethereum: PropTypes.object.isRequired,
};

export default withTulipArtist()(HomePage);
