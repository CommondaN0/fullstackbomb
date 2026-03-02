// 1.2.1
// try {
//     console.log(hello);
// } catch (error) {
//     throw new Error("Ты пидор");
// }
// Error
// log("DEB", "Не удалось получить данные");

// function log(type, message) {
//     let flag = 1;
//     switch(type){
//         case "ERROR": {
//             console.log(`[${type}] ${message}`);
//             flag = 0;
//             break;
//         }
//         case "WARNING": {
//             console.log(`[${type}] ${message}`);
//             flag = 0;
//             break;
//         }
//         case "INFO": {
//             console.log(`[${type}] ${message}`);
//             flag = 0;
//             break;
//         }
//         case "DEBUG": {
//             console.log(`[${type}] ${message}`);
//             flag = 0;
//             break;
//         }
//     }
//     if(flag) {
//         throw new Error(`Неверный тип сообщения "${type}"`);
//     }
// }
// 1.2.2

// try {
//     let obj = openConnection();
//     try {
//         let data = obj.getData();
//         console.log(data);
//     } catch (e) {
//         console.log(`Ошибка при получении данных: ${e.message}`);
//         return;
//     }
//     obj.close();
// } catch (e) {
//     console.log(`Ошибка при открытии соединения: ${e.message}`)
// }
// 1.3
// const d1 = new Date();
// const n1 = +d1.getTime;
// let x = 0;
// while(x < 1000000000) {
//     ++x;
// }
// const d2 = new Date();
// const n2 = +d1.getTime;
// console.log(d2 - d1);
// 1.3.1
// console.log(daysDiff("2023-01-01","2024-01-01"));
// function daysDiff(dateStr1, dateStr2) {
//     const d1 = Date.parse(dateStr1);
//     const d2 = Date.parse(dateStr2);
//     if(!d1) {
//         throw new Error(`Invalid date input: ${dateStr1}`);
//     } else if(!d2) {
//         throw new Error(`Invalid date input: ${dateStr2}`);
//     }
//     // const date1 = new Date(d1);
//     // const date2 = new Date(d2);
//     const days1 = Math.floor(d1 / 86400000);
//     const days2 = Math.floor(d2 / 86400000);
//     const days = days2 - days1;
//     return days;
// }
// 1.3.2
// const dateStr = "2028-10-23T12:00:00-07:00";
// let date = new Date(dateStr);
// let str = date.toLocaleString("ru-RU", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
//   weekday: "long",
//   hour: "2-digit",
//   minute: "2-digit"
// });
// console.log(str.split(",")[0][0].toUpperCase() + str.split(",")[0].slice(1));
// 1.4
// let arr = [5, 6, 7, 10];
// let str = JSON.stringify(arr);
// let arr2 = JSON.parse(str);
// let arr3 = [...arr];
// let arr4 = structuredClone(arr);
// let jsonStr = `{"name": "fag","name1": "fag"}`;
// let obj = {
//     name: "fag",
//     gaf: "fag"
// };
// let ss = JSON.stringify(obj, ["name"]);
// let str = JSON.parse("", (key, val, context) => {});
// let par = JSON.parse(jsonStr);
// console.log(par);
// let date = new Date();
// console.log(JSON.stringify(date));
// 1.4.2
// let data = [{"name": "Мышка", "price": 1000}, {"name": "Клавиатура", "price": 1500}];
// const obj = JSON.parse(data.toString());
// let names = [];
// for(let i = 0; i < data.length; ++i) {
//     names.push(data[i].name);
// }
// console.log(names.join(", "));
// 1.4.3
// try {
//     const arr = JSON.parse(data.toString())
//     let flag = 0;
//     let count = 0;
//     let avg = 0;
//     for(let i = 0; i < arr.length; ++i) {
//         if(arr[i].hasOwnProperty("age")) {
//             avg += arr[i].age;
//             ++count;
//             flag = 1;
//         }
//     }
//     if(!flag) {
//         console.log("Ни один объект не содержит свойства age");
//     } else {
//         console.log(Math.round(avg / count));
//     }
// } catch (error) {
//     console.log("Невалидный JSON");
// }
// 1.4.4
// process.openStdin().addListener("data", (data) => {
//     let obj = JSON.parse(data.toString(), (key, val, context) => {
//         if(key === "date") {
//             return new Date(val);
//         }
//         return val;
//     });
//     let d = new Date(obj.date);
//     d.setDate(d.getDate() + 15);
//     console.log(d.getDate());
// })

