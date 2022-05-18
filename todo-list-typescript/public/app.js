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
const addToDo = (e) => {
    e.preventDefault();
    if (titleNoteInput.value === "" && notationNoteInput.value === "") {
        return;
    }
    else {
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
const autoClose = (e) => {
    if (!todoListAdds.contains(e.target) &&
        !close_note.contains(e.target)) {
        removeClass();
        addToDo(e);
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
//
