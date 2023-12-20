import { useParams } from "react-router-dom";
import "./card.css";
import React from 'react';

function Card({ banks }) {
  const { bankId } = useParams();
  const selectedBank = banks.find((bank) => bank.banka === bankId);

  if (!selectedBank) {
    return <div> <h1>Банка не знайдена :(</h1> </div>;
  }

  return (
    <div className="card">
      <h3>{selectedBank.name}</h3>
    </div>
  );
}

export default Card;
