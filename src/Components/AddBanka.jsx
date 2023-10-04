import React, { useState, useEffect } from 'react';
import Card from './Card';
import './addbanka.css';

function AddBanka() {
  const [bankURL, setBankURL] = useState('');
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const savedBanks = JSON.parse(localStorage.getItem('banks')) || [];
    setBanks(savedBanks);
  }, []);

  const addBank = () => {
    if (bankURL !== '') {
      const bankId = bankURL.replace(
        'https://jar-5pt4zcwc3a-ey.a.run.app/?jar=', ''
      );

      const newBank = {
        banka: bankId,
        date: Date.now(),
      };

      setBanks((prevBanks) => [...prevBanks, newBank]);
      const updatedBanks = [...banks, newBank];
      localStorage.setItem('banks', JSON.stringify(updatedBanks));

      setBankURL('');
    }
  }

  return (
    <div className='add'>
      <h1>Додати банку</h1>
      <input
        type="text"
        placeholder="Введіть URL"
        value={bankURL}
        onChange={(e) => setBankURL(e.target.value)}
      />
      <button onClick={addBank}>Додати банку</button>
      <div className='body'>
        {banks.map((bank, index) => (
          <div className='cardContainer'>
            <Card key={index} id={bank.banka} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddBanka;
