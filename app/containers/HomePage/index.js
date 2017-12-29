import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-bootstrap';

import Logo from 'components/Logo';
import Experiment from 'components/Experiment';
import { Helmet } from 'react-helmet';

/* eslint-disable jsx-a11y/accessible-emoji */

const Header = styled.h1`
  margin-top: 20px;
  margin-bottom: 0px;
  font-family: 'Lora';
  font-size: 25px;
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


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Grid>
        <Helmet>
          <title>CryptoTulip</title>
          <meta name="description" content="a digital artist on the blockchain." />
        </Helmet>

        <Row>
          <Col md={3}>
            <Logo />
          </Col>
          <Col md={1} />
          <Col md={8}>
            <Row>
              <Vert />
              <Header>
              TulipArtist &mdash; digital art on the blockchain.
              </Header>
              <List>
                <li>🎨 TulipArtist is a smart contract that paints minimalist abstracts called <b>tulips</b>. </li>
                <li>🌷 <b>Tulips</b> are collectable and genetically breedable.</li>
              </List>
            </Row>

            <Row>
              <Header>
                Creative process:
              </Header>
              <List>
                <li><Num>1</Num> Commission a tulip from the TulipArtist.</li>
                <li><Num>2</Num> Provide one of your own as foundation, another tulip for inspiration. </li>
                <li><Num>3</Num> TulipArtist will combine their genes and reveal your unique tulip.</li>
              </List>
            </Row>

            <Row>
              <Header>
                First month only: claim generation zero tulips
              </Header>
              For a limited time, you can claim a single tulip of your own design.
              <br />
              <br />
              <Experiment />
            </Row>

            <Row>
              <Header>
                FAQ
              </Header>
              <List>
                <Faq>
                  <li><b>Why don&apos;t these tulips look anything like tulips?</b><br />
                  TulipArtist is a minimalist deconstructionist. Its work will be abstract and unique.</li>
                  <li><b>Why is this  &ldquo;art&rdquo;  ugly?</b><br />
                  TulipArtist can make a great number of unique paintings. We&apos;re optimistic one or two will look great!</li>
                  <li><b>How do I own a tulip artwork?</b><br />
                  Tulips are ERC721 tokens. Your ownership is recorded on Ethereum.
                  All the information about your tulip is stored on the blockchain.</li>
                  <li><b>How do I buy a tulip?</b><br />
                  During the first month, you can design a tulip and claim it for yourself.
                  After that, all new tulips must be painted by TulipArtist.
                  You can also buy tulips on the marketplace soon.
                  </li>
                  <li><b>How much does it cost?</b><br />
                  Artist fees are about 10 finneys right now (one hundreth of ETH). Other operations cost only gas.
                  Marketplace fees are 3% of the transaction value. <b>Please keep in mind that this is for fun and tulips
                  are worthless.</b>
                  </li>
                  <li><b>Can we undo anything at all?</b><br />
                  Nope! It&apos;s important to note that all interactions with TulipArtist are final.
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
    );
  }
}
