import React from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const apiUrl = `https://jar-5pt4zcwc3a-ey.a.run.app/?jar=${id}`;
  const { data, error } = useSWR(apiUrl, fetchData);

  if (error) {
    return <div>Error loading data</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    navigate(`/cards/${id}`);
  };

  return (
    <div className="card">
      <img src="https://send.monobank.ua/img/jar/uah_50.png"/>
      <h3>{data.data.name}</h3>

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
          </p>
        </div>
      </div>
      <div className="info">
        <p>{data.data.ownerName}</p>
        <p>{data.data.description}</p>
        <div className="btn">
          <button onClick={handleClick}>Пополнить</button>
        </div>
      </div>
    </div>
  );
}

export default Cards;