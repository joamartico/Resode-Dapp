import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import ResodeContractJSON from '../../truffle/build/contracts/Resode.json';
import useGlobalState from './useGlobalState';

export async function useContract(web3Provider) {
  const [ resodeContract, setResodeContract ] = useState();
  // const { resodeContract, setResodeContract } = useGlobalState();
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, Moralis } = useMoralis();


  async function getContractWithProvider() {
    // const contract = await loadContract(new Moralis.Web3(provider));
    // await console.log('newContract (metamask)', contract);
    // await setResodeContract(contract);
    // console.log('setResodeContract');

    await ( web3Provider? enableWeb3({ provider: 'walletconnect' }) :enableWeb3())
      
      
    web3Provider = web3Provider || new Moralis.Web3(window.ethereum)
    const networkId = await web3Provider.eth.net.getId();
    const networkData = await ResodeContractJSON.networks[networkId];

    if (networkData) {
      const _resodeContract = await new web3Provider.eth.Contract(
        ResodeContractJSON.abi,
        networkData.address
      );

      await setResodeContract(_resodeContract);
    } else {
      alert('The network you choose with ID: ' + networkId + ' is not available for this dapp');
    }
  }

  async function getContractWithoutProvider() {
    const web3 = new Moralis.Web3();
    const _resodeContract = await new web3.eth.Contract(
      ResodeContractJSON.abi,
      "0x2B4b22B7555c6069378f70AB2df62A0067470e81"
    );
    await setResodeContract(_resodeContract);
  }

  useEffect(() => {
    if (window.ethereum) {
      getContractWithProvider();
    } else {
      getContractWithoutProvider();
    }
  }, []);

  return resodeContract;
}
