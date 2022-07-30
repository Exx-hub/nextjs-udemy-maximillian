import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ClientsPage() {
  const router = useRouter();

  const handleLoad = () => {
    router.push("/clients/meggy/projectA");
  };
  return (
    <div>
      <h1>Clients Page</h1>
      <Link href="/clients/meggy">Meg Reyes</Link>
      <Link href="/clients/gysia">Gysia Zurbano</Link>
      <button onClick={handleLoad}>Load Project A</button>
    </div>
  );
}

export default ClientsPage;
