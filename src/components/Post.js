import { IonSkeletonText, useIonToast } from '@ionic/react';
import { arrowUpCircle, chevronDownCircle, chevronUpCircle, home, thumbsUp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import useGlobalState from '../hooks/useGlobalState';
import useIPFS from '../hooks/useIPFS';
import useQuery from '../hooks/useQuery';
import Address from './Address';
import { Card, Icon, Padding, Row, Text } from './StyledComponents';

const Post = ({ postOwner, contentUri, postId, allVotes }) => {
  const { walletAddress, resodeContract } = useGlobalState();
  const [voteStatus, setVoteStatus] = useState();
  const [present] = useIonToast();
  const [votes, setVotes] = useState(0);

  const [postContent] = useIPFS(contentUri);

  async function getPostVoteStatus() {
    if (!walletAddress) return null;

    const voteFound = await allVotes.find(vote => {
      return vote.postId == postId && vote.voter.toUpperCase() == walletAddress.toUpperCase();
    });
    if (!voteFound) return null;
    setVoteStatus(voteFound.up ? 'up' : 'down');
  }

  useEffect(() => {
    resodeContract?.methods?.postRegistry(postId) &&
      resodeContract?.methods
        ?.postRegistry(postId)
        .call()
        .then(res => setVotes(res.votes));

    getPostVoteStatus();
  }, [walletAddress, resodeContract, allVotes]);

  async function vote(upOrDown) {
    if ((await walletAddress) == postOwner) {
      await present({
        message: "You can't vote on your own post",
        color: 'danger',
        duration: 2000,
      });
      return null;
    }
    if (await voteStatus) {
      await present({
        message: "You've already voted on this post",
        color: 'danger',
        duration: 2000,
      });
      return null;
    }
    resodeContract?.methods
      ?.vote(postId, 1, upOrDown == 'up' ? true : false)
      .send({ from: walletAddress });
  }

  return (
    <Card>
      <Padding pt="15px" pb="15px">
        <Address address={postOwner} avatar="left" size={3} />
        <Title>
          {postContent?.title ? (
            postContent.title
          ) : (
            <IonSkeletonText animated style={{ width: '80%', height: "30px", marginBottom: 12, borderRadius: 5  }} />
          )}
        </Title>
        {postContent?.text ? (
          <p>{postContent.text}</p>
        ) : (
          <p>
            <IonSkeletonText animated style={{ width: '100%', marginBottom: 10,height: "18px", borderRadius: 5 }} />
            <IonSkeletonText animated style={{ width: '100%', marginBottom: 10,height: "18px", borderRadius: 5  }} />
            <IonSkeletonText animated style={{ width: '100%', height: "18px", borderRadius: 5  }} />
          </p>
        )}

        <Row>
          <Icon
            icon={chevronUpCircle}
            marginRight={8}
            size={32}
            iconColor={voteStatus === 'up' ? COLORS.primary : '#cacaca'}
            onClick={() => vote('up')}
          />
          <Icon
            icon={chevronDownCircle}
            marginRight={8}
            size={32}
            iconColor={voteStatus === 'down' ? COLORS.primary : '#cacaca'}
            onClick={() => vote('down')}
          />
          <Text color="#aaa">Votes: {votes}</Text>
        </Row>
      </Padding>
    </Card>
  );
};

export default Post;

const Title = styled.div`
  // h3 title styles
  font-size: 1.5rem;
  font-weight: bold;

  margin-bottom: -12px;
  margin-top: 5px;
`;
