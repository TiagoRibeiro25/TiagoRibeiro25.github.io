import * as userModel from "./models/userModel.js";

// if there's an user authenticated, redirect to app.html
if (userModel.isLogged()) {
  window.location.href = "app.html";
}

function loadAccess(form) {
  document.querySelector("#accessContainer").innerHTML =
    form === "LogIn"
      ? `
    <h1 class="text-center text-light">Sign In</h1>
    <form method="post" class="py-3" id="LogInForm">

        <div class="alert alert-success" role="alert" style="display: none;" id="successMsgLogIn"></div>
        <div class="alert alert-warning alert-dismissible" role="alert" style="display: none;" id="warningMsgLogIn"></div>

      <div class="form-group">
        <label for="usernameLogIn" class="text-light">Username</label>
        <input
          type="text"
          class="form-control"
          id="usernameLogIn"
          name="username"
          placeholder="Username"
          required
        />
      </div>
      <br>
      <div class="form-group">
        <label for="password" class="text-light">Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordLogIn"
          placeholder="Password"
          required
        />
      </div>
      <br />

      <p class="text-light text-center">
        Don't have an account?
        <a style="color: rgba(167, 224, 255, 0.571)" href="#" id="signUpLink">
          Sign Up
        </a>
      </p>

      <div class="text-center">
        <button type="submit" class="btn btn-light mt-1">Log In</button>
        <button type="button" class="btn btn-light mt-1" id="guestBtn">Guest</button>
      </div>
      
    </form>
    `
      : `
      <h1 class="text-center text-light">Sign Up</h1>
        <form method="post" class="py-2" id="RegisterForm">

        <div class="alert alert-success" role="alert" style="display: none;" id="successMsgRegister"></div>
        <div class="alert alert-warning alert-dismissible" role="alert" style="display: none;" id="warningMsgRegister"></div>

        <div class="form-group">
            <label for="usernameRegister" class="text-light">Username</label>
            <input
            type="text"
            class="form-control"
            id="usernameRegister"
            name="username"
            placeholder="Username"
            required
            />
        </div>
        <br />
        <div class="form-group">    
            <label for="passwordRegister" class="text-light">Password</label>
            <input
            type="password"
            class="form-control"
            id="passwordRegister"
            placeholder="Password"
            required
            />
        </div>

        <div class="form-group">
            <label for="confirmPasswordRegister" class="text-light"></label>
            <input
            type="password"
            class="form-control"
            id="confirmPasswordRegister"
            placeholder="Confirm Password"
            required
            />
        </div>
        <br />

        <p class="text-light text-center">
            Already have an account?
            <a style="color: rgba(167, 224, 255, 0.571)" href="#" id="signInLink">
                Sign In
            </a>
        </p>

        <div class="text-center">
            <button type="submit" class="btn btn-light">
            Create New Account
            </button>
        </div>
        </form>
        `;

  // add event listener to sign in and sign up buttons
  document.querySelector("#signInLink")?.addEventListener("click", () => {
    loadAccess("LogIn");
  });
  document.querySelector("#signUpLink")?.addEventListener("click", () => {
    loadAccess("Register");
  });

  // add event listeners to the form

  // Login Submit
  document
    .querySelector("#LogInForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // hide both messages
      document.querySelector("#successMsgLogIn").style.display = "none";
      document.querySelector("#warningMsgLogIn").style.display = "none";

      // get the form data
      const username = document.querySelector("#usernameLogIn").value;
      const password = document.querySelector("#passwordLogIn").value;

      // load users from localStorage
      userModel.init();

      // check if user exists
      if (userModel.logIn(username, password)) {
        // change success message
        document.querySelector("#successMsgLogIn").innerHTML =
          "<strong id='logInMsgText'>Logging In</strong>";
        document.querySelector("#successMsgLogIn").style.display = "block";

        let count = 0;
        setInterval(() => {
          if (count === 3) {
            window.location.href = "app.html";
            return;
          }
          document.querySelector("#logInMsgText").innerHTML += ".";

          if (count === 2) {
            setTimeout(() => {
              document.querySelector("#successMsgLogIn").innerHTML +=
                " Success!";
            }, 333);
          }
          count++;
        }, 333);
      } else {
        // change warning message
        document.querySelector("#warningMsgLogIn").innerHTML =
          "<strong>Error!</strong> Username or Password is incorrect.";
        document.querySelector("#warningMsgLogIn").style.display = "block";
      }
    });

  // Register Submit
  document
    .querySelector("#RegisterForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // clear the warning message and success message
      document.querySelector("#warningMsgRegister").style.display = "none";
      document.querySelector("#successMsgRegister").style.display = "none";

      // get the form data
      const username = document.querySelector("#usernameRegister").value;
      const password = document.querySelector("#passwordRegister").value;
      const confirmPassword = document.querySelector(
        "#confirmPasswordRegister"
      ).value;

      // check if the passwords don't match
      if (password !== confirmPassword) {
        document.querySelector(
          "#warningMsgRegister"
        ).innerHTML = `<strong>Error!</strong> Passwords do not match.`;
        document.querySelector("#warningMsgRegister").style.display = "block";
        return;
      }

      // load users from localStorage
      userModel.init();

      // if there's already an account with the same username
      if (userModel.users.find((user) => user.username === username)) {
        document.querySelector(
          "#warningMsgRegister"
        ).innerHTML = `<strong>Error!</strong> Username already exists.`;
        document.querySelector("#warningMsgRegister").style.display = "block";
        return;
      }

      // create new account and add to localStorage
      userModel.createAccount(username, password);

      // show success message
      document.querySelector(
        "#successMsgRegister"
      ).innerHTML = `<strong>Success!</strong> Account created.`;
      document.querySelector("#successMsgRegister").style.display = "block";
    });

  // add event to guest button
  document.querySelector("#guestBtn")?.addEventListener("click", () => {
    document.querySelector("#successMsgLogIn").style.display = "none";
    document.querySelector("#warningMsgLogIn").style.display = "none";

    userModel.init();
    userModel.logIn("user", "password");

    // change success message
    document.querySelector("#successMsgLogIn").innerHTML =
      "<strong id='logInMsgText'>Logging In</strong>";
    document.querySelector("#successMsgLogIn").style.display = "block";

    let count = 0;
    setInterval(() => {
      if (count === 3) {
        window.location.href = "app.html";
        return;
      }
      document.querySelector("#logInMsgText").innerHTML += ".";

      if (count === 2) {
        setTimeout(() => {
          document.querySelector("#successMsgLogIn").innerHTML += " Success!";
        }, 333);
      }
      count++;
    }, 333);
  });
}

// Add Event Listeners to the discord button
document.querySelector("#discordNameBtn").addEventListener("click", () => {
  navigator.clipboard.writeText("-|GOLD|-#5063");
  document.querySelector("#discordMsg").style.visibility = "visible";

  setTimeout(() => {
    document.querySelector("#discordMsg").style.visibility = "hidden";
  }, 5000);
});

// Load Login Form on load
loadAccess("LogIn");
