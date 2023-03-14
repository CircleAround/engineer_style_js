const retriveUsers = async () => {
  try {
    const users = await fetchUsers(); // *1
    updateUsers(users); // *2
  } catch (err) {
    console.error(err);
  }
};

const fetchUsers = async () => {
  const res = await fetch("/users.json");
  return await res.json();
};

const updateUsers = (users) => {
  const usersList = users.map((user) => `<li>${user.name}</li>`).join("");
  const usersElm = document.getElementById("users");
  usersElm.innerHTML = usersList;
};

const addUser = async (user) => {
  await fetch("/users", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const fetchPrefectures = async () => {
  const res = await fetch("/prefectures.json");
  return await res.json();
};

const retriveUserWithDetails = async () => {
  const promises = [fetchUsers(), fetchPrefectures()];
  const [users, prefectures] = await Promise.all(promises);
  updateUserWithDetails(users, prefectures);
};

const updateUserWithDetails = (users, prefectures) => {
  const usersList = users
    .map((user) => {
      const prefecture = prefectures.find(
        (prefecture) => prefecture.id === user.prefecture_id
      );
      return `<li>${user.name}: ${prefecture?.name || "不明"}</li>`;
    })
    .join("");
  const usersElm = document.getElementById("users");
  usersElm.innerHTML = usersList;
};