// 1.5

// function pr({
//     fr = "Niggg",
//     role = "jaga"
// } = {}) {
//     console.log(fr, role);
// }
// const user = {
//     fr: "Mams",
// }
// pr();

// 1.6.1

// let data = "3";
// let num = +JSON.parse(data.toString());
// const id = setInterval(() => {
//     console.log(num);
//     num -= 1;
//     if (num === 0) {
//         console.log(num);
//         console.log("Время вышло!");
//         clearInterval(id);
//     }
// }, 1000);

// 1.7
// const map = new Map([
//     ["gaf", 123],
//     ["fag", 456]
// ]);
// console.log(map);
// map.set("afg", 789);
// console.log(map);
// map.set("gaf", 1337);
// console.log(map);

//1.7.1

// const arr = [
//   {"timestamp": "2026-01-01T10:00:00Z", "event": "login", "userId": "U1"},
//   {"timestamp": "2026-01-01T10:01:00Z", "event": "login", "userId": "U2"},
//   {"timestamp": "2026-01-01T10:02:00Z", "event": "login", "userId": "U3"},
//   {"timestamp": "2026-01-01T10:03:00Z", "event": "login", "userId": "U4"},
//   {"timestamp": "2026-01-01T10:04:00Z", "event": "login", "userId": "U5"},
//   {"timestamp": "2026-01-01T10:05:00Z", "event": "view", "userId": "U1"},
//   {"timestamp": "2026-01-01T10:06:00Z", "event": "view", "userId": "U2"},
//   {"timestamp": "2026-01-01T10:07:00Z", "event": "login", "userId": "U6"},
//   {"timestamp": "2026-01-01T10:08:00Z", "event": "login", "userId": "U7"},
//   {"timestamp": "2026-01-01T10:09:00Z", "event": "login", "userId": "U8"},
//   {"timestamp": "2026-01-01T10:10:00Z", "event": "login", "userId": "U9"},
//   {"timestamp": "2026-01-01T10:11:00Z", "event": "login", "userId": "U10"},
//   {"timestamp": "2026-01-01T10:12:00Z", "event": "logout", "userId": "U1"},
//   {"timestamp": "2026-01-01T10:13:00Z", "event": "logout", "userId": "U2"},
//   {"timestamp": "2026-01-01T10:14:00Z", "event": "view", "userId": "U3"},
//   {"timestamp": "2026-01-01T10:15:00Z", "event": "view", "userId": "U4"},
//   {"timestamp": "2026-01-01T10:16:00Z", "event": "login", "userId": "U11"},
//   {"timestamp": "2026-01-01T10:17:00Z", "event": "login", "userId": "U12"},
//   {"timestamp": "2026-01-01T10:18:00Z", "event": "login", "userId": "U13"},
//   {"timestamp": "2026-01-01T10:19:00Z", "event": "login", "userId": "U14"},
//   {"timestamp": "2026-01-01T10:20:00Z", "event": "login", "userId": "U15"},
//   {"timestamp": "2026-01-01T10:21:00Z", "event": "logout", "userId": "U3"},
//   {"timestamp": "2026-01-01T10:22:00Z", "event": "logout", "userId": "U4"},
//   {"timestamp": "2026-01-01T10:23:00Z", "event": "logout", "userId": "U5"},
//   {"timestamp": "2026-01-01T10:24:00Z", "event": "view", "userId": "U6"},
//   {"timestamp": "2026-01-01T10:25:00Z", "event": "view", "userId": "U7"},
//   {"timestamp": "2026-01-01T10:26:00Z", "event": "login", "userId": "U16"},
//   {"timestamp": "2026-01-01T10:27:00Z", "event": "login", "userId": "U17"},
//   {"timestamp": "2026-01-01T10:28:00Z", "event": "login", "userId": "U18"},
//   {"timestamp": "2026-01-01T10:29:00Z", "event": "login", "userId": "U19"},
//   {"timestamp": "2026-01-01T10:30:00Z", "event": "login", "userId": "U20"},
//   {"timestamp": "2026-01-01T10:31:00Z", "event": "logout", "userId": "U6"},
//   {"timestamp": "2026-01-01T10:32:00Z", "event": "logout", "userId": "U7"},
//   {"timestamp": "2026-01-01T10:33:00Z", "event": "logout", "userId": "U8"},
//   {"timestamp": "2026-01-01T10:34:00Z", "event": "logout", "userId": "U9"},
//   {"timestamp": "2026-01-01T10:35:00Z", "event": "logout", "userId": "U10"},
//   {"timestamp": "2026-01-01T10:36:00Z", "event": "view", "userId": "U11"},
//   {"timestamp": "2026-01-01T10:37:00Z", "event": "view", "userId": "U12"},
//   {"timestamp": "2026-01-01T10:38:00Z", "event": "logout", "userId": "U11"},
//   {"timestamp": "2026-01-01T10:39:00Z", "event": "logout", "userId": "U12"},
//   {"timestamp": "2026-01-01T10:40:00Z", "event": "logout", "userId": "U13"},
//   {"timestamp": "2026-01-01T10:41:00Z", "event": "logout", "userId": "U14"},
//   {"timestamp": "2026-01-01T10:42:00Z", "event": "logout", "userId": "U15"},
//   {"timestamp": "2026-01-01T10:43:00Z", "event": "logout", "userId": "U16"},
//   {"timestamp": "2026-01-01T10:44:00Z", "event": "logout", "userId": "U17"},
//   {"timestamp": "2026-01-01T10:45:00Z", "event": "logout", "userId": "U18"},
//   {"timestamp": "2026-01-01T10:46:00Z", "event": "logout", "userId": "U19"},
//   {"timestamp": "2026-01-01T10:47:00Z", "event": "logout", "userId": "U20"}
// ];
// let map = new Map();
// let maxActive = 0;
// let currentActive = 0;
// for (const user of arr) {
//     let currentUser = user.userId;
//     let currentEvent = user.event;
//     map.set(currentUser, currentEvent);
//     if(map.get(currentUser) === "login") {
//         ++currentActive;
//         if (currentActive > maxActive) {
//             ++maxActive;
//         }
//     } else if (map.get(currentUser) === "logout") {
//         --currentActive;
//     }
// }

