import { useMoralis } from 'react-moralis';
import BlockieAvatar from './BlockieAvatar';
import Address from './Address';
import { getExplorer } from '../helpers/networks';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import { IonModal } from '@ionic/react';
import { Button, Icon, Padding, Row, Text } from './StyledComponents';
import { closeOutline, openOutline } from 'ionicons/icons';

import { useEffect, useState, useRef } from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Web3Provider } from '@ethersproject/providers';
import useLocalStorage from '../hooks/useLocalStorage';
import useGlobalState from '../hooks/useGlobalState';
import useContract  from '../hooks/useContract';
import resodeContractJSON from "../../truffle/build/contracts/Resode.json";

const wcConnector = new WalletConnectConnector({
  infuraId: 'm4OZrS1YYziZUSyinkROsS7F24eyk3hZknK2GYxQ',
  chainId: 42,
});

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  // library.pollingInterval = 12000;
  return library;
}

const Account = () => {
  const { logout, Moralis } = useMoralis();
  const { walletAddress, setWalletAddress, chainId, setContractWithWC} = useGlobalState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const {setContractWithWC} = useContract(resodeContractJSON);
  const web3React = useWeb3React();

  async function onAuthenticate() {
    if (window.ethereum ) {
      const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(addresses[0].toUpperCase());
    } else {
      // await web3React.activate(wcConnector);
      await setContractWithWC();
      const addresses = await Moralis.web3.eth.getAccounts();
      await setWalletAddress(addresses[0]);
      console.log("WC: ", wcConnector, Moralis.web3.currentProvider, web3React.account, web3React.active);
    }
  }



  // const { active, activate, error } = web3React;
  // const [loaded, setLoaded] = useState(false);


  // useEffect(() => {
  //   if (latestOp == 'connect' && latestConnector == 'injected') {
  //     injected
  //       .isAuthorized()
  //       .then(isAuthorized => {
  //         setLoaded(true);
  //         if (isAuthorized && !web3React.active && !web3React.error) {
  //           web3React.activate(injected);
  //         }
  //       })
  //       .catch(() => {
  //         setLoaded(true);
  //       });
  //   } else if (latestOp == 'connect' && latestConnector == 'walletconnect') {
  //     // web3React.activate(wcConnector);
  //     console.log('activate');
  //     loadAddress()
  //   }
  //   async function loadAddress() {
  //     await enableWeb3({ provider: 'walletconnect' });
  //     const addresses = await Moralis.web3.eth.getAccounts();
  //     setWalletAddress(addresses[0]);
  //   }
  // }, []);

  if (!walletAddress) {
    return (
      <AccountButton authenticate onClick={onAuthenticate}>
        <AuthText authenticate>Connect Wallet</AuthText>
      </AccountButton>
    );
  }

  return (
    <>
      <AccountButton onClick={() => setIsModalVisible(true)}>
        {/* <Text>{getEllipsisTxt(walletAddress, 6)}</Text> */}
        <Address />
        <BlockieAvatar address={walletAddress} scale={3} />
      </AccountButton>

      <StyledModal
        isOpen={isModalVisible}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        onDidDismiss={() => setIsModalVisible(false)}
        width="400px"
      >
        <Padding spaced  pt="0px">
          <Row spaced>
            <Text size={25} weight={500}>
              Account
            </Text>

            <Icon
              // style={{ position: 'absolute', top: 15, right: 15 }}
              icon={closeOutline}
              size="25"
              color="#000"
              onClick={() => setIsModalVisible(false)}
            />
          </Row>

          <Card>
            <Address avatar="left" size={4} copyable />
            <div
              style={{
                marginTop: '10px',
                padding: '0 10px',
                color: '#70727C',
                // display: 'flex',
                // alignItems: 'center',
              }}
            >
              <a
                href={`${getExplorer(chainId)}/address/${walletAddress}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#70727C' }}
              >
                <Row width="fit-content">
                  <Icon marginRight="10" icon={openOutline} color="#70727C" size={18} />
                  View on Explorer
                </Row>
              </a>
            </div>
          </Card>

          <Button
            outlined
            onClick={() => {
              logout();
              setWalletAddress();
              setIsModalVisible(false);
            }}
            mt="20px"
          >
            Disconnect Wallet
          </Button>
        </Padding>
      </StyledModal>
    </>
  );
};

export default function WrapperAccount() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Account />
    </Web3ReactProvider>
  );
}

const Card = styled.div`
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  padding: 12px;
`;

const StyledModal = styled(IonModal)`
  /* padding: 15px !important; */
  font-size: 17px !important;
  font-weight: 500;
  --border-radius: 12px !important;
  --height: 260px !important;
  --width: 420px !important;
  --max-width: 92vw !important;

`;

const AccountButton = styled.div`
  height: 42px;
  /* padding: 15px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  background: rgb(244, 244, 244);
  background: ${({ authenticate }) =>
    authenticate
      ? 'linear-gradient(174deg, rgba(93,152,255,1) 0%,  rgba(0,63,255,1) 80%, rgba(12,102,222,1) 100%)'
      : '#fff'};
  cursor: pointer;
  margin: 10px 0px;
`;

const AuthText = styled.p`
  margin: auto 0;
  color: ${({ authenticate }) => (authenticate ? '#fff' : COLORS.primary)};
  font-weight: 600;
  font-size: 16px;
`;
