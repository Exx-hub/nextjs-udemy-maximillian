import { useRef, useState } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    if (email && feedback) {
      fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          email,
          feedback,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((e) => {
          console.log(e);
          emailRef.current.value = "";
          feedbackRef.current.value = "";
        });
    } else {
      alert("Required Fields are missing.");
    }
  };

  const handleFetch = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeedback(data.data);
      });
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Your Email Address</label>
        <input type="email" id="email" ref={emailRef} />
        <label htmlFor="feedback">Enter Feedback</label>
        <textarea rows={5} id="feedback" ref={feedbackRef} />
        <button type="submit">Send Feedback</button>
      </form>

      <hr />
      <div>
        <button onClick={handleFetch}>Fetch Feedback List</button>
        <ul>
          {feedback.map((item) => (
            <li key={item.id}>
              {item.feedback} - {item.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
