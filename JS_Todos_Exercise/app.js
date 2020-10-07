// select DOM objects to add listeners to
const formElement = document.querySelector("form");
const listElement = document.querySelector("ul");

// save whatever might be in localStorage to a variable
const savedTodos = [];
if (localStorage.getItem("todos")) {
    for (let li of JSON.parse(localStorage.getItem("todos"))) {
        savedTodos.push(li);
    }
}

for (let li of savedTodos) {
    let newLi = document.createElement('li');
    document.querySelector('ul').append(newLi);
}

// when the 'submit' button is clicked, create a new li
formElement.addEventListener("submit", function(e) {
    // keep the page from refreshing
    e.preventDefault();
    console.log("sorry 'submit'...you've been DENIED!!");
    // grab the text in the input field
    let enteredTODO = document.querySelector("input");
    // create a fresh and clean li
    const newLi = document.createElement('li');
    // add the text from input AND a "remove" button
    newLi.innerHTML = enteredTODO.value + "   <button>-</button>";
    savedTodos.push(newLi);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    // reset the input field
    enteredTODO.value = "";
    // add the new li to the beginning of the ul
    document.querySelector('ul').prepend(newLi);
    // add the new li  
})



// when the li is clicked: strikethrough the text if
// the text was clicked OR remove the li if the button
// was clicked
listElement.addEventListener('click', function(e) {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
    };
    e.target.classList.toggle("strikethrough");
    console.dir(e.target);
});

// OPTIONAL: add background when mouse moves over an li
listElement.addEventListener('mouseenter', function(e) {
    e.target.classList.toggle("hover");
})

// OPTIONAL: remove background when mouse moves outside an li
listElement.addEventListener('mouseleave', function(e) {
    e.target.classList.toggle("hover");
})

// Create this whole function and then realize that its 
// completely worthless to what I'm trying to achieve.
// window.addEventListener('beforeunload', function(e) {
//     let todos = [];
//     for (let li in listElement.children) {
//         todos.push(li.innerHTML.value);
//     }
//     localStorage.setItem("todos", JSON.stringify(todos));
//     e.preventDefault();
// })