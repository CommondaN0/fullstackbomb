// while(true){
//     if(confirm("Ты пидор?")){
//         alert("Я так и знал");
//         break;
//     }
//     else{
//         alert("Ответ неверный");
//     }
// }
// let user = {
//   fn: "fagg",
//   n: "ot",
//   age: 35,
// };
// console.log(user.age);
// user.age = 40;
// console.log(user.age);
// console.log(300&&200);
// console.log(user.age > 18 ? "Да ну нафиг" : "Мелковат");
// let x = null;
// console.log(`А может быть ${x ?? "negri"}`);
// console.log(5 + 1 * 2);
// console.log((10).toString(2));
// if(true){
//   return;
// } else {
//   false;
// }
// console.log(true && null);
// alor();
// function alor(){
//     return;
// }
// globalThis.
// totalShots(20, 12, 2, 1);

// function totalShots(totalShots, claimedDrankShots, brokenShots, spilledShots){
//     let totalCount = claimedDrankShots + brokenShots + spilledShots;
//     if(totalShots < totalCount){
//         console.log("Игорь явно вас обманывает!");
//     } else {
//         console.log(`Количество разбитых стопок: ${brokenShots}
// Количество пролитых стопок: ${spilledShots}
// Количество стопок, которое выпил каждый из друзей: ${(claimedDrankShots / 2)}`);
//     }
// }
// getTimeBySeconds(48753);

// function getTimeBySeconds(sec) {
//     let secs = Math.floor(sec % 60);
//     let mins = Math.floor((sec / 60) % 60);
//     let hours = Math.floor(sec / 3600);
//     return `${hours}:${mins}:${secs}`;
// }
// debugger;
// let arr = Array([5],[10]);
// getValueFromArray(arr,-2,1);

// function getValueFromArray(arr, i, j) {
//     if(!(i < 0 || j < 0)){
//         return "Указанные индексы выходят за границы массива.";
//     }
//     let arra2 = arr[i];
//     let a = i > (arr.length - 1);
//     let b; 
//     if(!(arra2 == undefined || arra2 == null)){
//         b = j > (arra2.length - 1);
//     }
//     if(!a && !b) {
//         return arr[i][j];
//     }
//     else{
//         return "Указанные индексы выходят за границы массива.";
//     }
// }
// console.log(2 > 2);

// function startRocketCountdown(initialCount) {
//     while(true){
//         if(initialCount !== 0) {
//             console.log(initialCount);
//             --initialCount;
//         }
//         else{
//             console.log(0);
//             console.log("Старт!");
//             break;
//         }
//     }
// }

// let arr1 = [2,5,-3,-3,10];
// let arr2 = [2,5,-3,-3,10];
// let boolean = true;

// for(let i = 0; i < arr1.length; ++i) {
//     if(arr1.length !== arr2.length) {
//         console.log(false);
//         break;
//     }
//     if(arr1[i] === arr2[i]) {
//         boolean &= true;
//     }
//     else {
//         boolean = false;
//         break;
//     }
// }

// const printNumberStaircase = (n) => {
//   for(let i = 0, length = 1, num = 1; i < n; ++i, ++num){
//     let str = "";
//     let nume = num;
//     for(let j = 0; j < length; ++j){
//         if(j === length - 1){
//             str += nume;
//             ++nume
//         }
//         else{
//             str += nume + " ";
//             ++nume;
//         }
//     }
//     ++length;
//     console.log(str);
//   }
// };


// const formatArray = (arr) => {
//   let str = "";
//     if(arr.length === 0){
//         return str;
//     }
//     else{
//         for(let i = 0; i < arr.length; ++i){
//             if(i === arr.length - 1) {
//                 str += arr[i];
//             }
//             else {
//                 str += arr[i] + " -> ";
//             }
//         }
//     }
// }
// debugger;
// function isSorted(arr) {
//   let bool = true;
//   if(arr.length === 0) {
//     return bool;
//   }
//   else{
//     for(let i = 0; i < arr.length - 1; ++i){
//         let a = arr[i];
//         let b = arr[i + 1];
//         if(a > b) {
//             bool = false;
//             break;
//         }
//     }
//   }
//   return bool;
// }

// console.log(isSorted([-22,-5,0,3,9]));
// debugger;
// let summ = 0;
// let arr = [[5,32,15,9],[83,-22,7],[],[81,10,0]];
// for(let i = 0; i < arr.length; ++i){
//     for(let j = 0; j < arr[i].length; ++j){
//         if(arr[i].length === 0) {
//             break;
//         }
//         if(arr[i][j] > 0) {
//             summ += arr[i][j];
//         }
//     }
// }
// console.log(summ);
// debugger;
// generateChessBoard(4);

