const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("ul");

buttonElement.addEventListener("click", function () {  //Create an click event listener for the Add Chapter button using addEventListener and an anonymous function.
	const inputValue = inputElement.value.trim(); //The trim function removes whitespace from both sides of the string
	if (inputValue === "") {      //if the input value is empty, return nothing
		return;
	}

	const liElement = document.createElement("li");   //create an "li" element
	const deleteButton = document.createElement("button");

	liElement.textContent = inputValue;   //populate  the li elements textContent or innerHTML with the input
	deleteButton.textContent = "❌";   //populate the button element with the delete button

	deleteButton.addEventListener("click", function () {   //add an event listener to the delete button that removes the li element when clicked

		listElement.removeChild(liElement);
	});

	liElement.appendChild(deleteButton);   //append the list element with the li element just created and appended with text and the delete button
	listElement.appendChild(liElement);

	inputElement.focus();  //send focus to the input element
	inputElement.value = "";  //change the input value to nothing or the empty string to clean up the interface for the user
});