import path from "path";
import fs from "fs/promises";

function ProductDetail({ product }) {
  console.log(product);
  if (product) {
    console.log("BUILDING PAGE COMPONENT");
  } else {
    console.log("BUILDING PAGE COMPONENT w/o title");
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      ProductDetail{product.id}: {product.title}
    </div>
  );
}

export default ProductDetail;

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();

  //   console.log(data);

  console.log("RUNNING GETSTATICPATHS");

  const paths = data.map((item) => {
    return {
      params: { pid: item.id },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  console.log("RUNNING GET STATIC PROPS FOR THE PATHS");
  const id = context.params.pid;
  console.log("context:", context);

  const response = await fetch(`http://localhost:4000/products/${id}`);
  const data = await response.json();

  if (!data.title) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
    },
  };
};

// ***if static pages, and using dynamic routing (slugs), will work as expected.
// but if you will use getStaticProps to pre-render the page, getStaticPaths is needed to be used.
// so whenever you are pre-generating dynamic pages, you will need getStaticPAths.

// getStaticPaths enables nextjs to know how many dynamic pages it needs to pre-generate.
// PRE-GENERATED Paths (Routes)

// MY UNDERSTANDING OF FLOW using getStaticPaths

// -- when app is built for production, npm run build, nextjs sees the getStaticPaths function.
// next runs getstaticpaths to generate or determine paths the will be pre-generated.
// getStaticPAths is run and fetches data then returns number of paths needed. depending on number of items
// fetched.

// for each path created, getStaticProps is run getting the id from the context object, and fetches individual
// data using the id from context.
// and for each getStaticProps run, page component is also run.

// so if fetched data count is 4 items, getStaticProps will be run 4 times. also page component.
// because getStaticProps passes props for page component use.

// so getStaticPaths = run once. fetches data and determines how many paths shuold be pre-generated
// getStaticProps = run for each path created and pre-generates page component for each path as well.

// FALLBACK key
//--- used if you have a lot of pages that needs to be pre-generated
// so the idea is you will pre-render some of your pages, and dynamically generate the other pages using
// fallback
// fallback true, shows a fallback page, or a spinner and when page and props are ready shows page
// fallback false, shows a 404
//fall back blocking, waits for page and props to be ready

// ***when there is a link, nextjs automatically pre-fetches data for that link

// notFound: true property for determining if there is data from getStaticProps, if there is none,
// display a 404 page instead of a page component with blank data

//--- getStaticProps and getStaticPaths work hand in hand
// both are not called on every incoming request but usually run at build time.
// although in the case of ISR for regenerating, it is called on every request
// in both, you dont have access to the actual request that is incoming.
// both are generally called when the project is built

// SERVER SIDE RENDERING
// -- pre-render a page for every incoming request / or if you need to access the request object
// -- example are if you need access to cookies

// getServerSideProps -- run on every incoming request for the page

// so either use getServer or getStatic. cannot use both in the same page

//cont in userProfile to see this in action
