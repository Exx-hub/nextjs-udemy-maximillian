export default function handler(req, res) {
  console.log(req.query.slug);
  res.send("hello");
}
