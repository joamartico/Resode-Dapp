import { useEffect, useState } from 'react';

import { getEllipsisTxt } from '../helpers/formatters';

import { useGlobalState } from '../Context';
import BlockieAvatar from './BlockieAvatar';
import styled from 'styled-components';

function Address({ copyable, size, avatar, address }) {
  const { walletAddress } = useGlobalState();
  address = address || walletAddress;
  if (!address) return null;

  const [isClicked, setIsClicked] = useState(false);

  const Copy = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#70727C"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        navigator.clipboard.writeText(walletAddress);
        setIsClicked(true);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );

  return (
    <Wrapper>
      {avatar === 'left' && <BlockieAvatar address={address} size={size} />}
      <Text size={size}>{getEllipsisTxt(address)}</Text>
      {avatar === 'right' && <Blockie address={address} size={size} />}
      {copyable && (isClicked ? <Check /> : <Copy />)}
    </Wrapper>
  );
}

const Text = styled.p`
  /* font-size: 14px; */
  /* font-weight: 600; */
  font-size: ${({ size }) => size * 5 + "px"};
  /* color: #70727c; */
  margin: 0 10px;
`;

const Wrapper = styled.div`
  height: 36px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export default Address;

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#70727C"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);
