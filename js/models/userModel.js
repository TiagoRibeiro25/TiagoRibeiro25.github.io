class User {
  id = 0;
  username = "";
  password = "";
  animes = [];

  constructor(username, password) {
    this.id = getNextId();
    this.username = username;
    this.password = password;
  }
}

export let users;

export function init() {
  users = localStorage.users
    ? JSON.parse(localStorage.users)
    : [
        {
          id: 1,
          username: "user",
          password: "password",
          animes: [
            {
              title: "Death Note",
              episodes: 37,
              watched: 2,
              link: "https://www.anitube.site/60370/",
              img: "https://i.pinimg.com/originals/9e/c1/48/9ec1484b8b6058006fdaec93a433e23b.jpg",
            },
            {
              title: "Test1",
              episodes: 48,
              watched: 10,
              link: "https://www.anitube.site/603702/",
              img: "https://br.web.img2.acsta.net/newsv7/19/08/14/00/05/1724103.jpg",
            },
            {
              title: "Test3",
              episodes: 67,
              watched: 24,
              link: "https://www.anitube.site/6037011/",
              img: "https://br.web.img2.acsta.net/newsv7/19/08/14/00/05/1724103.jpg",
            },
          ],
        },
      ];
}

function getNextId() {
  return users.length === 0 ? 1 : users[users.length - 1].id + 1;
}

// Register
export function createAccount(username, password) {
  const user = new User(username, password);
  users.push(user);
  localStorage.users = JSON.stringify(users);
}

// Log In
export function logIn(username, password) {
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    // add user to session Storage
    sessionStorage.user = JSON.stringify(user);
    return true;
  }
  return false;
}

// LOGOUT
export function logout() {
  sessionStorage.removeItem("user");
}

// VERIFY IF THERE'S AN USER AUTHENTICATED
export function isLogged() {
  return sessionStorage.user ? true : false;
}

// RETURN USER AUTHENTICATED
export function getUserLogged() {
  return JSON.parse(sessionStorage.user);
}
