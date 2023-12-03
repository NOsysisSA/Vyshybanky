import React from 'react'
import AddBanka from './Components/AddBanka'
import { SWRConfig } from 'swr';
import './app.css'
function App() {
  const swrConfig = {
    refreshInterval: 10 * 60 * 1000,
    dedupingInterval: 10 * 60 * 1000,
  }
  return (
    <SWRConfig value={swrConfig}>
    <div className='app'>
      <AddBanka/> 
    </div>
    </SWRConfig>
  )
}

export default App