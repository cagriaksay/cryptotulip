/**
*
* Experiment
*
*/

import React, { useState } from 'react';
import Tulip, { stringToGenes, genesToString } from './Tulip';
import styled from '@emotion/styled';
import { sample } from 'underscore';
import {Grid, Button, Slider} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { crossBreed } from '../util';

const Title = styled('div')`
  font-family: 'Courgette';
`;

const Controls = styled('div')`
  margin: 16px;
  margin-top: 32px;
  min-width: 120px;
`;

const SliderContainer = styled('div')`
  margin-top: 2px;
`;

const Plus = styled('span')`
  line-height: 200px;
  vertical-align: sub;
  padding: 20px;
`;

const ExperimentFrame = styled('div')`
`;

const GeneSlider = styled(Slider)(({ theme }) => ({
  padding: '7px',
}));

const PaintButton = styled(Button)(({ theme }) => ({
  margin: '16px 0px',
}));

const population = [
  '9bc1c620875ccab2998390abff32b8829f54c5a69b0759938449ddfd25faffba',
  '9fbec61b0055cab2788a90d9ff36b882a787c5a27f0059938449ddff25faffba',
  '3dc1c2d08764aab299dca2aba4796c88795496bd9b4793b82f0099b36e52fcba',
  '3dc1c6d08764cab2768a90d9a4796c88795496a27f0193938400ddff2552f7ba',
  '259461380775dfb1758a95f88ebad9a6ff71f6f490006ec68449ddb61f00e1ba',
  'fb0c4438c250f2d8650fb84f8e4ce971cd59a9f46599c2c6d400ddb61d00e1eb',
  'e347b05b2ba209d8ff00b84f8ec8be57cd59ff97116bf8a0504cddbe1f00ffba',
  '259a61260073dfb1758a90f8ffbad8a0ff71f6b08c006e958449ddbe1f0001ba',
  '0x7ea9c8ca0055caf2786cd1d9fd0000c3a200937a5eb5eed1ffffffffffffffff',
  '2c81ac9600ae9100004970b7c3c8a2ebca6a925f3c003e7f4700bdcfd7ffffba',
  '5d0030aa54b2f08d650f007b233fe9716356a8f76599c7c6cf00ddaf1d00e1eb',
];

export default function Experiment() {

  const [genome, setGenome] = useState( population[0]);
  const [foundation, setFoundation] = useState(population[1]);
  const [inspiration, setInspiration] = useState(population[2]);

  function onSliderChanged(index, value) {
    const genes = stringToGenes(genome);
    genes[index] = value;
    setGenome(genesToString(genes));
  }

  function onChangeFoundation() {
    setFoundation(sample(population));
  }

  function onChangeInspiration() {
    setInspiration(sample(population));
  }

  function paintNewTulip() {
    const fgenes = stringToGenes(foundation);
    const igenes = stringToGenes(inspiration);
    const genes = genesToString(crossBreed(fgenes, igenes));
    population.push(genes);
    setGenome(genes);
  }

  return (
    <ExperimentFrame>
      <Grid container>
        <Grid item md={9}>
          <Grid container>
            <Grid item md={5} onClick={onChangeFoundation}>
              <Title>Foundation</Title>
              <Tulip genome={foundation} width={180} className="parent-tulip" />
            </Grid>
            <Grid item md={2}>
              <Plus>
                <AddIcon fontSize="large" />
              </Plus>
            </Grid>
            <Grid item md={5} onClick={onChangeInspiration}>
              <Title className="text-right">Inspiration</Title>
              <Tulip genome={inspiration} width={180} className="float-right parent-tulip" />
            </Grid>
          </Grid>

          <Grid item md={12} className="text-center">
            <PaintButton variant="contained" fullWidth onClick={paintNewTulip}>
              <KeyboardArrowDownIcon />
                Paint a new sample tulip
              <KeyboardArrowDownIcon />
            </PaintButton>
          </Grid>
          <Grid item md={12}>
            <Tulip genome={genome} width={440} />
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Controls>
            {genome.match(/.{2}/g).map((g, i) => (
              <SliderContainer key={`slider${i}`}>
                <GeneSlider size="small" min={0} max={255} step={1} value={parseInt(g, 16)} onChange={(_, v) => onSliderChanged(i, v)} />
              </SliderContainer>
            ))}
          </Controls>
        </Grid>
      </Grid>
    </ExperimentFrame>
  );
}
