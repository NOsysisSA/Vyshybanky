import React from "react";
import Main from "./Components/AddBanka";
import { SWRConfig } from "swr";
import "./Styles/app.css";
function App() {
  const swrConfig = {
    refreshInterval: 10 * 60 * 1000,
    dedupingInterval: 10 * 60 * 1000,
  };
  return (
    <SWRConfig value={swrConfig}>
      <Main />
    </SWRConfig>
  );
}

export default App;
