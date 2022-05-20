"use strict";
//  array set to the backgroundOptions element
let isBgOption = [];
// array set to the todo list
let todo_list = [];
let installNote = false;
const defaultBG = "bg-default";
// DOM
const todoListGroup = document.querySelector(".todo-list-group");
const todoListAdds = document.querySelector(".todo-list-adds");
const todoListNotationNote = document.querySelector(".todo-list_notation-note");
const bgOption = document.querySelectorAll(".bg-option");
const backgroundOptions = document.querySelector(".background-options");
// input
const notationNoteInput = document.querySelector("#notation-note-input");
const titleNoteInput = document.querySelector("#title-note-input");
// button
const close_note = document.querySelector("#close_note");
const bgOptions_note = document.querySelector("#bgOptions_note");
const install_note = document.querySelector("#install_note");
// random Id
const randomId = () => Math.floor(Math.random() * (999 * 100) + 100);
const addToDo = (e, callback) => {
    e.preventDefault();
    if (titleNoteInput.value !== "" || notationNoteInput.value !== "") {
        const todo = {
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
    const noteItems = document.querySelector(".note-items");
    noteItems.innerHTML = "";
    todo_list.forEach((todo) => {
        const { id, title, notation, bg } = todo;
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
    const todoGroup = document.querySelectorAll(".todo-list-group__item");
    if (todo_list.length) {
        todoGroup.forEach((todo) => {
            todo.addEventListener("mouseenter", (e) => {
                const target = e.target;
                target.classList.add("todo-list-group__item_active");
            });
            todo.addEventListener("mouseover", (e) => {
                const target = e.target;
                target.classList.remove("todo-list-group__item_active");
            });
        });
    }
};
// delete Todo
const deleteTodo = () => {
    const deleteTodo = document.querySelectorAll(".delete-todo-list");
    deleteTodo.forEach((item) => {
        item.addEventListener("click", (e) => {
            var _a, _b;
            const target = e.target;
            const parent = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            const eleId = parent === null || parent === void 0 ? void 0 : parent.dataset.id;
            const data = todo_list.filter((item) => {
                const { id } = item;
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
const autoClose = (e) => {
    if (!todoListAdds.contains(e.target) &&
        !close_note.contains(e.target)) {
        addToDo(e, listTemplate);
        removeClass();
    }
};
//  event listener
window.addEventListener("click", () => {
    if (!todoListAdds.classList.contains("todo-adds")) {
        window.addEventListener("click", autoClose, true);
    }
    else {
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
