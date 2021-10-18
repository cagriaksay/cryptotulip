/**
*
* Logo
*
*/

import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Tulip, { stringToGenes, genesToString } from './Tulip';
import { crossBreed } from '../util';

const Pipe = styled('h3')`
  font-family: cursive;
  text-align: center;
  font-size: 14px;
  margin-top: 0px;
  color: #95A5A6;
`;

const Frame = styled('div')`
  background: white;
  margin-top: 24px;
  padding-top: 32px;
  padding-left: 32px;
  text-align: center;
  margin: 8px;
`;

export default function MovingLogo() {

  const [genome, setGenome] = useState('9bc1c620875ccab2998390abff32b8829f54c5a69b0759938449ddfd25faffba');

  useEffect(() => {
      let timerFunc = setTimeout(() => {
        const fgenes = stringToGenes(genome);
        const genes = genesToString(crossBreed(fgenes, fgenes));
        setGenome(genes);
      }, 333);
      return () => clearTimeout(timerFunc);
  });

  return (
    <div>
      <Frame>
        <Tulip genome={genome} width={200} />
        <Pipe>
          ceci n&apos;est pas une tulipe
        </Pipe>
      </Frame>
    </div>
  );

}
