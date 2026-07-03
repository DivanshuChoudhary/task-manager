const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const searchTask=document.getElementById("searchTask");
const taskCount=document.getElementById("taskCount");
const emptyMessage=document.getElementById("emptyMessage");

let allTasks=[];

async function loadTasks(){

const response=await fetch("/api/tasks");

allTasks=await response.json();

displayTasks(allTasks);

}

function displayTasks(tasks){

taskList.innerHTML="";

taskCount.innerText=`Total : ${tasks.length}`;

emptyMessage.style.display=tasks.length===0?"block":"none";

tasks.forEach(task=>{

const li=document.createElement("li");

li.innerHTML=`

<span class="${task.completed?"completed":""}">
${task.text}
</span>

<div class="task-actions">

<button class="complete-btn">✔</button>

<button class="edit-btn">✏</button>

<button class="delete-btn">🗑</button>

</div>

`;

li.querySelector(".complete-btn").onclick=async()=>{

await fetch(`/api/tasks/${task.id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

text:task.text,

completed:!task.completed

})

});

loadTasks();

};

li.querySelector(".edit-btn").onclick=async()=>{

const newTask=prompt("Edit Task",task.text);

if(!newTask)return;

await fetch(`/api/tasks/${task.id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

text:newTask,

completed:task.completed

})

});

loadTasks();

};

li.querySelector(".delete-btn").onclick=async()=>{

await fetch(`/api/tasks/${task.id}`,{

method:"DELETE"

});

loadTasks();

};

taskList.appendChild(li);

});

}

addBtn.onclick=async()=>{

const text=taskInput.value.trim();

if(text===""){

alert("Enter Task");

return;

}

await fetch("/api/tasks",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({text})

});

taskInput.value="";

loadTasks();

};

searchTask.addEventListener("keyup",()=>{

const keyword=searchTask.value.toLowerCase();

const filtered=allTasks.filter(task=>

task.text.toLowerCase().includes(keyword)

);

displayTasks(filtered);

});

loadTasks();