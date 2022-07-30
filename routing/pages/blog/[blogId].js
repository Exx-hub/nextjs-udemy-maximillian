import { useRouter } from "next/router";
import React from "react";

function Blog() {
  const router = useRouter();

  console.log(router);
  return <div>One Blog</div>;
}

export default Blog;
