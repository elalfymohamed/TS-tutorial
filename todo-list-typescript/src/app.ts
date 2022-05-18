//  array set to the backgroundOptions element
let isBgOption: string[] = [];
// array set to the todo list
let todo_list: object[] = [];
let installNote: boolean = false;
const defaultBG: string = "bg-default";

// DOM
const todoListGroup = document.querySelector(".todo-list-group") as HTMLElement;
const todoListAdds = document.querySelector(".todo-list-adds") as HTMLElement;
const todoListNotationNote = document.querySelector(
  ".todo-list_notation-note"
) as HTMLElement;
const bgOption = document.querySelectorAll(".bg-option")!;

const backgroundOptions = document.querySelector(
  ".background-options"
) as HTMLDivElement;
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

const addToDo = (e: Event) => {
  e.preventDefault();

  if (titleNoteInput.value === "" && notationNoteInput.value === "") {
    return;
  } else {
    todo_list.push({
      title: titleNoteInput.value,
      notation: notationNoteInput.value,
      bg: isBgOption[0] || defaultBG,
      install_note: installNote,
    });
  }

  titleNoteInput.value = "";
  notationNoteInput.value = "";
  removeClass();

  console.log(todo_list);
};

// window.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     addToDo(e);
//   }
// });

//  function to remove class
const removeClass = () => {
  todoListGroup.classList.remove("add-todo-action");
  todoListAdds.classList.remove("todo-list-adds_active");
  todoListAdds.classList.add("todo-adds");
  todoListNotationNote.classList.remove("hidden");
  install_note.classList.remove("install-note_active");
  backgroundOptions.classList.add("h-options");
  bgOptions_note.classList.remove("bgOptions_note_active");
  todoListGroup.classList.remove(isBgOption[0]);
};

// function to auto close the note
const autoClose = (e: Event) => {
  if (
    !todoListAdds.contains(e.target as HTMLElement) &&
    !close_note.contains(e.target as HTMLElement)
  ) {
    removeClass();
    addToDo(e);
  }
};

//  event listener
window.addEventListener("click", () => {
  if (!todoListAdds.classList.contains("todo-adds")) {
    window.addEventListener("click", autoClose, true);
  } else {
    window.removeEventListener("click", autoClose, true);
  }
});

todoListNotationNote.addEventListener("click", () => {
  todoListGroup.classList.add("add-todo-action");
  todoListAdds.classList.add("todo-list-adds_active");
  todoListAdds.classList.remove("todo-adds");
  todoListNotationNote.classList.add("hidden");

  notationNoteInput.focus();
});

close_note.addEventListener("click", removeClass);

install_note.addEventListener("click", () => {
  install_note.classList.toggle("install-note_active");
  installNote = true;
  backgroundOptions.classList.add("h-options");
  bgOptions_note.classList.remove("bgOptions_note_active");
});

bgOption.forEach((item) => {
  item.addEventListener("click", () => {
    todoListGroup.classList.remove(isBgOption[0]);
    isBgOption.shift();
    todoListGroup.classList.add(item.classList[0]);
    isBgOption = [...isBgOption, item.classList[0]];
  });
});

bgOptions_note.addEventListener("click", () => {
  bgOptions_note.classList.toggle("bgOptions_note_active");
  backgroundOptions.classList.toggle("h-options");
});

//
