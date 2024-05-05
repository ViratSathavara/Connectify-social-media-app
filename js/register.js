let goToLoginPage = () => {
  window.location.assign("../components/login.html");
};

const firstName = document.getElementById("firstnameip");
const lastName = document.getElementById("lastnameip");
const userName = document.getElementById("usernameip");
const mobile = document.getElementById("mobileip");
const email = document.getElementById("emailip");
const password = document.getElementById("passwordip");
const confrimpassword = document.getElementById("confrimpasswordip");
const message = document.getElementById("message");
const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneno = /^\d{10}$/;
const usernameregex = "^[A-Za-z][A-Za-z0-9_]{7,29}$";
const signupFunc = () => {
  if (
    firstName.value === "" &&
    lastName.value === "" &&
    userName.value === "" &&
    mobile.value === "" &&
    email.value === ""
  ) {
    // message.innerHTML = "Please fillup al details";
    alert("Please fillup al details.");
  } else if (!mobile.value.match(phoneno)) {
    // message.innerHTML = "Please Enter valid number";
    alert("Please Enter valid number.");
    // message.style.color = "red";
  } else if (!email.value.match(regex)) {
    // message.innerHTML = "Invalid Email";
    alert("Invalid Email.");
    // message.style.color = "red";
  } else if (!userName.value.match(usernameregex)) {
    // message.innerHTML = "Invalid username";
    alert("Invalid username.");
    // message.style.color = "red";
  } else if (password.value.length < 5 && password.value.length > 20) {
    // message.innerHTML = "Your password must have min 5 and max 20 characters.";
    alert("Your password must have min 5 and max 20 characters.");
    // message.style.color = "red";
  } else if (password.value === "") {
    // message.innerHTML = "Please enter password.";
    alert("Please enter password.");
    // message.style.color = "red";
  } else if (confrimpassword.value === "") {
    // message.innerHTML = "Please enter confrim password.";
    alert("Please enter confrim password.");
    // message.style.color = "red";
  } else if (password.value !== confrimpassword.value) {
    // message.innerHTML = "Your password doesn't match.";
    alert("Your password doesn't match.");
    // message.style.color = "red";
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        var d = new Date().toLocaleDateString();
        const userData = {
          firstName: firstName.value,
          lastName: lastName.value,
          userName: userName.value,
          mobile: mobile.value,
          email: email.value,
          password: password.value,
          confrimpassword: confrimpassword.value,
          uid: userCredential.user.uid,
          profilePicture: "",
          CoverPicure: "",
          description: "",
          signupdate: `${d}`,
        };

        // This code registers a new user, saves their data to a Firestore database, displays a success message, sends an email verification message, and redirects the user to a verification page.

        firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(userData)
          .then(() => {
            message.innerHTML = "Sign-Up Succesfully.";
            message.style.backgroundColor = "green";
            message.style.color = "white";
            message.style.width = "100%";
            message.style.borderRadius = "10px";
            message.style.padding = "2px";
            message.style.textAlign = "center";
            email.focus();

            // send email verification code on email

            const user = firebase.auth().currentUser;

            user.sendEmailVerification().then((res) => {
              setTimeout(() => {
                window.location.assign("../components/emailverification.html");
              }, 2000);
            });
          });
      })
      .catch((error) => {
        // const errorCode = error.code;
        message.innerHTML = error.message;
        message.style.color = "white";
        message.style.backgroundColor = "red";
        message.style.width = "100%";
        message.style.borderRadius = "10px";
        message.style.padding = "5px";
        message.style.textAlign = "center";
        // ..
      });
  }
};
