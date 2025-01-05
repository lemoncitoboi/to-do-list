document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task");
    const taskListPending = document.getElementById("task-list-pending");
    const taskListCompleted = document.getElementById("task-list-completed");
  
    // Agregar nueva tarea
    addTaskButton.addEventListener("click", () => {
      const taskText = input.value.trim();
      if (taskText) {
        addTaskToList(taskText, false, taskListPending);
        input.value = "";
      }
    });
  
    function addTaskToList(taskText, completed, targetList) {
      const li = document.createElement("li");
      li.draggable = true;
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed;
  
      const taskContent = document.createElement("span");
      taskContent.textContent = `${taskText} - ${new Date().toLocaleTimeString()}`;
  
      if (completed) {
        taskContent.style.textDecoration = "line-through";
      }
  
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          taskContent.style.textDecoration = "line-through";
          taskListCompleted.appendChild(li);
        } else {
          taskContent.style.textDecoration = "none";
          taskListPending.appendChild(li);
        }
      });
  
      // Eventos para arrastrar y soltar
      li.addEventListener("dragstart", () => {
        li.classList.add("dragging");
      });
  
      li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
      });
  
      li.appendChild(checkbox);
      li.appendChild(taskContent);
      targetList.appendChild(li);
    }
  
    // Configuración de arrastrar y soltar entre columnas
    [taskListPending, taskListCompleted].forEach((list) => {
      list.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
  
      list.addEventListener("drop", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (list === taskListCompleted) {
          const checkbox = dragging.querySelector("input[type='checkbox']");
          checkbox.checked = true;
          dragging.querySelector("span").style.textDecoration = "line-through";
        } else if (list === taskListPending) {
          const checkbox = dragging.querySelector("input[type='checkbox']");
          checkbox.checked = false;
          dragging.querySelector("span").style.textDecoration = "none";
        }
        list.appendChild(dragging);
      });
    });
  });
  