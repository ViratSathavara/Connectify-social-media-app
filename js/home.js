let uid;
let alluser = [];
let filetype = "";
let userprofileimage = document.getElementById("userprofileimage");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      // var createpostinput = document.getElementById("a");
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((result) => {
          result.forEach((users) => {
            alluser.push(users.data());
            filetype = users.data().fileType;
            if (users.data().uid === user.uid) {
              if (users.data().CoverPicture !== "") {
                userprofileimage.setAttribute("src", users.data().CoverPicture);
              }
            }
          });
        });
    } else {
      window.location.assign("./email.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

var loaderdiv = document.getElementById("loaderdiv");
var showuserposts = document.getElementById("showuserposts");
firebase
  .firestore()
  .collection("posts")
  .onSnapshot((result) => {
    loaderdiv.style.display = "none";
    let allposts = [];
    if (result.size === 0) {
      let noData = document.getElementById("heading1");
      noData.style.display = "block";
    } else {
      result.forEach((post) => {
        allposts.push(post.data());
      });
      showuserposts.style.display = "block";
      showuserposts.innerHTML = "";
      for (let i = 0; i < allposts.length; i++) {
        let likearray = allposts[i].like;
        let dislikearray = allposts[i].dislikes;
        let commentarray = allposts[i].comments;
        let postmain = document.createElement("div");
        showuserposts.appendChild(postmain);
        postmain.setAttribute("class", "postmain");
        let postheader = document.createElement("div");
        postmain.appendChild(postheader);
        postheader.setAttribute("class", "postheader");
        firebase
          .firestore()
          .collection("users")
          .doc(allposts[i].uid)
          .get()
          .then((res) => {
            let userprodev = document.createElement("div");
            let userprofileimg = document.createElement("img");
            postheader.appendChild(userprodev);
            userprodev.setAttribute("class", "userprodev");
            userprodev.appendChild(userprofileimg);
            userprofileimg.setAttribute(
              "src",
              res.data().CoverPicture === ""
                ? "../images/sendbtn.png"
                : res.data().CoverPicture
            );
            userprofileimg.setAttribute("class", "profileimage");
            let userdiv = document.createElement("div");
            userprodev.appendChild(userdiv);
            userdiv.setAttribute("class", "userdiv");
            let username = document.createElement("h5");
            userdiv.appendChild(username);
            username.innerHTML = `Username:  ${res.data().userName}`;
            let time = document.createElement("h5");
            userdiv.appendChild(time);
            time.innerHTML = `Posted Time:  ${allposts[i].Time}`;

            let postdetail = document.createElement("p");
            userdiv.appendChild(postdetail);
            postdetail.innerHTML = `Description:  ${allposts[i].postvalue}`;
            postdetail.setAttribute("class", "postdetail");

            if (allposts[i].url !== "") {
              if (
                allposts[i].filetype === "image/png" ||
                allposts[i].filetype === "image/jpg" ||
                allposts[i].filetype === "image/jpeg"
              ) {
                let postimage = document.createElement("img");
                postmain.appendChild(postimage);
                postimage.setAttribute("src", allposts[i].url);
                // postimage.setAttribute("src", "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
                // postimage.setAttribute("src", allposts[i].url);
                postimage.setAttribute("class", "postimageurl");
              } else {
                let postvideo = document.createElement("video");
                postmain.appendChild(postvideo);
                postvideo.setAttribute("controls", "true");
                postvideo.setAttribute("class", "postvideo");
                let source = document.createElement("source");
                postvideo.appendChild(source);
                source.setAttribute("src", allposts[i].url);
                source.setAttribute("type", allposts[i].filetype);
              }
            }
            let footerdiv = document.createElement("div");
            postmain.appendChild(footerdiv);
            footerdiv.setAttribute("class", "footerdiv");
            var likebutton = document.createElement("button");
            footerdiv.appendChild(likebutton);
            likebutton.setAttribute("class", "likebutton");
            var likeicon = document.createElement("i");
            likebutton.appendChild(likeicon);
            likeicon.setAttribute("class", "fa-regular fa-face-laugh-beam");
            var liketitle = document.createElement("p");
            likeicon.appendChild(liketitle);
            liketitle.setAttribute("class", "impressionstitle");
            liketitle.innerHTML = `Like (${likearray.length})`;
            liketitle.style.fontFamily = "Roboto";
            liketitle.style.marginBottom = "0";
            for (let likeindex = 0; likeindex < likearray.length; likeindex++) {
              if (likearray[likeindex] === uid) {
                likeicon.setAttribute("class", "fa-solid fa-face-laugh-beam");
                likeicon.style.color = "blue";
                liketitle.style.color = "blue";
              }
            }

            likebutton.addEventListener("click", () => {
              let like = false;
              for (
                let likeIndex = 0;
                likeIndex < likearray.length;
                likeIndex++
              ) {
                if (likearray[likeIndex] === uid) {
                  like = true;
                  likearray.splice(likeIndex, 1);
                }
              }
              if (!like) {
                likearray.push(uid);
              }
              firebase
                .firestore()
                .collection("posts/")
                .doc(allposts[i].id)
                .update({
                  like: likearray,
                });
            });

            var dislikebutton = document.createElement("button");
            footerdiv.appendChild(dislikebutton);
            dislikebutton.setAttribute("class", "dislikebutton");

            var dislikeicon = document.createElement("i");
            dislikebutton.appendChild(dislikeicon);
            dislikeicon.setAttribute("class", "fa-regular fa-face-frown-open");

            var disliketitle = document.createElement("p");
            dislikebutton.appendChild(disliketitle);
            disliketitle.setAttribute("class", "impressionstitle");
            disliketitle.innerHTML = `Dislike (${dislikearray.length})`;
            disliketitle.style.marginBottom = "0";
            for (
              let dislikeindex = 0;
              dislikeindex < dislikearray.length;
              dislikeindex++
            ) {
              if (dislikearray[dislikeindex] === uid) {
                dislikeicon.setAttribute(
                  "class",
                  "fa-solid fa-face-frown-open"
                );
                dislikeicon.style.color = "red";
                disliketitle.style.color = "red";
              }
            }
            dislikebutton.addEventListener("click", () => {
              let dislike = false;
              for (
                let dislikeindex = 0;
                dislikeindex < dislikearray.length;
                dislikeindex++
              ) {
                if (dislikearray[dislikeindex] === uid) {
                  dislike = true;
                  dislikearray.splice(dislikeindex, 1);
                }
              }
              if (!dislike) {
                dislikearray.push(uid);
              }
              firebase
                .firestore()
                .collection("posts/")
                .doc(allposts[i].id)
                .update({
                  dislikes: dislikearray,
                });
            });

            var commentbutton = document.createElement("button");
            footerdiv.appendChild(commentbutton);
            commentbutton.setAttribute("class", "dislikebutton");

            var commenticon = document.createElement("i");
            commentbutton.appendChild(commenticon);
            commenticon.setAttribute("class", "fa-regular fa-comment");

            var commentmessage = document.createElement("p");
            commentbutton.appendChild(commentmessage);
            commentmessage.setAttribute("class", "impressionstitle");
            commentmessage.innerHTML = `Comments (${commentarray.length})`;
            commentmessage.style.marginBottom = "0";

            if (commentarray.length !== 0) {
              for (
                let commentindex = 0;
                commentindex < commentarray.length;
                commentindex++
              ) {
                let maincommentmain = document.createElement("div");
                postmain.appendChild(maincommentmain);
                maincommentmain.setAttribute("class", "maincommentmain");
                let commentmain = document.createElement("div");
                maincommentmain.appendChild(commentmain);
                commentmain.setAttribute("class", "commentmain");
                let commentprofileimage = document.createElement("img");
                commentmain.appendChild(commentprofileimage);
                commentprofileimage.setAttribute(
                  "class",
                  "commentprofileimage"
                );
                var commentmessage1 = document.createElement("div");
                let commentusername = document.createElement("h5");
                commentmain.appendChild(commentmessage1);
                commentmessage1.appendChild(commentusername);
                commentmessage1.setAttribute("class", "commentmessage1");

                firebase
                  .firestore()
                  .collection("users")
                  .doc(commentarray[commentindex].uid)
                  .get()
                  .then((comment) => {
                    commentprofileimage.setAttribute(
                      "src",
                      "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
                    );
                    if (comment.data().CoverPicture !== "") {
                      commentprofileimage.setAttribute(
                        "src",
                        comment.data().CoverPicture
                      );
                    }

                    commentusername.innerHTML = `${comment.data().userName}`;
                  });

                let commentvalue = document.createElement("p");
                commentmessage1.appendChild(commentvalue);
                commentvalue.setAttribute("class", "comment");
                commentvalue.innerHTML =
                  commentarray[commentindex].commentvalue;
              }
            }
            let writecomment = document.createElement("div");
            writecomment.setAttribute("class", "writecomment");
            postmain.appendChild(writecomment);
            let commentinput = document.createElement("input");
            writecomment.appendChild(commentinput);
            commentinput.setAttribute("class", "commentinput");
            commentinput.setAttribute("placeholder", "Write comment here...");
            let commentsendbtn = document.createElement("img");
            writecomment.appendChild(commentsendbtn);
            commentsendbtn.setAttribute("src", "../images/sendbtn.png");
            commentsendbtn.setAttribute("class", "commentsendbtn");
            commentsendbtn.style.width = "25px";
            commentsendbtn.style.height = "25px";
            commentsendbtn.style.marginLeft = "20px";
            commentsendbtn.addEventListener("click", () => {
              if (commentinput.value === "") {
                alert("please enter something about this content...");
              } else {
                let commentdata = {
                  commentvalue: commentinput.value,
                  uid: uid,
                };

                commentarray.push(commentdata);
                firebase
                  .firestore()
                  .collection("posts")
                  .doc(allposts[i].id)
                  .update({
                    comments: commentarray,
                  });
              }
            });
          });
      }
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

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("../components/login.html");
    });
};
