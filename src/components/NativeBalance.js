import { useNativeBalance } from 'react-moralis';
import styled from 'styled-components';

function NativeBalance() {
  const { data: balance } = useNativeBalance('ETH');

  return <RoundedDiv>{balance.formatted || "0 ETH"}</RoundedDiv>;
}

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
