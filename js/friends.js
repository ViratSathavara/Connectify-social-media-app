firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((users) => {
          var user = document.getElementById("friendsusers");
          document.getElementById("friendsloaderdiv").style.display = "none";
          users.forEach((userdetail) => {
            // console.log(userdetail.data())
            var name = userdetail.data().userName;
            var userdetails = document.createElement("div");
            user.appendChild(userdetails);
            userdetails.setAttribute("id", "userdetailsdev");
            var userimgdiv = document.createElement("div");
            userdetails.appendChild(userimgdiv);
            userimgdiv.setAttribute("class", "friendsuserimg");

            var userimg = document.createElement("img");
            userimgdiv.appendChild(userimg);
            if (userdetail.data().CoverPicture !== "") {
              userimg.setAttribute("src", userdetail.data().CoverPicture);
            } else {
              userimg.setAttribute(
                "src",
                "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
              );
            }
            userimg.setAttribute("class", "friendsuserimg");
            var detailsuser = document.createElement("div");
            detailsuser.setAttribute("class", "detailsuser");
            userdetails.appendChild(detailsuser);
            var userdata = document.createElement("div");
            detailsuser.appendChild(userdata);
            userdata.setAttribute("id", "friendsdata");

            var username = document.createElement("p");
            detailsuser.appendChild(username);
            username.setAttribute("class", "friendsusername");
            username.innerHTML = `Username: ${name}`;

            var signupdate = document.createElement("p");
            userdata.appendChild(signupdate);
            signupdate.setAttribute("class", "signupdate");
            signupdate.innerHTML = `Created Date: ${
              userdetail.data().signupdate
            }`;

            var friendsdropdown = document.createElement("div");
            userdetails.appendChild(friendsdropdown);
            friendsdropdown.setAttribute("id", "friendsdropdown");

            var friendsdropdownshow = document.createElement("i");
            friendsdropdown.appendChild(friendsdropdownshow);
            friendsdropdownshow.setAttribute(
              "class",
              "fa-solid fa-angle-down dropdownbuttons"
            );
            friendsdropdownshow.setAttribute("id", "friendsdropdownshow");

            var friendsdropdownhide = document.createElement("i");
            friendsdropdown.appendChild(friendsdropdownhide);
            friendsdropdownhide.setAttribute(
              "class",
              "fa-solid fa-angle-up dropdownbuttons"
            );
            friendsdropdownhide.setAttribute("id", "friendsdropdownhide");

            var userprofilediv = document.createElement("div");
            user.appendChild(userprofilediv);
            userprofilediv.setAttribute("id", "userprofilediv");
            userprofilediv.style.marginBottom = "5px";
            var userprofileimgdiv = document.createElement("div");
            userprofilediv.appendChild(userprofileimgdiv);
            userprofileimgdiv.setAttribute("id", "userprofileimgdiv");
            var userprofileimg = document.createElement("img");
            userprofileimgdiv.appendChild(userprofileimg);
            userprofileimg.setAttribute("id", "frienduserprofileimg");
            userprofileimg.setAttribute(
              "src",
              "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
            );

            if (userdetail.data().CoverPicture !== "") {
              userprofileimg.setAttribute(
                "src",
                userdetail.data().CoverPicture
              );
            }

            userprofileimg.setAttribute("class", "largeprofileimage");
            var usernamedetail = document.createElement("span");
            userprofileimgdiv.appendChild(usernamedetail);
            usernamedetail.setAttribute("class", "friendusername");
            usernamedetail.innerHTML = `User: ${name}`;

            var usercoverimg = document.createElement("img");
            userprofilediv.appendChild(usercoverimg);
            usercoverimg.setAttribute("id", "usercoverimg");
            usercoverimg.setAttribute(
              "src",
              "https://media.istockphoto.com/id/490726872/photo/man-at-the-sunrise.jpg?b=1&s=170667a&w=0&k=20&c=ftoG5oljywajspsDYs9N37LgtiYYRHyySxgGpQb9r0Y="
            );
            if (userdetail.data().ProfilePicture !== "") {
              usercoverimg.setAttribute("src", userdetail.data().ProfilePicture);
            }

            friendsdropdownshow.addEventListener("click", () => {
              friendsdropdownhide.style.display = "block";
              friendsdropdownshow.style.display = "none";
              userprofilediv.style.display = "flex";
              userprofilediv.style.flexDirection = "column";
              //   userprofilediv.style.justifyContent = "center";
            });

            friendsdropdownhide.addEventListener("click", () => {
              friendsdropdownshow.style.display = "block";
              friendsdropdownhide.style.display = "none";
              userprofilediv.style.display = "none";
            });
          });
        });
    } else {
      window.location.assign("../components/emailverification.html");
    }
  } else {
    window.location.assign("../components/login.html");
  }
});

// scrollbar
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./login.html");
    });
};
