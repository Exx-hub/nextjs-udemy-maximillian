function UserProfilePage(props) {
  return <div>{props.username}</div>;
}

export default UserProfilePage;

export const getServerSideProps = (context) => {
  // const { params, query, req, res } = context;
  // console.log(context.req.params);
  return {
    props: {
      username: "Meg",
    },
  };
};

// SERVER SIDE RENDERING
// -- pre-render a page for every incoming request / or if you need to access the request object
// -- example are if you need access to cookies

// getServerSideProps -- run on every incoming request for the page

// will not be called in advanced but will be called on every request
// same as getStatic that returns a props object
// can also have notFound key and redirect key
// also has context object -- which has the request object

// but it cannot have revalidate key like in ISR, cause it already reruns on every request
