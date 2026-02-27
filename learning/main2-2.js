 "use strict"
// 3.8.1

// function memoize(fn, ctx) {
//   const cache = new Map();
//   return (...args) => {
//     const key = JSON.stringify(args);
//     if (cache.has(key)) {
//       return cache.get(key);
//     }
//     const result = fn.call(ctx, ...args);
//     cache.set(key, result);
//     return result;
//   };
// }

// // Объект calculator не меняем
// const calculator = {
//   power(num, exponent = 2) {
//     return Math.pow(num, exponent);
//   },
//   fibonacci(n) {
//     if (n <= 1) return n;
//     return this.fibonacci(n - 1) + this.fibonacci(n - 2);
//   },
//   factorial(n) {
//     return n === 0 ? 1 : n * this.factorial(n - 1);
//   }
// }

// const data = `{"methodName": "power", "args": [5, 4]}`;
//   const { methodName, args } = JSON.parse(data.toString());
//   const memoFunc = memoize(calculator[methodName], calculator);
//   console.log(memoFunc(...args)); // рассчет
//   console.log(memoFunc([10, 10])); // должны получить из кэша

// console.log(this);

// "use strict"
// const smartObject = {
//     _status: "inactive",
//     _history: [],
//     get status() {
//         return this._status;
//     },
//     set status(value) {
//         switch(value) {
//             case "inactive": break;
//             case "active": break;
//             case "pending": break;
//             case "deleted": break;
//             default: throw new Error("Invalid status value");
//         }
//         const previous = this._status;
//         this._status = value;
//         this._history.push({from: previous, to: value});
//     },
//     get history() {
//         return this._history;
//     }
// };

// smartObject.status = "active";
// smartObject.status = "active";
// console.log(smartObject.history);

// 4.2.1

// const data = `{
//   "oldUser": {
//     "userName": "Алексей Смирнов",
//     "userEmail": "alexey@mail.ru",
//     "profilePic": "photo.jpg"
//   },
//   "fieldMapping": {
//     "userName": "login",
//     "userEmail": "email"
//   }
// }`;
//   const { oldUser, fieldMapping } = JSON.parse(data.toString());
//   const newUser = {}; 
//   let oldentr = Object.entries(oldUser);
//   const fieldkeys = Object.keys(fieldMapping);
//   oldentr = oldentr.filter((val) => fieldkeys.includes(val[0]));
//   const tempUser = Object.fromEntries(oldentr);
//   for(const [key, val] of Object.entries(fieldMapping)) {
//     newUser[val] = tempUser[key];
//   }
//   console.log(newUser);

// 4.6.1

// const data = `[
//   { "user_id": 1, "datetime": "2025-09-01T10:00:00" },
//   { "user_id": 2, "datetime": "2025-09-02T10:00:00" },
//   { "user_id": 3, "datetime": "2025-09-03T10:00:00" },
//   { "user_id": 4, "datetime": "2025-09-04T10:00:00" },
//   { "user_id": 5, "datetime": "2025-09-05T10:00:00" },
//   { "user_id": 6, "datetime": "2025-09-06T10:00:00" },
//   { "user_id": 7, "datetime": "2025-09-07T10:00:00" }
// ]`;

// const arr = JSON.parse(data.toString());
// const map = new Map(arr.map((user) => {user.datetime = new Date(user.datetime); return user})
// .sort((a, b) => a.datetime - b.datetime)
// .map((user) => {user.datetime = user.datetime.toLocaleString("ru-RU", {
//                                 weekday: "long",
//                                 timeZone: "Europe/Moscow",
//                               });
//                 user.datetime = user.datetime[0].toLocaleUpperCase() + user.datetime.slice(1);
//                 return user})
// .map(val => Object.values(val)));
// const newArr = [...map].map((val) => {return {id: val[0], day: val[1]}});
// const groupArr = Object.groupBy(newArr, (rec) => rec.day);
// const outArr = [];
// for(const key in groupArr) {
//     outArr.push([key, groupArr[key].length]);
// }
// const sortArr = outArr.toSorted((a, b) => b[1] - a[1]).reduce((acc, rec, id) => {
//   if(id === 0) {
//     acc.push(rec);
//     return acc;
//   }
//   if(acc.length >= 3) {
//     if(rec[1] < acc[id - 1][1]) {
//       return acc;
//     }
//     acc.push(rec);
//     return acc;
//   }
//   acc.push(rec);
//   return acc;
// }, []).map(rec => rec.join(" - ")).join(", ");

// console.log(sortArr);

// 5.5.1

// function ShoppingCart() {
//     this.purchases = new Map();
// }

