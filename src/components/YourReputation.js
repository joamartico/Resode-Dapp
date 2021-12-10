import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../Context';

const YourReputation = () => {
  const { selectedCategory, walletAddress, resodeContract } = useGlobalState();
  const [reputation, setReputation] = useState()

  if (!walletAddress || !selectedCategory ) return null 
  
  useEffect(() => {
    resodeContract?.methods.reputationRegistry(walletAddress, selectedCategory.id).call().then(res => setReputation(res))
  }, [walletAddress, selectedCategory])

  return <div>Your reputation in "{selectedCategory.name}"" Category is {reputation}</div>;
};

export default YourReputation;
