import React from 'react';

function Card({ data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="card">
      <h2>{data.name}</h2>
      <div className="bank-info">
        <p>Сумма: {data.amount} {data.currency}</p>
        <p>Дата создания: {new Date(data.date).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Card;
