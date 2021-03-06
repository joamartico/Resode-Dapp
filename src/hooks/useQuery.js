import { useEffect, useState } from 'react';

const useQuery = JSONProps => {
  const { query, values, live, filter, onChange, reverse, contract } = JSONProps;

  const [results, setResults] = useState([]);

  if (!query) return null;

  const getQuery = async () => {
    let _results = await contract?.getPastEvents(query, {
      fromBlock: 0,
      filter,
    });
    console.log('getQuery results', _results);
    // sort _results by time

    _results = _results.sort((a, b) => {
      return b.blockNumber - a.blockNumber;
    });

    await _results.map(async (result, i) => {
      await values.map(value => {
        _results[i][value] = _results[i].returnValues[value];
      });
    });
    _results = await (values ? JSON.parse(JSON.stringify(_results, values)) : _results);
    // reverse ? setResults(_results.reverse()) : setResults(_results);
    setResults(_results);
    return _results;
  };

  useEffect(
    () => {
      !live && getQuery();
    },
    Object.prototype.toString.call(onChange) === '[object Array]'
      ? [...onChange, contract]
      : [onChange, contract]
  );

  useEffect(
    () => {
      console.log('contract or onChange changed');
      live && getLiveQuery();
    },
    Object.prototype.toString.call(onChange) === '[object Array]'
      ? [...onChange, contract]
      : [onChange, contract]
  );

  // let events = 0;
  async function getLiveQuery() {
    getQuery();

    // console.log('getLiveQuery');
    await contract?.events[query]({
      fromBlock: 'latest',
      filter,
    }).on('data', async event => {
      // let newResult = await (values
      //   ? JSON.parse(JSON.stringify(event.returnValues, values))
      //   : event);
      // console.log('NEW RESULT (data): ', newResult);
      // setResults(prev => [newResult, ...prev]);
      getQuery();
    });
  }

  // if(!contract) return null;

  return results;
};

export default useQuery;
