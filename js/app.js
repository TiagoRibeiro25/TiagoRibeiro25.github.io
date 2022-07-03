import * as userModel from "./models/userModel.js";
import * as animeModel from "./models/animeModel.js";

/* if there's no user authenticated, redirect to index.html */
if (!userModel.isLogged()) {
  window.location.href = "index.html";
}

// add event listener to logout button
document.getElementById("logOutBtn").addEventListener("click", () => {
  document.querySelector("#logOutMsg").style.visibility = "visible";

  let count = 0;
  setInterval(() => {
    if (count === 3) {
      userModel.logout();
      window.location.href = "index.html";
      return;
    }
    document.querySelector("#logOutText").innerHTML += ".";
    if (count === 2) {
      setTimeout(() => {
        document.querySelector("#logOutMsg").innerHTML += " Success!";
      }, 333);
    }
    count++;
  }, 333);
});

// add event listener to settings form
document.querySelector("#newSettings").addEventListener("submit", (event) => {
  event.preventDefault();

  // reset error messages
  document.querySelector("#settingsErrorMsg").style.display = "none";
  document.querySelector("#newUserName").style.borderColor = "";
  document.querySelector("#newUserName").style.borderWidth = "";
  document.querySelector("#newUserName").style.borderStyle = "";
  document.querySelector("#newPassword").style.borderColor = "";
  document.querySelector("#newPassword").style.borderWidth = "";
  document.querySelector("#newPassword").style.borderStyle = "";
  document.querySelector("#confirmNewPassword").style.borderColor = "";
  document.querySelector("#confirmNewPassword").style.borderWidth = "";
  document.querySelector("#confirmNewPassword").style.borderStyle = "";

  // get new user name and password
  const newUserName = document.querySelector("#newUserName").value;
  const newPassword = document.querySelector("#newPassword").value;
  const confirmNewPassword = document.querySelector(
    "#confirmNewPassword"
  ).value;

  userModel.init();

  // check if there's already an user with the same username
  if (userModel.users.find((user) => user.username === newUserName)) {
    document.querySelector("#settingsErrorMsg").style = "display: block";
    document.querySelector("#settingsErrorText").innerHTML =
      "Username already exists";
    document.querySelector("#newUserName").style.borderColor = "red";
    document.querySelector("#newUserName").style.borderWidth = "2px";
    document.querySelector("#newUserName").style.borderStyle = "solid";
    return;
  }

  // check if the passwords match
  if (newPassword !== confirmNewPassword) {
    document.querySelector("#settingsErrorMsg").style = "display: block";
    document.querySelector("#settingsErrorText").innerHTML =
      "Passwords don't match";
    document.querySelector("#newPassword").style.borderColor = "red";
    document.querySelector("#newPassword").style.borderWidth = "2px";
    document.querySelector("#newPassword").style.borderStyle = "solid";
    document.querySelector("#confirmNewPassword").style.borderColor = "red";
    document.querySelector("#confirmNewPassword").style.borderWidth = "2px";
    document.querySelector("#confirmNewPassword").style.borderStyle = "solid";
    return;
  }

  // update user name and password
  userModel.users.find(
    (user) => user.username === userModel.getUserLogged().username
  ).password = newPassword;
  userModel.users.find(
    (user) => user.username === userModel.getUserLogged().username
  ).username = newUserName;

  // save changes to localStorage
  localStorage.users = JSON.stringify(userModel.users);

  // update user logged
  sessionStorage.user = JSON.stringify(
    userModel.users.find((user) => user.username === newUserName)
  );

  // show success message
  document.querySelector("#settingsSuccessMsg").style = "display: block";
  document.querySelector("#settingsSuccessText").innerHTML = "Success!";

  let count = 0;
  setInterval(() => {
    if (count === 3) {
      window.location.href = "app.html";
      return;
    }
    document.querySelector("#settingsSuccessText").innerHTML += ".";
    count++;
  }, 333);
});

