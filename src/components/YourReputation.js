import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../Context';
import { Text } from "./StyledComponents";

const YourReputation = () => {
  const { selectedCategory, walletAddress, resodeContract } = useGlobalState();
  const [reputation, setReputation] = useState()

  if (!walletAddress || !selectedCategory ) return null 
  
  useEffect(() => {
    resodeContract?.methods.reputationRegistry(walletAddress, selectedCategory.id).call().then(res => setReputation(res))
  }, [walletAddress, selectedCategory])

  return <Text weight="bold" >Your reputation in "{selectedCategory.name}" category is {reputation}</Text>;
};

export default YourReputation;
