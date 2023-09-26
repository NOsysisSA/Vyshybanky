import "./card.css";
import useSWR from "swr";

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function Card({ id }) {
  const apiUrl = `https://jar-5pt4zcwc3a-ey.a.run.app/?jar=${id}`

  const { data, error } = useSWR(apiUrl, fetchData);

  if (error) {
    return <div>Loading error</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

if(id)  return (
    <div className="card">
      <div className="info">
        <h2>monobank</h2>
        <img src="https://send.monobank.ua/img/jar/uah_50.png" alt="Monobank" />
        <p>{data.data.ownerName}</p>
        <h3>{data.data.name}</h3>
        <p>{data.data.description}</p>
        <div className="money">
          <p>
            Накопичено
            <br />
            {data.data.config && data.data.jarGoal}
          </p>
          <p>
            Ціль
            <br />
            {data.data.config && data.data.jarAmount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
