import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Card from "./Card";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Route as ReactRoute,
  Navigate,
} from "react-router-dom";
import "./add.css";

function AddBanka() {
  const [bankURL, setBankURL] = useState("");
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const savedBanks = JSON.parse(localStorage.getItem("banks")) || [];
    setBanks(savedBanks);
  }, []);

  const addBank = () => {
    if (bankURL !== "") {
      const bankId = bankURL.replace(
        "https://jar-5pt4zcwc3a-ey.a.run.app/?jar=",
        ""
      );

      const newBank = {
        banka: bankId,
        date: Date.now(),
      };

      setBanks((prevBanks) => [...prevBanks, newBank]);
      const updatedBanks = [...banks, newBank];
      localStorage.setItem("banks", JSON.stringify(updatedBanks));

      setBankURL("");
    }
  };

  return (
    <Router>
      <div className="body">
        <div className="add">
          <h1>Додати банку</h1>
          <input
            type="text"
            placeholder="Введіть URL"
            value={bankURL}
            onChange={(e) => setBankURL(e.target.value)}
          />
          <button onClick={addBank}>Додати банку</button>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/cards" />} />
          <Route
            path="/cards"
            element={
              <div className="cards">
                {banks.map((bank, index) => (
                  <Cards key={index} id={bank.banka} />
                ))}
              </div>
            }
          />
          <Route path="/cards/:bankId" element={<Card banks={banks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AddBanka;
