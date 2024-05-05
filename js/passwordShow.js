function showPassword() {
  let temp1 = document.getElementById("passwordip");
  let temp2 = document.getElementById("confrimpasswordip");

  if (temp1.type === "password") {
    temp1.type = "text";
  } else {
    temp1.type = "password";
  }

  if (temp2.type === "password") {
    temp2.type = "text";
  } else {
    temp2.type = "password";
  }
}
