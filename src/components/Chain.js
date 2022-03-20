import { useEffect, useRef, useState } from 'react';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from './ChainsLogos';
import { useChain } from 'react-moralis';
import { Icon } from './StyledComponents';
import styled from 'styled-components';
import { isMobile, isIos } from '../helpers/isMobile';
import { chevronDown } from "ionicons/icons";
import { isPlatform } from "@ionic/core";

const networks = [
  {
    key: '0x1',
    name: 'Ethereum',
    type: 'Mainnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x3',
    name: 'Ropsten',
    type: 'Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x4',
    name: 'Rinkeby',
    type: 'Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x2a',
    name: 'Kovan',
    type: 'Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x5',
    name: 'Goerli',
    type: 'Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x38',
    name: 'Binance',
    type: 'Mainnet',
    icon: <BSCLogo />,
  },
  {
    key: '0x61',
    name: 'Smart Chain',
    type: 'Testnet',
    icon: <BSCLogo />,
  },
  {
    key: '0x89',
    name: 'Polygon',
    type: 'Mainnet',
    icon: <PolygonLogo />,
  },
  {
    key: '0x13881',
    name: 'Mumbai',
    type: 'Testnet',
    icon: <PolygonLogo />,
  },
  {
    key: '0xa86a',
    name: 'Avalanche',
    type: 'Mainnet',
    icon: <AvaxLogo />,
  },
];

function Chain() {
  const { switchNetwork, chainId } = useChain();
  const [selected, setSelected] = useState({
    key: '0x4',
    name: 'Rinkeby',
    type: 'Testnet',
    icon: <ETHLogo />,
  }); // cuando conecto wallet con WC (sesión ya iniciada) estoy en una network. Cómo la obtengo? Ponerla como default 
  const [showChains, setShowChains] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = networks.find(item => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  function getHightPosition(ref) {
    const { top } = ref?.current?.getBoundingClientRect();
    return top;
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (showChains) {
        setTimeout(() => {
          setShowChains(false);
          console.log(getHightPosition(ref));
        }, 100);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChains]);

  const isIos = isPlatform('ios');

  return (
    <>
      {showChains && (
        <Menu>
          {networks.map(network => (
            <Item
              key={network.key}
              onClick={() => {
                switchNetwork(network.key);
              }}
            >
              {network.icon}
              <p>&nbsp;</p>
              {network?.name} {!isMobile && network.type}
            </Item>
          ))}
        </Menu>
      )}

      <ActualChain
        key={selected?.key}
        onClick={() => setShowChains(!showChains)}
        ref={ref}
        top={ref.current && getHightPosition(ref)}
      >
        {selected?.icon}
        <span style={{ marginLeft: '5px' }}>
          {selected?.name} {!isMobile && selected.type}
        </span>
        <Icon icon={chevronDown} size={22} color="#000" marginLeft={4} />
      </ActualChain>
    </>
  );
}

export default Chain;

const ActualChain = styled.div`
  border: none;
  border-radius: 14px;
  background: #fff;
  z-index: 99999;
  display: flex;
  align-items: center;
  height: 42px;
  font-weight: 500;
  font-size: 14px;
  padding: 0 10px;
  min-width: fit-content;
  width: 100%;
  font-family: Roboto, sans-serif;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  justify-content: center;
`;

const Menu = styled.div`
  background: #fff;
  z-index: 999999999999999999999999999999;
  border-radius: 14px;
  position: absolute;
  /* padding-right: 12px; */
  top: ${isIos && "0" };
  margin-top: ${isIos ? "60px" : "480px"};
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  font-weight: 500;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  padding: 0 10px;
  width: 100%;
  cursor: pointer;
`;