// function generateChessBoard(x) {
//     let s1 = '#';
//     let s2 = '.';
//     let flag = 0;
//     let flag2 = x % 2 === 0;
//     let arr = Array();
//     for(let i = 0; i < x; ++i) {
//         let arrm = Array();
//         for(let j = 0; j < x; ++j){ 
//             if(flag === 0) {
//                 flag = 1;
//                 arrm.push(s1);
//             }
//             else {
//                 flag = 0;
//                 arrm.push(s2);
//             }
//         }
//         arr.push(arrm);
//         if(flag2 === true) {
//             flag = Number(!flag);
//         }
//     }
//     return arr;
// }
// let ob = {
//     "maze": [
//         ["1", "1", "1", "0", "0", "0", "0", "0", "1"],
//         ["1", "1", "1", "0", "1", "1", "1", "0", "1"],
//         ["1", "1", "1", "0", "1", "0", "1", "0", "1"],
//         ["1", "1", "1", "0", "1", "0", "1", "0", "1"],
//         ["E", "1", "1", "0", "1", "0", "1", "0", "1"],
//         ["0", "1", "1", "S", "1", "0", "0", "0", "1"],
//         ["0", "1", "1", "0", "1", "0", "1", "0", "1"],
//         ["0", "1", "1", "0", "1", "0", "1", "0", "1"],
//         ["0", "1", "1", "0", "1", "1", "1", "0", "1"],
//         ["0", "0", "0", "0", "1", "0", "0", "0", "1"],
//         ["0", "1", "1", "0", "1", "1", "1", "1", "1"],
//         ["0", "1", "1", "0", "1", "1", "1", "1", "1"],
//     ],
//     "x": 5,
//     "y": 3
// };

// console.log(findExit(ob.maze, ob.x, ob.y));

// function findExit(maze, x, y) {
//     function copyMaze(m) {
//       let tM = JSON.parse(JSON.stringify(maze));
//       return tM;
//     }
//     let tryCounter = 0;
//     let xb = x;
//     let yb = y;
//     let arr = Array();
//     arr.push([x, y]); 
//     let tempMaze = copyMaze(maze);
//     while(true){
//         let block1 = [xb + 1, yb];
//         let block2 = [xb - 1, yb];
//         let block3 = [xb, yb + 1];
//         let block4 = [xb, yb - 1];
//         let blocks = Array();
//         blocks.push(block1, block2, block3, block4);
//         let counter = 0;
//         for(let i = 0; i < blocks.length; ++i) {
//             let tempX = blocks[i][0];
//             let tempY = blocks[i][1];
//             if(tempX > tempMaze.length - 1 || tempX < 0) {
//                 ++counter;
//             }
//             else{
//                 if(tempY > tempMaze[x].length - 1 || tempY < 0){
//                     ++counter;
//                 }
//                 else if(tempMaze[tempX][tempY] === "1") {
//                     ++counter;
//                 }
//                 else if(tempMaze[tempX][tempY] === "0") {
//                     tempMaze[xb][yb] = "1";
//                     xb = tempX;
//                     yb = tempY;
//                     arr.push([xb, yb]);
//                     break;
//                 }
//                 else if(tempMaze[tempX][tempY] === "E") {
//                     xb = tempX;
//                     yb = tempY;
//                     arr.push([xb, yb]);
//                     return arr;
//                 }
//             }
//         }
//         if(counter === 4) {
//             if(xb === x && yb === y) {
//                 return null;
//             }
//             maze[xb][yb] = "1";
//             arr = Array();
//             tempMaze = copyMaze(maze);
//             xb = x;
//             yb = y;
//             arr.push([x, y]);
//         }
//     }
// }

// function cakes(recipe, ingredients) {
//   const arr = [];
//   for (let key in recipe) {
//     if (ingredients.hasOwnProperty(key)) {
//       arr.push(Math.floor(ingredients[key] / recipe[key]));
//     } else {
//       arr.push(0);
//     }
//   }
//   return Math.min(...arr);
// }

// let recipe = {
//     "flour": 500,
//     "sugar": 200,
//     "eggs": 1
// }

// let ingredients = {
//     "flour": 1200,
//     "sugar": 1200,
//     "eggs": 5,
//     "milk": 200
// }

// cakes(recipe, ingredients);
// const artifacts = {
//   A101: { type: "метеорит", year: 1890, exhibits: 15 },
//   A102: { type: "луноход", year: 1973, exhibits: 20 },
//   A103: { type: "скафандр", year: 1969, exhibits: 12 },
//   A104: { type: "спутник", year: 1957, exhibits: 20 },
//   A105: { type: "луноход", year: 1971, exhibits: 10 },
// };

