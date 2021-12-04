import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from '../helpers/formatters';
import BlockieAvatar from './BlockieAvatar';
import {  useState } from 'react';
import Address from './Address';
// import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from '../helpers/networks';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import { IonButton, IonIcon, IonModal } from '@ionic/react';
import { Button, Icon, Padding, Row } from './StyledComponents';
import { closeOutline, openOutline } from 'ionicons/icons';
import { useGlobalState } from "../Context";

// console.log('#08e41a: ', fromHexToRGB('#08e41a'));


const Account = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useGlobalState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  function onAuthenticate() {
    if (window.ethereum) {
      authenticate({ signingMessage: 'Welcome!' });
    } else {
      authenticate({
        provider: 'walletconnect',
        chainId: 4, // Rinkeby
        // chainId: 42, // Kovan
        // chainId: 3, // Ropsten
        // chainId: 5, // Goerli
        signingMessage: 'Welcome! ',
      });
    }
  }

  if (!isAuthenticated) {
    return (
      <AccountButton authenticate onClick={onAuthenticate}>
        <Text authenticate>Connect Wallet</Text>
      </AccountButton>
    );
  }

  return (
    <>
      <AccountButton onClick={() => setIsModalVisible(true)}>
        <Text>{getEllipsisTxt(walletAddress, 6)}</Text>
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
        <Padding spaced>
          <Icon
            style={{ position: 'absolute', top: 15, right: 15 }}
            icon={closeOutline}
            size="25"
            color="#000"
            onClick={() => setIsModalVisible(false)}
          />
          <h3>Account</h3>

          <Card>
            <Address avatar="left" size={6} copyable style={{ fontSize: '20px' }} />
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
              setIsModalVisible(false);
            }}
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
  padding: 15px !important;
  font-size: 17px !important;
  font-weight: 500;
  --border-radius: 12px !important;
  --height: 250px !important;
  --width: 420px !important;
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

const Text = styled.p`
  margin: auto 0;
  color: ${({ authenticate }) => (authenticate ? '#fff' : COLORS.primary)};
  font-weight: 600;
  font-size: 16px;
`;
