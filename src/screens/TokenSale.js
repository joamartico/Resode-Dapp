import { IonContent, IonInput, IonPage, IonProgressBar, IonTextarea } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import { Button, Image, Padding, Row, Scroll } from '../components/StyledComponents';
import { getEllipsisTxt } from '../helpers/formatters';
import useGlobalState from '../hooks/useGlobalState';
import useMethod from '../hooks/useMethod';

const TokenSale = () => {
  const { resodeTokenSaleContract, resodeTokenContract, walletAddress } = useGlobalState();

  if (!resodeTokenSaleContract || !resodeTokenContract) return null;

  const [amountToBuy, setAmountToBuy] = useState(0);

  const tokenSaleAddress = resodeTokenSaleContract.options.address;
  const tokenAddress = resodeTokenContract.options.address;

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

  const tokenPrice = useMethod({
    contract: resodeTokenSaleContract,
    method: 'tokenPrice',
  });

  const tokensSold = parseInt(
    useMethod({
      contract: resodeTokenSaleContract,
      method: 'tokensSold',
      onEventChange: 'Sell',
    })
  );

  const tokenSaleBalance = parseInt(
    useMethod({
      contract: resodeTokenContract,
      method: 'balanceOf',
      args: [tokenSaleAddress],
      onEventChange: 'Transfer',
    })
  );

  const balance =
    walletAddress &&
    useMethod({
      contract: resodeTokenContract,
      method: `balanceOf`,
      args: [walletAddress],
      onEventChange: 'Transfer',
    });

  async function onBuy() {
    await console.log(
      'amountToBuy',
      amountToBuy,
      'tokenPrice',
      tokenPrice,
      'walletAddress',
      walletAddress
    );
    if (!amountToBuy) {
      present({
        message: 'Please fill all fields',
        duration: 2000,
        color: 'danger',
      });
      return null;
    }
    // resodeTokenSaleContract.methods
    //   .buyTokens(amountToBuy)
    //   .send({
    //     from: walletAddress,
    //     value: amountToBuy * tokenPrice,
    //     gas: 3000000,
    //   })
    //   .then(result => {
    //     console.log('result', result);
    //   })
    //   .catch(err => console.log('err', err));
    
    resodeContract.methods
      .createPost("0xc5bd07976cb0704ae6be0eaee9652ee37944bd01ab4b2f552b47b8cbee456225", '0x91', "https://ipfs.io/ipfs/QmcLesWYetppE8PgYso7GSemZNSBCbrpHKt9HKW1emFzbR")
      .send({ from: walletAddress, gas: 3000000 })
      .then(() => {
        // setText('');
        // setTitle('');
      })
      .catch(console.log)
  }

  function addTokenToMetamask() {
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: 'RESODE',
          decimals: 0,
          image: 'https://resode.vercel.app/token.png',
        },
      },
    });
  }

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
            {tokensSold} / {parseInt(tokenSaleBalance) + parseInt(tokensSold)} tokens sold.
            {walletAddress && <>You currently have {balance}.</>}
          </p>

          <Link onClick={addTokenToMetamask} mt="50px">
            Add Token To Metamask
            <Image size="25px" ml="10px" src="/metamask.png" alt="metamask" />
          </Link>

          <Link
            mt="50px"
            href={`https://rinkeby.etherscan.io/address/${tokenSaleAddress}`}
            target="_blank"
          >
            TokenSale Contract: {getEllipsisTxt(tokenSaleAddress)}
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
