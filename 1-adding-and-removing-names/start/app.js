const form = document.getElementById("registrar");
const input = form.querySelector ("input");
const ul = document.getElementById("invitedList");

function createLI (text) {
  //create a new list item in the invited List ul
  const li = document.createElement("li");
  /* making the content of the input html format and assigning
  that content to the new li */
  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);
  //Giving text to the textbox we're about to create
  const label = document.createElement("label");
  label.textContent = "Confirmed";
  //creating the checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  //appending the label/text to the checkbox
  label.appendChild(checkbox);
  //appending the checkbox to the li
  li.appendChild(label);

  //edit button
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  li.appendChild(editButton);

  //remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  li.appendChild(removeButton);
  return li;
}

form.addEventListener ("submit", (e) => {
  // The default of submit is to refresh the page, stops it from refreshing
  e.preventDefault();
  const text = input.value;
  //clear out the input field so it's blank after entry
  input.value = " ";
  //Using the function
  const li = createLI(text);
  //appending the li to the ul
  ul.appendChild(li);
});

ul.addEventListener("change", (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if (checked){
    listItem.className = "responded";
  }
  else {
    listItem.className = " ";
  }
});

ul.addEventListener("click", (e) => {
  //only runs if the thing clicked is a button
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    //checking for edit button or remove button
    if (button.textContent === "remove") {
        ul.removeChild(li);
  } else if (button.textContent === "edit") {
      /*selecting the name originally entered that needs to be edited,
      which we turned into a span */
      const span = li.firstElementChild;
      // replacing the text (span element) with an input field
      const input = document.createElement("input");
      input.type = "text";
      //leaving the name in the input field to edit
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      //changing the edit button to a save button
      button.textContent = "save";
    }
    else if (button.textContent === "save") {
      //the first child is now the input field
        const input = li.firstElementChild;
        // saving the value of the input into a span text and appending it
        const span = document.createElement("span");
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        //changing the save button to an edit button
        button.textContent = "edit";
      }
  }
});
