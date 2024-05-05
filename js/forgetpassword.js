const backtologin = () => {
  window.location.assign("../components/login.html");
};

let email = document.getElementById("forgotpassword");
let message = document.getElementById("message");

const reset = () => {
  if (email.value === "") {
    message.innerHTML = "Please enter email.";
    message.style.backgroundColor = "red";
    message.style.color = "white";
    message.style.width = "100%";
    message.style.borderRadius = "10px";
    message.style.padding = "5px";
    message.style.textAlign = "center";
  }
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
    //   window.location.assign("../components/emailverification.html");
    alert("send link to your email.")
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.style.backgroundColor = "red";
      message.style.color = "white";
      message.style.width = "100%";
      message.style.borderRadius = "10px";
      message.style.padding = "5px";
      message.style.textAlign = "center";
    });
};
