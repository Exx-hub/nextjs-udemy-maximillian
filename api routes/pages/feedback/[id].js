import { buildFilePath, getData } from "../api/feedback";

function FeedBackItem({ feedbackItem }) {
  return (
    <div>
      <h2>FeedBackItem</h2>
      {feedbackItem && (
        <p>
          {feedbackItem.feedback} - {feedbackItem.email}
        </p>
      )}
    </div>
  );
}

export default FeedBackItem;

export const getStaticPaths = async () => {
  const filePath = buildFilePath();
  const data = getData(filePath);

  const paths = data.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const filePath = buildFilePath();
  const data = getData(filePath);
  const foundItem = data.find((item) => item.id === context.params.id);
  return {
    props: {
      feedbackItem: foundItem,
    },
  };
};
