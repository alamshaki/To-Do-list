let todoValue = document.querySelector("#inputValue");
let addButton = document.querySelector("#addButton");
const btnText = addButton.innerText;
let mainTodoItemsDisplay = document.querySelector(".todo-list-item")


todoItemsArray = [];
let edit_id = null;
let obj = localStorage.getItem("todoItems")

if(obj != null){
    todoItemsArray = JSON.parse(obj);
}

const takeTodoItems = () =>{
    let trimValue = todoValue.value.trim("");

    if(todoValue.value != "" && edit_id != null){
       
       todoItemsArray.splice(edit_id,1,trimValue);
       edit_id = null;
    }
    else{
        todoItemsArray.push(trimValue);
        
    }

    SaveTodoItems(todoItemsArray);
    
    todoValue.value = "";
}





addButton.addEventListener("click",(e) =>{
    e.preventDefault();
    takeTodoItems();
    DisplayTodoItems();
    addButton.innerText = btnText;
    
})

const SaveTodoItems = (todoItemsArray) => {
    let str = JSON.stringify(todoItemsArray)
    localStorage.setItem("todoItems",str)
}

const DisplayTodoItems = () =>{
    let statement = "";
    todoItemsArray.forEach((element ,idx) => {
        statement += `<div class="main-todo-div">
    
        <p><span>${idx+1}.</span>${element}</p>
        <div class="icon">
          <i class="fa-solid fa-pen-to-square" id="underline" onclick = 'EditTodoItems(${idx})'></i>
          <i class="fa-solid fa-trash" id="delete" onclick = "DeleteTodoItems(${idx})"></i>
        </div> 
       </div> <br></br>`
    });
    mainTodoItemsDisplay.innerHTML = statement;
    

}

DisplayTodoItems();


const DeleteTodoItems = (idx) =>{
    todoItemsArray.splice(idx,1);
    SaveTodoItems(todoItemsArray);
    DisplayTodoItems();
   
}


const EditTodoItems = (idx) =>{
 edit_id = idx;
 console.log(edit_id);
 todoValue.value = todoItemsArray[idx];
 addButton.innerText = "Save & Changes";
 addButton.style.width = "140px"

}
   
 

