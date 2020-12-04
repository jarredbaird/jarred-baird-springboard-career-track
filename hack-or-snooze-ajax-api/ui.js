// global storyList variable
let storyList = null;

// global user variable
let currentUser = null;

let localToken = localStorage.getItem("token");
let localUser = localStorage.getItem("username");

$(async function () {
  // cache some selectors we'll be using quite a bit
  const $loadingMsg = $("#loading-msg");
  const $allStoriesList = $("#all-stories-list");
  const $submitForm = $("#submit-form");
  const $loginForm = $("#login-form");
  const $signupForm = $("#signup-form");
  const $myCreatedStories = $("#my-created-stories");
  const $navLoginSignup = $("#nav-login-signup");
  const $navLogOut = $("#nav-logout");
  const $mainNavLinks = $(".main-nav-links");
  const $navUserProfile = $("#nav-user-profile");

  currentUser = await User.getLoggedInUser(localToken, localUser);

  displayNav();
  await refreshStoryList();

  /**
   * Event listener for logging in.
   *  If successful, will setup the user instance
   */

  async function login(evt) {
    evt.preventDefault(); // no page-refresh on submit

    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // call the login static method to build a user instance
    const userInstance = await User.login(username, password);

    // set the global user to the user instance
    currentUser = userInstance;
    displayNav();
    $loginForm.trigger("reset");
    $signupForm.trigger("reset");
    syncCurrentUserToLocalStorage();
    await refreshStoryList();
  }

  $loginForm.on("submit", login);

  /**
   * Event listener for signing up.
   *  If successful, will setup a new user instance
   */

  async function signup(evt) {
    evt.preventDefault(); // no page refresh

    // grab the required fields
    let name = $("#create-account-name").val();
    let username = $("#create-account-username").val();
    let password = $("#create-account-password").val();

    // call the create method, which calls the API and then builds a new user instance
    const newUser = await User.create(username, password, name);
    currentUser = newUser;
    if (currentUser) {
      displayNav();
    }
    $loginForm.trigger("reset");
    $signupForm.trigger("reset");
    syncCurrentUserToLocalStorage();
    await refreshStoryList();
  }

  $signupForm.on("submit", signup);

  /**
   * Log Out Functionality
   */

  function logout() {
    // empty out local storage
    localStorage.clear();
    // refresh the page, clearing memory
    location.reload();
    currentUser = "";
    displayNav();
  }
  $navLogOut.on("click", logout);

  /**
   * Event Handler for Clicking Login
   */

  function showLoginAndSignUpForms() {
    // Show the Login and Signup Forms
    hideElements();
    $loginForm.slideToggle();
    $signupForm.slideToggle();
  }
  $navLoginSignup.on("click", showLoginAndSignUpForms);

  /**
   * Event handler for Navigation to Homepage
   */

  $("body").on("click", "#nav-all", refreshStoryList);

  /**
   * Event handler for revealing story submission form
   */

  function showSubmitForm() {
    hideElements();
    $submitForm.slideToggle();
  }

  $("body").on("click", "#nav-submit-story", showSubmitForm);

  /**
   * Event handler for creating a new story
   */
  async function submitStoryToStoryList(evt) {
    evt.preventDefault(); // no page refresh

    // grab the required fields

    const user = currentUser.username;
    const author = $("#author").val();
    const title = $("#title").val();
    const url = $("#url").val();

    let newStory = new Story({
      author: author,
      url: url,
      title: title,
    });

    const addedStory = await storyList.addStory(user, newStory);
    currentUser = await User.getLoggedInUser(localToken, localUser);
    await refreshStoryList();
  }

  $submitForm.on("submit", submitStoryToStoryList);

  /**
   * Event handler for displaying favorites
   */

  function showFavorites() {
    showStories(currentUser.favorites);
  }

  $("body").on("click", "#nav-favorites", showFavorites);

  /**
   * Event handler for displaying favorites
   */

  function showMyCreatedStories() {
    if (currentUser.myCreatedStories.length !== 0) {
      showStories(currentUser.myCreatedStories);
    } else {
      hideElements();
      $allStoriesList.empty().show();
      $allStoriesList.text("No user created stories");
    }
  }

  $("body").on("click", "#nav-my-stories", showMyCreatedStories);

  /**
   * Event handler for adding a favorite
   */
  async function modFavorite(evt) {
    const storyId = evt.target.parentElement.id;
    evt.target.classList.toggle("fas");
    evt.target.classList.toggle("far");
    if (evt.target.classList.contains("far")) {
      currentUser = await User.modifyFavorite("DELETE", storyId);
    } else {
      currentUser = await User.modifyFavorite("POST", storyId);
    }
  }

  $allStoriesList.on("click", ".fa-star", modFavorite);

  /**
   * Event handler for deleting a story
   */
  async function deleteStory(evt) {
    const storyId = evt.target.parentElement.id;
    if (evt.target.classList.contains("fa-trash")) {
      let deletedStory = await storyList.deleteStory(storyId);
      currentUser = await User.getLoggedInUser(localToken, localUser);
      await refreshStoryList();
      window.alert("Story deleted");
    }
  }

  $allStoriesList.on("click", ".fa-trash", deleteStory);

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyListInstance. Then render it.
   */

  async function refreshStoryList() {
    hideElements();
    $loadingMsg.show();
    // get an instance of StoryList
    const storyListInstance = await StoryList.getStories();
    // update our global variable
    storyList = storyListInstance;
    showStories(storyList.stories);
  }

  function showStories(stories) {
    hideElements();
    $allStoriesList.empty().show();

    // loop through all of our stories and generate HTML for them
    for (let story of stories) {
      const result = generateStoryHTML(story);
      $allStoriesList.append(result);
    }
  }

  /**
   * A function to render HTML for an individual Story instance
   */

  function generateStoryHTML(story) {
    let hostName = getHostName(story.url);
    let star = "";
    let mine = "";

    // render story markup
    if (currentUser) {
      if (isFavorite(story.storyId)) {
        star = '<i class="fas fa-star"></i>';
      } else {
        star = '<i class="far fa-star"></i>';
      }
      if (isMyCreatedStory(story.storyId)) {
        mine = '<i class="fa fa-trash"> </i>';
      }
    }

    let storyMarkup = $(`
      <li id="${story.storyId}">
      ${star}
        <a class="article-link" href="${story.url}" target="a_blank">
        <strong>${story.title}</strong>
        </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        ${mine}
        <small class="article-username">posted by ${story.username}</small>
        
      </li>
    `);
    return storyMarkup;
  }

  function isFavorite(storyId) {
    for (let favorite of currentUser.favorites) {
      if (favorite.storyId === storyId) {
        return true;
      }
    }
    return false;
  }

  function isMyCreatedStory(storyId) {
    for (let aStory of currentUser.myCreatedStories) {
      console.log(aStory);
      if (aStory.storyId === storyId) {
        return true;
      }
    }
    return false;
  }

  /* hide all elements in elementsArr */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $loadingMsg,
      $myCreatedStories,
      $loginForm,
      $signupForm,
    ];
    elementsArr.forEach(($elem) => $elem.hide());
  }

  function displayNav() {
    if (currentUser) {
      $navLoginSignup.hide();
      $navLogOut.show();
      $navUserProfile.text(currentUser.username);
      $mainNavLinks.show();
    } else {
      $navLoginSignup.show();
      $navLogOut.hide();
      $navUserProfile.text("");
      $mainNavLinks.hide();
    }
  }

  /* simple function to pull the hostname from a URL */

  function getHostName(url) {
    let hostName;
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2];
    } else {
      hostName = url.split("/")[0];
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4);
    }
    return hostName;
  }

  /* sync current user information to localStorage */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }
});
