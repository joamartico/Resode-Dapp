import { IonContent, IonInput, IonPage, IonProgressBar, IonTextarea } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import { Button, Padding, Row, Scroll } from '../components/StyledComponents';

const TokenSale = () => {
  return (
    <IonPage>
      <IonContent>
        <Wrapper>
          <Title>Resode Token Sale</Title>
          <p>RESODE token price is 0.001 ETH (only in Rinkeby Test Network) </p>

          <Row mt="100px" width="500px" h="60px" spaced mt="65px">
            <AmountInput type="number" placeholder="Enter RESODE amount to buy" />
            <Button width="26%" height="100%" mb="0" mt="0">
              Buy
            </Button>
          </Row>

          {/* Progress Bar */}
          <ProgressBar value={0.2}></ProgressBar>
          <p>123 / 1000000 tokens sold</p>

        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default TokenSale;

const ProgressBar = styled(IonProgressBar)`
    margin-top: 40px;
    margin-bottom: 10px;
    max-width: 500px;
`;

const AmountInput = styled(IonInput)`
  display: flex;
  border-radius: 14px;
  border: 1px solid ${({ red, background }) => (red ? 'red' : background || COLORS.primary)};
  height: 100%;
  margin: 0 !important;
  max-width: 70% !important;
  --padding-end: 15px !important;
`;

const Title = styled.h1`
  font-size: 64px;
  background: -webkit-linear-gradient(174deg, rgba(93, 152, 255, 1), rgba(0, 63, 255, 1));
  /* linear-gradient(174deg, rgba(93,152,255,1) 0%,  rgba(0,63,255,1) 80%, rgba(12,102,222,1) 100%) */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: -100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  padding: 0 5%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
