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
import useGlobalState from '../hooks/useGlobalState';

const Account = () => {
  const { logout, Moralis, enableWeb3 } = useMoralis();
  const { walletAddress, setWalletAddress, chainId } = useGlobalState();
  const [isModalVisible, setIsModalVisible] = useState(false);


  async function onAuthenticate() {
    if (window.ethereum) {
      enableWeb3();
      const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(addresses[0].toUpperCase());
    } else {
      await enableWeb3({ provider: 'walletconnect' });
      const addresses = await Moralis.web3.eth.getAccounts();
      await setWalletAddress(addresses[0]);
    }
  }


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
        <Padding spaced pt="0px">
          <Row spaced>
            <Text size={25} weight={500}>
              Account
            </Text>

            <Icon
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

export default Account;


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
