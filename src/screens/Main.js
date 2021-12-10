import { IonPage, IonHeader, IonContent } from '@ionic/react';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Account from '../components/Account';
import Categories from '../components/Categories';
import Chain from '../components/Chain';
import CreatePost from '../components/CreatePost';
import GreaterExponents from '../components/GreaterExponents';
import NativeBalance from '../components/NativeBalance';
import Post from '../components/Post';
import { Padding, Row } from '../components/StyledComponents';
import YourReputation from '../components/YourReputation';
import { useGlobalState } from '../Context';
import { isMobile } from '../helpers/isMobile';
import useQuery from '../hooks/useQuery';

const Main = () => {
  const { selectedCategory, resodeContract } = useGlobalState();

  const posts = useQuery({
    query: 'Posts',
    live: true,
    change: [selectedCategory.id],
    actualValue: 'categoryId',
    wantedValue: selectedCategory.id,
    // values: ['postId', 'contentId', 'postOwner', 'contentUri'],
  }).reverse();


  const categories = useQuery({
    query: 'Categories',
    values: ['categoryId', 'categoryName'],
  });

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
        <Categories categories={categories} />
        <Padding pt="0" pb="170px">
          <Row>
            <Col70>
              <CreatePost />
              {posts.map(post => (
                <Post
                  key={post.postId}
                  postId={post.postId}
                  contentId={post.contentId}
                  postOwner={post.postOwner}
                  contentUri={post.contentUri}
                />
              ))}
            </Col70>

            {!isMobile && resodeContract &&(
              <Col30>
                <Padding>
                  <YourReputation rep="rep" />
                  <GreaterExponents />
                </Padding>
              </Col30>
            )}
          </Row>
        </Padding>
      </IonContent>
    </IonPage>
  );
};

export default Main;

const Col70 = styled.div`
  width: ${isMobile ? '100%' : '70%'};
  width: 100%;
  padding-right: ${isMobile ? '0' : '40px'};
`;
const Col30 = styled.div`
  width: 550px;
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
  --background: #fff0 !important; /* COLOR DE LA BARRA DE ARRIBA CON ITEMS*/
  background: #fff9 !important; /* COLOR DE TODA LA BARRA */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 999999999999;
  height: 70px !important;
`;
