import React, { useState, createContext, useEffect, useContext } from 'react';
import { useMoralis } from 'react-moralis';
import ResodeContractJSON from '../truffle/build/contracts/Resode.json';


export const Context = createContext();

const ContextComponent = props => {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(ResodeContractJSON.abi);
  const [contractAddress, setContractAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All',
    id: '0xc5bd07976cb0704ae6be0eaee9652ee37944bd01ab4b2f552b47b8cbee456225',
  });
  const [resodeContract, setResodeContract] = useState()

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));

  useEffect(
    () => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get('ethAddress')),
    [web3, user]
  );

  return (
    <Context.Provider
      value={{
        ...props.value,
        walletAddress,
        setWalletAddress,
        chainId,
        selectedCategory,
        setSelectedCategory,
        contractABI,
        setContractABI,
        contractAddress,
        setContractAddress,
        // resodeContract,
        // setResodeContract
      }}
    >
      {props.children}
    </Context.Provider>
  );
};



export default ContextComponent;
