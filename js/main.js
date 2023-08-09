//validate form
function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (name == "") {
    alert("name is Requerd");
    return false;
  }
  if (email == "") {
    alert("Email is Requerd");
    return false;
  } else if (!email.includes("@")) {
    alert("email Shoud Include '@'");
  }
  if (password == "") {
    alert("Password is Requerd");
    return false;
  } else if (password.length <= 5) {
    alert("password Must Be More Complicated ");
    return false;
  }
  return true;
}

// handele signup page
let signup = document.getElementById("signup");
let dataToLocal = JSON.parse(localStorage.getItem("dataToLocal")) || [];

if (location.pathname === `/signup.html`) {
  signup.addEventListener("click", function () {
    addUserToLocalStorage();
  });
}

function addUserToLocalStorage() {
  if (validateForm() == true) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let newDataToLocal = {
      name,
      email,
      password,
    };

    // Check email exsist in local storage
    const emailExists = dataToLocal.some((ele) =>
      ele.email.includes(newDataToLocal.email)
    );
    if (emailExists) {
      alert("Email exists in local storage");
    } else {
      // console.log("Email doesnt exists in local storage.");
      dataToLocal.push(newDataToLocal);
      localStorage.setItem("dataToLocal", JSON.stringify(dataToLocal));
    }
  } else {
    console.log("No data found in local storage.");
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// handle sign in page

// validate signin
let userName = document.getElementById("user");
let pass = document.getElementById("pass");
const signIn = document.getElementById("signin");

function validateSignIn() {
  if (userName.value == "") {
    alert("Enter Your Email First");
    return false;
  } else if (!userName.value.includes("@")) {
    alert("Email Shoud Include '@' And '.' ");
  }
  if (pass.value == "") {
    alert("Enter Your Password First");
    return false;
  }
  return true;
}

if (location.pathname === `/index.html`) {
  signIn.addEventListener("click", function () {
    logIn();
    userName.value = "";
    pass.value = "";
  });

  function logIn() {
    if (validateSignIn() == true) {
      // check email is correct
      dataToLocal.forEach((ele) => {
        if (
          ele.email.toLowerCase() === userName.value.toLowerCase() &&
          ele.password === pass.value
        ) {
          location.pathname = "/home.html";
          localStorage.setItem("name", ele.name);
        }
        if (
          ele.email.toLowerCase() !== userName.value.toLowerCase() &&
          ele.password !== pass.value
        ) {
          document.getElementById("wrong").style.display = "inline-block";
        }
      });
    }
  }
}
if (location.pathname === `/home.html`) {
  let nameFromLocal = localStorage.getItem("name");
  document.getElementById("welcome").innerHTML = `Hello ${nameFromLocal}`;
  // document.getElementById("welcome");
}

function logOut() {
  location.pathname = `/index.html`;
}
