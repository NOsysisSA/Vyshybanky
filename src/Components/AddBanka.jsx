import React, { useState, useEffect } from 'react';
import Card from './Card';

function AddBanka() {
  const [bankURL, setBankURL] = useState('')
  const [banks, setBanks] = useState([])
  const [bankId, setBankId] = useState('')

  useEffect(() => {
    const savedBanks = JSON.parse(localStorage.getItem('banks')) || []
    setBanks(savedBanks)
  }, []);

  const addBank = () => {
    if (bankURL !== '') {
      const bankId = bankURL.replace(
        'https://jar-5pt4zcwc3a-ey.a.run.app/?jar=', ''
      )

      const newBank = {
        banka: bankId,
        date: Date.now(),
      }

      setBanks((prevBanks) => [...prevBanks, newBank])
      localStorage.setItem('banks', JSON.stringify([...banks, newBank]))

      setBankURL('');
      setBankId(bankId)
    }
  }

  return (
    <div>
      <h1>Банки</h1>
      <input
        type="text"
        placeholder="Введите URL"
        value={bankURL}
        onChange={(e) => setBankURL(e.target.value)}
      />
      <button onClick={addBank}>Добавить банку</button>
      <div>
        {banks.map((bank, index) => (
          <div key={index}>{bank.banka}</div>
        ))}
      </div>
      <Card id={bankId} />
    </div>
  )
}

export default AddBanka;
