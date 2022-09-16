// クロージャとは
{
  function createClosure() { //---(1)
    const value = "myClosureValue";

    function myClosure() { //---(2)
      // valueはmyClosureの外ではあるが、myClosureの親関数であるcreateClosure内にあるのでアクセス可能
      console.log(value);
    }
    return myClosure; //---(3)
  }

  const closure = createClosure(); //---(4)
  closure(); // => "myClosureValue" // ---(5)
}

// カプセル化できていない例
{
  const machine = {
    count: 0,
    gacha() {
      this.count++;
      const rate = this.count * 0.2 + Math.random(); // countが増えると当たりやすくなります
      if (rate > 1) { // rateが1を越えれば当たりなので、countが5以上でずっと当たります
        console.log(`${this.count}回目で当たりが出ました！ rate: ${rate}`);
      } else {
        console.log(`${this.count}回目はハズレです！ rate: ${rate}`);
      }
    },
    clear() {
      this.count = 0;
    }
  };

  machine.gacha();
  // machine.count = 5; //---(1)
  machine.gacha();
  machine.gacha();
  machine.gacha();
  machine.gacha(); // 通常ここでは必ず当たり
}

// カプセル化のためのプライベート変数の実現
{
  function createGachaMachine() {
    let count = 0; // これをプライベート変数として外から操作させたくない
    return {
      gacha() {
        count++;
        const rate = count * 0.2 + Math.random();
        if (rate > 1) {
          console.log(`${count}回目で当たりが出ました！ rate: ${rate}`);
        } else {
          console.log(`${count}回目はハズレです！ rate: ${rate}`);
        }
      },
      clear() {
        count = 0;
      },
    };
  }

  const machine = createGachaMachine();
  machine.gacha();
  machine.gacha();
  machine.gacha();
  machine.gacha();
  machine.gacha();
}

// Classはこの概念を機能として提供しています
{
  class GachaMachine {
    #count; // #で始めるとプライベート変数として扱われます

    constructor() {
      this.#count = 0;
    }

    gacha() {
      this.#count++;
      const rate = this.#count * 0.2 + Math.random();
      if (rate > 1) {
        console.log(`${this.#count}回目で当たりが出ました！ rate: ${rate}`);
      } else {
        console.log(`${this.#count}回目はハズレです！ rate: ${rate}`);
      }
    }

    clear() {
      this.#count = 0;
    }
  }

  const machine = new GachaMachine();
  machine.gacha();
  machine.gacha();
  machine.gacha();
  machine.gacha();
  machine.gacha();
}

// 柔軟に関数を生成する
{
  // funcは関数で、この関数を引数なしで呼び出した結果を利用する動作
  // この関数がライブラリ等で提供されていて変更できないと仮定してください。
  function output(func) {
    console.log(func()); // 引数なしで呼び出されると決まっている
  }

  // もしもクロージャを知らないと、関数を必要な分作る必要がある
  function range1to3() {
    const values = [];
    for (let i = 1; i <= 3; i++) {
      values.push(i);
    }
    return values.join("|");
  }

  function range4to6() {
    const values = [];
    for (let i = 4; i <= 6; i++) {
      values.push(i);
    }
    return values.join("|");
  }

  output(range1to3); // => 1|2|3
  output(range4to6);// => 4|5|6
  // 必要になったらいくつも関数を作るのだろうか...
}

{
  // クロージャで共通化して複数の関数を作らずに済む
  function rangeString(begin, end) {
    return () => {
      const values = [];
      for (let i = begin; i <= end; i++) {
        values.push(i);
      }
      return values.join("|");
    };
  }

  output(rangeString(1, 3));
  output(rangeString(4, 6));
}
