// const { response } = require("express");

// Client-side javascript

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevents default behavior of submitting, which is refreshing browser
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    //when fetch is all done, we get response back
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "Error: " + data.error;
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageTwo.innerText = data.forecast;
      }
    });
  });
});
