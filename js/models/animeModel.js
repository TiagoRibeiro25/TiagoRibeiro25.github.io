class Anime {
  title = "";
  episodes = 0;
  watched = 0;
  link = "";
  img = "";

  constructor(title, episodes, watched, link, img) {
    this.title = title;
    this.episodes = episodes;
    this.watched = watched;
    this.link = link;
    this.img = img;
  }
}

export function createNewAnime(title, episodes, watched, link, img) {
  return new Anime(title, episodes, watched, link, img);
}

export function modifyAnime(users, title, episodes, watched, link, img) {
  // Get logged user
  const user = JSON.parse(sessionStorage.user);

  const modifiedAnime = new Anime(title, episodes, watched, link, img);

  // search anime in user's anime list and change it
  for (let i = 0; i < user.animes.length; i++) {
    if (user.animes[i].title === title) {
      user.animes[i] = modifiedAnime;
      break;
    }
  }

  // update session storage
  sessionStorage.user = JSON.stringify(user);

  // search for the user in the local storage
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user.username) {
      users[i] = user;
      break;
    }
  }

  // update local storage
  localStorage.users = JSON.stringify(users);
}
