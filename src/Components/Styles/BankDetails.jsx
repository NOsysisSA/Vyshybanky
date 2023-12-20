import React from 'react';
import { useParams } from 'react-router-dom';

function BankDetails() {
  const { id } = useParams();

  // Вместо этого места, загрузите информацию о банке по id из вашего источника данных
  const bankDetails = {
    id: id,
    ownerName: 'Владелец банки',
    // Другие данные о банке...
  };

  return (
    <div>
      <h2>Информация о банке {id}</h2>
      <p>Владелец банки: {bankDetails.ownerName}</p>
      {/* Другие детали о банке */}
    </div>
  );
}

export default BankDetails;
