function hasDuplicates(inputArray) {
  // add your code here
  var check = false;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray.some((item) => item === inputArray[i])) {
      check = true;
      break;
    }
  }
  return check;
}
const prueba = [1, 2, 3];
hasDuplicates(prueba);
