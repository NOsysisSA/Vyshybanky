import React from "react";
import "../Styles/cards.css";
import Card from "./Card";
function Cards({ banks }) {
  return (
    <div className="content">
      <div className="cards">
        {banks.map((bank, index) => (
          <div key={index}>
            {bank.banka ? <Card bank={bank} /> : <p>Err</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
