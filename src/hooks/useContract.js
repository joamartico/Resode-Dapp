import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import useGlobalState from './useGlobalState';

const useContract = contractJSON => {
  const { contract, setContract, walletAddress } = useGlobalState();
  if (!contractJSON) return { contract, setContractWithWC };
  const { isWeb3Enabled, isAuthenticated, Moralis, enableWeb3 } = useMoralis();

  async function loadContract(web3Provider) {
    if (!web3Provider.eth) return null;
    const networkId = await web3Provider.eth.net.getId();
    const networkData = await contractJSON.networks[networkId];

    if (networkData) {
      const _contract = await new web3Provider.eth.Contract(contractJSON.abi, networkData.address);
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

  async function setContractWithWC() {
    await enableWeb3({ provider: 'walletconnect' });
    const _contract = await loadContract(Moralis.web3);
    await setContract(_contract);
  }

  async function getContract() {
    await enableWeb3();
    const _contract = await loadContract(new Moralis.Web3(window.ethereum));
    await setContract(_contract);
  }

  async function getContractWithoutMetamask() {
    console.log('getContractWithoutMetamask');
    const contract = await loadContract(
      new Moralis.Web3('https://speedy-nodes-nyc.moralis.io/73323dda20b1c4a5c3605eb4/eth/rinkeby')
    );
    await setContract(contract);
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
      !walletAddress && getContractWithoutMetamask();
    }
  }, [
    isAuthenticated,
    // isWeb3Enabled
  ]);

  return { contract, setContractWithWC };
};

export default useContract;
