// Select the section with an id of container without using querySelector.
document.getElementById('container');

// Select the section with an id of container using querySelector.
document.querySelector('#container');

// Select all of the list items with a class of “second”.
document.querySelector('.second');

// Select a list item with a class of third, but only the list item inside of the ol tag.
document.querySelector('ol .third');

// Give the section with an id of container the text “Hello!”.
let contSection = document.querySelector('#container')
contSection.innerText = 'Hello';

// Add the class main to the div with a class of footer.
document.querySelector('.footer').classList.add('main');

// Remove the class main on the div with a class of footer.
document.querySelector('div.footer').classList.remove('main');

// Create a new li element.
let liElement = document.createElement('li');
// Give the li the text “four”.
liElement.innerText = 'four';

// Append the li to the ul element.
document.querySelector('ul').append(liElement);

// Loop over all of the lis inside the ol tag and give them a background color of “green”.
for (let li of document.querySelector('ol').children) {
    li.style.backgroundColor = 'green';
}

// Remove the div with a class of footer
document.querySelector('div > .footer').remove();