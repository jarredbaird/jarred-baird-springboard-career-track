const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

let localToken = localStorage.getItem("loginToken");
let localUser = localStorage.getItem("username");

// global storyList variable
let storyList = null;

// global user variable
let currentUser = null;
