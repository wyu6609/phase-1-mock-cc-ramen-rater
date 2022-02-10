/////////////////////////////////////////////////////////////////////
//GLOBAL CONSTANTS
const uri = "http://localhost:3000/ramens";
//DOM NODES
const insertRamenMenu = document.getElementById("ramen-menu");
const ramenImageDisplay = document.querySelector(".detail-image");
const ramenNameDisplay = document.querySelector(".name");
const ramenRestaurantDisplay = document.querySelector(".restaurant");
const ramenRatingDisplay = document.getElementById("rating-display");
const ramenCommentDisplay = document.getElementById("comment-display");
//DOM NEW-RAMEN FORM NODES
const ramenForm = document.getElementById("new-ramen");
const newName = document.getElementById("new-name");
const newRestaurant = document.getElementById("new-restaurant");
const newImage = document.getElementById("new-image");
const newRating = document.getElementById("new-rating");
const newComment = document.getElementById("new-comment");
//DOM EDIT-RAMEN FORM NODES
const editRamenForm = document.getElementById("edit-ramen");
const editRamenRating = document.getElementById("edit-rating");
const editRamenComment = document.getElementById("edit-comment");
/////////////////////////////////////////////////////////////////////
//start the webAPP
fetchRamenAPI();

//submit form button
ramenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewRamenObj();
});
editRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //replace display info with form information
  //editDisplay()
  ramenRatingDisplay.textContent = editRamenRating.value;
  ramenCommentDisplay.textContent = editRamenComment.value;
  //create Edited object
  const newCommentRating = {
    rating: editRamenRating.value,
    comment: editRamenComment.value,
  };

  //PATCH REQUEST edit
});

////////////////////////////////////////////
// FORM BUTTON FUNCTIONALITY
//submit button functionality
function addNewRamenObj() {
  let jsonLength = insertRamenMenu.childElementCount;
  jsonLength++;
  //create new RamenObj
  let newRamenObj = {
    id: jsonLength,
    name: newName.value,
    restaurant: newRestaurant.value,
    image: newImage.value,
    rating: newRating.value,
    comment: newComment.value,
  };
  //POST newOBJ
  postRequest(newRamenObj);
  renderObj(newRamenObj);
}

////////////////////////////////////////////
//FETCH APIs
//GET request fetch api
function fetchRamenAPI() {
  fetch(uri, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:");
      iterateData(data);
      firstLoad(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//POST REQUEST fetch api
function postRequest(newRamenObj) {
  fetch(uri, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamenObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

////////////////////////////////////////////
//first load shows ramen obj 1
function firstLoad(ramenArray) {
  addToRamenDisplay(ramenArray[0]);
}

//iterate the json iterateData
function iterateData(ramenArray) {
  ramenArray.forEach((ramenObj) => renderObj(ramenObj));
}
//render RamenObj
function renderObj(ramenObj) {
  createRamenImage(ramenObj);
}
function createRamenImage(ramenObj) {
  let ramenImage = document.createElement("img");
  ramenImage.id = ramenObj.id;
  ramenImage.src = ramenObj.image;
  insertRamenMenu.appendChild(ramenImage);
  document.getElementById(ramenObj.id).addEventListener("click", () => {
    //add to the ramen-detail container
    addToRamenDisplay(ramenObj);
  });
}

function addToRamenDisplay(ramenObj) {
  ramenImageDisplay.src = ramenObj.image;
  ramenNameDisplay.textContent = ramenObj.name;
  ramenRestaurantDisplay.textContent = ramenObj.restaurant;
  ramenRatingDisplay.textContent = ramenObj.rating;
  ramenCommentDisplay.textContent = ramenObj.comment;
}
