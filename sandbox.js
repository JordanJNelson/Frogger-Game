// for loops

// for(let i = 0; i < 5; i++){
//    console.log('in loop:', i)
// }
// // no semicolons at end of a loop
// console.log('loop finished');

// const names = ['shaun', 'mario', 'luigi'];

// for(let i = 0; i < names.length; i++){
//   // console.log(names[i]);
//   let html = `<div>${names[i]}</div>`;
//   console.log(html);
// } 
// cycling through is iteration 
// let i = 0;

// while (i < 5){
//   console.log('in loop: ', i);
//   i++;
// // }
// const names = ['shaun', 'mario', 'luigi'];

// let i = 0;
// while(i < names.length){
//   console.log(names[i]);
//   i++;
// }

// do while loops
// let i = 4;

// do {
//   console.log('val of i is: ', i);
//   i++;
// } while(i < 5)

// if statements
// const age = 25;

// if(age > 20){
//   console.log('you are over 20 years old');
// }

// const ninjas = ['shaun', 'ryu', 'chun-li', 'yoshi'];

// if(ninjas.length > 3){
//   console.log("that's a lot of ninjas");
// }

const password = 'p@ss';

if(password.length >= 12 && password.includes){
  console.log('that password is mighty strong');
} else if(password.length >= 8 || password.includes('@')){
  console.log('that password is strong enough');
} else {
  console.log('that password is not long enough');
} 

// logical operators - OR || and AND &&