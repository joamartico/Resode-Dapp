import { IonContent, IonInput, IonPage, IonProgressBar, IonTextarea } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import { Button, Image, Padding, Row, Scroll } from '../components/StyledComponents';
import useGlobalState from '../hooks/useGlobalState';
import useMethod from '../hooks/useMethod';

const TokenSale = () => {
  const { resodeTokenSaleContract, resodeTokenContract, walletAddress } = useGlobalState();

  if (!resodeTokenSaleContract || !resodeTokenContract) return null;

  const [amountToBuy, setAmountToBuy] = useState(0);
  //   var tokenPrice;
  //
  //   useEffect(() => {
  //     resodeTokenSaleContract?.methods
  //       ?.tokenPrice()
  //       .call()
  //       .then(price => {
  //         tokenPrice = price / 10**18;
  //       });
  //   }, [resodeTokenSaleContract]);

  const tokenPrice = useMethod(resodeTokenSaleContract, 'tokenPrice');
  const tokensSold = parseInt(useMethod(resodeTokenSaleContract, 'tokensSold'));
  const balance = useMethod(resodeTokenContract, `balanceOf`, walletAddress);

  function onBuy() {
    console.log(
      'amountToBuy',
      amountToBuy,
      'tokenPrice',
      tokenPrice,
      'walletAddress',
      walletAddress
    );
    resodeTokenSaleContract.methods
      .buyTokens(amountToBuy)
      .send({
        from: walletAddress,
        value: amountToBuy * tokenPrice,
        gas: 3000000,
      })
      .then(result => {
        console.log('result', result);
      })
      .catch(err => console.log('err', err));
  }

  const tokenSaleContractAddress = resodeTokenSaleContract.options.address;
  const tokenAddress = resodeTokenContract.options.address;

  console.log('resodeTokenSaleContract options', resodeTokenSaleContract.options);
  console.log('resodeTokenContract options', resodeTokenContract.options);

  const tokenSaleBalance = parseInt(
    useMethod(resodeTokenContract, 'balanceOf', tokenSaleContractAddress)
  );

  function addTokenToMetamask() {
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x7c769d0B305F7DcB54caf0fffED1509608575C28',
          symbol: 'RESODE',
          decimals: 0,
          image: 'https://resode.vercel.app/token.png',
        },
      },
    });
  }

  //   resodeTokenSaleContract?.methods?.tokenContract.call().then(res => console.log("tokenContract", res.methods.symbol().call()));

  return (
    <IonPage>
      <IonContent>
        <Wrapper>
          <Title>Resode Token Sale</Title>
          <p>RESODE token price is {tokenPrice / 10 ** 18} ETH (only in Kovan Test Network) </p>

          <Row mt="100px" width="500px" h="60px" spaced mt="65px">
            <AmountInput
              type="number"
              placeholder="Enter RESODE amount to buy"
              onIonChange={e => setAmountToBuy(e.detail.value)}
            />
            <Button width="26%" height="100%" mb="0" mt="0" onClick={onBuy}>
              Buy
            </Button>
          </Row>

          <ProgressBar value={tokensSold / (tokenSaleBalance + tokensSold)}></ProgressBar>
          <p>
            {tokensSold} / {parseInt(tokenSaleBalance) + parseInt(tokensSold)} tokens sold. You
            currently have {balance}.
          </p>
          <Link onClick={addTokenToMetamask} mt="50px">
            Add Token To Metamask
            <Image size="25px" ml="10px" src="/metamask.png" alt="metamask" />
          </Link>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default TokenSale;

const Link = styled.a`
  margin-top: ${({ mt }) => mt && mt};
  color: #999;
  text-decoration: none;
  /* font-size: 1.2rem; */
  /* font-weight: bold; */
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled(IonProgressBar)`
  margin-top: 40px;
  margin-bottom: 10px;
  max-width: 500px;
`;

const AmountInput = styled(IonInput)`
  display: flex;
  border-radius: 14px;
  border: 1px solid ${COLORS.primary}a0;
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
