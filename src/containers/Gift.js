/**
 *
 * TulipPage
 *
 */

import React, { useState, useEffect } from 'react';
import { omit, assign, map } from 'lodash';
import Tulip from '../components/Tulip';
import Navigation from '../components/Navigation';
import { GAS_PRICE } from '../components/constants';
import styled from '@emotion/styled';
import { useInjectConnect, useInfuraConnect, useInactiveListener } from '../hooks';
import { useWeb3React } from '@web3-react/core';
import {Grid, Button, Typography, Select, MenuItem, TextField} from '@mui/material';
import { CONTRACT_ADDRESS } from '../constants';
import { ethers } from 'ethers';
import { ABI } from '../abi';
import { injected } from '../connectors'
import { alertError } from '../util';


const Content = styled('div')`
  margin: 32px;
`;

const TulipFrame = styled('div')`
  width: 300px;
  margin: 16px 0px;
`;

const AddressFrame = styled('div')`
  width: 430px;
  margin: 16px 0px;
`;

export default function Gift() {
    useInfuraConnect();
    useInjectConnect();
    useInactiveListener();
  
    const { active, library, account, activate } = useWeb3React()  
    const [foundation, setFoundation] = useState();
    const [tulipArtist, setTulipArtist] = useState();
    const [destinationAccount, setDestinationAccount] = useState();
    const [tulipIDs, setTulipIDs] = useState([]);
  
  
    useEffect(() => {
      if (!active) {
        return;
      }
      setTulipArtist(new ethers.Contract(CONTRACT_ADDRESS, ABI, library));
    }, [active, library]);
  
    useEffect(() => {
      if (!tulipArtist || !account) {
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
  
    function handleGift() {
      if (!foundation.genome || !destinationAccount) {
        return;
      }
  
      const signer = tulipArtist.connect(library.getSigner())
      signer.transfer(destinationAccount, foundation.id, {
          gasLimit: 125000,
          gasPrice: GAS_PRICE,
          from: account,
        });
    }
  
    function onConnect() {
      activate(injected, alertError, true).catch((reason) => alertError(reason));
    }
  
    return (
      <div>
        <Navigation account={account} />
        <Content>
        <Grid>
          <h2>Gift</h2>
          You can gift a Tulip to another address.
           

          <h3>Destination ETH Address</h3>
          <AddressFrame>
            <TextField value={destinationAccount} onChange={(e) => setDestinationAccount(e.target.value)} placeholder="paste their address here" fullWidth/>
          </AddressFrame>

          <h3>Tulip</h3>
            <p>Select one of your tulips to gift.</p>
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
              <Typography color="warning.main">You must own a tulip to gift one</Typography>
            )}
            {foundation && foundation.genome &&
              <TulipFrame>
                <Tulip genome={foundation.genome} width={300} />
                #
                {foundation.id}
              </TulipFrame>
            }
            <br/>
            {!account ? (
              <div>
                <Typography color="warning.main">
                  Connect MetaMask to commission a tulip
                </Typography>
                <Button variant="outlined" onClick={()=> onConnect()}>Connect</Button>
              </div>
            ) : (

              <Button variant="contained" disabled={!foundation} onClick={() => handleGift()}>
                Gift
              </Button>
            )}
        </Grid>
        </Content>
      </div>
    );
  }