// add event listener to add new anime form
document.querySelector("#newAnimeData").addEventListener("submit", (event) => {
  event.preventDefault();

  // reset error messages
  document.querySelector("#addNewErrorMsg").style.display = "none";
  document.querySelector("#addNewTitle").style.borderColor = "";
  document.querySelector("#addNewTitle").style.borderWidth = "";
  document.querySelector("#addNewTitle").style.borderStyle = "";
  document.querySelector("#addNewEpisodes").style.borderColor = "";
  document.querySelector("#addNewEpisodes").style.borderWidth = "";
  document.querySelector("#addNewEpisodes").style.borderStyle = "";
  document.querySelector("#addNewEpisodesWatched").style.borderColor = "";
  document.querySelector("#addNewEpisodesWatched").style.borderWidth = "";
  document.querySelector("#addNewEpisodesWatched").style.borderStyle = "";
  document.querySelector("#addNewLink").style.borderColor = "";
  document.querySelector("#addNewLink").style.borderWidth = "";
  document.querySelector("#addNewLink").style.borderStyle = "";

  // reset success message
  document.querySelector("#addNewSuccessMsg").style.display = "none";

  const newTitle = document.querySelector("#addNewTitle").value;
  const newEpisodes = parseInt(document.querySelector("#addNewEpisodes").value);
  const newEpisodesWatched = parseInt(
    document.querySelector("#addNewEpisodesWatched").value
  );
  const newLink = document.querySelector("#addNewLink").value;
  const newImg = document.querySelector("#addNewImg").value;

  // check if there's already an anime with the same title
  if (
    userModel.getUserLogged().animes.find((anime) => anime.title === newTitle)
  ) {
    document.querySelector("#addNewErrorMsg").style = "display: block";
    document.querySelector("#addNewErrorText").innerHTML =
      "Anime already exists";
    document.querySelector("#addNewTitle").style.borderColor = "red";
    document.querySelector("#addNewTitle").style.borderWidth = "2px";
    document.querySelector("#addNewTitle").style.borderStyle = "solid";
    return;
  }

  // check if episodes watched is higher than episodes
  if (newEpisodesWatched > newEpisodes) {
    document.querySelector("#addNewErrorMsg").style = "display: block";
    document.querySelector("#addNewErrorText").innerHTML =
      "Episodes watched is higher than episodes";
    document.querySelector("#addNewEpisodes").style.borderColor = "red";
    document.querySelector("#addNewEpisodes").style.borderWidth = "2px";
    document.querySelector("#addNewEpisodes").style.borderStyle = "solid";
    document.querySelector("#addNewEpisodesWatched").style.borderColor = "red";
    document.querySelector("#addNewEpisodesWatched").style.borderWidth = "2px";
    document.querySelector("#addNewEpisodesWatched").style.borderStyle =
      "solid";
    return;
  }

  // check if there's already an anime with the same link
  if (
    userModel.getUserLogged().animes.find((anime) => anime.link === newLink)
  ) {
    document.querySelector("#addNewErrorMsg").style = "display: block";
    document.querySelector("#addNewErrorText").innerHTML =
      "There's already an anime with that link";
    document.querySelector("#addNewLink").style.borderColor = "red";
    document.querySelector("#addNewLink").style.borderWidth = "2px";
    document.querySelector("#addNewLink").style.borderStyle = "solid";
    return;
  }

  // load users from localStorage
  userModel.init();

  // add new anime to user's animes
  userModel.users
    .find((user) => user.username === userModel.getUserLogged().username)
    .animes.push(
      animeModel.createNewAnime(
        newTitle,
        newEpisodes,
        newEpisodesWatched,
        newLink,
        newImg
      )
    );

  //update session storage
  sessionStorage.user = JSON.stringify(
    userModel.users.find(
      (user) => user.username === userModel.getUserLogged().username
    )
  );

  // update local storage
  localStorage.users = JSON.stringify(userModel.users);

  // show success message
  document.querySelector("#addNewSuccessMsg").style = "display: block";

  loadAnimeList();
});

