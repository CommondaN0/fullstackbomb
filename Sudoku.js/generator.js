const date = new Date().toISOString();
const obj = {
    "Auth": {
        login: "admin",
        password: "admin"
    },
    Headers: {
        "Cookie": "token",
        "Content": "json",
    },
    date: date,
}

console.log(JSON.stringify(obj, null, 2));