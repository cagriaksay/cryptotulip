
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'

export const GENOME_LENGTH = 32;

export function crossBreed(foundation, inspiration) {
  const genes = new Uint8Array(GENOME_LENGTH);
  for (let i = 0; i < GENOME_LENGTH; i += 1) {
    const rand = Math.random();
    if (rand < 0.99) {
      genes[i] = rand < 0.7 ? foundation[i] : inspiration[i];
      if (rand < 0.2) {
        genes[i] += (Math.random() * 16) - 8;
      }
    } else {
      genes[i] = Math.random() * 256;
    }
  }
  return genes;
}

export function alertError(error) {
  if (error instanceof NoEthereumProviderError) {
    alert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.')
  } else if (error instanceof UnsupportedChainIdError) {
    alert("You're connected to an unsupported network. Please switch to Mainnet.")
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    alert('Please authorize to access your CryptoTulip account.')
  } else {
    alert('Error\n\n' + error.message)
  }
}