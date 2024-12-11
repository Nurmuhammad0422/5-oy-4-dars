let elTodoForm = document.querySelector(".todo-form");
let elTodoInput = document.querySelector(".todo-input");
let elTodoList = document.querySelector(".todo-list");
let filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(filter) {
  elTodoList.innerHTML = "";
  let filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    let elItem = document.createElement("li");
    elItem.className =
      "flex items-center gap-4 justify-between p-3 border-b border-gray-300";
    elItem.innerHTML = `
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          ${todo.completed ? "checked" : ""}
          class="todo-check"
          data-id="${todo.id}"
        />
        <span class="${todo.completed ? "line-through text-gray-500" : ""}">${
      index + 1
    }. ${todo.title}</span>
      </div>
      <div>
        <button
          class="edit-btn bg-yellow-500 px-3 py-2 text-white rounded-md hover:bg-yellow-600 transition-all"
          data-id="${todo.id}"
        >
          Edit
        </button>
        <button
          class="delete-btn bg-red-500 px-3 py-2 text-white rounded-md hover:bg-red-600 transition-all"
          data-id="${todo.id}"
        >
          Delete
        </button>
      </div>
    `;
    elTodoList.append(elItem);
  });
}

elTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = elTodoInput.value.trim();

  if (!inputValue) {
    alert("Please enter a task!");
    return;
  }

  todos.push({ id: Date.now(), title: inputValue, completed: false });
  saveToLocalStorage();
  renderTodos(filter);
  elTodoInput.value = "";
});

elTodoList.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    renderTodos(filter);
  } else if (e.target.classList.contains("edit-btn")) {
    const todo = todos.find(todo => todo.id === id);
    const newTitle = prompt("Edit your task:", todo.title);
    if (newTitle) {
      todo.title = newTitle;
      saveToLocalStorage();
      renderTodos(filter);
    }
  }
});

elTodoList.addEventListener("change", function (e) {
  if (e.target.classList.contains("todo-check")) {
    const id = Number(e.target.dataset.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = e.target.checked;
      saveToLocalStorage();
      renderTodos(filter);
    }
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    filter = this.dataset.filter;
    filterBtns.forEach(b => b.classList.remove("bg-green-500"));
    this.classList.add("bg-green-500");
    renderTodos(filter);
  });
});

renderTodos(filter);