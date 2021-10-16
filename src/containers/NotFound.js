/**
 * NotFoundPage
 *
 */

import React from 'react';
import Navigation from '../components/Navigation';
import {Box} from '@mui/material';

export default function NotFound() {
  return (
    <div>
      <Navigation />
      <Box padding={3}>
        <h1>
          Page not found.
        </h1>
      </Box>
    </div>
  );
}
