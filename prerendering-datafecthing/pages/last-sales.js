import { useEffect, useState } from "react";

function LastSales() {
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/sales.json"
      );
      const data = await response.json();
      setLoading(false);

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
      {loading ? (
        <h2>LOADING...</h2>
      ) : (
        <ul>
          {sales &&
            sales.map((item, i) => (
              <li key={i}>
                {item.username} {item.volume}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default LastSales;
