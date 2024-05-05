let email = document.getElementById("emailvarifyip");
let message = document.getElementById("varifymessage");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    if (user.emailVerified) {
      window.location.assign("../components/home.html");
    } else {
      email.innerHTML = user.email;
    }
  } else {
    window.location.assign("../components/login.html");
  }
});

const sendEmailFunc = () => {
  alert("sent successfully.");

  firebase
    .auth()
    .sendEmailVerification()
    .then(() => {
      message.innerHTML =
        "A varification code has been send to your email address.";
      message.style.backgroundColor = "green";
      message.style.color = "white";
      message.style.marginBottom = "15px";
    });
};

const confrimSendEmailFunc = () => {
 location.reload();
};
