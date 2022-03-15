import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonTextarea,
} from '@ionic/react';

import styled from 'styled-components';
import Account from '../components/Account';
import Categories from '../components/Categories';
import Chain from '../components/Chain';
import CreatePost from '../components/CreatePost';
import GreaterExponents from '../components/GreaterExponents';
import NativeBalance from '../components/NativeBalance';
import Post from '../components/Post';
import { Button, Card, Padding, Row, Scroll } from '../components/StyledComponents';
import YourReputation from '../components/YourReputation';
import useGlobalState from '../hooks/useGlobalState';
import { isMobile } from '../helpers/isMobile';
import useQuery from '../hooks/useQuery';
import { useEffect } from 'react';

const Main = () => {
  const { selectedCategory, setSelectedCategory, resodeContract, walletAddress, chainId } =
    useGlobalState();
  if (!resodeContract) return null;

  const posts = useQuery({
    contract: resodeContract,
    query: 'PostCreated',
    live: true,
    onChange: [selectedCategory.id],
    filter: { categoryId: selectedCategory.id },
    values: ['postId', 'contentId', 'contentUri', 'postOwner', 'categoryId'],
    reverse: true,
  });

  const categories = useQuery({
    contract: resodeContract,
    query: 'CategoryCreated',
    values: ['categoryId', 'categoryName'],
  });

  const allVotes = useQuery({
    contract: resodeContract,
    query: 'Voted',
    values: [
      'postId',
      'postOwner',
      'voter',
      // 'reputationPostOwner',
      // 'reputationVoter',
      // 'postVotes',
      'up',
    ],
    onChange: [walletAddress],
    live: true,
  });

  // if (!resodeContract) return null;
  //

  return (
    <IonPage>
      <IonHeader>
        <Toolbar>
          <ToolbarButton width="55%">
            <Chain /> <NativeBalance />
          </ToolbarButton>

          <ToolbarButton width="45%">
            <Account />
          </ToolbarButton>
        </Toolbar>
      </IonHeader>

      <IonContent fullscreen className="scroll">
        <IonRefresher
          slot="fixed"
          onIonRefresh={e => {
            setTimeout(() => {
              setSelectedCategory(prev => prev);
              e.detail.complete();
              console.log('done');
            }, 1000);
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        <Categories categories={categories} />

        <Scroll pt={isMobile && '32%'} pb="60px">
          <Row>
            <Col70>
              <CreatePost />
              
              {posts?.map(post => (
                <Post
                  key={post.postId}
                  postId={post.postId}
                  contentId={post.contentId}
                  postOwner={post.postOwner}
                  contentUri={post.contentUri}
                  allVotes={allVotes}
                />
              ))}
            </Col70>

            {!isMobile && resodeContract && (
              <Col30>
                <Padding>
                  <YourReputation rep="rep" />
                  <GreaterExponents />
                </Padding>
              </Col30>
            )}
          </Row>
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

export default Main;

const InputText = styled(IonTextarea)`
  background: #eaeaea;
  border-radius: 14px;
  padding: ${isMobile ? '3%' : '2%'};
  margin-top: 0 !important;
  --padding-bottom: 0px !important;
  --padding-top: 0px !important;
  margin-bottom: 10px !important;
`;

const Col70 = styled.div`
  width: ${isMobile ? '100%' : '56%'};
  /* width: 100%; */
  padding-right: ${isMobile ? '0' : '40px'};
  padding-bottom: ${isMobile ? '90px' : '60px'};
`;
const Col30 = styled.div`
  width: 550px;
  width: 30%;
  position: sticky;
  right: 0;
  /* top: 0; */
  /* height: 70vh; */
  /* max-width: 700px; */
  top: 90px;
  height: 600px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 50px 0 100px 50px rgba(209, 224, 255, 0.5);
`;

const ToolbarButton = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  /* font-weight: 500;
  font-family: Roboto, sans-serif;
  font-size: 14px; */
  width: ${({ width }) => width || '100%'};
  padding: 0 10px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  /* font-weight: 500;
  font-family: Roboto, sans-serif;
  font-size: 14px; */
  position: fixed;
  top: 0;
  width: 100%;
  --background: none !important; /* COLOR DE LA BARRA DE ARRIBA CON ITEMS*/
  background: #fff9 !important; /* COLOR DE TODA LA BARRA */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 999999999999;
  height: 70px !important;
  border-bottom: solid 1px #90909050;
`;
