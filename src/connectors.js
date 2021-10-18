import { NetworkConnector } from '@web3-react/network-connector'
import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAIN_ID } from './constants';

export const injected = new InjectedConnector({ supportedNetworks: [1, 4] });
export const infura = new NetworkConnector({ 
  urls: {
    1: 'https://mainnet.infura.io/v3/4d0f836f40eb4929a7b5318b9b3117ae', //'https://mainnet.infura.io/v3/0a9a9e48128048fea044622a03900c13'},
    4: 'https://rinkeby.infura.io/v3/4d0f836f40eb4929a7b5318b9b3117ae'},  
  defaultChainId: CHAIN_ID 
});