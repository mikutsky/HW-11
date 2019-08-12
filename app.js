// ЗАДАНИЕ №1
// Используя копию планка, в script.js создать асинхронную функцию, в которой
// выполнить запрос к файлу structure.json.
// Полученная структура содержит объект вида
// { html: …, styles: … }
// Добавить html и стили на страницу.

const http = {
  async request(url, options) {
    const response = await fetch(url, options).then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });

    return response;
  }
};

async function getData(res) {
  try {
    const data = await http.request(res);
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

getData("structure.json")
  .then(value => {
    // Стили можно добавить следующим образом, (из задания):
    const style = document.createElement("style");
    style.textContent = value.style;
    document.body.appendChild(style);

    document.body.innerHTML = value.html;
  })
  .catch(err => console.log(err));

// ЗАДАНИЕ №2
// С помощью async функции и fetch() выполнить get запрос к ресурсу.
// Из полученного массива построить список юзеров, имеющий вид:

// “Пользователь userID=1 имеет 5 завершенных и 6 не завершенных заданий”
// “Пользователь userID=2 имеет 3 завершенных и 7 не завершенных заданий”
// “Пользователь userID=3 имеет 8 завершенных и 2 не завершенных заданий”
// …

// Список должен выводиться на страницу в виде ul.

// https://jsonplaceholder.typicode.com/todos

getData("https://jsonplaceholder.typicode.com/todos ")
  .then(value => {
  //   // const users = {};

  //   // Формируем список:
  //   // const ulUsers = document.createElement("ul");

  //   const usersTODO=value.reduce((acc,el)=>{acc[el.userId]["completed"]=5;acc[el.userId]["uncomleted"]=0; return acc;},{});

  //   // for (const todos in value){

  //   //   const num=Number(users[todos.userId].comletedTask)++;

  //     // if (todos.comleted) users[todos.userId].comletedTask=Number(users[todos.userId].comletedTask)++;
  //     // else Number(users[todos.userId].uncomletedTask)++;

  //   console.dir(usersTODO);
  // }

  //   // style.textContent = value.style;
  //   // document.body.appendChild(style);

  //   // document.body.innerHTML = value.html;
  })
  .catch(err => console.log(err));
