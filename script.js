const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const columns=document.querySelectorAll(".cards");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
let draggedId=null;

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function createCard(task){
const card=document.createElement("div");
card.className="card";
card.draggable=true;
card.textContent=task.text;
card.dataset.id=task.id;

card.addEventListener("dragstart",()=>{
draggedId=task.id;
});

return card;
}

function renderTasks(){
columns.forEach(column=>column.innerHTML="");

tasks.forEach(task=>{
const column=document.getElementById(task.status);
column.appendChild(createCard(task));
});
}

addBtn.addEventListener("click",()=>{
const text=taskInput.value.trim();

if(text==="")return;

const task={
id:Date.now(),
text:text,
status:"todo"
};

tasks.push(task);
saveTasks();
renderTasks();
taskInput.value="";
});

columns.forEach(column=>{
column.addEventListener("dragover",e=>{
e.preventDefault();
column.classList.add("drag-over");
});

column.addEventListener("dragleave",()=>{
column.classList.remove("drag-over");
});

column.addEventListener("drop",()=>{
column.classList.remove("drag-over");

const task=tasks.find(t=>t.id===draggedId);

if(task){
task.status=column.id;
saveTasks();
renderTasks();
}
});
});

renderTasks();