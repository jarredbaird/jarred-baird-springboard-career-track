/**
 * This class maintains the array of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /**
   * This method is designed to be called to generate a new StoryList.
   *  It:
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.*
   */

  static async getStories() {
    // query the /stories endpoint (no auth required)
    const response = await axios.get(`${BASE_URL}/stories`);

    // turn the plain old story objects from the API into instances of the Story class
    const stories = response.data.stories.map((story) => new Story(story));

    // build an instance of our own class using the new array of stories
    const storyList = new StoryList(stories);
    return storyList;
  }

  /**
   * Method to make a POST request to /stories and add the new story to the list
   * - user - the current instance of User who will post the story
   * - newStory - a new story object for the API with title, author, and url
   *
   * Returns the new story object
   */

  async addStory(newStory) {
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "POST",
      data: {
        token: localStorage.getItem("loginToken"),
        story: {
          author: newStory.author,
          title: newStory.title,
          url: newStory.url,
        },
      },
    });
    this.stories.unshift(response.data.story);
  }

  /**
   * Method to make a DELETE request to /stories and delete the story from the list
   * - user - the current instance of User who will delete the story
   * - newStory - a new story object for the API with title, author, and url
   *
   * Returns the deleted story object
   */

  async deleteStory(targetStoryId) {
    await axios({
      url: `${BASE_URL}/stories/${targetStoryId}`,
      method: "DELETE",
      data: { token: localStorage.getItem("loginToken") },
    });

    this.stories = this.stories.filter(
      (story) => story.storyId !== targetStoryId
    );
  }

  static async getStory(storyId) {
    const response = await axios({
      url: `${BASE_URL}/stories/${storyId}`,
      method: "GET",
      data: {
        token: localStorage.getItem("loginToken"),
      },
    });
    return response.data.story;
  }
}
