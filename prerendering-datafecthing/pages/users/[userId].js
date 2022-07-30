function UserIdPage({ user }) {
  return <div>UserIdPage: ID-{user}</div>;
}

export default UserIdPage;

export const getServerSideProps = async (context) => {
  const { params } = context;
  // console.log(params.userId);
  console.log("GETSERVERSIDEPROPS");

  return {
    props: {
      user: params.userId,
    },
  };
};

// for dynamic pages and SSR, getServerSideProps does not need to have getStaticPaths
// because it doesnt pre-generate the page so it doesnt need to know in advance
// getServerSideProps is run on every page request
//getStaticProps is only run on build time, and run again only to regenerate or fallback generation