// 1.8.1

// let map = new Map();
// function memoizedAdd(a) {
//     return function(b) {
//         let res = a + b;
//         let cached = 0;
//         const nums1 = {
//             "num1": a,
//             "num2": b
//         }
//         for(const {num1, num2} of map.values()) {
//             if((a === num1 && b === num2) || (b === num1 && a === num2)) {
//                 cached = 1;
//                 break;
//             }
//         }
//         map.set(map.size + 1, nums1)
//         return {
//             "cached": cached,
//             "result": res,
//         }
//     }
// }
// const data = [
//   { "a": 1, "b": 2 },
//   { "a": 2, "b": 3 },
//   { "a": 3, "b": 4 },
//   { "a": 1, "b": 2 },
//   { "a": 4, "b": 3 },
//   { "a": 2, "b": 1 },
//   { "a": 3, "b": 2 }
// ];
// for (const {a, b} of data) {
//     const {cached, result} = memoizedAdd(a)(b);
//     console.log(`${cached ? "Из кэша:" : "Вычислено:"} ${result}`);
// }

//1.8.2

// function filterBy (property, value) {
//     return function (array) {
//         let arr = [];
//         for (const element of array) {
//             if(element[property] === value) {
//                 arr.push(element);
//             }
//         }
//         return JSON.stringify(arr);
//     };
// };

// Другое решение данной задачи (другая каррированая функция)
// let arr = [];
// arr.filter

// function filterBy (prop, value) {
//     return function (arr) {
//         return arr.filter(item => item[prop] === value);
//     }
// 
// let data = `{
//   "property": "department",
//   "value": "IT",
//   "array": [
//     { "name": "Ольга", "age": 29, "department": "HR", "salary": 45000 },
//     { "name": "Сергей", "age": 32, "department": "IT", "salary": 80000, "experience": 5 },
//     { "name": "Анна", "age": 27, "department": "IT", "salary": 65000 },
//     { "name": "Павел", "age": 41, "department": "Finance", "salary": 70000 }]
// }`;
// const {property, value, array} = JSON.parse(data.toString());
// const result = filterBy(property, value)(array);
// console.log(JSON.stringify(result));

