let elTodoForm = document.querySelector(".todo-form");
let elTodoInput = document.querySelector(".todo-input");
let elTodoList = document.querySelector(".todo-list");

let todo = [];

elTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = elTodoInput.value.trim();

  if (!inputValue || todo.some(item => item.title === inputValue)) {
    alert("This task already exists or the input is empty!");
    return;
  }

  const data = {
    id: todo.length + 1,
    title: inputValue,
  };

  todo.push(data);
  renderTodo(todo, elTodoList);
  e.target.reset();
});

function renderTodo(arr, list) {
  list.innerHTML = "";
  arr.forEach((item, index) => {
    let elItem = document.createElement("li");
    elItem.className = "flex items-center gap-4 justify-between p-3 border-b border-gray-300";
    elItem.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-gray-500">${index + 1}.</span>
        <strong class="text-lg">${item.title}</strong>
      </div>
      <div>
        <button
          id="${item.id}"
          class="delete-btn bg-danger px-4 py-2 text-white rounded-md hover:bg-red-700 transition-all"
        >
          Delete
        </button>
        <button
          class="edit-btn bg-accent px-4 py-2 text-white rounded-md hover:bg-yellow-500 transition-all"
        >
          Edit
        </button>
      </div>
    `;
    list.append(elItem);
  });
}

elTodoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const clickId = e.target.id;
    const deleteIndex = todo.findIndex(item => item.id == clickId);
    if (deleteIndex !== -1) {
      todo.splice(deleteIndex, 1);
      renderTodo(todo, elTodoList);
    }
  }
});
