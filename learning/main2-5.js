// const a = await new Promise(r => r(5));
// console.log(Number.isInteger(a));

// const size = size.trim().toLocaleLowerCase();

// const size = "";
// const map = new Map([["Маленькая", 800], ["Средняя", 1200], ["Большая", 1500]]);
// async function getPrice(size) {
//     const {promise, resolve, reject} = Promise.withResolvers();
//     const newSize = size ? (size[0].toLocaleUpperCase() + size.trim().toLocaleLowerCase().slice(1)) : reject("Вы не выбрали размер!");
//     const output = map.get(newSize) ? resolve(`${newSize} пицца стоит ${map.get(newSize)} руб.`) : reject("Такого размера у нас нет!");
//     return promise;
// }

// getPrice(size)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));



const API_KEY = '';
const response = await fetch('https://api.perplexity.ai/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.1-sonar-small-128k-chat', // Или sonar-large-online для поиска
    messages: [
      {role: 'system', content: 'Ты полезный ассистент.'},
      {role: 'user', content: 'Расскажи шутку про JS'}
    ],
    max_tokens: 200,
    stream: false // true для стриминга
  })
});

const data = await response.json();
console.log(data.choices[0].message.content); // Готовый ответ
parseInt();