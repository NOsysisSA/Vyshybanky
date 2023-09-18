import * as ReactDOMClient from 'react-dom/client';
import App from './App';

import React from 'react'

function MyApp() {
  return (
    <div>
      <App/>
    </div>
  )
}

const app = ReactDOMClient.createRoot(document.getElementById("root"))
app.render(<MyApp />)