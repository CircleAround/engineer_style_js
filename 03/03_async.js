{
  console.log("start"); // *1
  const handler = () => {
    console.log("1秒経ちました"); // *2
  };
  setTimeout(handler, 1000);
  console.log("next"); // *3
  // start → next → 1秒後に「1秒経ちました」と表示
}

// 非同期に複数の処理を実行する
{
  const wait1sec = (handler) => {
    setTimeout(() => {
      console.log("1秒経ちました");
      handler();
    }, 1000);
  };

  console.log("①");
  wait1sec(() => console.log("②")); // console.logを実行する関数が引数です
  wait1sec(() => console.log("③"));
  wait1sec(() => console.log("④"));
  console.log("⑤");
  // *1 → ⑤ → 1秒後に一気に3つ「1秒経ちました」と表示
}

// コールバックの入れ子で連続的な非同期処理を行う
{
  const wait1sec = (handler) => {
    setTimeout(() => {
      console.log("1秒経ちました");
      handler();
    }, 1000);
  };

  console.log("①"); // *1
  wait1sec(() => {
    console.log("②"); // *2
    wait1sec(() => {
      console.log("③"); // *3
      wait1sec(() => {
        console.log("④"); // *４
      });
    });
    console.log("next ②"); // *2の次に呼ばれる
  });
  console.log("⑤"); // *5
}

// Promiseで連続的な非同期処理を行う
{
  const wait1sec = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  console.log("①");
  wait1sec()
    .then(() => {
      console.log("②");
      return wait1sec();
    })
    .then(() => {
      console.log("③");
      return wait1sec();
    })
    .then(() => {
      console.log("④");
    });
  console.log("⑤");
}

// async-awaitで連続的な非同期処理を行う
{
  const wait1sec = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const asyncFunc = async () => {
    await wait1sec(); // 非同期のコードだが、このコードの非同期処理が終わった後、次の行が呼ばれる
    console.log("②");
    await wait1sec();
    console.log("③");
    await wait1sec();
    console.log("④");
  };

  console.log("①");
  asyncFunc();
  console.log("⑤");
}
