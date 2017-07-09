// const R = require('ramda');

// const addThreeNums = R.curry((a, b, c) => a + b + c);

// // Regular invocation with all expected arguments
// console.log(addThreeNums(1, 2, 3)); // 6

// const addFiveToTwoNums = addThreeNums(5);
// console.log(addFiveToTwoNums(3, 4)); // 12

// const addNine = addFiveToTwoNums(4);
// console.log(addNine(10)); // 19


// const squareRoot = (num: number): number => {
//     return Math.pow(num, 0.5)
// };
// const isEven = (num: number): boolean => {
//     return num % 2 === 0;
// };

// const rootIsEven = R.compose(isEven, squareRoot);
// rootIsEven(9); // false
// rootIsEven(16); // true




// function rawDataToGameModel(rolls: Roll[]): Game {
//     const gameData = {
//         currFrame?: null,
//         frames: [],
//         tenthFrame?: TenthFrame
//     }

//     rolls.reduce((data, roll) => {
//         if (!data.currFrame) {
//             if (isNaN(roll)) {
//                 return {
//                     ...data,
//                     frames: [...data.frames, createStrike()]
//                 }
//             }
//         }
//     }, gameData);
// }


// let total = 0;

// function calculateSum(numArr) {
//     numArr.forEach((num) => {
//         total += num;
//     });

//     return total;
// }


// isValid = true;

// function postageLabels() {
//     const formatter = this.formatter;



//     for (let i = 0; i < this.users.length; i++) {
//         let user = this.users[i];

//         let formattedName =
//                 formatter.formatName(user.getName());
//         let formattedAddr =
//                 formatter.formatAddress(user.getAddress());

//         printer.print(formattedName + '\n' + formattedAddr);
//     }
// }

// function formatAddress(address) {
//     const addressCopy = address;

//     addressCopy.state = abbreviateState(addressCopy.state);

//     return address.street + '\n' + 
//             address.city + ', ' + 
//             address.state + ' ' +
//             address.zipcode;
// }


// function temp() {
// const fullname: string = 'John Doe';

// console.log(fullname.toUpperCase());
// console.log(fullname * 5);
// }

// let total = 0;

// function calculateSum(numArr) {
//     numArr.forEach((num) => {
//         total += num;
//     });

//     return total;
// }