// add event listener to delete anime button
document.querySelector("#deleteBtn").addEventListener("click", (e) => {
  e.preventDefault();

  // reset error and success messages
  document.querySelector("#deleteErrorMsg").style.display = "none";
  document.querySelector("#deleteSuccessMsg").style.display = "none";

  // delete list of animes
  document.querySelector("#deleteListSection").innerHTML = "";

  userModel.init();

  // verify if the user has an anime in his list
  if (userModel.getUserLogged().animes.length === 0) {
    document.querySelector("#deleteErrorMsg").style = "display: block";
    return;
  }

  // create list of animes
  document.querySelector("#deleteListSection").innerHTML = `
    <select id="deleteList" class="form-select"></select>
  `;

  // add the animes to the list
  for (let anime in userModel.getUserLogged().animes) {
    document.querySelector("#deleteList").innerHTML += `
      <option class="deleteAnimes" value="${
        userModel.getUserLogged().animes[anime].title
      }">${userModel.getUserLogged().animes[anime].title}</option>
    `;
  }

  // add event listener to delete anime button
  document.querySelector("#deleteAnimeData").addEventListener("submit", (e) => {
    e.preventDefault();

    const deleteAnimeTitle = document.querySelector("#deleteList").value;
    const user = userModel.getUserLogged();

    // remove anime from user's animes
    user.animes = user.animes.filter(
      (anime) => anime.title !== deleteAnimeTitle
    );

    // update session storage
    sessionStorage.user = JSON.stringify(user);

    userModel.users.find(
      (user) => user.username === userModel.getUserLogged().username
    ).animes = user.animes.filter((anime) => anime.title !== deleteAnimeTitle);

    console.log(userModel.users);

    // update local storage
    localStorage.users = JSON.stringify(userModel.users);

    // show success message
    document.querySelector("#deleteSuccessMsg").style = "display: block";

    // wait 1s and reload page
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
});

// Load Animes and show them in the list
function loadAnimeList() {
  // clear list
  document.querySelector("#animeList").innerHTML = "";

  // if the user doesn't have any anime in his list
  if (userModel.getUserLogged().animes.length === 0) return;

  // add animes to list
  for (let anime in userModel.getUserLogged().animes) {
    document.querySelector("#animeList").innerHTML += `
    <div class="col-md-3 col-sm-6">
      <div class="card card-block">
        <img
          src="${userModel.getUserLogged().animes[anime].img}"
          alt="Could not load image"
        />
        <h5 class="card-title mt-3 mb-3 text-center">${
          userModel.getUserLogged().animes[anime].title
        }</h5>
        <p class="card-text text-center">Episodes remaining: ${
          userModel.getUserLogged().animes[anime].episodes -
          userModel.getUserLogged().animes[anime].watched
        }</p>
        <button class="btn btn-secondary animeCardBtns" value="${
          userModel.getUserLogged().animes[anime].title
        }"
        data-toggle="modal"
        data-target="#animeModal"
        >Open</button>
      </div>
    </div>
    `;
  }

  // add event listener to anime cards
  document.querySelectorAll(".animeCardBtns").forEach((btn) => {
    btn.addEventListener("click", () => {
      // get anime data
      const anime = userModel
        .getUserLogged()
        .animes.find((anime) => anime.title === btn.value);

      // show anime data
      document.querySelector("#animeContentModalTitle").innerText = anime.title;
      document.querySelector("#animeContentEpisodes").value = anime.episodes;
      document.querySelector("#animeContentEpisodesWatched").value =
        anime.watched;
      document.querySelector("#animeContentLink").value = anime.link;
      document.querySelector("#animeContentImg").value = anime.img;
    });
  });
}

// add event listener to anime modal
document.querySelector("#animeContent").addEventListener("submit", (e) => {
  e.preventDefault();

  // reset error and success messages
  document.querySelector("#animeErrorMsg").style.display = "none";
  document.querySelector("#animeSuccessMsg").style.display = "none";
  document.querySelector("#animeContentEpisodesWatched").style.border = "";
  document.querySelector("#animeContentEpisodes").style.border = "";

  // get anime data
  const animeTitle = document.querySelector(
    "#animeContentModalTitle"
  ).innerText;
  const animeEpisodes = parseInt(
    document.querySelector("#animeContentEpisodes").value
  );
  const animeEpisodesWatched = parseInt(
    document.querySelector("#animeContentEpisodesWatched").value
  );
  const animeLink = document.querySelector("#animeContentLink").value;
  const animeImg = document.querySelector("#animeContentImg").value;

  // check if episodes watched is higher than episodes

  if (animeEpisodesWatched > animeEpisodes) {
    document.querySelector("#animeContentEpisodesWatched").style =
      "border: 2px solid red";
    document.querySelector("#animeContentEpisodes").style =
      "border: 2px solid red";

    // show error message
    document.querySelector("#animeErrorMsg").style.display = "block";
    return;
  }

  // load users from local storage
  userModel.init();

  // update anime information
  animeModel.modifyAnime(
    userModel.users,
    animeTitle,
    animeEpisodes,
    animeEpisodesWatched,
    animeLink,
    animeImg
  );

  // show success message
  document.querySelector("#animeSuccessMsg").style.display = "block";

  loadAnimeList();
});

// add event to open anime button
document.querySelector("#openAnimeBtn").addEventListener("click", () => {
  const animeLink = document.querySelector("#animeContentLink").value;

  // open on different tab
  window.open(animeLink, "_blank");
});

loadAnimeList();
