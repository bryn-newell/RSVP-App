document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector ('input');

  const mainDiv = document.querySelector ('.main');
  const ul = document.getElementById('invitedList');

  //adding a checkbox to filter the list
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div,ul);

  //Showing or hiding the list based on if the checkbox is checked
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for ( let i = 0; i < lis.length; i +=1){
        let li = lis[i];
        if (li.className === "responded"){
          li.style.display = " ";
        } else {
          li.style.display = 'none';
        }
      }
    } else {
        for ( let i = 0; i < lis.length; i +=1){
        let li = lis[i];
        li.style.display = '';
      }
    }
  });


  function createLI (text) {
    // a refactoring function to create elements
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
      }
      // A refactoring function to append elements
      function appendToLI(elementName, property, value) {
        const element = createElement(elementName, property, value);
        li.appendChild(element);
        return element;
      }
    //create a new list item in the invited List ul
    const li = document.createElement('li');
    /* making the content of the input html format (span) and assigning
    that content to the new li  and appending it with our new function */
    appendToLI('span','textContent',text);
    /*Giving text to the textbox we're about to create and appending
     to the Li, creating the checkbox, and
     appending the label/text to the checkbox */
    appendToLI('label','textContent',"Confirmed")
      .appendChild(createElement('input', 'type','checkbox'));
    //edit button
    appendToLI('button','textContent', "edit");
    //remove button
    appendToLI('button', 'textContent', "remove");
    return li;
  }

  form.addEventListener ('submit', (e) => {
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

  ul.addEventListener('change', (e) => {
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

  ul.addEventListener('click', (e) => {
    //only runs if the thing clicked is a button
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      //creating an object of functions to clean up code
      const nameActions = {
        remove: ()  => {
            ul.removeChild(li);
        },
        edit: () => {
          /*selecting the name originally entered that needs to be edited,
          which we turned into a span */
          const span = li.firstElementChild;
          // replacing the text (span element) with an input field
          const input = document.createElement('input');
          input.type = 'text';
          //leaving the name in the input field to edit
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          //changing the edit button to a save button
          button.textContent = "save";
        },
        save: () => {
              //the first child is now the input field
                const input = li.firstElementChild;
                // saving the value of the input into a span text and appending it
                const span = document.createElement('span');
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                //changing the save button to an edit button
                button.textContent = "edit";
            }
      };
      /*select and run action in button's name (works since the action)
       is the same as the button's text content*/
      nameActions[action]();
    }
  });
});
