import { IonInput, IonTextarea, useIonToast } from '@ionic/react';
import React, { useState } from 'react';
import { useMoralisFile } from 'react-moralis';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import useGlobalState from '../hooks/useGlobalState';
import { isMobile } from '../helpers/isMobile';
import { Button, Card, Padding } from './StyledComponents';
import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
});

const CreatePost = () => {
  const { resodeContract, walletAddress, selectedCategory, isMoibile } = useGlobalState();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [present] = useIonToast();

  const processContent = async () => {
    const content = {
      title,
      text,
    };
    // const IPFSResult = await IPFSProcessor.saveFile(
    //   'post.json',
    //   { base64: btoa(JSON.stringify(content)) },
    //   { saveIPFS: true }
    // );
    // await alert('Content: ', IPFSResult._ipfs);
    // return IPFSResult._ipfs;

    const result = await ipfs.add(JSON.stringify(content));

    // const result = [];

    // for await (const _result of ipfs.add(content)) {
    //   result.push(_result);
    // }
    const contentUri = `https://ipfs.io/ipfs/${result.path}`;
    return contentUri;
  };

  async function onSubmit() {
    if (title == '' || text == '') {
      present({
        message: 'Please fill all fields',
        duration: 2000,
        color: 'danger',
      });
      return null;
    }
    const contentURI = await processContent();

    await console.log('! :' + walletAddress);

    await resodeContract?.methods
      ?.createPost(selectedCategory.id, '0x91', contentURI)
      .send({ from: walletAddress })
      .catch(console.log);

    setText('');
    setTitle('');
  }

  return (
    <Card>
      <Padding>
        <div>
          <InputText
            rows={1}
            placeholder="Title of your post..."
            autoGrow
            value={title}
            onIonChange={e => setTitle(e.detail.value)}
          />
          <InputText
            rows={3}
            placeholder="Text of your post..."
            autoGrow
            value={text}
            onIonChange={e => setText(e.detail.value)}
          />
        </div>
        <Button
          onClick={onSubmit}
          background="linear-gradient(174deg, rgba(93,152,255,1) 0%,  rgba(0,63,255,1) 80%, rgba(12,102,222,1) 100%)"
        >
          Post
        </Button>
      </Padding>
    </Card>
  );
};

export default CreatePost;

const InputText = styled(IonTextarea)`
  background: #eaeaea;
  border-radius: 14px;
  padding: ${isMobile ? '3%' : '2%'};
  margin-top: 0 !important;
  --padding-bottom: 0px !important;
  --padding-top: 0px !important;
  margin-bottom: 10px !important;
`;
