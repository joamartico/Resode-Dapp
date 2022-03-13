import { useEffect, useState } from 'react';

const useMethod = (contract, method, args) => {
  const [result, setResult] = useState();

  if (!method) return null;


  // hace falta el useEffect?

  useEffect(() => {
    args
      ? contract.methods[method](args)
          .call()
          .then(res => {
            setResult(res);
          })
      : contract.methods[method]()
          .call()
          .then(res => {
            setResult(res);
          });
  }, []);

  return result;
};

export default useMethod;