// ShoppingCart.prototype.addItem = function(item, price) {
//   if(this.purchases.get(item)) {
//     return;
//   }
//   this.purchases.set(item, price);
// };

// ShoppingCart.prototype.removeItem = function(item) {
//   if(!this.purchases.get(item)) {
//     return;
//   }
//   this.purchases.delete(item);
// };

// ShoppingCart.prototype.getTotal = function() {
//   let sum = 0;
//   for(const price of this.purchases.values()) {
//     sum += price;
//   }
//   return sum;
// };

// ShoppingCart.prototype.clear = function() {
//   this.purchases.clear();
// };

// const sc = new ShoppingCart();

// sc.addItem("fag", 123);
// sc.addItem("gaf", 123);
// sc.removeItem("fag");
// sc.clear();
// console.log(sc.getTotal());

// 5.5.2

// function Task(title, description) {
//   this.title = title;
//   this.description = description ?? "";
//   this.completed = false;
// }

// function TodoList(title) {
//   this.title = title;
//   this.tasks = [];
// }

// TodoList.prototype.addTask = function(task) {
//   for(const val of this.tasks) {
//     if(val.title === task.title) {
//       throw new Error();
//     }
//   }
//   this.tasks.push(task);
// }

// TodoList.prototype.completeTask = function(title) {
//   for(const val of this.tasks) {
//     if(val.title === title) {
//       if(val.completed) {
//         throw new Error();
//       }
//       val.completed = true;
//       return;
//     }
//   }
//   throw new Error();
// }

// TodoList.prototype.removeTask = function(title) {
//   for(const val of this.tasks) {
//     if(val.title === title) {
//       const i = this.tasks.indexOf(val);
//       this.tasks.splice(i, 1);
//       return;
//     }
//   }
//   throw new Error();
// }

// TodoList.prototype.getCompletedTasks = function() {
//   return this.tasks.reduce((acc, val) => {
//   if(val.completed) {
//       acc.push(val);
//       return acc;
//     }
//     return acc;
//   }, []);
// }

// TodoList.prototype.getPendingTasks = function() {
//   return this.tasks.reduce((acc, val) => {
//   if(!val.completed) {
//       acc.push(val);
//       return acc;
//     }
//     return acc;
//   }, []);
// }

// 5.5.3

// function ChatRoom(roomName) {
//   if(typeof roomName !== "string") {
//     throw new TypeError("Room name must be a string");
//   }
//   this.roomName = roomName;
//   this.users = [];
//   this.messages = [];
// }

// ChatRoom.prototype.addUser = function(username) {
//   if(typeof username !== "string") {
//     throw new TypeError("Username must be a string");
//   }
//   if(this.users.indexOf(username) !== -1) {
//     throw new Error("User already exists");
//   }
//   if(username.indexOf(" ") !== -1 || username === "") {
//     throw new Error("Invalid username");
//   }
//   this.users.push(username);
// }

// ChatRoom.prototype.removeUser = function(username) {
//   if(typeof username !== "string") {
//     throw new TypeError("Username must be a string");
//   }
//   if(this.users.indexOf(username) === -1) {
//     throw new Error("User not found");
//   }
//   this.users.splice(this.users.indexOf(username), 1);  
// }

// ChatRoom.prototype.removeUserMessages = function(username) {
//   if(typeof username !== "string") {
//     throw new TypeError("Username must be a string");
//   }
//   let count = 0;
//   for(const message of this.messages.values()) {
//     if(message.username === username) {
//       ++count;
//       this.messages.splice(this.messages.indexOf(message), 1);
//     }
//   }
//   return count; 
// }

// ChatRoom.prototype.sendMessage = function(username, text) {
//   if(typeof username !== "string") {
//     throw new TypeError("Username must be a string");
//   }
//   if(this.users.indexOf(username) === -1) {
//     throw new Error("User not found");
//   }
//   if(typeof text !== "string") {
//     throw new TypeError("Text must be a string");
//   }
//   if(text === "" || text.trim() === "") {
//     throw new Error("Empty text");
//   }
//   this.messages.push({
//     username: username,
//     text: text,
//     date: new Date(),
//   });
// }

// ChatRoom.prototype.getMessages = function() {
//   return JSON.parse(JSON.stringify(this.messages));
// }

// ChatRoom.prototype.getUserMessages = function(username) {
//   if(typeof username !== "string") {
//     throw new TypeError("Username must be a string");
//   }
//   return JSON.parse(JSON.stringify(this.messages.filter((mes) => mes.username === username)));
// }

