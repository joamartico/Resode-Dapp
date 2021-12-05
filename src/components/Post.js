import { arrowUpCircle, chevronDownCircle, chevronUpCircle, home, thumbsUp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import { useGlobalState } from '../Context';
import useQuery from '../hooks/useQuery';
import { Card, Icon, Padding, Row, Text } from './StyledComponents';

const Post = ({ postOwner, contentUri, postId }) => {
  const { walletAddress, resodeContract } = useGlobalState();
  const [postContent, setPostContent] = useState();
  const [voteStatus, setVoteStatus] = useState();
  const [votes, setVotes] = useState()

  const postVotes = useQuery({
    query: 'Votes',
    actualValue: 'postId',
    wantedValue: postId,
    // values: [postVotes],
    live: true,
  });

  async function fetchIPFSDOC() {
    const response = await fetch(contentUri);
    const content = await response.json();
    setPostContent(content);
  }

  async function getPostVoteStatus() {
    console.log("votes: ",votes)
    postVotes.map(vote => {
      console.log('vote: ', vote);
      if (vote.voter == walletAddress) {
        setVoteStatus(vote.up ? 'up' : 'down');
      }
    });
  }

  useEffect(() => {
    resodeContract.methods.postRegistry(postId).call().then(res => setVotes(res.votes));
    // resodeContract.methods.voteRegistry(walletAddress).call().then(res => console.log("id: ",postId, "voted?: ", res));
    // if (!postVotes?.length) return null;
    getPostVoteStatus();
  }, [postVotes, walletAddress]);

  useEffect(() => {
    fetchIPFSDOC();
  }, []);

  function vote(upOrDown) {
    resodeContract.methods
      .vote(postId, 1, upOrDown == 'up' ? true : false)
      .send({ from: walletAddress });
  }

  return (
    <Card>
      <Padding>
        {/* <p>{postOwner}</p> */}
        <Title>{postContent?.title}</Title>
        <p>{postContent?.text}</p>
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

  margin-bottom: -5px;
`;
