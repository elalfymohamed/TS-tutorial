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

// random Id
const randomId = (): number => Math.floor(Math.random() * (999 * 100) + 100);

interface IAddToDo {
  id: number;
  title: string;
  notation: string;
  bg: string;
  install_note: boolean;
}

const addToDo = (e: Event, callback: () => void) => {
  e.preventDefault();

  if (titleNoteInput.value !== "" || notationNoteInput.value !== "") {
    const todo: IAddToDo = {
      id: randomId(),
      title: titleNoteInput.value,
      notation: notationNoteInput.value,
      bg: isBgOption[0] || defaultBG,
      install_note: installNote,
    };
    todo_list.push(todo);
    callback();
  }

  titleNoteInput.value = "";
  notationNoteInput.value = "";
};

const listTemplate = () => {
  const noteItems = document.querySelector(".note-items") as HTMLElement;
  noteItems.innerHTML = "";
  todo_list.forEach((todo) => {
    const { id, title, notation, bg } = todo as IAddToDo;
    const markup = `
    <div class="todo-list-group__item ${bg}" data-id=${id}>
    <div class="note">
    <div class="todo-list-group__item-title">
    <div class="delete-todo-list">delete</div>
    <span class="todo-list-group__item-title-text">${title}</span>
    </div>
    <div class="todo-list-group__item-notation">
      <span class="todo-list-group__item-notation-text">${notation}</span>
      </div>
    </div>
  </div>`;

    noteItems.innerHTML += markup;
    elementHover();
    deleteTodo();
  });
};

//
const elementHover = () => {
  const todoGroup = document.querySelectorAll(".todo-list-group__item")!;

  if (todo_list.length) {
    todoGroup.forEach((todo) => {
      todo.addEventListener("mouseenter", (e: Event) => {
        const target = e.target as HTMLElement;
        target.classList.add("todo-list-group__item_active");
      });
      todo.addEventListener("mouseover", (e: Event) => {
        const target = e.target as HTMLElement;
        target.classList.remove("todo-list-group__item_active");
      });
    });
  }
};

// delete Todo
const deleteTodo = () => {
  const deleteTodo = document.querySelectorAll(
    ".delete-todo-list"
  ) as NodeListOf<HTMLElement>;

  deleteTodo.forEach((item) => {
    item.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const parent = target.parentElement?.parentElement
        ?.parentElement as HTMLElement;
      const eleId = parent?.dataset.id as string;
      const data = todo_list.filter((item) => {
        const { id } = item as IAddToDo;
        return id !== +eleId;
      });
      todo_list = data;
      listTemplate();
    });
  });
};

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
  isBgOption = [];
  installNote = false;
};

// function to auto close the note
const autoClose = (e: Event) => {
  if (
    !todoListAdds.contains(e.target as HTMLElement) &&
    !close_note.contains(e.target as HTMLElement)
  ) {
    addToDo(e, listTemplate);
    removeClass();
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
