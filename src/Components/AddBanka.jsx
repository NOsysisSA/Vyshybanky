import React, { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";
import Cards from "./Cards";
import "./add.css";

function AddBanka() {
  const [bankURL, setBankURL] = useState("");
  const [banks, setBanks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);  


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
      closeModal();
    }
    
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hendlSortByDateOldtoNew = () => {
    const sortedData = [...banks].sort((a, b) => b.date - a.date);
    setBanks(sortedData);
  };

  const hendlSortByDateNewtoOld = () => {
    const sortedData = [...banks].sort((a, b) => a.date - b.date);
    setBanks(sortedData);
  };

  

  return (
    <div className="body">
      <div className="header">
        <div className="add">
          <button className="openButton" onClick={openModal}>
            <IoMenuSharp />
          </button>

          {isModalOpen && (
            <div className="addModal">
              <button className="closeButton" onClick={closeModal}>
                X
              </button>
              <h1>Додати банку</h1>
              <input
                type="text"
                placeholder="Введіть ID банки"
                value={bankURL}
                onChange={(e) => setBankURL(e.target.value)}
              />
              <button onClick={addBank}>ОК</button>
            </div>
          )}
        </div>
      </div>
      <div className="sortBar">
        <button onClick={hendlSortByDateNewtoOld}>Від нових до старих</button>
        <button onClick={hendlSortByDateOldtoNew}>Від старих до нових</button>
      </div>
      <div className="cards">
        {banks.map((bank, index) => (
          <Cards  key={index} id={bank.banka} />
        ))}
      </div>
    </div>
  );
}

export default AddBanka;
