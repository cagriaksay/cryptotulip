/**
*
* Transactions
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { EXPLORER } from '../constants';

const TransactionsFrame = styled('div')`
  text-align: center;
  font-size: 12px;
  margin: auto;
`;

function Transactions(props) {
  const { transactions, children } = props;

  return (
    <TransactionsFrame>
      {transactions.length > 0 &&
        children
      }
      {transactions.map((t) => (
        <div key={t}>
          <a href={`${EXPLORER}${t}`} target="_blank" rel="noreferrer">transaction {t} submitted.</a>
          <br />
        </div>
      ))}
    </TransactionsFrame>
  );
}

Transactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  children: PropTypes.object,
};

export default Transactions;
