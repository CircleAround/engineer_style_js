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
    birthDay: new Date(1534, 6, 23),
    prefecture_id: 3,
  },
  {
    id: 2,
    name: "豊臣秀吉",
    birthDay: new Date(1537, 3, 17),
    prefecture_id: 2,
  },
  {
    id: 3,
    name: "徳川家康",
    birthDay: new Date(1543, 1, 31),
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
  console.log(req.body);

  const body = req.body;
  users.push({ id: users.length + 1, name: body.name });
  console.log(users);

  res.status = 204;
  res.send("");
});

app.listen(port, () => {
  console.log(`access http://localhost:${port}`);
});
