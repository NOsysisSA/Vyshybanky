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
  const urlForPay = `https://send.monobank.ua/jar/${id}`;
  const { data, error } = useSWR(apiUrl, fetchData);

  if (error) {
    return <div>Ошибка загрузки</div>;
  }
  if (!data) {
    return <div>Загрузка...</div>;
  }


  let percent = Math.floor((data.data.jarAmount / data.data.jarGoal) * 100);
  let widthStyle = {
    width: `${percent}%`
  }
  return (
    <div className="card">
      <img src="https://send.monobank.ua/img/jar/uah_50.png" alt="Банка" />
      <h3>{data.data.name}</h3>
      <div className="percent">{percent}%</div>
      <div className="line">
        <div style={widthStyle} className="res">.</div>
      </div>
      <div className="money">
        <div className="jarGoal">
          <p>
            Накоплено
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
            Цель
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
      </div>
      <div className="btn">
        <a href={urlForPay}>Поповнити</a>
      </div>
    </div>
  );
}

export default Cards;
