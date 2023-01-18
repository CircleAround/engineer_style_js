const fetchUsers0 = () => {
  // 通信の結果オブジェクトを表示するコールバック関数の作成
  const onfulfilled = (res) => { // *1
    console.log("[1']", res); // *1'
  }

  // エラーオブジェクトを表示するコールバック関数の作成
  const onrejected = (err) => { // *2
    console.error("[2']", err); // *2'
  }

  // fetchを呼ぶと通信が開始されかつ、Promiseオブジェクトが返る
  const promise = fetch("users.json"); // *3
  promise.then(onfulfilled, onrejected); // *4
}

const fetchUsers1 = () => {
  fetch("users.json").then((res) => {
    console.log(res);
  }, (err) => {
    console.error(err);
  });
}

const fetchUsers2 = () => {
  fetch("users.json").then((res) => {
    console.log(res);
    return res.json();
  }).then((users) => {
    console.log(users);
  });
}

const fetchUsers3 = () => {
  fetch("users.json").then((res) => {
    console.log(res);
    return res.json();
  }).then((users) => {
    console.log(users);
  }).catch((err) => {
    console.error(err);
  });
}

const fetchUsersAsyncAwait = async () => {
  try {
    const res = await fetch("users.json")
    console.log(res);
    const users = await res.json();
    console.log(users);
  } catch(err){
    console.error(err);
  }
}

const wait = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true); // fullfiled時にtrueを値として返す例です
    }, timeout);
  });
}

const waitSample = async () => {
  const ret = await wait(1000);
  console.log(ret); // => true 1秒後に呼ばれます
}

const waitAll = async () => {
  const ret = await Promise.all([wait(5000), wait(3000)])
  console.log(ret); // => [true, true] 5秒後に呼ばれます
}