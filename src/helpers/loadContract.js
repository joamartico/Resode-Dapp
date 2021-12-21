import ResodeContractJSON from '../../truffle/build/contracts/Resode.json';

export async function loadContract(web3Provider) {
  if (!web3Provider.eth) return null;
  const networkId = await web3Provider.eth.net.getId();
  const networkData = await ResodeContractJSON.networks[networkId];

  if (networkData) {
    const resodeContract = await new web3Provider.eth.Contract(
      ResodeContractJSON.abi,
      networkData.address
    );
    return resodeContract;
  } else {
    alert('The network you choose with ID: ' + networkId + ' is not available for this dapp');
  }
}
