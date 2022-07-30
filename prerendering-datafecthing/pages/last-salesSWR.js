import useSWR from "swr";

const fetcher = async (key) => {
  console.log(key);
  const response = await fetch(
    "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/sales.json"
  );
  const jsonData = await response.json();

  const data = [];

  for (let key in jsonData) {
    data.push({
      id: key,
      username: jsonData[key].username,
      volume: jsonData[key].volume,
    });
  }

  return data;
};

function LastSalesSWR() {
  const { data, error, isValidating } = useSWR("sales", fetcher);
  console.log("error:", error);

  return (
    <div>
      <h2>LastSalesSWR</h2>
      {isValidating ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {data &&
            data.map((item, i) => (
              <li key={i}>
                {item.username} {item.volume}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default LastSalesSWR;

// first argumanet to useSWR is a unique key for the fetch request
// by default it is passed to the fetcher function. you can add key parameter to fetcher function
// and console log to see that it is passed to fetcher
// able to do normal javascript in the fetcher function to modify the fetched data
// useSWR returns data,error,isValidating(loading), etc