// artifacts.A101.type;

// analyzeArtifacts(artifacts);

// function analyzeArtifacts(artifacts) {
//     let valuesExh = Array();
//     let valuesId = Array();
//     for (const key in artifacts) {
//       console.log(`Артефакт ${key}: Тип - ${artifacts[key].type}, Год - ${artifacts[key].year}, Показы - ${artifacts[key].exhibits}`);
//       valuesExh.push(artifacts[key].exhibits);
//       if (valuesId.includes(artifacts[key].type)) {
//         continue;
//       } else {
//         valuesId.push(artifacts[key].type);
//       }
//     }
//     console.log(`Артефакты с наибольшим количеством показов (количество показов ${Math.max(...valuesExh)}):`);
//     for (const key in artifacts) {
//       if (artifacts[key].exhibits === Math.max(...valuesExh)) {
//         console.log(`${key}: Тип - ${artifacts[key].type}, Год - ${artifacts[key].year}`);
//       }
//     }
//     console.log("Количество артефактов по типу:");
//     for (const element of valuesId) {
//       let counter = 0;
//       for (const key in artifacts) {
//         if (artifacts[key].type === element) {
//           ++counter;
//         }
//       }
//       console.log(`${element}: ${counter}`);
//     }
// }

// const data = {
//   user: {
//     id: 1,
//     name: "Иван",
//     age: 30,
//     email: "ivan@example.com",
//     address: {
//       street: "Красная площадь",
//       city: "Москва",
//       postalCode: "101000",
//     },
//     hobbies: ["фотография", "путешествия", "чтение"],
//     friends: [
//       {
//         id: 2,
//         name: "Мария",
//         age: 28,
//         interests: ["живопись", "фотография"],
//       },
//       {
//         id: 3,
//         name: "Алексей",
//         age: 32,
//         interests: ["спорт", "музыка", "путешествия"],
//       },
//     ],
//   },
//   settings: {
//     theme: "dark",
//     notifications: {
//       email: true,
//       sms: false,
//       push: true,
//     },
//     language: "ru",
//   },
//   activities: [
//     {
//       type: "workout",
//       date: "2023-10-01",
//       duration: 60,
//       details: {
//         activityType: "бег",
//         distance: 5,
//       },
//     },
//     {
//       type: "reading",
//       date: "2023-10-02",
//       duration: 90,
//       details: {
//         bookTitle: "Война и мир",
//         pagesRead: 50,
//       },
//     },
//   ],
// };

// let objReturn = {};
// objReturn["name"] = data.user.name;
// objReturn["address"] = data.user.address.city + ", " + data.user.address.street;
// let objNotif = data.settings.notifications;
// let arrNotif = Array();
// for (const key in objNotif) {
//     if(objNotif[key]) {
//         arrNotif.push(key);
//     }
// }
// let objFriends = data.user.friends;
// let arrFriends = Array();
// for (const key in objFriends) {
//     arrFriends.push(objFriends[key].name);
// }
// let arrActiv = data.activities;
// let arrData = Array();
// for(let i = 0; i < arrActiv.length; ++i) {
//     if(!arrData.includes(arrActiv[i].type)) {
//          arrData.push(arrActiv[i].type);
//     }
// }
// objReturn["friends"] = arrFriends;
// objReturn["notifications"] = arrNotif;
// objReturn["activityTypes"] = arrData;

// console.log(objReturn);

// let character = {
//     "name": "Ашот",
//     "class": "Диванный воин",
//     "level": 1,
//     "skills": [],
//     setName (name) {
//         this.name = name;
//         return this;
//     },
//     setClass (className) {
//         this.class = className;
//         return this;
//     },
//     addSkill (skill) {
//         this.skills.push(skill);
//         return this;
//     },
//     levelUp () {
//         ++this.level;
//         return this;
//     },
//     getSummary () {
//         let sk = "";
//         if(this.skills.length === 0) {
//             sk = "нет"
//         } else if (this.skills.length === 1) {
//             sk = this.skills[0];
//         } else {
//             let temp = this.skills.pop();
//             sk = this.skills.join(", ") + " и " + temp;
//             this.skills.push(temp);
//         }
//         let str = `Имя: ${this.name}, Класс: ${this.class}, Уровень: ${this.level}, Навыки: ${this.skills.length !== 0 ? this.skills.join(" и ") : "нет"}`;
//         return str;
//     }
// }

// character.setName("Химмель")
//   .setName("Химмель")
//   .setClass("Воин")
//   .addSkill("Уворот")
//   .addSkill("Прямая атака")
//   .levelUp()
//   .levelUp()
//   .levelUp();

//   console.log(character.getSummary());