import List from './List';
import React from 'react';
import useSWR from 'swr';


function Data() {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return <List users={data} />
}

export default Data 
