////////////////////////////////////////////////////////////////////////////////
// グローバルオブジェクトのthis
////////////////////////////////////////////////////////////////////////////////

// 何も関数に囲まれていないグローバルスコープのthisはグローバルオブジェクトです
console.log(this === window); // => true

function globalTest() {
  console.log(this === window); // => true
}

// オブジェクトに所有されていないのでthisはwindowです
globalTest();

////////////////////////////////////////////////////////////////////////////////
// オブジェクトのメソッドのthis
////////////////////////////////////////////////////////////////////////////////

const user = {
  firstName: "Taro",
  lastName: "Suzuki",
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(user.getFullName()); //=> Taro Suzuki

////////////////////////////////////////////////////////////////////////////////
// クラスにおけるthis
////////////////////////////////////////////////////////////////////////////////

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user2 = new User("Taro", "Suzuki");
console.log(user2.getFullName()); //=> Taro Suzuki

////////////////////////////////////////////////////////////////////////////////
// JavaScriptは関数を代入することができます
////////////////////////////////////////////////////////////////////////////////

const user3 = {
  firstName: "Jiro",
  lastName: "Tanaka",
};

user3.getName = user.getFullName; // userが持つgetFullNameをuser3に代入
console.log(user3.getName()); //=> jiro Tanaka

////////////////////////////////////////////////////////////////////////////////
// コンストラクタ関数のthis
////////////////////////////////////////////////////////////////////////////////

// MyClassクラスのコンストラクタ
function MyClass() {
  this.name = "これはMyClassです"; //---①
}

// testメソッドの定義
MyClass.prototype.test = function () {
  console.log(`test: ${this.name}`);
};

const instance = new MyClass(); //---②
instance.test(); //=> test: これはMyClassです

////////////////////////////////////////////////////////////////////////////////
// アロー関数のthis
////////////////////////////////////////////////////////////////////////////////

{
  const user = {
    firstName: "Taro",
    lastName: "Suzuki",

    setBodyAlert: function () {
      // アロー関数が無い時代はこう書いていました
      const that = this;
      document.body.addEventListener("click", function () { //---①
        console.log(this); // 残念ながらこのthisはuserインスタンスではありません
        alert(that.firstName);
      });

      // アロー関数のおかげで、setBodyAlertのthisを利用できます
      document.body.addEventListener("click", () => { //---②
        alert(this.firstName);
      });
    },
  };

  user.setBodyAlert();
}

////////////////////////////////////////////////////////////////////////////////
// call/apply
////////////////////////////////////////////////////////////////////////////////

// callで強制的にthisを変えることができます
console.log(user.getFullName.call(user3)); //=> jiro Tanaka

// apply による可変長引数への対応
const head = "head";
const tail = ["abc", "def"];

console.log(head.concat.apply(head, tail)); //---① applyを使ってこう書いていた時期がありました
console.log(head.concat(...tail)); //---② 現在ではスプレッド構文でこう書けます

// callを利用したarray-like objectの扱い
function joinArgs() {
  console.log(Array.prototype.join.call(arguments, ",")); //---① callやapplyを使ってこう書いていた時期がありました
  console.log(Array.from(arguments).join(",")); //---② 現在ではArray.fromでこう書けます
}

joinArgs("abc", "def", "ghi");