//2.2

// function generateUniqueRandomNumbers(count, min, max) {
//     if (max - min+1 < count) {
//         throw new Error("Unable to generate array in the specified range");
//     }
//     let s1 = new Set();
//     while(true) {
//         if(s1.size === count) {
//             break;
//         }
//             s1.add(Math.floor(Math.random() * (max - min + 1)) + min);
//     }
//     return Array.from(s1);
// }

// console.log(generateUniqueRandomNumbers(5, 1, 10));

// 2.3.1

// const data = "[ 1, 0, 3, 0, 5 ]";
// let array = JSON.parse(data.toString());

// for (let i = 0; i < array.length; ++i) {
//     array[i] === 0 ? array.push(array.splice(i, 1)) : null;
// }
// // или


//     const arr = JSON.parse(data.toString())
//     const arrWithoutZeros = arr.filter(Boolean)
    
//     console.log(arrWithoutZeros.toSpliced(
//         arrWithoutZeros.length,
//         0,
//         ...new Array(arr.length - arrWithoutZeros.length).fill(0)
//     ))

// 2.3.2

// const data = `{
//   "inventory": [
//     {"name": "меч", "count": 1},
//     {"name": "щит", "count": 1},
//     {"name": "зелье", "count": 3},
//     {"name": "кольчуга", "count": 1},
//     {"name": "лук", "count": 1}
//   ],
//   "newItem": {"name": "арбалет", "count": 1},
//   "maxSize": 5
// }`
// const obj = JSON.parse(data.toString());
// let invent = Array.from(obj.inventory);
// const newItem = obj.newItem;
// const maxSize = obj.maxSize;

// if(invent.length === maxSize) {
//     const names = invent.map(obj => obj.name);
//     if(invent.indexOf(newItem.name) === -1) {
        
//     }
// }

// 2.4.1

// const data = `[
//   {
//     "id": 2001,
//     "timestamp": "2025-04-05T09:15:30.000Z",
//     "message": "User authentication successful"
//   },
//   {
//     "id": 2002,
//     "timestamp": "2025-04-05T09:15:25.000Z",
//     "message": "Password validation completed"
//   },
//   {
//     "id": 2003,
//     "timestamp": "2025-04-05T09:15:35.000Z",
//     "message": "Session created"
//   },
//   {
//     "id": 2004,
//     "timestamp": "2025-04-05T09:15:40.000Z",
//     "message": "User redirected to dashboard"
//   }
// ]`;

// let array = JSON.parse(data.toString());
// let tt = Date.parse(array[0].timestamp);
// const b = array.every((val, index) => {
//     const t = Date.parse(val.timestamp);
//     const bo = t >= tt;
//     tt = t;
//     return bo;
// });
// console.log(b);

// 2.4.2
// const data = `{
//   "tasks": [
//     { "title": "Проверить почту", "priority": "low" },
//     { "title": "Подготовить отчет", "priority": "medium" },
//     { "title": "Созвон с клиентом", "priority": "high" },
//     { "title": "Обновить документацию", "priority": "low" },
//     { "title": "Исправить критическую ошибку", "priority": "high" }
//   ],
//   "targetPriority": "medium"
// }`;

// const tasks = JSON.parse(data.toString());
// const priorities = ["low", "medium", "high"];
// tasks.targetPriority = priorities.indexOf(tasks.targetPriority);
// tasks.tasks.forEach(obj => {
//   obj.priority = priorities.indexOf(obj.priority) >= tasks.targetPriority;
// });
// console.log(tasks);
// const arr = tasks.tasks.map(obj => obj.priority);
// console.log(arr.lastIndexOf(true));

// 2.4.3
// const data = `{
//   "rooms": [
//     {
//       "name": "Парадная",
//       "people": [{ "id": 23, "name": "Павел" }, { "id": 42, "name": "Олег" }]
//     },
//     {
//       "name": "Зал",
//       "people": [{ "id": 22, "name": "Тимур" }, { "id": 123, "name": "Анна" }]
//     },
//     {
//       "name": "Туалет",
//       "people": [{ "id": 353, "name": "Лена" }]
//     }
//   ],
//   "targetPerson": "Анна",
//   "targetRoom": "Зал"
// }`;

