/**
 *
 * TulipPage
 *
 */

 /* eslint-disable no-script-url */

import React, { useState, useEffect } from 'react';
import { omit, assign } from 'lodash';
import Tulip from '../components/Tulip';
import styled from '@emotion/styled';
import {Grid, CircularProgress} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useInfuraConnect, useInactiveListener, useEagerConnect } from '../hooks';

import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants';
import { ABI } from '../abi';
import Navigation from '../components/Navigation';
import { injected } from '../connectors'
import { alertError } from '../util';


const TulipFrame = styled('div')`
  margin: 50px auto;
  text-align: center;
`;

const Title = styled('div')`
  font-size: 12px;
`;

const Generation = styled('div')`
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

const Content = styled('div')`
  margin: 32px;
`;

const Link = styled('a')`
  text-decoration: none;
  color: black;
`;

export default function TulipPage({id}) {

  const [title, setTitle] = useState('untitled');
  useInfuraConnect();
  const tried = useEagerConnect();
  useInactiveListener(!tried)

  const { library, account, active, activate } = useWeb3React()

  const [loading, setLoading] = useState(true);
  const [tulip, setTulip] = useState();
  const [foundation, setFoundation] = useState();
  const [inspiration, setInspiration] = useState();
  const [tulipArtist, setTulipArtist] = useState();


  useEffect(() => {
    if (!active) {
      return;
    }
    setTulipArtist(new ethers.Contract(CONTRACT_ADDRESS, ABI, library));
  }, [library, active]);

  useEffect(() => {
    if (!tulipArtist) {
      return;
    }

    if (!tulip) {
      tulipArtist.getTulip(id).then((res) => {
        setTulip(assign({}, { id }, omit(res, '0', '1', '2', '3', '4')));
        setLoading(false);
        
        const foundationID = res.foundation.toNumber();
        const inspirationID = res.inspiration.toNumber();

        if (!foundation && foundationID) {
          tulipArtist.getTulip(foundationID).then((res2) => {
            setFoundation(assign({}, { id: foundationID }, omit(res2, '0', '1', '2', '3', '4')));
          }).catch();
        }

        if(!inspiration && inspirationID) {
          tulipArtist.getTulip(inspirationID).then((res2) => {
            setInspiration(assign({}, { id: inspirationID }, omit(res2, '0', '1', '2', '3', '4')));
          }).catch();
        }

        tulipArtist.tokenMetadata(id).then((res2) => {
          setTitle(res2);
        }).catch(() => setLoading(false));
      }).catch(() => setLoading(false));    
    }
          
  }, [tulipArtist]);


  function handleName() {
    activate(injected, alertError, true).catch((reason) => alertError(reason));
    const name = prompt("Title your painting: ");
    
    if (name) {
      const signer = tulipArtist.connect(library.getSigner())
      signer.nameArt(tulip.id, name, {
          gasLimit: 158267,
          from: account,
      });
      setTitle(name);
    }
  }

  return (
    <div>
      <Navigation />
      <Content>
        {(!tulip || loading) ? (
          <div>
            <h2>
              loading tulip from the blockchain...
            </h2>
            <CircularProgress />
          </div>

        ) :  (tulip !== null && !tulip.genome) ? (
          <h2>
            No such tulip
          </h2>
        ) :  (
          <Grid>
            <Grid>
              <TulipFrame>
                <Tulip genome={tulip.genome} width={600} id={''+tulip.id} onReveal={(revealId) => this.handleReveal(revealId)} />
                <div onClick={handleName}>
                  #
                  {id}
                  &nbsp;
                  {title || 'untitled'}
                </div>
              </TulipFrame>
            </Grid>
            <Grid>
              <Generation>
                generation {tulip.generation.toNumber()}
              </Generation>
              {foundation && foundation.genome &&
                <Link href={`/tulip/${foundation.id}`} >
                  <TulipFrame>
                    <Title>foundation</Title>
                    <Tulip genome={foundation.genome} width={200} id={''+foundation.id} />
                    #
                    {foundation.id}
                  </TulipFrame>
                </Link>
              }
              {inspiration && inspiration.genome && (
                <Link href={`/tulip/${inspiration.id}`} >
                  <TulipFrame>
                    <Title>inspiration</Title>
                    <Tulip genome={inspiration.genome} width={200} id={''+inspiration.id} />
                    #
                    {inspiration.id}
                  </TulipFrame>
                </Link>
              )}
            </Grid>
          </Grid>
        )}
      </Content>      
    </div>
  );
}

