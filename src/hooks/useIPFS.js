import { useEffect, useState } from 'react';

const useIPFS = (contentUri) => {
  const [content, setContent] = useState();

  useEffect(() => {
    console.log('POST');
    fetchIPFSDOC();
  }, []);

  async function fetchIPFSDOC() {
    const response = await fetch(contentUri);
    const _content = await response.json();
    setContent(_content);
  }

  return [content, setContent];
};

export default useIPFS;
