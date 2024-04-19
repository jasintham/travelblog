// get btn-like element
const likeButton = document.querySelector(".btn-like");

// addEventListener to btn-like
likeButton.addEventListener("click", function () {
  const currentFillColor = likeButton.style.fill;

  // Check the color condition
  if (currentFillColor === "red") {
    likeButton.style.fill = "";
    likeButton.style.stroke = "";
  } else {
    likeButton.style.fill = "red";
    likeButton.style.stroke = "red";
  }
});
