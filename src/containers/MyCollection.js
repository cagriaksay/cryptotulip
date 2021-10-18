/* eslint-disable no-loop-func */
/**
 *
 * MyCollection
 *
 */

import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Grid, Button, Typography} from '@mui/material';

import Collection from '../components/Collection';
import { omit, assign } from 'lodash';
import Navigation from '../components/Navigation';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEagerConnect, useInfuraConnect, useInactiveListener } from '../hooks';
import { injected } from '../connectors'
import { alertError } from '../util';
import { ABI } from '../abi';
import { CONTRACT_ADDRESS } from '../constants';



const Header = styled('h1')`
  margin-top: 20px;
  margin-bottom: 0px;
  font-size: 25px;
  width: 100%;
`;

const Content = styled('div')`
  margin: 32px;
`;

export default function MyCollection(params) { 
  useInfuraConnect();
  const tried = useEagerConnect();
  useInactiveListener(!tried)

  const [username, setUsername] = useState();
  const [tulips, setTulips] = useState([]);
  const [tulipArtist, setTulipArtist] = useState();

  const { library, account, active, activate } = useWeb3React()
  var id = params.account;
  if (!ethers.utils.isAddress(id)) {
    id = account;
  }

  useEffect(() => {
    if (!active || !!tulipArtist) {
      return;
    }
    setTulipArtist(new ethers.Contract(CONTRACT_ADDRESS, ABI, library));
  }, [active, library]);  

  useEffect(() => {
    if (!tulipArtist || !id) {
      return;
    }

    window.history.pushState(null, `CryptoTulip — Collection ${id}`, `/collection/${id}`);

    tulipArtist.usernames(id).then((res) => {
      setUsername(res);
    });

    tulipArtist.balanceOf(id).then((res) =>{
      const numTulips = res.toNumber();
      var loaded = []
      for (var i=0; i< numTulips; i++) {
        tulipArtist.tokenOfOwnerByIndex(id, i).then(res => {
          tulipArtist.getTulip(res.toNumber()).then((res2) => {
            loaded = loaded.concat(assign({}, { id: ""+res.toNumber() }, omit(res2, '0', '1', '2', '3', '4')));
            loaded.sort((a,b) => {return parseInt(a.id) - parseInt(b.id)});
            setTulips(loaded);
          });
        });
      }      
    });

  }, [tulipArtist, id]);
  
  function onConnect() {
    activate(injected, alertError, true).catch((reason) => alertError(reason));
  }
  
  function handleCollectionName() {
    if (id !== account) {
      return;
    }
    const username = prompt("Title your collection: ");
    
    if (username) {
      const signer = tulipArtist.connect(library.getSigner())
      signer.setUsername(username, {
          gasLimit: 158267,
          from: account,
      });
      setUsername(username);
    }
  }

  return (
    <div>
      <Navigation />
      <Content>
        <Grid>
          {!id ? (
            <div>
              <Typography color="warning.main">
                Connect MetaMask to see your collection
              </Typography>
              <Button variant="outlined" onClick={()=> onConnect()}>Connect</Button>
            </div>
          ) : (
            <Grid>
              <Grid item md={12}>
                <Grid>
                  <Header onClick={handleCollectionName}>
                    {username || id|| ""} Collection
                  </Header>
                  <Collection tulips={tulips} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Content>
    </div>
  );
}

