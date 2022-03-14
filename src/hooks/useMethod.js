import { useEffect, useState } from 'react';

const useMethod = JSONProps => {
  const { contract, method, args, onEventChange } = JSONProps;
  const [result, setResult] = useState();

  if (!method) return null;

  // hace falta el useEffect?

  useEffect(() => {
    // args
    //   ? contract.methods[method](args)
    //       .call()
    //       .then(res => {
    //         setResult(res);
    //       })
    //   : contract.methods[method]()
    //       .call()
    //       .then(res => {
    //         setResult(res);
    //       });

    // if (live) {
    //   args
    //     ? contract.methods[method](args)
    //         .call()
    //         .on('confirmation', res => {
    //           setResult(res);
    //         })
    //     : contract.methods[method]()
    //         .call()
    //         .on('confirmation', res => {
    //           setResult(res);
    //         });
    //   //     contract.methods[method](args)
    //   //         .call()
    //   //         .on('data', res => {
    //   //         setResult(res);
    //   //         })
    // } else {
    args
      ? contract.methods[method](...args)
          .call()
          .then(res => {
            setResult(res);
          })
      : contract.methods[method]()
          .call()
          .then(res => {
            setResult(res);
          });
    // }

    onEventChange &&
      contract.events[onEventChange]().on('data', data => {
        console.log('data', data);
        args
          ? contract.methods[method](...args)
              .call()
              .then(res => {
                setResult(res);
              })
          : contract.methods[method]()
              .call()
              .then(res => {
                setResult(res);
              });
      });
  }, []);

  return result;
};

export default useMethod;
