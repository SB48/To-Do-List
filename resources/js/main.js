//'database' stored directly in code
var data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : {
      todo: [],
      priority: [],
      completed: []
    };

// Remove and complete icons in SVG format
var removeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var prioritySVG =
  '<svg class="svg-icon" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" ><rect y="0" class="noFill" width="22" height="22"/><g> <path d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"></path> </svg>';

renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById("add").addEventListener("click", function () {
  //Collects the data inputted by the user
  var value = document.getElementById("item").value;
  if (value) {
    //checks that the data is not empty
    addItem(value);
  }
});

//Allows users to also add a task by pressing the enter key
document.getElementById("item").addEventListener("keydown", function (e) {
  var value = this.value;
  if ((e.code === "Enter" || e.code === "NumpadEnter") && value) {
    addItem(value);
  }
});

//This function adds the new task to the to do list and updates the screen
function addItem(value) {
  addItemToDOM(value);
  document.getElementById("item").value = "";

  data.todo.push(value);
  dataObjectUpdated();
}

//This function displays the to-do list
function renderTodoList() {
  //Checks that the lists are not empty
  //if (!data.todo.length && !data.completed.length  && !data.priority.length) return;
  if (!data.todo.length && !data.completed.length) return;

  //---------------------------------------------------------------
  //TASK 4
  //displays the priority list
  if (data.priority) {
    //first checks that the list exists
    //checks that the priority list exists
    for (var k = 0; k < data.priority.length; k++) {
      var value = data.priority[k];
      //calls the add item to DOM function which adds
      //each item in the priority list to the UI
      addItemToDOM(value, false, true);
    }
  } else {
    //bug fixing
    localStorage.clear();
  }
  //---------------------------------------------------------------

  //If they are not empty then this code will run to display each item in a for loop
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    //automatically assumes parameters are false if not explicity stated
    addItemToDOM(value);
  }

  //displays the completed list
  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

// This function removes an item (deletion not completion)
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else if (id === "completed") {
    data.completed.splice(data.completed.indexOf(value), 1);
  } else {
    //---------------------------------------------------------------
    //TASK 5
    data.priority.splice(data.priority.indexOf(value), 1);
    //---------------------------------------------------------------
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

//---------------------------------------------------------------
//TASK 6
//This follows a very similar format to the complet function
function prioritise() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.priority.push(value);
  } else if (id === "completed") {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.priority.push(value);
  } else {
    data.priority.splice(data.priority.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Check if the item should be added to the completed list or to re-added to the todo list
  var target =
    id === "todo"
      ? document.getElementById("priority")
      : id === "completed"
      ? document.getElementById("priority")
      : document.getElementById("todo");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}
//---------------------------------------------------------------

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  //---------------------------------------------------------------
  //TASK 5

  if (id === "todo") {
    //if the item is not completed
    //take the item out of the to-do list and add it to completed list
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else if (id === "priority") {
    //take item out of priority list and add to completed list
    data.priority.splice(data.priority.indexOf(value), 1);
    data.completed.push(value);
  } else {
    //take item out of completed list and add to to do
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();
  //---------------------------------------------------------------

  // Check if the item should be added to the completed list or to re-added to the todo list
  // The question mark operator works similarly to if ... else statements.
  var target =
    id === "todo"
      ? document.getElementById("completed")
      : id === "priority"
      ? document.getElementById("completed")
      : document.getElementById("todo");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed, priority) {
  //TASK 3 - you need to add a third switch statement
  // this is in case the id of the item in HTML is priority
  var list = completed
    ? document.getElementById("completed")
    : priority
    ? document.getElementById("priority")
    : document.getElementById("todo");

  var item = document.createElement("li");
  item.innerText = text;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  // Add click event for removing the item
  remove.addEventListener("click", removeItem);

  //Here you add the priority button to the UI
  //This needs to have a different name to 'priority'
  var highPriority = document.createElement("button");
  highPriority.classList.add("highPriority");
  highPriority.innerHTML = prioritySVG;
  //We also need to make sure each button has a event listener attached
  highPriority.addEventListener("click", prioritise);

  var complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeSVG;

  // Add click event for completing the item
  complete.addEventListener("click", completeItem);

  buttons.appendChild(remove);
  // TASK 3 - we also need to make sure that the button is also added
  // to the list of buttons that are put onto the UI
  buttons.appendChild(highPriority);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

