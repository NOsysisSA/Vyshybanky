import React from "react";
import "../Styles/cards.css";
import Card from "./Card";
function Cards({ banks, handleDelete }) {
  return (
    <div className="content">
      <div className="cards">
        {banks.map((bank, index) => (
          <div key={index}>
            {bank.banka ? <Card handleDelete={handleDelete} bank={bank} /> : <p>Err</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
