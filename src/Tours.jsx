import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import loadingImage from "/loading.gif";

export default function Tours() {
  const caracterLimit = 200;
  const API_URL = "https://www.course-api.com/react-tours-project";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Can't fetch data, error status: ${res.status}`);
      }
      const d = await res.json();
      setData(d);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
      setLoading(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const [expanded, setExpanded] = useState([]);
  const [notInterestedTours, setNotInterestedTours] = useState([]);

  function toggleExpand(index) {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  }

  function markAsNotInterested(id) {
    setNotInterestedTours((prevNotInterested) => [...prevNotInterested, id]);
  }

  function refreshTours() {
    setNotInterestedTours([]);
    getData();
    setLoading(true);
  }

  const tours = data
    .filter((tour) => !notInterestedTours.includes(tour.id))
    .map(({ id, image, name, price, info }, index) => (
      <li key={id}>
        <article className="transition-shadow hover:shadow-2xl">
          <div className="relative">
            <img
              className="h-[400px] w-full rounded-t-md object-cover"
              src={image}
              alt={name}
            />
            <p className="absolute right-0 top-0 bg-green-500 p-2 text-lg tracking-widest text-white">
              ${price}
            </p>
          </div>
          <div className="grid gap-4 rounded-b-md bg-white py-8">
            <h2 className="px-6 text-center text-xl font-semibold capitalize tracking-widest">
              {name}
            </h2>
            <p className="px-6 text-gray-500">
              {expanded[index]
                ? info
                : `${info.substring(0, caracterLimit)}...`}
              {info.length > caracterLimit && (
                <span
                  className="cursor-pointer font-semibold text-green-500"
                  onClick={() => toggleExpand(index)}
                >
                  {expanded[index] ? " Show Less" : "Read More"}
                </span>
              )}
            </p>
            <Button onClick={() => markAsNotInterested(id)}>
              Not Interested
            </Button>
          </div>
        </article>
      </li>
    ));

  return (
    <section className="mx-auto grid w-[95%] gap-12">
      {loading ? (
        <div className="grid place-items-center">
          <img src={loadingImage} alt="Loading..." />
        </div>
      ) : notInterestedTours.length === data.length ? (
        <div className="grid gap-8 text-center">
          <h1 className="text-4xl tracking-widest">No Tours Left</h1>
          <Button
            className="hover:text-green mx-auto w-1/4 rounded-md bg-green-500 text-white transition-colors hover:border hover:border-green-500 hover:bg-white hover:text-green-500 focus:border focus:border-green-500 focus:bg-white focus:text-green-500"
            onClick={refreshTours}
          >
            Refresh
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 text-center">
            <h1 className="text-4xl tracking-widest">Our Tours</h1>
            <hr className="mx-auto w-1/4 rounded-md border-[3px] border-green-500" />
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(340px,_1fr))] gap-8">
            {tours}
          </ul>
        </>
      )}
    </section>
  );
}
