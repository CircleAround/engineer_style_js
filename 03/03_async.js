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

  console.log("[1]");
  wait1sec(() => console.log("[2]")); // console.logを実行する関数が引数です
  wait1sec(() => console.log("[3]"));
  wait1sec(() => console.log("[4]"));
  console.log("[5]");
  // [1] → [5] → 1秒後に一気に3つ「1秒経ちました」と表示
}

// コールバックの入れ子で連続的な非同期処理を行う
{
  const wait1sec = (handler) => {
    setTimeout(() => {
      console.log("1秒経ちました");
      handler();
    }, 1000);
  };

  console.log("[1]");
  wait1sec(() => {
    console.log("[2]");
    wait1sec(() => {
      console.log("[3]");
      wait1sec(() => {
        console.log("[4]");
      });
    });
    console.log("[2']"); // [2]の次に呼ばれる
  });
  console.log("[5]");
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

  console.log("[1]");
  wait1sec()
    .then(() => {
      console.log("[2]");
      return wait1sec();
    })
    .then(() => {
      console.log("[3]");
      return wait1sec();
    })
    .then(() => {
      console.log("[4]");
    });
  console.log("[5]");
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
    console.log("[2]");
    await wait1sec();
    console.log("[3]");
    await wait1sec();
    console.log("[4]");
  };

  console.log("[1]");
  asyncFunc();
  console.log("[5]");
}
