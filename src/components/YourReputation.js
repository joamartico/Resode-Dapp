import React from 'react';
import { useGlobalState } from '../Context';

const YourReputation = () => {
  const { selectedCategory } = useGlobalState();

  return <div>Your reputation in "{selectedCategory.name}"" Category is 80</div>;
};

export default YourReputation;