// ChatRoom.prototype.getUsers = function() {
//   return JSON.parse(JSON.stringify(this.users));
// }

// ChatRoom.prototype.getMessageCount = function() {
//   return this.messages.length;
// }

// ChatRoom.prototype.fg = function() {return this.messages.values()}

//   const chat = new ChatRoom('Тест');
//   chat.addUser('Алиса');
//   chat.addUser('Боб');
//   chat.sendMessage('Алиса', 'Сообщение 1');
//   chat.sendMessage('Боб', 'Сообщение 2');
//   chat.sendMessage('Алиса', 'Сообщение 3');
//   const removedCount = chat.removeUserMessages('Алиса');

// 5.7.1

// function User(name, gender) {
//   if(name === "" || name === undefined) {
//     throw new Error("Name cannot be empty");
//   }
//   this.name = name;
//   if(!(gender === "f" || gender === "m")) {
//     throw new Error(`Gender must be "m" or "f"`)
//   }
//   this.gender = gender;
//   gender === "f" ? ++User.femaleCount : ++User.maleCount;
//   ++User.totalCount;
//   this.id = User.nextId++;
// }
// User.nextId = 1;
// User.totalCount = 0;
// User.maleCount = 0;
// User.femaleCount = 0;

// const u1 = new User("fag", "m");
// const u2 = new User("fag", "f");
// console.log(User.totalCount, User.maleCount, User.femaleCount, u1.id, u2.id);

// 5.10.1

// function Task(id, title, description, priority) {
//     switch(id) {
//         case undefined: throw new Error("Argument id required");
//     }
//     switch(title) {
//         case undefined: throw new Error("Argument title required");
//     }
//     switch(description) {
//         case undefined: throw new Error("Argument description required");
//     }
//     switch(priority) {
//         case undefined: throw new Error("Argument priority required");
//     }
//     if(!(Number.isInteger(id) && id > 0)) {
//         throw new Error("Invalid id: must be positive integer");
//     }
//     this.id = id;
//     if(typeof title !== "string" || title === "") {
//         throw new Error("Invalid title: must be non-empty string")
//     }
//     this.title = title;
//     if(typeof description !== "string" || description === "") {
//         throw new Error("Invalid description: must be non-empty string")
//     }
//     this.description = description;
//     if(!Task.VALID_PRIORITIES.includes(priority)) {
//         throw new Error(`Invalid priority: ${priority}`);
//     }
//     this.priority = priority;
//     this.status = "todo";
//     this.assignee = null;
//     this.createdAt = new Date();
// }

// Task.VALID_PRIORITIES = ["low", "medium", "high", "critical"];
// Task.VALID_STATUSES = ["todo", "in-progress", "done"];
// Task.PRIORITY_VALUES = {
//     "low": 1,
//     "medium": 2,
//     "high": 3,
//     "critical": 4
// };

// Task.prototype.getPriorityLevel = function() {
//     return Task.PRIORITY_VALUES[this.priority];    
// }

// Task.prototype.updateStatus = function(newStatus) {
//     if(!Task.VALID_STATUSES.includes(newStatus)) {
//         throw new Error(`Invalid new status: ${newStatus}`);
//     }
//     this.status = newStatus;
// }

// Task.prototype.assignTo = function(person) {
//     if(typeof person !== "string" || person === "") {
//         throw new Error(`Invalid person: ${person}`);
//     }
//     this.assignee = person;
// }

// Task.calculateAveragePriority = function(tasks) {
//     if(tasks.length === 0) {
//         return null;
//     }
//     const t = tasks.map(val => Task.PRIORITY_VALUES[val.priority]);
//     const avg = t.reduce((acc, val) => {acc += val; return acc}, 0) / t.length;
//     if(avg > 1.5) {
//         if(avg > 2.5) {
//             if(avg > 3.5) {
//                 return "critical";
//             }
//             return "high";
//         }
//         return "medium";
//     }
//     return "low";
// }

// function Bug(id, title, description, priority, severity, reproSteps = "") {
//     Task.call(this, id, title, description, priority);
//     switch(severity) {
//         case undefined: throw new Error("Argument severity required");
//     }
//     if(!Bug.VALID_SEVERITIES.includes(severity)) {
//         throw new Error(`Invalid severity: ${severity}`);
//     }
//     this.severity = severity;
//     this.reproSteps = reproSteps;
// }

// Bug.prototype = Object.create(Task.prototype);
// Bug.prototype.constructor = Bug;

// Bug.VALID_SEVERITIES = ["low", "medium", "high", "critical"];
// Bug.SEVERITY_VALUES = {
//     "low": 1,
//     "medium": 2,
//     "high": 3,
//     "critical": 4
// };

