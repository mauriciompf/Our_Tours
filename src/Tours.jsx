import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";

export default function Tours() {
  const url = "https://www.course-api.com/react-tours-project";
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Can't fetch data, error status: ${res.status}`);
      }
      const d = await res.json();
      setData(d);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const [expanded, setExpanded] = useState([]);

  function toggleExpand(index) {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  }

  const caracterLimit = 200;

  const tours = data.map(({ id, image, name, price, info }, index) => (
    <li key={id}>
      <div>
        <img src={image} alt={name} />
        <p>Price: ${price}</p>
      </div>
      <h3>{name}</h3>
      <p>
        {expanded[index] ? info : `${info.substring(0, caracterLimit)}...`}
        {info.length > caracterLimit && (
          <a href="#" onClick={() => toggleExpand(index)}>
            {expanded[index] ? " Show Less" : "Read More"}
          </a>
        )}
      </p>
      <Button>Not Interested</Button>
    </li>
  ));

  return (
    <section>
      <ul>{tours}</ul>
    </section>
  );
}
