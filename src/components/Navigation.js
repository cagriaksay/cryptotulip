/**
*
* Navigation
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid} from '@mui/material';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';

const Logotype = styled('a')`
  margin:8px;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

export default function Navigation() { 

  const { account  } = useWeb3React()

  return (
    <Grid>
      <Logotype href="/">CryptoTulip</Logotype>
      <Button className="inline" href={`/collection/${account}`}>My Collection</Button>
      <Button className="inline" href="/browse">Browse</Button>
      <Button className="inline" href="/commission">Commission</Button>
      <Button className="inline" href="/gift">Gift</Button>
      {account}
    </Grid>
  );
}

Navigation.propTypes = {
  account: PropTypes.string,
  blockNumber: PropTypes.string,
};

