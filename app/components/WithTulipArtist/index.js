/**
*
* WithTulipArtist
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map, omit, assign } from 'lodash';
import { ABI } from '../abi';

export function withTulipArtist() {
  return (WrappedComponent) =>
    class WithTulipArtist extends React.Component {

      static contextTypes = { ethereum: PropTypes.object.isRequired }

      constructor(props, context) {
        super(props, context);
        this.ethereum = context.ethereum;
        this.state = { ...this.ethereum.getState(), account: null };
        this.ethereum.subscribe(this.receiveUpdatedState);
      }

      receiveUpdatedState = (state) => {
        const { account, accounts, accounts: { loading }, connection: { web3 } } = state;

        if (loading) {
          return;
        }

        const newAccount = accounts.value[0];

        if (newAccount !== account) {
          // eslint-disable-next-line
          const tulipArtist = new web3.eth.Contract(ABI,
            '0x4e71920b7330515faf5ea0c690f1ad06a85fb60c', {
              from: newAccount,
              gasPrice: '25000000000',
            });

          this.tulips = {};

          tulipArtist.methods.getAllTokens(newAccount).call(
            (err, res) => {
              const tokens = res;
              let tokensToGet = tokens.length;
              map(tokens, (t) => {
                tulipArtist.methods.getTulip(t).call(
                  (err2, res2) => {
                    this.tulips[t] = assign({}, { id: t }, omit(res2, '0', '1', '2', '3', '4'));
                    tokensToGet -= 1;
                    if (tokensToGet === 0) {
                      this.setState({ tulips: this.tulips, tulipIds: tokens });
                    }
                  });
              });
            });

          this.setState({ ...state, account: newAccount, tulipArtist });
        }
      }

      componentWillUnmount() {
        this.ethereum.unsubscribe(this.receiveUpdatedState);
      }

      render() {
        return <WrappedComponent {...this.props} ethereum={this.state} />;
      }
    };
}
