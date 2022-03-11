import React, { useState, createContext, useEffect, useContext } from 'react';
import { useMoralis } from 'react-moralis';


export const Context = createContext();

const ContextComponent = props => {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All',
    id: '0xc5bd07976cb0704ae6be0eaee9652ee37944bd01ab4b2f552b47b8cbee456225',
  });
  // const [contract, setContract] = useState()

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
        setChainId,
        selectedCategory,
        setSelectedCategory,
        // contract,
        // setContract
      }}
    >
      {props.children}
    </Context.Provider>
  );
};



export default ContextComponent;
