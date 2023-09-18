
import React from 'react';
import { SWRConfig } from 'swr';
import Data from './Components/Data';


function App() {
  return (
    <div>
      <SWRConfig value={{refreshInterval:1000}}>
        <Data url="https://jsonplaceholder.typicode.com/users" />
      </SWRConfig>
    </div>
  );
}

export default App;
