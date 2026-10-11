
let taskData = {};


const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const Delete = document.querySelector("#delete")

const columns = [todo, progress, done];
let dragElement = null;

function updateCounts() {
  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    if (count) {
      count.innerText = tasks.length;
    }
  });
}

function saveTasks() {
  columns.forEach((col) => {
    taskData[col.id] = Array.from(
      col.querySelectorAll(".task")
    ).map((task) => ({
      title: task.querySelector("h2").innerText.trim(),
      description: task.querySelector("p").innerText.trim()
    }));
  });

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

function createTask(task) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  const title = document.createElement("h2");
  title.innerText = task.title;

  const description = document.createElement("p");
  description.innerText = task.description;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", () => {
    div.remove();
    saveTasks();
    updateCounts();
  });

  div.append(title, description, deleteButton);

  div.addEventListener("dragstart", () => {
    dragElement = div;
  });

  return div;
}

function loadTasks() {
  const savedData = localStorage.getItem("tasks");

  if (!savedData) {
    updateCounts();
    return;
  }

  try {
    taskData = JSON.parse(savedData);

    columns.forEach((col) => {
      col.querySelectorAll(".task").forEach((task) => task.remove());

      (taskData[col.id] || []).forEach((task) => {
        col.appendChild(createTask(task));
      });
    });

    updateCounts();
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

function addDragEventOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    if (!column.contains(e.relatedTarget)) {
      column.classList.remove("hover-over");
    }
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    if (!dragElement) return;

    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    dragElement = null;

    saveTasks();
    updateCounts();
  });
}

columns.forEach(addDragEventOnColumn);

const toggalModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector(".add-task-btn");

toggalModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title").value.trim();
  const taskDescription = document.querySelector("#task-Description").value.trim();

  if (!taskTitle || !taskDescription) {
    alert("Please enter title and description");
    return;
  }

  todo.appendChild(
    createTask({
      title: taskTitle,
      description: taskDescription
    })
  );

  saveTasks();
  updateCounts();

  document.querySelector("#task-title").value = "";
  document.querySelector("#task-Description").value = "";

  modal.classList.remove("active");
});

loadTasks();