import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import "./add.css";

function AddBanka() {
  const [bankId, setBankId] = useState('')
  const [data, setData] = useState(null)
  const [banks, setBanks] = useState([])


  const apiUrl = `https://jar-5pt4zcwc3a-ey.a.run.app/?jar=${bankId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const responseData = await res.json()
        setData(responseData);
      } catch (error) {
        console.error('Loading error:', error)
      }
    }

    if (bankId) {
      fetchData();
    }
  }, [bankId, apiUrl]);

  useEffect(() => {

    const storedBanks = localStorage.getItem("banks");
    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    }
  }, []);

  const handleInputChange = (event) => {
    setBankId(event.target.value)
  }

  const addBank = () => {
    if (data && data.data) {
      let percent = data.data.jarAmount / data.data.jarGoal * 100
      percent = Math.floor(percent);

      const newBank = {
        percent: percent,
        id: bankId,
        banka: data.data,
        date: Date.now(),
      }


      const updatedBanks = [...banks, newBank];
      localStorage.setItem("banks", JSON.stringify(updatedBanks));


      setBanks(updatedBanks)
      setBankId('')
    }
  }
  console.log(banks)

  const handleSortByDateOldToNew = () => {
    const sortedData = [...banks].sort((a,b) => a.date - b.date)
    setBanks(sortedData)
  }

  const handleSortByDateNewToOld = () => {
    const sortedData = [...banks].sort((a,b) => b.date - a.date)
    setBanks(sortedData)
  }

  const handleSortByPErcentCleanToFull = () => {
    const sortedData = [...banks].sort((a,b) => a.percent - b.percent)
    setBanks(sortedData)
  }

  const handleSortByPErcentFullToClean = () => {
    const sortedData = [...banks].sort((a,b) => b.percent - a.percent)
    setBanks(sortedData)
  }

  return (
    <div className="main">
      <div className="addBanks">
        <label>Введіть ID </label>
        <input type="text" value={bankId} onChange={handleInputChange} />
        <button onClick={addBank}>AddBank</button>
      </div>
      <div className="sortBat">
        <button onClick={handleSortByDateNewToOld}>Від нових до старих</button>
        <button onClick={handleSortByDateOldToNew}>Від старих до нових</button>
        <button onClick={handleSortByPErcentCleanToFull}>Від порожніх до повних</button>
        <button onClick={handleSortByPErcentFullToClean}>Від повних до порожніх</button>
      </div>
      <div className='cards'>
        <Cards banks={banks} />
      </div>
    </div>
  )
}

export default AddBanka;
