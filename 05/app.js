const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT | 3000;

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const prefectures = [
  {
    id: 1,
    name: "東京都",
  },
  {
    id: 2,
    name: "大阪府",
  },
  {
    id: 3,
    name: "愛知県",
  },
];

const users = [
  {
    id: 1,
    name: "織田信長",
    prefecture_id: 3,
  },
  {
    id: 2,
    name: "豊臣秀吉",
    prefecture_id: 2,
  },
  {
    id: 3,
    name: "徳川家康",
    prefecture_id: 1,
  },
];

app.get("/users.json", (req, res) => {
  console.log(users);
  res.header("Content-Type", "application/json");
  res.send(users);
});

app.get("/prefectures.json", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(prefectures);
});

app.post("/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, name: body.name });

  res.status = 204;
  res.send("");
});

app.listen(port, () => {
  console.log(`access http://localhost:${port}`);
});
