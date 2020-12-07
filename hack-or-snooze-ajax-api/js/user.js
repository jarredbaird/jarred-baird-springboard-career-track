/**
 * The User class to primarily represent the current user.
 *  There are helper methods to signup (create), login, and getLoggedInUser
 */

class User {
  constructor(userObj) {
    this.username = userObj.username;
    this.name = userObj.name;
    this.createdAt = userObj.createdAt;
    this.updatedAt = userObj.updatedAt;

    // these are all set to defaults, not passed in by the constructor
    this.loginToken = "";
    this.favorites = "";
    this.myCreatedStories = "";
  }

  /* Create and return a new user.
   *
   * Makes POST request to API and returns newly-created user.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async create(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: {
        user: {
          username,
          password,
          name,
        },
      },
    });

    // build a new User instance from the API response
    const newUser = new User(response.data.user);

    // attach the token to the newUser instance for convenience
    newUser.loginToken = response.data.token;

    return newUser;
  }

  /* Login in user and return user instance.
  
     * - username: an existing user's username
     * - password: an existing user's password
     */

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: {
        user: {
          username,
          password,
        },
      },
    });

    // build a new User instance from the API response
    const existingUser = new User(response.data.user);

    // instantiate Story instances for the user's favorites and myCreatedStories
    existingUser.favorites = response.data.user.favorites.map(
      (s) => new Story(s)
    );
    existingUser.myCreatedStories = response.data.user.stories.map(
      (s) => new Story(s)
    );

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = response.data.token;

    return existingUser;
  }

  /** Get user instance for the logged-in-user.
   *
   * This function uses the loginToken & username to make an API request to get details
   *   about the user. Then it creates an instance of user with that info.
   */

  static async getLoggedInUser() {
    // if we don't have user info, return null
    const localToken = localStorage.getItem("loginToken");
    const localUser = localStorage.getItem("username");
    if (!localToken || !localUser) return null;

    // call the API
    const response = await axios({
      url: `${BASE_URL}/users/${localUser}`,
      method: "GET",
      params: { token: localToken },
    });

    // instantiate the user from the API information
    const existingUser = new User(response.data.user);

    // instantiate Story instances for the user's favorites and myCreatedStories
    existingUser.favorites = response.data.user.favorites.map(
      (s) => new Story(s)
    );
    existingUser.myCreatedStories = response.data.user.stories.map(
      (s) => new Story(s)
    );
    return existingUser;
  }

  static async modifyFavorite(method, storyId) {
    const localToken = localStorage.getItem("loginToken");
    const localUser = localStorage.getItem("username");
    const response = await axios({
      url: `${BASE_URL}/users/${localUser}/favorites/${storyId}`,
      method: method,
      data: { token: localToken },
    });
    return response.data.user;
  }
}
