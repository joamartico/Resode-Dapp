import ResodeContractJSON from '../../truffle/build/contracts/Resode.json';
import useGlobalState from "./useGlobalState";

export async function useContract(web3Provider) {
    const {setResodeContract} = useGlobalState()

  const networkId = await web3Provider.eth.net.getId();
  const networkData = await ResodeContractJSON.networks[networkId];

  if (networkData) {
    const resodeContract = await new web3Provider.eth.Contract(
      ResodeContractJSON.abi,
      networkData.address
    );

    await setResodeContract(resodeContract);
  } else {
    alert('The network you choose with ID: ' + networkId + ' is not available for this dapp');
  }
}