// const {rooms, targetPerson, targetRoom} = JSON.parse(data.toString());
// const person = rooms.find(room => room.name === targetRoom).find(pers => pers.name === targetPerson);
// console.log(person ? person.id : "Человек не найден");

// 2.5.3

// const data = `{
//   "allowedTags": ["электроника", "гаджеты", "мобильные"],
//   "products": [
//     { "name": "Айфон 15", "tags": ["мобильные", "электроника"], "inStock": true },
//     { "name": "Ноутбук Lenovo", "tags": ["электроника", "компьютеры"], "inStock": true },
//     { "name": "Умные часы", "tags": ["гаджеты", "электроника"], "inStock": false },
//     { "name": "Планшет Samsung", "tags": ["мобильные", "гаджеты"], "inStock": true }
//   ]
// }`;

// const {allowedTags, products} = JSON.parse(data.toString());
// console.log(products.filter(product => product.tags.every(val => allowedTags.includes(val)) && product.inStock).map(product => product.name));

// 2.6.2

// const data = `[
//   {"name": "Мебель", "subcategories": []},
//   {"name": "Аксессуары", "subcategories": []},
//   {"name": "Бытовая техника", "subcategories": []}
// ]`;

// const array = JSON.parse(data.toString());

// const sortedArr = array.toSorted((a, b) => a.name.localeCompare(b.name));
// for(let i = 0; i < sortedArr.length; ++i) {
//   if(sortedArr[i].subcategories.length) {
//     sortedArr[i].subcategories.sort(a, b => b.popularity - a.popularity);
//   }
// }
//  console.log([1, 2, 3].reduceRight((acc, num, i) => i % 2 ? acc / num : acc - num, 10));

// 2.6.7

// const data = `[
//   { "endpoint": "/api/products", "status": 200 },
//   { "endpoint": "/api/products", "status": 204 },
//   { "endpoint": "/api/products", "status": 404 },
//   { "endpoint": "/api/products", "status": 500 }
// ]`;

// const arr = JSON.parse(data.toString());

// const result = arr.reduce((acc, log) => {
//     if(!acc[log.endpoint]) {
//       acc[log.endpoint] = {};
//     }
//     if(log.status >= 200 && log.status <= 299) {
//       acc[log.endpoint].success = (acc[log.endpoint].success || 0) + 1;
//     } else {
//       acc[log.endpoint].error = (acc[log.endpoint].error || 0) + 1;
//     }
//     return acc
// }, {});
// console.log(JSON.stringify(result, null, 2))

// 2.9.1

//  const data = `АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя`;
//  const str = data.toString().toLowerCase();
// const arr = [...str];
// const freq = arr
// .reduce((acc, val) => {
//     for(const v of acc.values()) {
//         if(v.name === val) {
//             v.count += 1;
//             return acc;
//         }
//     }
//     const obj = {name: val, count: 1};
//     acc.push(obj);
//     return acc;
// }, []).sort((a, b) => b.count - a.count)
// .slice(0, 3)
// .reduce((acc, val) => {
//     const arr = [val.name, val.count];
//     acc.push(arr);
//     return acc;
// }, []);
// console.log(JSON.stringify(freq));

//или

// let map = new Map();
// for(const char of str) {
//     map.set(char, (map.get(char) ?? 0) + 1);
// }
// console.log(JSON.stringify([...map].sort((a, b) => b[1] - a[1]).slice(0, 3)));

// 2.9.2

// const data = `[
//   { "name": "Анна", "age": 24, "salary": 4500000 },
//   { "name": "Иван", "age": 28, "salary": 6000000 },
//   { "name": "Мария", "age": 30, "salary": 5500000 },
//   { "name": "Петр", "age": 26, "salary": 4800000 }
// ]`;

// let arr = JSON.parse(data.toString());
// const result = arr
// .filter((employee) => employee.age > 25 && employee.salary > 5000000)
// .reduce((acc, employee) => {
//     const obj = {name: employee.name, age: employee.age, salary: employee.salary, bonus: Math.floor(employee.salary * 0.1)};
//     acc.push(obj);
//     return acc;
// }, [])
// .sort((a, b) => b.salary - a.salary)
// .forEach((employee) => {console.log(`${employee.name} (возраст: ${employee.age}) - бонус к зарплате: ${employee.bonus}`)});

// 2.9.3

