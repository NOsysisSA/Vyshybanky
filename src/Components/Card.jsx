import { useState } from "react";
import "./card.css";
import useSWR from "swr";
const fetchData = async (url) => {
  const responce = await fetch(url);
  const data = await responce.json();
  return data;
};
function Card() {
  const { data, error } = useSWR('https://jar-5pt4zcwc3a-ey.a.run.app/?jar=4CLy9vEFBM', fetchData);
  const [money, setMoney] = useState(0);

  if (error) {
    return <div>Loading error</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  const hendlAdd100 = () => {
    setMoney(money + 100);
  };
  const hendlAdd500 = () => {
    setMoney(money + 500);
  };
  const hendlAdd1000 = () => {
    setMoney(money + 1000);
  };
  return (
    <div className="card">
      <div className="info">
        <h2>monobank</h2>
        <img src="https://send.monobank.ua/img/jar/uah_50.png" />
        <p>{data.data.ownerName}</p>
        <h3>{data.data.name}</h3>
        <p>{data.data.description}</p>
        <div className="money">
          <p>
            Накопичено
            <br />
            {data.data.config && data.data.config.minAmount}
          </p>
          <p>
            Ціль
            <br />
            {data.data.config && data.data.config.maxAmount}
          </p>
        </div>
      </div>
      <div className="pay">
        <div className="addMonay">
          <h2>Сума поповнення</h2>
          <div className="counter">{money}</div>
          <button onClick={hendlAdd100}>+100</button>
          <button onClick={hendlAdd500}>+500</button>
          <button onClick={hendlAdd1000}>+1000</button>
        </div>
        <div className="payMet">
          <input placeholder="Ваше ім'я (не обов'язково)" />
          <input placeholder="Коментар (не обов'язково)" />
          <button>
            <img src="https://send.monobank.ua/img/mono_pay.svg" />
          </button>
          <button>
            <img src="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
