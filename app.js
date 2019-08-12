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
  .catch(err => console.log(err));