import React from 'react';
import styled from '@emotion/styled';
import {Grid, Typography} from '@mui/material'


import MovingLogo from '../components/MovingLogo';
import Experiment from '../components/Experiment';
import Navigation from '../components/Navigation';

const Header = styled('h1')`
  margin-top: 20px;
  margin-bottom: 0px;
  font-size: 38px;
  width: 100%;
`;

const List = styled('ul')`
  font-size: 18px;
  Line-height: 36px;
`;

const Li = styled('li')`
  List-style: none;
`;

const Question = styled('h3')`
  margin-bottom: 0px;
`;


const Box = styled('div')`
  max-width: 600px;
  padding: 0px 32px;
`;

const Num = styled('span')`
  font-size: 30px;
  font-weight: 600;
  Line-height: 40px;
  padding-right: 15px;
`;

const Faq = styled('div')`
  font-size: 16px;
`;

const RedNote = styled('div')`
  Gridor: red;
`;

export default function HomePage() {
  return (
    <div>
      <Navigation />
      <Grid container>
        <Grid container spacing={0}>
          <Grid item md={3}>
            <MovingLogo />
          </Grid>
          <Grid item md={9}>
            <Box>
              <Header>
                CryptoTulip &mdash; digital art on the blockchain.
              </Header>
              <List>
                <Li>🌷 Tulips are digital abstract paintings.</Li>
                <Li>🎟️️ They are also genetically breedable ERC721 tokens.</Li>
                <Li>🎨 CryptoTulip smart contract paints tulips on the blockchain. </Li>
              </List>
            </Box>
            <Box>
              <Header>
                How it works
              </Header>
              <List>
                <Li><Num>1</Num>
                  If you <a href="./commission">commission</a> a painting, 
                  the CryptoTulip contract will mix the traits of
                  two tulips you provide and create a brand new and unique tulip.
                </Li>
                <Li><Num>2</Num>
                  For the first hundred tulips, you can tell the contract the exact painting you'd like to create.
                </Li>
                <Li><Num>3</Num>
                  Visit your <a href="./collection/">collection</a>. Title your paintings. Funny titles preffered.
                </Li>
                <Li><Num>4</Num>
                <a href="./gift">Gift</a> a tulip and introduce a friend to the world of CryptoTulip.
                </Li>
              </List>


              <br />
              <Experiment />
            </Box>

            <Box>
            <Header>
                Questions & Answers
              </Header>
              <List>
                <Faq>
                  <a name="FAQ" href="."> </a>
                  <Li><Question>What do I need to start?</Question>
                  You need to install Metamask <a href="https://metamask.io/" target="_blank"  rel="noreferrer">
                  https://metamask.io/</a>,
                  create a wallet and add funds if necessary. Make sure you are on the main Ethereum network.
                  </Li>
                  <Li><Question>How long should I wait after sending a transaction?</Question>
                  Transactions can take as little as 15 seconds to several minutes depending
                  on the network status.
                  </Li>
                  <Li><Question>Why don&apos;t these tulips look anything like tulips?</Question>
                  CryptoTulip is a minimalist deconstructionist. Its work will be abstract and unique.</Li>
                  <Li><Question>How do I own a tulip artwork?</Question>
                  Tulips are ERC721 tokens. Your ownership is recorded on the main Ethereum network.
                  All the information about your tulip is stored on the blockchain. This site doesn&apos;t
                  have a database!</Li>
                  <Li><Question>What do you mean by &ldquo;no database&rdquo;?</Question>
                  <p>Tulips consist of
                  a foundation tulip reference,
                  an inspiration tulip reference,
                  a block number representing when they were painted,
                  and a 256-byte array representing their shapes & colors.
                  All of this data is stored on the main Ethereum network.
                  </p>
                  <p>
                  This site is a simple frontend application, and the only backend is the main Ethereum
                  network, accessed through your Metamask wallet.
                  </p>
                  <p>
                  All CryptoTulip code, including the smart contracts and this site, is available
                  at <a href="https://github.com/cagriaksay/cryptotulip" target="_blank"  rel="noreferrer">
                  https://github.com/cagriaksay/cryptotulip</a> with an MIT License.
                  </p>
                  </Li>
                  <Li><Question>How do I acquire a tulip?</Question>
                  For the first hundred tulips, you can design a tulip and claim it for yourself.
                  After that, all new tulips must be painted by CryptoTulip via commissions.
                  </Li>
                  <Li><Question>Are tulip traits combined randomly?</Question>
                  No. The traits of the offspring depend on the foundation, inspiration and the
                  previous blockhashes.
                  It&apos;s possible to predict how a painting will look given the
                  block it will be painted. This is perfectly fine.
                  </Li>
                  <Li><Question>How much does it cost?</Question>
                  Artist&apos;s commission is 1 finney right now (one thousanth of ETH). 
                  After a thousand paintings, artist&apos;s fees  will increase to 1 ETH. 
                  Other operations cost only gas.&nbsp;
                  </Li>
                  <Li><Question>Can we undo anything?</Question>
                  Unfortunately no! It&apos;s important to note that all interactions with
                  CryptoTulip are final.
                  There&apos;s no way to roll back your actions. Please be careful.
                  </Li>
                  <Li><Question>Who built this and why?</Question>
                  I&apos;m <a href="https://twitter.com/cagriaksay" target="_blank"  rel="noreferrer">@cagriaksay</a>.
                  CryptoTulip is a side project I started just to learn about developing smart contracts.
                  It was a lot of fun to build and I wanted to share it as a sample project for anyone interested.
                  I ended up deploying it on the network and&nbsp;
                  <a href="https://github.com/cagriaksay/cryptotulip" target="_blank"  rel="noreferrer">
                  open sourcing
                  </a> the project February 2018. I updated the contract to be ERC721 compliant and released in October 2021. 
                  <br/>
                  <br/>
                  <br/>

                  </Li>
                </Faq>
              </List>

            </Box>

          </Grid>
  
         </Grid>
      </Grid>
    </div>
  );
}
