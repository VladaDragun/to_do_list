const taskDesc = document.getElementById('task_description');
const addTask = document.getElementById('add_task');
const tasksWrapper = document.getElementById('tasks_wrapper');
const tooltip = document.getElementById('tooltip');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let listItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
    <div class="list_item flex_list_items ${task.completed ? 'checked' : ''}">
      <div onclick="completeTask(${index})" class="list_checkbox ${task.completed ? 'checkbox_on' : ''}"></div>
      <p class="list_item_text">${task.description}</p>
      <input onclick="deleteTask(${index})" class="list_item_trash" src="img/icons8.png" type="image">
    </div>
  `;
}

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
  tasksWrapper.innerHTML = "";
  if(tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      tasksWrapper.innerHTML += createTemplate(item, index);
    });
    listItemElems = document.querySelectorAll('.list_item');
  }
}

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
  tasks[index].completed = !tasks[index].completed;
  if(tasks[index].completed) {
    listItemElems[index].classList.add('checked');
  }
  else {
    listItemElems[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
}

addTask.addEventListener('click', () => {
  if(taskDesc.value) {
    tooltip.classList.remove('show_tooltip');
    taskDesc.classList.remove('empty_input');
    tasks.push(new Task(taskDesc.value));
    updateLocal();
    fillHtmlList();
    taskDesc.value = "";
  }
  else {
    tooltip.classList.add('show_tooltip');
    taskDesc.classList.add('empty_input');
  }
});

const deleteTask = index => {
  listItemElems[index].classList.add('deletion');
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 500);
}
