"use strict"
// import Perplexity from '@perplexity-ai/perplexity_ai';

// const client = new Perplexity({
//   apiKey: "",
// });

// const search = await client.search.create({
//     query: [
//         "Что такое js?"
//     ]
// })

// console.log(search.results)

// const xhr = new XMLHttpRequest();
// const xhr1 = new XMLHttpRequest();

// xhr.open("POST", "https://clothapi.progskill.ru/v1/auth/login");
// xhr.setRequestHeader("Content-Type", "application/json");

// xhr.addEventListener("load", () => {
//   if(xhr.status >= 200 && xhr.status < 299) {
//       xhr1.setRequestHeader("Authorization", "Bearer " + JSON.parse(xhr.responseText).access_token.value);
//       xhr1.send();
//     }
// });

// xhr1.open("GET", "https://clothapi.progskill.ru/v1/users/me");

// xhr1.addEventListener("load", () => {
//   const obj = JSON.parse(xhr1.responseText);
//   console.log(`[Логин]: ${obj.login} [Имя]: ${obj.first_name} [Фамилия]: ${obj.last_name} [Роль]: ${obj.role}`);
// });

// xhr1.addEventListener("error", () => {

// });


// const s = {
//   login: "admin",
//   password: "admin",
// };

// xhr.send(JSON.stringify(s));

// const url = new URL("https://clothapi.progskill.ru/v1/products");
// url.searchParams.set("page", "1");
// url.searchParams.set("per_page", "10");
// url.searchParams.set("min_price", "1000000");

// const xhr = new XMLHttpRequest();
// xhr.open("GET", url.toString());
// xhr.send();

// xhr.addEventListener("load", () => {
//   console.log(xhr.getResponseHeader("Content-Type"));
// });
// let a;
// const url = new URL("https://clothapi.progskill.ru/v1/products",);
// fetch(url).then(res => res.headers)
// .then(ans => { a = ans;
//   console.log(Object.getPrototypeOf(a));

// });

// const s = await fetch(url);
// const j = await s.json();
// console.log(j);

// const url = new URL("https://clothapi.progskill.ru/v1/auth/login")

// const a = await fetch(url, {
//   method: "POST",
//   body: JSON.stringify({login: "admin", password: "admin"}),
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// const data = await a.json();
// console.log(a.status);

// 10.9.1 Отклонение fetch

// const url = new URL("https://clothapi.progskill.ru/v1/products")
// const controller = new AbortController();
// setTimeout(() => controller.abort(), 50);

// const a = await fetch(url, {
//   method: "GET",
//   // body: JSON.stringify({login: "admin", password: "admin"}),
//   // headers: {
//   //   "Content-Type": "application/json"
//   // },
//   signal: controller.signal,
// }).then(r => r.json());

// console.log(a);

//10.9.2 Отправка файла на сервер (картинки в данном примере);

const url = new URL("https://clothapi.progskill.ru/v1/auth/login");
const cred = {
  login: "admin",
  password: "admin"
};

const data = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(cred)
}).then(r => r.json());

const token = data.access_token.value;
const productId = "a6f53cfe-51ca-4971-b596-5765618df9ae";

const submitButton = document.getElementById("submitButton");

document.getElementById("uploadForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if(!file) {
    alert("Выбирете изображение");
    return;
  }

  if(!file.type.startsWith("image/")) {
    alert("Необходимо выбрать изображение");
    return;
  }

  if(file.size > 2 * 1024 * 1024) {
    alert("Слишком большой размер файла\nМаксимальный размер 2Мб");
    return;
  }

  console.log(file);
  submitButton.textContent = "Загрузка...";
  submitButton.disabled = true;
  try{
    const result = await uploadImage(productId, token, file);
    await new Promise(r => setTimeout(r, 2000));
    alert("Фото успешно опубликованно");
    console.log(result);
    submitButton.textContent = "Загрузить изображение";
    submitButton.disabled = false;
  } catch(err) {
    console.log(err);
  }
});

async function uploadImage(productId, token, file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://clothapi.progskill.ru/v1/products/${productId}/upload-image`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if(!response.ok) {
    throw new Error("faggot");
  }
  return response.json();
}




















// async function processNewsStreams(iterators, targetTags) {
//     const process = async function({name, iterator}) {
        
//     }
// }

// const xhr = new XMLHttpRequest();
// xhr.open("GET", "https://clothapi.progskill.ru/v1/brands?page=1&per_page=10", true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.send();
// xhr.addEventListener("load", () => {
//     console.log(JSON.parse(xhr.responseText));
// });