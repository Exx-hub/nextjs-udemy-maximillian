import { useEffect, useState } from "react";

function Combined(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(false);

  console.log("FROM GETSTATICPROPS:", props);

  useEffect(() => {
    const fetchData = async () => {
      //   setLoading(true);
      const response = await fetch(
        "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/sales.json"
      );
      const data = await response.json();
      //   setLoading(false);

      const transformedSales = [];

      for (let key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>LastSales</h2>
      <ul>
        {sales &&
          sales.map((item, i) => (
            <li key={i}>
              {item.username} {item.volume}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Combined;

export const getStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (let key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    // revalidate: 10,
  };
};

// since you are pre-generating data and also revalidating data using client side fetching,
// you dont need loading ternary because there will be data displayed immediately
// setting props from getStaticProps as initial state will immediately display data
// then when component mounts, useEffect will run to fetch data again, to revalidate pre-fetched data
// to check if anything changed. to fetch the latest data
