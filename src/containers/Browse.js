/**
 *
 * Browse
 *
 */

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { map, omit, sortBy, assign } from 'lodash';
import Navigation from '../components/Navigation';
import Tulip from '../components/Tulip';
import { useWeb3React } from '@web3-react/core';
import { useInfuraConnect } from '../hooks';
import {Grid, Button, CircularProgress} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CONTRACT_ADDRESS } from '../constants';
import { ethers } from 'ethers';
import { ABI } from '../abi';

const Header = styled('h1')`
  margin-top: 20px;
  margin-bottom: 0px;
  font-family: 'Lora';
  font-size: 25px;
  width: 100%;
`;

const Arrows = styled('span')`
  width: 100%;
  margin-top: 20px;
`;

const TulipBox = styled('div')`
  display: inline-block;
  margin: 10px;
`;

const CollectionFrame = styled('div')`
  margin-top: 20px;
  text-align: center;
`;

const Content = styled('div')`
  margin: 32px;
`;

const PAGE_SIZE = 20;

export default function Browse({startPage}) {
  
  useInfuraConnect();

  const { account, active, library } = useWeb3React()  
  const [tulips, setTulips] = useState([]);
  const [numTulips, setNumTulips] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(startPage);
  const [tulipArtist, setTulipArtist] = useState();

  useEffect(() => {
    if (!active) {
      return;
    }
    setTulipArtist(new ethers.Contract(CONTRACT_ADDRESS, ABI, library))
  }, [library, active]);

  useEffect(()=>{
    if (!tulipArtist) {
      return;
    }
    tulipArtist.totalTokens().then((res) => {
      const num = res.toNumber();
      setNumTulips(num);
    }).catch(() => setLoading(false));;
    return;
  }, [tulipArtist]);
  
  useEffect(() => {
    if(numTulips === 0) {
      return;
    }
    var tulips = {};
    const pageStart = ((page || 0) * PAGE_SIZE) + 1;
    var pageEnd = Math.min(numTulips, pageStart + PAGE_SIZE);
    if (pageEnd < pageStart) {
      setLoading(false);
      return;
    }
    if (pageEnd > numTulips) {
      pageEnd = numTulips;
    }

    const tokens = Array.from(Array(pageEnd - pageStart).keys()).map((i) => ((page || 0) * PAGE_SIZE) + 1 + i);
    let tokensToGet = tokens.length;
    map(tokens, (t) => {
      tulipArtist.getTulip(t).then(
        (res) => {
          tulips[t] = assign({}, { id: t }, omit(res, '0', '1', '2', '3', '4'));
          tokensToGet -= 1;
          if (tokensToGet === 0) {
            setTulips(tulips);
            setLoading(false);
          }
      }).catch(() => setLoading(false));
    });
  }, [tulipArtist, numTulips, page]);

  function onPageUp() {
    setPage(page+1);
    setLoading(true);
  }

  function onPageDown() {
    setPage(page-1);
    setLoading(true);
  }

  return (
    <div>
      <Navigation account={account} />
      <Content>
        {!active || loading ? (
            <div>
              <h2>Loading Tulips</h2>
              <CircularProgress />
            </div>
          ) : ((!tulips || tulips.length === 0) && active ? (
            <h2>
              No tulips here
            </h2>
          ) : (
            <Grid>  
              <Grid item md={12}>
                <Grid>
                  <Header>
                    Tulips {1 + (page * PAGE_SIZE)} to {Math.min((page + 1) * PAGE_SIZE, numTulips-1)}
                    <Arrows>
                      {page > 0 &&
                        <Button onClick={()=> onPageDown()}><KeyboardArrowLeftIcon /></Button>
                      }
                      {numTulips > (page+1) * PAGE_SIZE && (
                        <Button onClick={()=> onPageUp()}><KeyboardArrowRightIcon /></Button>
                      )}
                    </Arrows>
                  </Header>

                  <CollectionFrame>
                    {map(sortBy(tulips, (t) => parseInt(t.id, 10)), (t, i) => (
                      t.genome &&
                        <TulipBox key={i}>
                          <a href={`/tulip/${t.id}`} >
                            <Tulip genome={t.genome} width={250} />
                            <span>{t.id}</span>
                          </a>
                        </TulipBox>
                    ))}
                  </CollectionFrame>
                </Grid>
              </Grid>
            </Grid>
          )
        )}
      </Content>
    </div>
  );
}



