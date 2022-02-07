// write your code here
// DOM NODES
const insertImage = document.querySelector(".detail-image");
const insertName = document.querySelector(".name");
const insertRestaurant = document.querySelector(".restaurant");
const insertRating = document.querySelector("#rating-display");
const insertComments = document.querySelector("#comment-display");
// DOM FORM NODES
const form = document.querySelector("#new-ramen");
const newName = document.querySelector("#new-name");

const newRestaurant = document.querySelector("#new-restaurant");
const newImage = document.querySelector("#new-image");
const newRating = document.querySelector("#new-rating");
const newComment = document.querySelector("#new-comment");

//DOM RENDER FUNCTION
function renderMenu(el) {
  //Build menu
  let menu = document.createElement("img");
  menu.src = el.image;
  menu.addEventListener("click", () => {
    insertImage.src = el.image;
    insertName.innerHTML = el.name;
    insertRestaurant.innerHTML = el.restaurant;
    insertRating.innerHTML = el.rating;
    insertComments.innerHTML = el.comment;
  });

  //add menu to DOM
  document.querySelector("#ramen-menu").appendChild(menu);
}

//Build new object from Form input
function addNewRamen() {
  //build new ramen Obj object
  console.log(newName.value);
  let newRamenObj = {
    name: newName.value,
    restaurant: newRestaurant.value,
    image: newImage.value,
    rating: newRating.value,
    comment: newComment.value,
  };
  return newRamenObj;
}
//submit button functionality

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = addNewRamen();

  fetch("http://localhost:3000/ramens", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//Fetch requests
// get fetch for ramen resources

function getAllRamens() {
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((ramenData) => initialize(ramenData));
}

//INITIAL RENDER
function initialize(ramenData) {
  ramenData.forEach((el) => renderMenu(el));
}

getAllRamens();
