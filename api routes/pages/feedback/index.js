import Link from "next/link";
import { buildFilePath, getData } from "../api/feedback";
import { useState } from "react";

function FeedbackPage({ feedbackList }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItem = async (id) => {
    const response = await fetch(`http://localhost:3000/api/feedback/${id}`);
    const data = await response.json();

    console.log(data);

    setSelectedItem(data);
  };
  return (
    <div>
      <h1>FeedbackPage</h1>
      <ul>
        {feedbackList.map((item) => (
          <li key={item.id}>
            {item.feedback} - {item.email}{" "}
            <button onClick={() => fetchItem(item.id)}>Item Details</button>
            <Link href={`/feedback/${item.id}`}>View Item</Link>
          </li>
        ))}
      </ul>
      <hr />
      {selectedItem && (
        <h2>
          {selectedItem.feedback} - {selectedItem.email}
        </h2>
      )}
    </div>
  );
}

export default FeedbackPage;

// instead of calling api/feedback to get the data from feedback.json, write server-side code directly here
// access the database here instead of calling the api route which will also access the data base the same way
// adds an extra step to do that when you can do it directly here
// notice that buildFilePath and getData are also the functions you used to access the database, write on the
// database and retrieve items from the database in your API route. so we use these functions again,
// instead of using the API route to get the same results

export const getStaticProps = async () => {
  const filePath = buildFilePath();
  const data = getData(filePath);

  return {
    props: {
      feedbackList: data,
    },
    revalidate: 10,
  };
};
