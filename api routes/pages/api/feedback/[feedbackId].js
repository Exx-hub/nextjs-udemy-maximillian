import { buildFilePath, getData } from ".";

export default function handler(req, res) {
  const id = req.query.feedbackId;
  const filePath = buildFilePath();
  const data = getData(filePath);
  const foundItem = data.find((item) => item.id === id);

  res.status(200).json({ message: "success", data: foundItem });
}

// find - for getting one value or object
// filter - to get an array with found item
