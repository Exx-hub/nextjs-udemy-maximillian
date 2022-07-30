import fs from "fs";
import path from "path";

export const buildFilePath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const getData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
};

export default async function handler(req, res) {
  const { email, feedback } = req.body;
  const filePath = buildFilePath();
  const data = getData(filePath);

  if (req.method === "POST") {
    // create data object from post request
    const newFeedBack = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    // save in database or file
    data.push(newFeedBack);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "success", data: newFeedBack });
  } else {
    // if not a post request, must be a GET request
    // gets data from json and send to client
    res.status(200).json({ message: "success", data });
  }
}
