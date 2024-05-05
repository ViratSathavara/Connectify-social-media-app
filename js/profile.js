let usercoverimg = document.getElementById("usercoverimg");
let uploadbtncover = document.getElementById("uploadbtncover");
let userprofileimg = document.getElementById("userprofileimg");
let uploadbtnprofile = document.getElementById("uploadbtnprofile");
var progressdiv = document.getElementById("progressdiv");
let progressbar = document.getElementById("progressbar");
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let userName = document.getElementById("username");
let mobilenumber = document.getElementById("mobileno");
let email = document.getElementById("emailaddress");
let description = document.getElementById("userdescription");
let message = document.getElementById("message");
var postsshowbutton = document.getElementById("postsbutton");
var currentuserpost = document.getElementById("showposts");
var userdata = document.getElementById("editabledatadiv");
var showuserprofilebutton = document.getElementById("userprofilebutton");
let textareaupdate = document.getElementById("textareaupdate");
let usernameheading = document.getElementById("usernameheading");
let userfirstname = document.getElementById("userfirstname");
let userlastname = document.getElementById("userlastname");
let usermobilenumber = document.getElementById("usermobilenumber");
let userDescription = document.getElementById("userDescription");

let filetype = "";
let uid;
let alluser = [];
// let comments = [];

// Manage Uploads
// In addition to starting uploads, you can pause, resume, and cancel uploads using the pause(), resume(), and cancel() methods. Calling pause() or resume() will raise pause or running state changes. Calling the cancel() method results in the upload failing and returning an error indicating that the upload was canceled.

function changeprofilepicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${uid}/CoverPicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbar.style.visibility = "visible";
      var uploadpercentage = Math.round(progress);
      progressdiv.style.display = "block";
      progressbar.style.width = `${uploadpercentage}%`;
      progressbar.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((CoverPicture) => {
        progressdiv.style.display = "none";
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ CoverPicture: CoverPicture });
      });
    }
  );
}

function changecoverpicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${uid}/ProfilePicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbar.style.visibility = "visible";
      var uploadpercentage = Math.round(progress);
      progressdiv.style.display = "block";
      progressbar.style.width = `${uploadpercentage}%`;
      progressbar.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((ProfilePicture) => {
        progressdiv.style.display = "none";
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ ProfilePicture: ProfilePicture });
      });
    }
  );
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          alluser = []; // Clear the array before repopulating
          snapshot.forEach((doc) => {
            alluser.push(doc.data());
            if (doc.id === uid) {
              userprofileimg.setAttribute(
                "src",
                doc.data().CoverPicture ||
                  "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
              );
              usercoverimg.setAttribute(
                "src",
                doc.data().ProfilePicture ||
                  "https://media.istockphoto.com/id/490726872/photo/man-at-the-sunrise.jpg?b=1&s=170667a&w=0&k=20&c=ftoG5oljywajspsDYs9N37LgtiYYRHyySxgGpQb9r0Y="
              );
              usernameheading.innerHTML = `Username: ${doc.data().userName}`;
              userfirstname.innerHTML = `Firstname: ${doc.data().firstName}`;
              userlastname.innerHTML = `Lastname: ${doc.data().lastName}`;
              usermobilenumber.innerHTML = `Mobile no. : ${doc.data().mobile}`;
              userDescription.innerHTML = `Desctiption: ${
                doc.data().description
              }`;
            }
          });
        });
    } else {
      window.location.assign("../pages/emailverification.html");
    }
  } else {
    window.location.assign("../components/login.html");
  }
});

postsshowbutton.addEventListener("click", () => {
  userdata.style.display = "none";
  currentuserpost.style.display = "block";
  postsshowbutton.style.backgroundColor = "#0000ff";
  postsshowbutton.style.color = "white";
  showuserprofilebutton.style.backgroundColor = "white";
  showuserprofilebutton.style.color = "#0000ff";
  document.getElementById("currentuserpostsdiv").style.display = "flex";
});
showuserprofilebutton.addEventListener("click", () => {
  userdata.style.display = "block";
  currentuserpost.style.display = "none";
  showuserprofilebutton.style.backgroundColor = "#0000ff";
  showuserprofilebutton.style.color = "white";
  postsshowbutton.style.backgroundColor = "white";
  postsshowbutton.style.color = "#0000ff";
  document.getElementById("currentuserpostsdiv").style.display = "none";
});

