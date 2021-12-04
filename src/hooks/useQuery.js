import { useMoralisQuery } from 'react-moralis';

const useQuery = propsJSON => {
  const { query, values, actualValue, wantedValue, change, live } = propsJSON;
  if (!query) return null;

  if (values) {
    return JSON.parse(
      JSON.stringify(
        useMoralisQuery(query, query => query.equalTo(actualValue, wantedValue), change, {
          live: live,
        }).data,
        values
      )
    );
  } else {
    return JSON.parse(
      JSON.stringify(
        useMoralisQuery(query, query => query.equalTo(actualValue, wantedValue), change, {
          live: live,
        })
      )
    ).data;
  }
};

export default useQuery;
