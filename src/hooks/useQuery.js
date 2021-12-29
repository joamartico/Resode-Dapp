import { useEffect, useState } from 'react';
import useGlobalState from './useGlobalState';

const useQuery = propsJSON => {
  const { query, values,live, filter, onChange, reverse } =
    propsJSON;
  const { contract } = useGlobalState();
  const [results, setResults] = useState([]);

  if (!query || !contract) return null;

  useEffect(() => {
    getQuery();
    live && getLiveQuery();
  }, Object.prototype.toString.call(onChange) === '[object Array]' ? [...onChange] : [onChange])

  async function getQuery() {
    let _results = await contract.getPastEvents(query, {
      fromBlock: 0,
      filter,
    });
    await _results.map(async (result, i) => {
      await values.map(value => {
        _results[i][value] = _results[i].returnValues[value];
      });
    });
    _results = await (values ? JSON.parse(JSON.stringify(_results, values)) : _results);
    reverse ? setResults(_results.reverse()) : setResults(_results);
    return _results;
  }

  // let events = 0;
  async function getLiveQuery() {
    console.log('getLiveQuery');
    await contract.events[query]({
      fromBlock: 'latest',
      filter,
    }).on('data', async event => {
      let newResult = await (values
        ? JSON.parse(JSON.stringify(event.returnValues, values))
        : event);
      console.log('NEW RESULT (data): ', newResult);
      setResults(prev => [newResult, ...prev]);
      // events = (await events + 1 )
    });
  }

  if (results) {
    return [results];
  } else {
    // setResults([])
    return [];
  }
};

export default useQuery;
