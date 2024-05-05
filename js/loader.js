firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      // home
      setTimeout(() => {
        window.location.assign("./components/home.html");
      }, 1000);
    } else {
      // email verification
      setTimeout(() => {
        window.location.assign("./components/emailverification.html");
      }, 1000);
    }   
  } else {
    // login
    setTimeout(() => {
      window.location.assign("./components/login.html");
    }, 1000);
  }
});
