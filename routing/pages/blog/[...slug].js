import { useRouter } from "next/router";
import React from "react";

function CatchAll() {
  const router = useRouter();

  console.log(router);
  return <div>CatchAll</div>;
}

export default CatchAll;
