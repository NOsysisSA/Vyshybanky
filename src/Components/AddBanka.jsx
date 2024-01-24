import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import "../Styles/add.css";

function AddBanka() {
  const [bankId, setBankId] = useState("");
  const [data, setData] = useState(null);
  const [banks, setBanks] = useState([]);

  const apiUrl = `https://jar-5pt4zcwc3a-ey.a.run.app/?jar=${bankId}`;

  useEffect(() => {
    const storedBanks = localStorage.getItem("banks");
    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    }
  }, []);

  const handleInputChange = (event) => {
    setBankId(event.target.value);
  };

  const addBank = async () => {
    if (bankId) {
      try {
        const res = await fetch(apiUrl);
        const responseData = await res.json();
        const bankId = apiUrl.replace(
          "https://jar-5pt4zcwc3a-ey.a.run.app/?jar=",
          ""
        );
        let percent =
          (responseData.data.jarAmount / responseData.data.jarGoal) * 100;
        percent = Math.floor(percent);

        const newBank = {
          percent: percent,
          id: bankId,
          banka: responseData.data,
          date: Date.now(),
        };

        const updatedBanks = [...banks, newBank];
        localStorage.setItem("banks", JSON.stringify(updatedBanks));

        setBanks(updatedBanks);
        setBankId("");
        setData(responseData);
      } catch (error) {
        console.error("Loading error:", error);
      }
    }
  };

  const handleSortByDateOldToNew = () => {
    const sortedData = [...banks].sort((a, b) => a.date - b.date);
    setBanks(sortedData);
  };

  const handleSortByDateNewToOld = () => {
    const sortedData = [...banks].sort((a, b) => b.date - a.date);
    setBanks(sortedData);
  };

  const handleSortByPErcentCleanToFull = () => {
    const sortedData = [...banks].sort((a, b) => a.percent - b.percent);
    setBanks(sortedData);
  };

  const handleSortByPErcentFullToClean = () => {
    const sortedData = [...banks].sort((a, b) => b.percent - a.percent);
    setBanks(sortedData);
  };

  const handleDelete = (bankId) => {
    const updatedBanks = banks.filter((bank) => bank.id !== bankId);
    localStorage.setItem("banks", JSON.stringify(updatedBanks));
    setBanks(updatedBanks);
  };

  return (
    <div className="main">
      <div className="addBanks">
        <label>Введіть ID </label>
        <input type="text" value={bankId} onChange={handleInputChange} />
        <button onClick={addBank}>Додати банку</button>
      </div>
      {banks.length !== 1 && (
        <div className="sortBar">
          <button className="sortButton" onClick={handleSortByDateNewToOld}>
            Від нових до старих
          </button>
          <button className="sortButton" onClick={handleSortByDateOldToNew}>
            Від старих до нових
          </button>
          <button
            className="sortButton"
            onClick={handleSortByPErcentCleanToFull}
          >
            Від порожніх до повних
          </button>
          <button
            className="sortButton"
            onClick={handleSortByPErcentFullToClean}
          >
            Від повних до порожніх
          </button>
        </div>
      )}

      <div className="cards">
        <Cards handleDelete={handleDelete} banks={banks} />
      </div>
    </div>
  );
}

export default AddBanka;
