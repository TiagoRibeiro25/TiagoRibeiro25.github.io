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
              title: "Another",
              episodes: 12,
              watched: 0,
              link: "https://www.anitube.site/67303/",
              img: "https://www.anitube.site/wp-content/uploads/Another.jpg",
            },
            {
              title: "Death Note",
              episodes: 37,
              watched: 2,
              link: "https://www.anitube.site/60368/",
              img: "https://br.web.img2.acsta.net/newsv7/19/08/14/00/05/1724103.jpg",
            },
            {
              title: "One Punch Man - Season 2",
              episodes: 12,
              watched: 0,
              link: "https://www.anitube.site/875524/",
              img: "https://www.anitube.site/wp-content/uploads/One-Punch-Man-2-Temporada-AniTube.jpg",
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
