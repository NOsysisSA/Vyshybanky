import React from "react";
import "./cards.css";
function Cards({ banks }) {

  return (
    <div className="content">
      <div className="cards">
        {banks.map((bank, index) => (
          <div key={index}>
            {bank.banka ? (
              <div className="card">
                <div className="img">

                  <img
                    src="https://send.monobank.ua/img/jar/uah_50.png"
                    alt="Банка"
                  />
                </div>
                <div className="name">
                  <h1>{bank.banka.name}</h1>
                </div>
                <p>{bank.percent}%</p>
                <div className="line">  
                  <div
                    style={{ width: `${bank.percent}%` }}
                    className="res"
                  ></div>
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
                  <strong><p>{bank.banka.ownerName}</p></strong>
                  <p className="description">{bank.banka.description}</p>
                </div>
              </div>
            ) : (
              <p>Err</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
