import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
// import useGlobalState from './useGlobalState';

const useContract = contractJSON => {
  const [contract, setContract] = useState();
  // const {
  //   contract,
  //   setContract,
  //   walletAddress,
  // } = useGlobalState();

  const { isWeb3Enabled, isAuthenticated, Moralis, enableWeb3 } = useMoralis();
  const walletAddress = window.ethereum.selectedAddress;

  console.log('walletAddress: ', walletAddress);

  async function setContractWithWC() {
    await enableWeb3({ provider: 'walletconnect' });
    const _contract = await loadContract(Moralis.web3);
    await setContract(_contract);
  }

  if (!contractJSON) return [contract, setContractWithWC];

  async function loadContract(web3Provider) {
    if (!web3Provider.eth) return null;
    const networkId = await web3Provider.eth.net.getId();
    console.log('setContract networkId: ', networkId);
    const networkData = await contractJSON.networks[networkId];

    if (networkData) {
      const _contract = await new web3Provider.eth.Contract(contractJSON.abi, networkData.address);
      console.log('resodeContract', _contract.options.address);
      return _contract;
    } else {
      console.log(
        'The network you choose with ID: ' +
          networkId +
          ' is not available for this dapp, you are now in Kovan'
      );
      const _contract = await new web3Provider.eth.Contract(
        contractJSON.abi,
        contractJSON.networks[42].address
      );
      return _contract;
    }
  }

  async function getContract() {
    // await enableWeb3();
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
    enableWeb3();
  }, []);

  useEffect(() => {
    // Moralis.onChainChanged(function (chain) {
    //   if (window.ethereum) {
    //     console.log("SETCONTRACT")
    //     getContract();
    //   } else {
    //     !walletAddress && getContractWithoutMetamask();
    //   }
    // });

    console.log("chain changed")

    if (window.ethereum) {
      getContract();
    } else {
      !walletAddress && getContractWithoutMetamask();
    }
  }, [
    isAuthenticated,
    // chain:
    window.ethereum.chainId,

    // isWeb3Enabled
  ]);

  return [contract, setContractWithWC];
};

export default useContract;
