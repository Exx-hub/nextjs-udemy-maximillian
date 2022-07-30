import { useRouter } from "next/router";
import React from "react";

function ClientDetails() {
  const router = useRouter();
  console.log(router);
  return <div>ClientDetails for {router.query.clientDetails}</div>;
}

export default ClientDetails;
