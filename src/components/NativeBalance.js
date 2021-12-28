import { useEffect, useState } from "react";
import { useMoralis, useNativeBalance } from 'react-moralis';
import styled from 'styled-components';
import useGlobalState from '../hooks/useGlobalState';

const NativeBalance = () => {
  const { web3 } = useMoralis();
  const { walletAddress } = useGlobalState();
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if(!walletAddress) {
      setBalance(0)
      return null
    }
    web3?.eth?.currentProvider &&
      web3?.eth?.getBalance(walletAddress).then(async wei => {
        let _balance = await web3.utils.fromWei(wei, 'ether');
        _balance = await parseFloat(_balance).toFixed(2);
        console.log('_balance: ', _balance);
        setBalance(_balance);
      });
  }, [walletAddress, web3]);

  return <RoundedDiv>{balance + ' ETH'}</RoundedDiv>;
};

export default NativeBalance;

const RoundedDiv = styled.div`
  height: 42px;
  background-color: #f5f5f5;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  white-space: 'nowrap';
  border-radius: 14px;
  /* padding-left: 110px;
  margin-left: -100px;
  padding-right: 15px; */
  color: #000;
  z-index: -1;
  font-size: 13px;
  width: 100%;
  max-width: 95px;
  padding-left: 40px;
  margin-left: -40px;
`;