// const data = `{
//   "user": {
//     "id": 1,
//     "preferences": {
//       "action": 0.8,
//       "comedy": 0.6
//     },
//     "watched": []
//   },
//   "friendsData": {
//     "2": [201],
//     "3": [202]
//   },
//   "movies": [
//     {"id": 201, "title": "Фильм с отсутствующим жанром", "genres": ["action", "sci-fi"], "rating": 7.5, "year": 2023},
//     {"id": 202, "title": "Фильм без любимых жанров", "genres": ["drama", "horror"], "rating": 8.0, "year": 2023},
//     {"id": 203, "title": "Фильм без жанров", "genres": [], "rating": 9.0, "year": 2023}
//   ]
// }`;

// const {user, friendsData: friends, movies} = JSON.parse(data.toString());

// const years = movies.map(mv => mv.year);
// const maxYear = Math.max(...years);
// const minYear = Math.min(...years);
// let d = maxYear - minYear;

// const result = movies.reduce((acc, movie) => {
//     let movieNew = 0;
//     if(maxYear === minYear) {
//         movieNew = 1;
//     } else {
//         movieNew = ((movie.year - minYear) / d);
//     }
//     movieNew *= 0.2;
//     movieNew = +movieNew.toFixed(3);

//     let frScore = 0;
//     if(Object.keys(friends).length) {
//       for(const key in friends) {
//           if(friends[key].includes(movie.id)) {
//               ++frScore;
//           }
//       }
//       frScore /= Object.keys(friends).length;
//       frScore *= 0.1;
//       frScore = +frScore.toFixed(3);
//     };

//     let genreScore = (movie.genres.reduce((acc, genre) => {
//         if(user.preferences.hasOwnProperty(genre)) {
//             return user.preferences[genre] > acc ? user.preferences[genre] : acc;
//         }
//         return acc;
//     }, 0) * 0.4 );
//     genreScore = +genreScore.toFixed(3);

//     let ratingScore = ((movie.rating / 10) * 0.3);
//     ratingScore = +ratingScore.toFixed(3);

//     let score =  genreScore + ratingScore + movieNew + frScore;
//     score = score.toFixed(3);
//     const obj = {
//         id: movie.id,
//         title: movie.title,
//         score: +score
//     };
//     acc.push(obj);
//     return acc;
// }, []);

// const filteredResult = result.filter((movie) => !user.watched.includes(movie.id));

// console.log(JSON.stringify(filteredResult.toSorted((a, b) => b.score - a.score), null, 2));

// 3.2.1

// const data = `{
//   "arr1": [
//     { "id": 1, "name": "Иван" },
//     { "id": 2, "name": "Мария" },
//     { "id": 3, "name": "Петр" }
//   ],
//   "arr2": [
//     { "id": 3, "name": "Петр" },
//     { "id": 1, "name": "Иван" },
//     { "id": 2, "name": "Мария" }
//   ]
// }`;

// const {arr1, arr2} = JSON.parse(data.toString());
// const map1 = new Map;
// arr1.forEach((val) => {
//     map1.set(val.id, val.name);
// });
// const map2 = new Map;
// let flag = true;
// arr2.forEach((val) => {
//     map2.set(val.id, val.name);
//     if(map1.get(val.id) !== map2.get(val.id)) {
//         flag = false;
//     }
// });
// if(map1.length !== map2.length) {
//     flag = false;
// }
// console.log(flag);

// 3.3.1

// const data = `{
//     "start": 0,
//     "end": -10,
//     "step": -3
// }`;

//     const obj = JSON.parse(data.toString());
//     obj[Symbol.iterator] = function () {
//         let current = this.start;
//         let flag = 0;
//         if(this.start > this.end) {flag = 1};
//         return {
//             next: () => {
//                 if(this.step === 0) {
//                     return {value: undefined, done: true};
//                 }
//                 if(flag) {
//                     if(current < this.end) {
//                         return {value: undefined, done: true};
//                 }
//                 } else {
//                     if(current > this.end) {
//                         return {value: undefined, done: true};
//                     }
//                 }
//                 let temp = current;
//                 current += this.step;
//                 return {value: temp, done: false};
//             }
//         }
//     }
//     let arr = [];
//     for(const num of obj) {
//         arr.push(num);
//     }
//     console.log(arr);