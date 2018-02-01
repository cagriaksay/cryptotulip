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
/* eslint-disable no-irregular-whitespace */

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

const RedNote = styled.div`
  color: red;
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
                  <li>🌷 <b>Tulips</b> are
                    minimalist digital abstract paintings.
                  </li>
                  <li>🎟️️ They are collectable and genetically breedable ERC721 tokens.</li>
                  <li>🎨 CryptoTulip is a smart contract that paints <b>tulips</b> on the blockchain. </li>
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
                  Creative process
                </Header>
                <List>
                  <li><Num>1</Num>
                    During the first month only, you can create a new tulip of your design; by using the
                    sample painting process and gene controls above.
                  </li>
                  <li><Num>2</Num>
                    You can also commission a tulip from the CryptoTulip contract. The contract will mix the traits of
                    the tulips you provide and create a brand new and unique tulip.
                  </li>
                  <li><Num>3</Num>
                    Visit your collection. Title your paintings. Funny titles preffered.
                  </li>
                  <li><Num>4</Num>
                    Gift a tulip to another and introduce them to the world of CryptoTulip.
                  </li>
                </List>
              </Row>
              <Vert />
              <Vert />

              <Row>
                <Vert />
                <Header>
                  Questions & Answers
                </Header>
                <List>
                  <Faq>
                    <a name="FAQ"> </a>
                    <li><b>What do I need to start?</b><br />
                    You need to install Metamask <a href="https://metamask.io/" target="_blank">
                    https://metamask.io/</a>,
                    create a wallet and add funds if necessary.
                    <RedNote>
                      Make sure you are on the main Ethereum network.
                    </RedNote>
                    </li>
                    <li><b>How long should I wait after sending a transaction?</b><br />
                    Transactions can take as little as 15 seconds to several minutes depending
                    on the network status.
                    </li>
                    <li><b>Why don&apos;t these tulips look anything like tulips?</b><br />
                    CryptoTulip is a minimalist deconstructionist. Its work will be abstract and unique.</li>
                    <li><b>Why is this &ldquo;art&rdquo; ugly?</b><br />
                    CryptoTulip can make a great number of unique paintings. I&apos;m optimistic one or
                    two will look great!</li>
                    <li><b>How do I own a tulip artwork?</b><br />
                    Tulips are ERC721 tokens. Your ownership is recorded on the main Ethereum network.
                    All the information about your tulip is stored on the blockchain. This site doesn&apos;t
                    have a database!</li>
                    <li><b>What do you mean &ldquo;no database&rdquo;?</b><br />
                    Tulips consist of
                    a foundation tulip reference,
                    an inspiration tulip reference,
                    a block number representing when they were painted,
                    and a 256-byte array representing their shapes & colors.
                    All of this data is stored on the main Ethereum network.
                    <br /><br />
                    This site is a simple frontend application, and the only backend is the main Ethereum
                    network, accessed through your Metamask wallet.
                    <br /><br />
                    All CryptoTulip code, including the smart contracts and this site, is available
                    at <a href="https://github.com/cagriaksay/cryptotulip" target="_blank">
                    https://github.com/cagriaksay/cryptotulip</a> with an MIT License.
                    </li>
                    <li><b>How do I acquire a tulip?</b><br />
                    During the first month, you can design a tulip and claim it for yourself.
                    After that, all new tulips must be painted by CryptoTulip via commissions.
                    </li>
                    <li><b>Are the tulip traits combined randomly?</b><br />
                    No. The traits of the offspring depend on the foundation, inspiration and the
                    previous blockhashes.
                    Therefore, it&apos;s possible to predict how a painting will look given the
                    block it will be painted. This is perfectly fine.
                    </li>
                    <li><b>How much does it cost?</b><br />
                    Artist&apos;s commission is 1 finney right now (one thousanth of ETH). Other
                    operations cost only gas.&nbsp;
                    <b>Please keep in mind that this is for fun and tulips are worthless.</b>
                    </li>
                    <li><b>Can we undo anything?</b><br />
                    Unfortunately no! It&apos;s important to note that all interactions with
                    CryptoTulip are final.
                    There&apos;s no way to roll back your actions. Please be careful.
                    </li>
                    <li><b>Who built this and why?</b><br />
                    I&apos;m <a href="https://twitter.com/cagriaksay" target="_blank">@cagriaksay</a>.
                    CryptoTulip is a side project I started just to learn about developing smart contracts.
                    It was a lot of fun to build and I wanted to share it as a sample project for anyone interested.
                    I ended up deploying it on the network and&nbsp;
                    <a href="https://github.com/cagriaksay/cryptotulip" target="_blank">
                    open sourcing
                    </a> the project.

                    </li>
                  </Faq>
                </List>

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
