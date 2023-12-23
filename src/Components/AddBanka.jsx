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

  return (
    <div className="body">
      <button className="openButton" onClick={openModal}><IoMenuSharp /></button>
      {isModalOpen && (
        <div className="add">
          <button className="closeButton" onClick={closeModal}>X</button>
          <h1>Додати банку</h1>
          <input
            type="text"
            placeholder="Введите URL"
            value={bankURL}
            onChange={(e) => setBankURL(e.target.value)}
          />
          <button onClick={addBank}>ОК</button>
        </div>
      )}
      <div className="cards">
        {banks.map((bank, index) => (
          <Cards key={index} id={bank.banka} />
        ))}
      </div>
    </div>
  );
}

export default AddBanka;
