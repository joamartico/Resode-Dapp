import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
// import useGlobalState from './useGlobalState';

const useContract = contractJSON => {
  const [contract, setContract] = useState();

  const { isWeb3Enabled, isAuthenticated, Moralis, enableWeb3 } = useMoralis();

  var walletAddress =
    window.ethereum?.selectedAddress || Moralis.web3?.currentProvider?.accounts[0];
  var chainId = window.ethereum?.chainId || Moralis.web3?.currentProvider.chainId;

  useEffect(() => {
    console.log('walletAddress changed: ', walletAddress);
  }, [walletAddress]);

  // useEffect(() => {
  //   console.log('Moralis.web3: ', Moralis.web3);
  //   console.log('Moralis connected address ', Moralis?.web3?.currentProvider.accounts[0]);
  //   console.log('Moralis chainId', Moralis?.web3?.currentProvider.chainId);
  //   walletAddress = window.ethereum?.selectedAddress || Moralis.web3?.currentProvider.accounts[0];
  //   chainId = window.ethereum?.chainId || Moralis.web3?.currentProvider.chainId;
  //   // const walletAddress = null;
  // }, [Moralis.web3]);

  async function getContractWithWC() {
    // await enableWeb3({ provider: 'walletconnect' });
    const _contract = await loadContract(Moralis.web3);
    await setContract(_contract);
  }

  if (!contractJSON) return [contract];

  async function loadContract(web3Provider) {
    if (!web3Provider.eth) return null;
    const networkId = await web3Provider.eth.net.getId();
    console.log('loadContract networkId: ', networkId);
    const networkData = await contractJSON.networks[networkId];

    if (networkData) {
      const _contract = await new web3Provider.eth.Contract(contractJSON.abi, networkData.address);
      console.log('resodeContract', _contract.options.address);
      return _contract;
    } else {
      console.log(
        'The network you choose with ID: ' +
          networkId +
          ' is not available for this dapp, you are now in Rinkeby'
      );
      const _contract = await new web3Provider.eth.Contract(
        contractJSON.abi,
        contractJSON.networks[4]?.address
      );
      return _contract;
    }
  }

  async function getContract() {
    await enableWeb3();
    const _contract = await loadContract(new Moralis.Web3(window.ethereum));
    setContract(_contract);
    console.log('getContract', _contract.options.address); // funciona bien
  }

  async function getContractWithoutMetamask() {
    console.log('getContractWithoutMetamask');
    const _contract = await loadContract(
      new Moralis.Web3('https://speedy-nodes-nyc.moralis.io/73323dda20b1c4a5c3605eb4/eth/rinkeby')
    );
    await setContract(_contract);
    await enableWeb3({
      provider: 'https://speedy-nodes-nyc.moralis.io/73323dda20b1c4a5c3605eb4/eth/rinkeby',
    });
  }

  // async function getContractWithWC() {
  //   await enableWeb3({ provider: 'walletconnect' });
  //   const _contract = await loadContract(web3);
  //   await setContract(_contract);
  // }

  useEffect(() => {
    if (window.ethereum) {
      getContract();
    } else {
      if (walletAddress) {
        getContractWithWC();
      } else {
        getContractWithoutMetamask();
      }
    }
  }, [isAuthenticated, chainId, walletAddress]); // , walletAddress]) no?
  //     Moralis.web3?.currentProvider,
  //    window.ethereum?.selectedAddress])

  return [contract];
};

export default useContract;
