/**
 *
 * TulipPage
 *
 */

import React, { useState, useEffect } from 'react';
import { omit, assign } from 'lodash';
import Tulip from '../components/Tulip';
import styled from '@emotion/styled';
import Navigation from '../components/Navigation';
import { GAS_PRICE } from '../components/constants';
import { useInjectConnect, useInfuraConnect, useInactiveListener } from '../hooks';
import { useWeb3React } from '@web3-react/core';
import { map } from 'lodash';
import {Grid, Button, Typography, Select, MenuItem, TextField} from '@mui/material';
import { CONTRACT_ADDRESS } from '../constants';
import { ethers } from 'ethers';
import { ABI } from '../abi';
import { injected } from '../connectors'
import { alertError } from '../util';


const TulipFrame = styled('div')`
  width: 300px;
  margin: 16px 0px;
`;

const Content = styled('div')`
  margin: 32px;
`;


export default function Commission() {
  useInfuraConnect();
  useInjectConnect();
  useInactiveListener();

  const { active, library, account, activate } = useWeb3React()  
  const [foundation, setFoundation] = useState();
  const [inspiration, setInspiration] = useState();
  const [tulipArtist, setTulipArtist] = useState();
  const [tulipIDs, setTulipIDs] = useState([]);
  const [numTulips, setNumTulips] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }
    setTulipArtist(new ethers.Contract(CONTRACT_ADDRESS, ABI, library));
  }, [active, library]);

  useEffect(() => {
    if (!tulipArtist) {
      return;
    }

    tulipArtist.totalTokens().then((res) => {
      const num = res.toNumber();
      setNumTulips(num);
    }).catch();

    if (!account) {
      return;
    }

    tulipArtist.getAllTokens(account).then((res) =>{
      const tulipIDs = map(res, (t) => t.toNumber());
      setTulipIDs(tulipIDs);
      if (tulipIDs.length > 0) {
        handleFoundation({target: {value: tulipIDs[0]}})
      }
    });
  }, [tulipArtist, account])


  function handleFoundation(e) {
    const id = e.target.value;
    tulipArtist.getTulip(id).then((res) => {
        setFoundation(assign({}, omit(res, '0', '1', '2', '3', '4'), { id }));
      }).catch(() => alert('Tulip not found'));
  }

  function handleInspiration(e) {
    const id = e.target.value;
    const intID = parseInt(id, 10);
    if (!id || intID < 1 || intID >= numTulips) {
      return;
    }
    tulipArtist.getTulip(id).then((res) => {
        setInspiration(assign({}, omit(res, '0', '1', '2', '3', '4'), { id }));
      }).catch();
  }

  function handleCommission() {
    if (!foundation.genome || !inspiration.genome) {
      return;
    }

    const signer = tulipArtist.connect(library.getSigner())
    signer.commissionArt(foundation.id, inspiration.id, {
        gasLimit: 216000,
        gasPrice: GAS_PRICE,
        value: ethers.utils.parseEther('0.001'),
        from: account,
      });
  }

  function onConnect() {
    activate(injected, alertError, true).catch((reason) => alertError(reason));
  }


  return (
    <div>
      <Navigation />
      <Content>
        <Grid>
          <h2>Commission</h2>
          Ask the CryptoTulip contract to paint a new tulip for you.
          <Grid container>
            <Grid item md={6}>
              <h3>Foundation</h3>
              <p>Select one of your tulips as the foundation.</p>
              <p>Your new tulip will take most of its traits from
              this parent.</p>
              {tulipIDs.length ? (
                <Select
                  value={foundation ? foundation.id : tulipIDs[0]}
                  onChange={handleFoundation}
                >
                  {tulipIDs.map((id) => (
                    <MenuItem key={id} value={id}>{id}</MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography color="warning.main">You must own a tulip to commission a new one</Typography>
              )}
              {foundation && foundation.genome &&
                <TulipFrame>
                  <Tulip genome={foundation.genome} width={300} />
                  #
                  {foundation.id}
                </TulipFrame>
              }
            </Grid>
            <Grid item md={6}>
              <h3>Inspiration</h3>
              <p><a href ="/browse">Browse</a> and select any tulip as inspiration. </p><p>It will give the remaining traits to your new tulip.</p>
              <TextField
                onChange={handleInspiration}
                placeholder="Type tulip id here"
              />

              {inspiration && inspiration.genome &&
                <TulipFrame>
                  <Tulip genome={inspiration.genome} width={300} />
                  #
                  {inspiration.id}
                </TulipFrame>
              }
            </Grid>

            <br/>
            <br/>
            <br/>
            {!account ? (
              <div>
                <Typography color="warning.main">
                  Connect MetaMask to commission a tulip
                </Typography>
                <Button variant="outlined" onClick={()=> onConnect()}>Connect</Button>
              </div>
            ) : (

              <Button variant="contained" disabled={!foundation || !inspiration} onClick={() => handleCommission()}>
                Commission a tulip
              </Button>

            )}
          </Grid>
        </Grid>
      </Content>

    </div>
  );
}
