
import React from 'react';
import { SWRConfig } from 'swr';
import Data from './Components/Data';
import axios from 'axios';

function App() {
  return (
    <div>
      <SWRConfig value={{refreshInterval:3600000, fetcher: (url) => axios.get(url).then((res) => res.data)}}>
        <Data url="https://jsonplaceholder.typicode.com/users" />
      </SWRConfig>
    </div>
  );
}

export default App;
