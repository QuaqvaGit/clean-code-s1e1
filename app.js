//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-items__task-input");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder= document.querySelector(".to-do__tasks");//ul of #incompleteTasks
var completedTasksHolder= document.querySelector(".completed__tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className = "to-do__task";

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='to-do-task__task-name';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className = "to-do-task__check";

    editInput.type="text";
    editInput.className="to-do-task__task-input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="to-do-task__btn to-do-task__btn_edit";

    deleteButton.className="to-do-task__btn to-do-task__btn_delete";
    deleteButtonImg.className = "to-do__delete-icon";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.setAttribute("alt", "delete icon");
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    setTimeout(() => {
        bindTaskEvents(listItem, taskCompleted);
    }, 5);

    taskInput.value="";

}

const getSection = (listItem) => Array.from(listItem.classList).some(className => className.includes("to-do"))?"to-do":"completed";

//Edit an existing task.
var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;
    let section = getSection(listItem);

    var editInput=listItem.querySelector(`.${section}-task__task-input`);
    var label=listItem.querySelector(`.${section}-task__task-name`);
    var editBtn=listItem.querySelector(`.${section}-task__btn_edit`);

    var isEdit=Array.from(listItem.classList).some(className => className.includes("edit-mode"));
    //If class of the parent is .editmode
    if(isEdit){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle(`${section}__task_edit-mode`);
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;   
    //Change Styles
    listItem.className = "completed__task";
    //Set label class
    listItem.querySelector(".to-do-task__task-name").className = "completed-task__task-name";
    //Set checkbox class
    listItem.querySelector(".to-do-task__check").className = "completed-task__check";
    //Set input class
    listItem.querySelector(".to-do-task__task-input").className = "completed-task__task-input";
    //Set edit button class
    let editButton = listItem.querySelector(".to-do-task__btn_edit");
    Array.from(editButton.classList).forEach(style => editButton.classList.remove(style));
    editButton.classList.add("completed-task__btn", "completed-task__btn_edit");
    //Set delete button class
    let deleteButton = listItem.querySelector(".to-do-task__btn_delete");
    Array.from(deleteButton.classList).forEach(style => deleteButton.classList.remove(style));
    deleteButton.classList.add("completed-task__btn", "completed-task__btn_delete");
    

    //Append the task list item to the completed__tasks
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    //Change Styles
    listItem.className = "to-do__task";
    //Set label class
    listItem.querySelector(".completed-task__task-name").className = "to-do-task__task-name";
    //Set checkbox class
    listItem.querySelector(".completed-task__check").className = "to-do-task__check";
    //Set input class
    listItem.querySelector(".completed-task__task-input").className = "to-do-task__task-input";
    //Set edit button class
    let editButton = listItem.querySelector(".completed-task__btn_edit");
    Array.from(editButton.classList).forEach(style => editButton.classList.remove(style));
    editButton.classList.add("to-do-task__btn", "to-do-task__btn_edit");
    //Set delete button class
    let deleteButton = listItem.querySelector(".completed-task__btn_delete");
    Array.from(deleteButton.classList).forEach(style => deleteButton.classList.remove(style));
    deleteButton.classList.add("to-do-task__btn", "to-do-task__btn_delete");

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
    let section = getSection(taskListItem);
//select ListItems children
    var checkBox=taskListItem.querySelector(`.${section}-task__check`);
    var editButton=taskListItem.querySelector(`.${section}-task__btn_edit`);
    var deleteButton=taskListItem.querySelector(`.${section}-task__btn_delete`);


    //Bind editTask to edit button.
    editButton.addEventListener("click", editTask);
    //Bind deleteTask to delete button.
    deleteButton.addEventListener("click", deleteTask);
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.