/**
*
* Transactions
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { EXPLORER } from '../constants';

const TransactionsFrame = styled.div`
  text-align: center;
  font-size: 12px;
  margin: auto;
`;

function Transactions(props) {
  const { transactions } = props;

  return (
    <TransactionsFrame>
      {transactions.map((t) => (
        <div>
          <a href={`${EXPLORER}${t}`} target="_blank" key={t}>transaction {t} submitted.</a>
          <br />
        </div>
      ))}
    </TransactionsFrame>
  );
}

Transactions.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default Transactions;
