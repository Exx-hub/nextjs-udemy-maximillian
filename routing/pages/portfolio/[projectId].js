import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();
  console.log(router);
  return <div>PortfolioProjectPage: {router.query.projectId}</div>;
}

export default PortfolioProjectPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
