let goToRegisterPage = () => {
  window.location.assign("../components/register.html");
};
const loginemail = document.getElementById("emailip");
const loginpassword = document.getElementById("passwordip");
let message = document.getElementById("message");

const loginFunc = () => {
  if (loginemail.value === "") {
    alert("Please enter email.");
  } else if (loginpassword.value === "") {
    alert("Please enter password.");
  } else {
    const userData = {
      email: loginemail.value,
      password: loginpassword.value,
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((userCredential) => {
        message.innerHTML = "Sign In Successfully.";
        message.style.color = "green";
        if (userCredential.user.emailVerified) {
          window.location.assign("../components/home.html");
        } else {
          window.location.assign("../components/emailverification.html");
        }
      })
      .catch((error) => {
        message.innerHTML = error.message;
      });
  }
};

const forgetpassword = () => {
  window.location.assign("../components/forgetpassword.html");
};
