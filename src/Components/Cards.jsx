import React from "react";
import useSWR from "swr";
import "./cards.css";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function Cards({ id }) {
  const apiUrl = `https://jar-5pt4zcwc3a-ey.a.run.app/?jar=${id}`;
  const urlForPay = `https://send.monobank.ua/jar/${id}`
  const { data, error } = useSWR(apiUrl, fetchData);

  if (error) {
    return <div>Loading error</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  if (id)
    return (

      <div className="card">
        <img src="https://send.monobank.ua/img/jar/uah_50.png"/>
        <h3>{data.data.name}</h3>

        <div className="money">
          <div className="jarGoal">
            <p>
              Накопичено
              <br />
              {data.data.jarAmount !== undefined
                ? new Intl.NumberFormat("UAH", {
                    style: "currency",
                    currency: "UAH",
                  }).format(data.data.jarAmount)
                : "N/A"}
            </p>
          </div>
          <div className="jarAmount">
            <p>
              Ціль
              <br />
              {data.data.jarGoal !== undefined
                ? new Intl.NumberFormat("UAH", {
                    style: "currency",
                    currency: "UAH",
                  }).format(data.data.jarGoal)
                : "N/A"}
            </p>{" "}
          </div>
          </div>
          <div className="info">
            <p>{data.data.ownerName}</p>
            <p>{data.data.description}</p>
            <div className="btn">
                <button>Поповнити</button>
                <a href={urlForPay}>Поповнити</a>
            </div>
          </div>
      </div>
    );
}

export default Cards;
