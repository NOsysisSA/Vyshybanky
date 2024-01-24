import React from "react";
import { TiTrash } from "react-icons/ti";
import "../Styles/card.css"
function Card({ bank, handleDelete }) {
  return (
    <div className="card">
      <div className="img">
        <img src="https://send.monobank.ua/img/jar/uah_50.png" alt="Банка" />
      </div>
      {bank.banka ? (
        <>
          <div className="name">
            <h1>{bank.banka.name}</h1>
          </div>
          <p>{bank.percent}%</p>
          <div className="line">
            <div style={{ width: `${bank.percent}%` }} className="res"></div>
          </div>
          <div className="money">
            <div className="jarAmount">
              <p>Накопичено</p>
              <p>{bank.banka.jarAmount}₴</p>
            </div>
            <div className="jarGoal">
              <p>Мета</p>
              <p>{bank.banka.jarGoal}₴</p>
            </div>
          </div>
          <div className="info">
            <strong>
              <p>{bank.banka.ownerName}</p>
            </strong>
            <p className="description">{bank.banka.description}</p>
          </div>
          <div>
          <TiTrash onClick={() => handleDelete(bank.id)} className="deleteButton" />
          </div>
        </>
      ) : (
        <p>Помилка завантаження данних</p>
      )}
    </div>
  );
}

export default Card;