// update button
let update = () => {
  if (firstName.value === "") {
    message.innerHTML = "First Name Required";
    message.style.color = "red";
    firstName.focus();
  } else if (lastName.value === "") {
    message.innerHTML = "Last Name Required";
    message.style.color = "red";
    lastName.focus();
  } else if (userName.value === "") {
    message.innerHTML = "User Name Required";
    message.style.color = "red";
    userName.focus();
  } else {
    var data = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      mobileNumber: mobilenumber.value,
      description: description.value,
    };
    console.log(data);
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update(data)
      .then((res) => {
        console.log(res);
        message.innerHTML = "Successfully Updated";
        message.style.color = "green";
        setTimeout(() => {
          message.innerHTML = "";
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// user posts
var loading = document.getElementById("loaderdiv");
var showposts = document.getElementById("showposts");
firebase
  .firestore()
  .collection("posts")
  .onSnapshot((onSnapshot) => {
    firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", uid)
      .get()
      .then((onSnapshot) => {
        // console.log(onSnapshot);
        loading.style.display = "none";
        let allposts = [];
        if (onSnapshot.size === 0) {
          let nodata = document.getElementById("messagediv");
          nodata.style.display = "block";
        } else {
          onSnapshot.forEach((postres) => {
            allposts.push(postres.data());
          });
          showposts.style.display = "flex";
          showposts.innerHTML = "";
          for (let i = 0; i < allposts.length; i++) {
            let likearry = allposts[i].like;
            let dislikearry = allposts[i].dislikes;
            let commentarry = allposts[i].comments;
            let postmain = document.createElement("div");
            showposts.appendChild(postmain);
            postmain.setAttribute("class", "postmain");
            //post header
            let postheader = document.createElement("div");
            postmain.appendChild(postheader);
            postheader.setAttribute("class", "postheader");
            // user data
            firebase
              .firestore()
              .collection("users")
              .doc(allposts[i].uid)
              .get()
              .then((res) => {
                let userprodiv = document.createElement("div");
                let userprofileimage = document.createElement("img");
                postheader.appendChild(userprodiv);
                userprodiv.setAttribute("class", "userprodiv");
                userprodiv.appendChild(userprofileimage);
                userprofileimage.setAttribute(
                  "src",
                  res.data().CoverPicture === ""
                    ? "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
                    : res.data().CoverPicture
                );
                userprofileimage.setAttribute("class", "profileimage");
                let mainuserdiv = document.createElement("div");
                userprodiv.appendChild(mainuserdiv);
                mainuserdiv.setAttribute("class", "mainuserdiv");
                let userdiv = document.createElement("div");
                mainuserdiv.appendChild(userdiv);
                userdiv.setAttribute("class", "userdata");
                let = username = document.createElement("h6");
                userdiv.appendChild(username);
                userdiv.setAttribute("class", "userdiv");
                username.innerHTML = `Username:  ${res.data().userName} `;
                let = time = document.createElement("h6");
                userdiv.appendChild(time);
                time.innerHTML = `Posted Time:  ${allposts[i].Time}`;
                let descriptionp = document.createElement("div");
                postheader.appendChild(descriptionp);
                descriptionp.setAttribute("class", "descriptionp");
                let postdetail = document.createElement("p");
                descriptionp.appendChild(postdetail);
                postdetail.setAttribute("class", "paragraph");
                var editanddeltebtndiv = document.createElement("div");
                mainuserdiv.appendChild(editanddeltebtndiv);
                editanddeltebtndiv.setAttribute("class", "editanddeletbtn");

                var editbtn = document.createElement("i");
                editanddeltebtndiv.appendChild(editbtn);
                editbtn.setAttribute("class", "fa-solid fa-pencil postsbtn");
                editbtn.setAttribute("id", "editbtn");

                // edit button
                editbtn.addEventListener("click", () => {
                  showposts.style.display = "none";
                  let maincreate = document.getElementById("maincreate");
                  let user = document.getElementById("userdiv");
                  let userprodiv = document.createElement("div");
                  let userprofileimage = document.createElement("img");
                  user.appendChild(userprodiv);
                  userprodiv.setAttribute("class", "userprodiv");
                  userprodiv.appendChild(userprofileimage);
                  userprofileimage.setAttribute(
                    "src",
                    res.data().CoverPicture === ""
                      ? "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
                      : res.data().CoverPicture
                  );
                  userprofileimage.setAttribute("class", "profileimage");
                  let userdiv = document.createElement("div");
                  userprodiv.appendChild(userdiv);
                  userdiv.setAttribute("class", "userdiv");
                  let = username = document.createElement("h6");
                  userdiv.appendChild(username);
                  username.innerHTML = `${res.data().userName} `;
                  let time = document.createElement("h6");
                  userdiv.appendChild(time);
                  time.innerHTML = `Posted Time: ${allposts[i].Time} `;
                  let postdetail = document.createElement("p");
                  postheader.appendChild(postdetail);
                  maincreate.style.display = "block";
                  textareaupdate.innerHTML = `Description:  ${allposts[i].postvalue}`;
                  textareaupdate.style.width = "100%";

                  let updatepostbtn = document.getElementById("updatepostbtn");
                  updatepostbtn.addEventListener("click", () => {
                    var aa = {
                      postvalue: textareaupdate.value,
                      url: ImageUrl || "",
                      filetype: fileType || "",
                    };
                    firebase
                      .firestore()
                      .collection("posts")
                      .doc(allposts[i].id)
                      .update(aa)
                      .then(() => {
                        maincreate.style.display = "none";
                        showposts.style.display = "flex";
                      });
                  });
                });

                var deletbtn = document.createElement("i");
                editanddeltebtndiv.appendChild(deletbtn);
                deletbtn.setAttribute("class", "fa-solid fa-trash postsbtn");
                deletbtn.setAttribute("id", "deletebtn");
                deletbtn.style.marginLeft = "8px";

                // dlete button
                deletbtn.addEventListener("click", () => {
                  swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this Post !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                      firebase
                        .firestore()
                        .collection("posts")
                        .doc(allposts[i].id)
                        .delete();
                      //Message
                    } else {
                      swal("Your imaginary file is safe!");
                    }
                  });
                });

                postdetail.innerHTML = allposts[i].postvalue;
                if (allposts[i].url !== "") {
                  if (
                    allposts[i].filetype === "image/png" ||
                    allposts[i].filetype === "image/jpeg" ||
                    allposts[i].filetype === "image/jpg"
                  ) {
                    // images
                    let postimagediv = document.createElement("div");
                    postmain.appendChild(postimagediv);
                    postimagediv.setAttribute("class", "postimagediv");
                    let postimage = document.createElement("img");
                    postimagediv.appendChild(postimage);
                    postimage.setAttribute("src", allposts[i].url);
                    postimage.setAttribute("class", "postimage");
                  } else {
                    // videos
                    let postvideo = document.createElement("video");
                    postmain.appendChild(postvideo);
                    postvideo.setAttribute("controls", "true");
                    postvideo.setAttribute("class", "postVideo");
                    let source = document.createElement("source");
                    postvideo.appendChild(source);
                    source.setAttribute("src", allposts[i].url);
                    source.setAttribute("type", "video/mp4");
                    source.setAttribute("class", "postvideo");
                  }
                }

                // footer
                let footerdiv = document.createElement("div");
                postmain.appendChild(footerdiv);
                footerdiv.setAttribute("class", "footerdiv");
                //like
                var likebutton = document.createElement("button");
                footerdiv.appendChild(likebutton);
                likebutton.setAttribute("class", "likebutton");

                //like icon
                var likeicon = document.createElement("i");
                likebutton.appendChild(likeicon);
                likeicon.setAttribute("class", "fa-regular fa-face-laugh-beam");

                var liketitle = document.createElement("p");
                likebutton.appendChild(liketitle);
                liketitle.setAttribute("class", "impressionstitle");
                liketitle.innerHTML = `Like (${likearry.length})`;
                for (
                  let likeIndex = 0;
                  likeIndex < likearry.length;
                  likeIndex++
                ) {
                  if (likearry[likeIndex] === uid) {
                    likeicon.setAttribute(
                      "class",
                      "fa-solid fa-face-laugh-beam"
                    );
                    likeicon.style.color = "blue";
                    liketitle.style.color = "blue";
                  }
                }
                //like function
                likebutton.addEventListener("click", () => {
                  let like = false;
                  for (
                    let likeIndex = 0;
                    likeIndex < likearry.length;
                    likeIndex++
                  ) {
                    if (likearry[likeIndex] === uid) {
                      like = true;
                      likearry.splice(likeIndex, 1);
                    }
                  }
                  if (!like) {
                    likearry.push(uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(allposts[i].id)
                    .update({
                      like: likearry,
                    });
                });

                var dislikebutton = document.createElement("button");
                footerdiv.appendChild(dislikebutton);
                dislikebutton.setAttribute("class", "dislikebutton");

                var dislikeicon = document.createElement("i");
                dislikebutton.appendChild(dislikeicon);
                dislikeicon.setAttribute(
                  "class",
                  "fa-regular fa-face-frown-open"
                );

                var disliketitle = document.createElement("p");
                dislikebutton.appendChild(disliketitle);
                disliketitle.setAttribute("class", "impressionstitle");
                disliketitle.innerHTML = `Dislike (${dislikearry.length})`;
                for (
                  let dislikeindex = 0;
                  dislikeindex < dislikearry.length;
                  dislikeindex++
                ) {
                  if (dislikearry[dislikeindex] === uid) {
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
                    dislikeindex < dislikearry.length;
                    dislikeindex++
                  ) {
                    if (dislikearry[dislikeindex] === uid) {
                      dislike = true;
                      dislikearry.splice(dislikeindex, 1);
                    }
                  }
                  if (!dislike) {
                    dislikearry.push(uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(allposts[i].id)
                    .update({
                      dislikes: dislikearry,
                    });
                });

                let commentbutton = document.createElement("button");
                footerdiv.appendChild(commentbutton);

                var commenticon = document.createElement("i");
                commentbutton.appendChild(commenticon);
                commenticon.setAttribute("class", "fa-regular fa-comment");

                var commentmessage = document.createElement("p");
                commentbutton.appendChild(commentmessage);
                commentmessage.setAttribute("class", "impressionstitle");
                commentmessage.innerHTML = `Comment (${commentarry.length})`;
                // comment fuction
                if (commentarry.length !== 0) {
                  for (
                    var commentindex = 0;
                    commentindex < commentarry.length;
                    commentindex++
                  ) {
                    let commentmain = document.createElement("div");
                    let commentuserdetails = document.createElement("div");
                    postmain.appendChild(commentmain);
                    commentmain.setAttribute("class", "commentmain");

                    // dlete button

                    commentmain.setAttribute("class", "commentmain");
                    let commentprofileimage = document.createElement("img");
                    commentuserdetails.appendChild(commentprofileimage);
                    commentprofileimage.setAttribute(
                      "class",
                      "commentprofileimage"
                    );
                    commentmain.appendChild(commentuserdetails);

                    var commentmessage = document.createElement("div");
                    let commentusername = document.createElement("h6");
                    commentmain.appendChild(commentmessage);
                    commentuserdetails.appendChild(commentusername);
                    commentuserdetails.setAttribute(
                      "class",
                      "commentuserdetails"
                    );
                    //user data
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(commentarry[commentindex].uid)
                      .get()
                      .then((currentuserres) => {
                        commentprofileimage.setAttribute(
                          "src",
                          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png"
                        );
                        if (currentuserres.data().CoverPicture !== "") {
                          commentprofileimage.setAttribute(
                            "src",
                            currentuserres.data().CoverPicture
                          );
                        }
                        commentusername.innerHTML = `Username: ${
                          currentuserres.data().userName
                        }`;
                      });
                    let commentvalue = document.createElement("p");
                    commentmessage.appendChild(commentvalue);
                    commentvalue.setAttribute("class", "commentvalue");
                    commentvalue.innerHTML =
                      commentarry[commentindex].commentvalue;
                  }
                }
                let writecomment = document.createElement("div");
                writecomment.setAttribute("class", "writecomment");
                postmain.appendChild(writecomment);
                let commentinput = document.createElement("input");
                writecomment.appendChild(commentinput);
                commentinput.setAttribute("class", "commentinput");
                commentinput.setAttribute("placeholder", "Write Comment.....");
                let sendbutton = document.createElement("img");
                writecomment.appendChild(sendbutton);
                sendbutton.setAttribute("src", "../images/sendbtn.png");
                sendbutton.setAttribute("class", "sendbutton");
                sendbutton.style.width = "25px";
                sendbutton.style.height = "25px";
                sendbutton.style.marginLeft = "20px";

                //comment fuction
                sendbutton.addEventListener("click", () => {
                  if (commentinput.value === "") {
                    alert("Please write something.....!");
                  } else {
                    let commentdata = {
                      commentvalue: commentinput.value,
                      uid: uid,
                    };
                    commentarry.push(commentdata);
                    firebase
                      .firestore()
                      .collection("posts")
                      .doc(allposts[i].id)
                      .update({
                        comments: commentarry,
                      });
                  }
                });
              });
          }
        }
      });
  });

let postfiles = (event) => {
  fileType = event.target.files[0].type;
  let progressdiv1 = document.getElementById("progressdiv1");
  let progressbar1 = document.getElementById("progressbar1");
  var uploadTask = firebase
    .storage()
    .ref()
    .child(event.target.files[0].name)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadpercentage = Math.round(progress);
      console.log(uploadpercentage);
      progressdiv1.style.display = "block";
      progressbar1.style.width = `${uploadpercentage}%`;
      progressbar1.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        ImageUrl = downloadURL;
        progressdiv1.style.display = "none";
      });
    }
  );
};

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

// firebase
//         .firestore()
//         .collection("users/")
//         .onSnapshot((result) => {
//           result.forEach((homeuser) => {
//             alluser.push(homeuser.data());
//             filetype = homeuser.data().filetype;
//           });
//         });
