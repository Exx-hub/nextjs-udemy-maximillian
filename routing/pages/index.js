import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <Link href="/portfolio">Portfolio</Link>
      <Link href="/portfolio/list">Lists</Link>
      <Link href="/clients">Clients</Link>
    </div>
  );
}

export default Home;
