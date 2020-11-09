console.log("Let's get this party started!");
const API_KEY = "bT8vH9LjX6qQGzw0NIMYNY4s4bejy6RZ";

async function getGIF(term) {
  const response = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=25&lang=en`
  );
  console.log(response);
  let randInt = Math.floor(Math.random() * 25);
  const url = response.data.data[randInt].images.downsized.url;
  console.log(url);
  addToDOM(url);
}

async function addToDOM(url) {
  const newIMG = document.createElement("img");
  newIMG.src = url;
  document.querySelector("body").append(newIMG);
}

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let term = document.querySelector("#search").value;
  getGIF(term);
});

const removeBtn = document.querySelector("#remove");
removeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll("img").forEach((n) => n.remove());
});
