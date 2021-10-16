/**
*
* Collection
*
*/

import React from 'react';
import styled from '@emotion/styled';
import { map, sortBy } from 'underscore';
import Tulip from './Tulip';
import { Typography } from '@mui/material';

const TulipBox = styled('div')`
  display: inline-block;
  margin: 10px;
`;

const CollectionFrame = styled('div')`
  margin-top: 20px;
  text-align: center;
`;

export default function Collection({tulips}) {

  return (
    <CollectionFrame>
      {map(sortBy(tulips, (t) => -parseInt(t.id, 10)), (t, i) => (
        <TulipBox key={i}>
          <a href={`/tulip/${t.id}`} >
            <Tulip genome={t.genome} width={250} />
            <span>#{t.id}</span>
          </a>
        </TulipBox>
      ))}
      {(!tulips || tulips.length === 0) &&
        <Typography color="warning.main">
          no tulips here
        </Typography>
      }
    </CollectionFrame>
  );
}

