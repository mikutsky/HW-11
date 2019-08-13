// ЗАДАНИЕ №1
// Используя копию планка, в script.js (использую app.js) создать асинхронную
// функцию, в которой выполнить запрос к файлу structure.json.
// Полученная структура содержит объект вида
// { html: …, styles: … }
// Добавить html и стили на страницу.

async function request(url, options) {
  try {
    const response = await fetch(url, options).then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });
    return response;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

request("structure.json")
  .then(value => {
    const style = document.createElement("style");
    style.textContent = value.style;
    document.body.appendChild(style);

    document.body.innerHTML = value.html;
  })
  .catch(err => console.error(err));

// ЗАДАНИЕ №2
// С помощью async функции и fetch() выполнить get запрос к ресурсу.
// Из полученного массива построить список юзеров, имеющий вид:

// “Пользователь userID=1 имеет 5 завершенных и 6 не завершенных заданий”
// “Пользователь userID=2 имеет 3 завершенных и 7 не завершенных заданий”
// “Пользователь userID=3 имеет 8 завершенных и 2 не завершенных заданий”
// …

// Список должен выводиться на страницу в виде ul.

// https://jsonplaceholder.typicode.com/todos

function renderUserUL(objectOfUsers) {
  const ul_Users = document.createDocumentFragment("ul");

  for (const userId in objectOfUsers) {
    const liUser = document.createElement("li");
    liUser.textContent = `Пользователь userID=${userId} имеет ${
      objectOfUsers[userId].completed
    } завершенных и ${
      objectOfUsers[userId].uncompleted
    } не завершенных заданий`;
    ul_Users.appendChild(liUser);
  }

  return ul_Users;
}

request("https://jsonplaceholder.typicode.com/todos")
  .then(value => {
    const usersTaskInfo = value.reduce((acc, el) => {
      if (!acc[el.userId]) acc[el.userId] = { completed: 0, uncompleted: 0 };
      if (el.completed) ++acc[el.userId].completed;
      else ++acc[el.userId].uncompleted;

      return acc;
    }, []);

    document.body.appendChild(renderUserUL(usersTaskInfo));
  })
  .catch(err => console.error(err));

// ЗАДАНИЕ №3
// Используя сервис jsonplaceholder, создать функцию, которая сделает POST
// запросы для добавления любого количества юзеров (примеры там же).
// Каждый успешный запрос будет возвращать ответ в виде созданного юзера
// (объект с дополнительными полем id).
// После последнего запроса (т.е. когда выполнены все запросы) показать
// информацию о всех юзерах (их имена и количество) на странице (использовать
// codepen или любой другой онлайн-редактор).

// При использовании codepen или другого ресурса с httpS, запрос следует слать
// на тот же протокол httpS https://jsonplaceholder.typicode.com/users

// Пример третьей задачи:
// createUsers([{name: 'Vasya', age: 25}, {name: 'Petya', age: 40}]);
// → created 2 users: Vasya, Petya

const usersArr = [{ name: "Vasya", age: 25 }, { name: "Petya", age: 40 }];

function createUsers(usersArr) {
  async function arrRequest(usersArr) {
    const usersRequestsFunc = usersArr.reduce((acc, el) => {
      acc.push(
        new Promise((resolve, reject) => {
          return request("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            body: JSON.stringify(el),
            headers: { "Content-Type": "application/json" }
          })
            .then(data => resolve(data))
            .catch(err => reject(err));
        })
      );
      return acc;
    }, []);
    const response = await Promise.all([...usersRequestsFunc]);
    return response;
  }

  return arrRequest(usersArr).then(usersArr =>
    console.log(
      `created ${usersArr.length} users: ${usersArr
        .map(el => el.name)
        .join(", ")}`
    )
  );
}

createUsers(usersArr);
