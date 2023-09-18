import List from './List';
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data)

function Data({ url }) {
  const { data, error } = useSWR(url, fetcher)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return <List users={data} />
}

export default Data