// Bug.prototype.getSeverityLevel = function() {
//     return Bug.SEVERITY_VALUES[this.severity];
// }

// Feature.prototype = Object.create(Task.prototype);
// Feature.prototype.constructor = Feature;

// function Feature(id, title, description, priority, estimatedHours) {
//     Task.call(this, id, title, description, priority);
//     switch(estimatedHours) {
//         case undefined: throw new Error("Argument estimatedHours required");
//     }
//     if(!(Number.isInteger(estimatedHours) && estimatedHours > 0)) {
//         throw new Error(`Invalid estimated hours: ${estimatedHours}`);
//     }
//     this.estimatedHours = estimatedHours;
// }


// Feature.prototype.getComplexity = function() {
//     const eh = this.estimatedHours;
//     if(eh > 5) {
//         if(eh > 15) {
//             if(eh > 30) {
//                 return "very-complex";
//             }
//             return "complex";
//         }
//         return "medium";
//     }
//     return "simple";
// };

//Ебанная дуристика в JS!!!!!!
// const ob1 = {a: 5};
// const ob2 = Object.create(ob1);
// console.log(ob2);
// console.log(ob1);
// console.log(ob2.a)
// ob2.a = 10;
// console.log(ob2);
// function Test(age) {
//     this.age = age;
// }
// Test.prototype._name = "fag";
// Object.defineProperty(Test.prototype, "name", {
//     get() {
//         return this.name;
//     },
//     set(name) {
//         this._name = name;
//     }
// })

// Рабочий пример с наследованием
// function A(a) {
//     this.a = a;
// }

// A.prototype.as = function() {
//     console.log(this.a);
// }

// function B(a, b) {
//     A.call(this, a);
//     this.b = b;
// }

// B.prototype = Object.create(A.prototype);
// B.prototype.constructor = B;

// B.prototype.bs = function() {
//     console.log(this.b);
// }

// function C(a, b, c) {
//     B.call(this, a, b);
//     this.c = c;
// }

// C.prototype = Object.create(B.prototype);
// C.prototype.constructor = C;

// C.prototype.cs = function() {
//     console.log(this.c);
// }

// function D(a, b, c, d) {
//     C.call(this, a, b, c);
//     this.d = d;
// }

// D.prototype = Object.create(C.prototype);
// D.prototype.constructor = D;

// D.prototype.ds = function() {
//     console.log(this.d);
// }

// const a = new A(1);
// const b = new B(1, 2);
// const c = new C(1, 2, 3);
// const d = new D(1, 2, 3, 4);
// console.log(d instanceof B);

// 5.18.1

// Ваш код
// function Employee(name, position, salary) {
//     this.name = name;
//     this.position = position;
//     this.salary = salary;
// }

// Employee.prototype.getAnnualSalary = function () {
//     return this.salary * 12;
// }

// function Manager(name, position, salary, bonus) {
//     Employee.call(this, name, position, salary);
//     this.bonus = bonus;
// }

// Manager.prototype.getAnnualSalary = function () {
//     return this.salary * 12 + this.bonus;
// }

// function createEmployee(data) {
//     const {name, position, salary, bonus} = data;
//     if(bonus !== undefined) {
//        return new Manager(name, position, salary, bonus);
//     }
//     return new Employee(name, position, salary);
// }

// function findManagers(employees) {
//     return employees.filter(emp => emp.hasOwnProperty("bonus"))
// }

// function getTotalPayroll(employees) {
//     return employees.reduce((acc, emp) => {acc += emp.getAnnualSalary(); return acc}, 0)
// }

// const data = `[
//   {"name": "Андрей", "position": "Волонтер", "salary": 0},
//   {"name": "Ксения", "position": "Руководитель проекта", "salary": 0, "bonus": 0}
// ]`;
// // Получение и вывод данн
//   const employeesData = JSON.parse(data.toString());
//   // Получаем массив объектов
//   const employees = employeesData.map(createEmployee);
//   // Получаем имена всех менеджеров
//   const managerNames = findManagers(employees).map(manager => manager.name).join(', ');
//   // Получаем сумму годовых зарплат всех сотрудников
//   const totalPayroll = getTotalPayroll(employees);

//   // Вывод результатов
//   if (managerNames) {
//     console.log(`Менеджеры: ${managerNames}`);
//   } else {
//     console.log(`Менеджеры: отсутствуют`);
//   }
//   console.log(`Общая годовая зарплата: ${totalPayroll}`);

// class Clock {
//     constructor() {

