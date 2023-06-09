{
  // プリミティブ型の例

  let str1 = "Hello"; // *1
  const str2 = str1; // *2
  console.log(str1, str2); // => Hello Hello

  str1 = str1.concat("World"); // *3

  // 以下の二つは違う値を示している
  console.log(str1, str2); // => HelloWorld Hello
}

{
  // オブジェクト型の例

  const obj1 = { message: "Hello" }; // *1
  const obj2 = obj1; // *2

  obj1.message = "Hi"; // *3

  console.log(obj2.message); // => Hi
}

{
  // 関数の引数の例

  function concatWorld(str) {
    str = str.concat("World"); // str1が 'HelloWorld'になりそうに思うかもしれない
  }

  const str1 = "Hello";
  concatWorld(str1);
  console.log(str1); // => 'Hello' // 変更はされない
}
