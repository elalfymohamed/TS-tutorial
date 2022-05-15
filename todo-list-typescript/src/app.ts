// DOM
const todoListGroup = document.querySelector(".todo-list-group") as HTMLElement;
const todoListAdds = document.querySelector(".todo-list-adds") as HTMLElement;
const todoListNotationNote = document.querySelector(
  ".todo-list_notation-note"
) as HTMLElement;
// input
const notationNoteInput = document.querySelector(
  "#notation-note-input"
) as HTMLInputElement;
const titleNoteInput = document.querySelector(
  "#title-note-input"
) as HTMLInputElement;

// button
const close_note = document.querySelector("#close_note") as HTMLButtonElement;
const bgOptions_note = document.querySelector(
  "#bgOptions_note"
) as HTMLButtonElement;
const install_note = document.querySelector(
  "#install_note"
) as HTMLButtonElement;

//  event listener
todoListNotationNote.addEventListener("click", () => {
  todoListGroup.classList.add("add-todo-action");
  todoListAdds.classList.add("todo-list-adds_active");
  todoListAdds.classList.remove("todo-adds");
  todoListNotationNote.classList.add("hidden");

  notationNoteInput.focus();
});

close_note.addEventListener("click", () => {
  todoListGroup.classList.remove("add-todo-action");
  todoListAdds.classList.remove("todo-list-adds_active");
  todoListAdds.classList.add("todo-adds");
  todoListNotationNote.classList.remove("hidden");
});

install_note.addEventListener("click", () => {
  install_note.classList.toggle("install-note_active");
});

const autoClose = (e: Event) => {
  if (
    !todoListAdds.contains(e.target as HTMLElement) &&
    !close_note.contains(e.target as HTMLElement)
  ) {
    todoListGroup.classList.remove("add-todo-action");
    todoListAdds.classList.remove("todo-list-adds_active");
    todoListAdds.classList.add("todo-adds");
    todoListNotationNote.classList.remove("hidden");
  }
};

window.addEventListener("click", () => {
  if (!todoListAdds.classList.contains("todo-adds")) {
    window.addEventListener("click", autoClose, true);
  } else {
    window.removeEventListener("click", autoClose, true);
  }
});
