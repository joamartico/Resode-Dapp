import React, { useEffect, useState } from 'react';

const useColor = () => {
  const [color, setColor] = useState("red");

  useEffect(() => {
    setTimeout(() => {
        setColor('green');
    }, 3000);
  }, [])
  

  return [color];
};

export default useColor;
