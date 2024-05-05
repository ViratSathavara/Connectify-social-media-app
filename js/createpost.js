let postvalue = document.getElementById("cptextarea");
var progressDiv = document.getElementById("progressdiv");
var progressbar = document.getElementById("progressbar");
let currentuser = "";
let url = "";
let fileType = "";
var done = document.getElementById("done");
let uid;
let alluser = [];
let userimg = document.getElementById("userimg");

// Firebase authentication state change listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      currentuser = user;
    } else {
      window.location.assign("../pages/emailverification.html");
    }
  } else {
    window.location.assign("../components/login.html");
  }
});

// Function to handle file upload
function uploading(event) {
  fileType = event.target.files[0].type;
  var uploadfile = firebase
    .storage()
    .ref()
    .child(`postFiles/${event.target.files[0].name}`)
    .put(event.target.files[0]);

  uploadfile.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadpercentage = Math.round(progress);
      progressDiv.style.display = "block";
      progressbar.style.width = `${uploadpercentage}%`;
      progressbar.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {
      console.error("Error uploading file:", error);
    },
    () => {

      uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
        url = downloadURL;
        done.style.display = "block";
        progressDiv.style.display = "none";
      });
    }
  );
}

var t = new Date().toLocaleTimeString();

// Function to create post in Firebase Firestore
function createpost() {
  if (postvalue.value !== "" || url !== "") {
    firebase
      .firestore()
      .collection("posts")
      .add({
        postvalue: postvalue.value,
        uid: uid,
        url: url,
        filetype: fileType,
        like: [],
        dislikes: [],
        comments: [],
        Time: `${t}`,
      })
      .then((res) => {
        firebase
          .firestore()
          .collection("posts/")
          .doc(res.id)
          .update({
            id: res.id,
          })
          .then(() => {
            done.style.display = "none";
            document.getElementById("uploadedmssage").style.display = "block";
            setTimeout(() => {
              location.reload();
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating document:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  }
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("../components/login.html");
    });
};