//     }
//     get seconds() {
//         return this._seconds;
//     }
//     get minutes() {
//         return this._minutes;
//     }
//     get hours() {
//         return this._hours;
//     }
//     get totalSeconds() {
//         return this._totalSeconds;
//     }
//     get timeString() {
//         return `${this._hours < 10 ? "0" + this._hours : this._hours}:${this._minutes < 10 ? "0" + this._minutes : this._minutes}:${this._seconds < 10 ? "0" + this._seconds : this._seconds}`;
//     }
//     set seconds(val) {
//         if(Math.floor(val / 60)) {
//             throw new Error(`Incorrect argument: ${val}`);
//         }
//         this._seconds = Math.floor(val);
//         this._totalSeconds = this._hours * 3600 + this._minutes * 60 + this.seconds;
//     }
//     set minutes(val) {
//         if(Math.floor(val / 60)) {
//             throw new Error(`Incorrect argument: ${val}`);
//         }
//         this._minutes = Math.floor(val);
//         this._totalSeconds = this._hours * 3600 + this._minutes * 60 + this.seconds;

//     }
//     set hours(val) {
//         if(Math.floor(val / 23)) {
//             throw new Error(`Incorrect argument: ${val}`);
//         }
//         this._hours = Math.floor(val);
//         this._totalSeconds = this._hours * 3600 + this._minutes * 60 + this.seconds;
//     }
//     set totalSeconds(val) {
//         if(val < 0 || val > 85399) {
//             throw new Error(`Incorrect argument: ${val}`);
//         }
//         this.seconds = val % 60;
//         this.minutes = (val / 60) % 60;
//         this.hours = (val / 3600) % 24;
//     }
//     tick () {
        
//     }
// }

// const time = new Clock();
// time.seconds = 59;
// time.minutes = 58;
// time.hours = 14;
// console.log(time);
// time.totalSeconds = 35781;
// console.log(time);

// class Test {
//     static correctVals = [1, 2, 3, 4, 5];
//     static isTest(obj) {
//         if(Object.getPrototypeOf(obj).constructor === Test.prototype.constructor) {
//             return true;
//         }
//         return false;
//     }
//     constructor (val) {
//         if(Test.correctVals.includes(val)) {
//             throw new Error("Incorrect value");
//         }
//         this.value = val;
//     }
// }

// const arr = {};

// const t = new Planet(5, 6, 7);
// console.log(t.value);
// console.log(t.correctVals);
// console.log(Test.correctVals);
// console.log(Test.isTest(arr));
// console.log(Test.isTest(t));

class Task{
    constructor(id, priority, executionTime) {
        this.id = id;
        this.priority = priority;
        this.executionTime = executionTime;
    }
}

class Scheduler{
    tasks = [];
    constructor() {
        if(new.target === Scheduler) {
            throw new Error();
        }
    }
    addTask(task) {
        if(Object.getPrototypeOf(task).constructor !== Task.prototype.constructor) {
            throw new Error();
        }
        this.tasks.push(task);
    }
    getNextTask() {
        if(this.hasTasks()) {
            return this.tasks[0];
        }
        return null;
    }
    hasTasks() {
        if(this.tasks.length === 0) {
            return false;
        }
        return true;
    }
    executeNextTask() {
        if(!this.hasTasks) {
            return null;
        }
        const task = this.tasks.splice(0, 1);
        return task[0];
    }
    getSchedule() {
        return this.tasks;
    }
}

class RoundRobin extends Scheduler {

}

class PriorityScheduler extends Scheduler {
    addTask(task) {
        super.addTask(task);
        this.tasks.sort((a, b) => b.priority - a.priority);
    }
}

class ShortestJobFirst extends Scheduler {
    addTask(task) {
        super.addTask(task);
        this.tasks.sort((a, b) => b.executionTime - a.executionTime);
    }
}




  const scheduler = new RoundRobin();
  console.log("Тест 1.1 (метод addTask):", scheduler.hasTasks() === false ? "OK" : "FAIL");

  const t1 = new Task(1, 3, 10);
  const t2 = new Task(2, 1, 5);
  scheduler.addTask(t1);
  scheduler.addTask(t2);

  console.log("Тест 1.2 (метод hasTasks):", scheduler.hasTasks() === true ? "OK" : "FAIL");
  console.log("Тест 1.3 (метод getNextTask):", scheduler.getNextTask().id === 1 ? "OK" : "FAIL");

  const executed = [];
  while (scheduler.hasTasks()) {
    executed.push(scheduler.executeNextTask().id);
  }
  console.log("Тест 1.4 (порядок выполнения задач):", executed.join(',') === "1,2" ? "OK" : "FAIL");