import Blockies from 'react-blockies';
import styled from "styled-components";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function BlockieAvatar({ address }) {
  if (!address) return null;

  return (
    <Blockie
      seed={address?.toLowerCase()}
      style={{
        borderRadius: '50px',
        width: '200px',
      }}

    />
  );
}

export default BlockieAvatar;

const Blockie = styled(Blockies)`
    border-radius: 50px;
    margin-left: 10px;
`;