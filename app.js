// ********* POPUP ********* //

const popupClose = document.querySelectorAll(".btnClose");
const popup = document.querySelector(".popup_wrapper");
const app = document.querySelector(".app");

// Checks if the popup checkbox status is saved in LS //
let popupChecked = JSON.parse(localStorage.getItem("popupShown"));

// Hides the popup if the popup hide-checkbox was checked //
if (popupChecked == true) {
  popup.style.display = "none";
  app.classList.remove("blur");
}

// Closes the popup and saves the checkbox status //
popupClose.forEach(btn => {
  btn.addEventListener("click", () => {
    popup.style.display = "none";
    app.classList.remove("blur");

    // ********* CHECKBOX ********* //
    let stopPopup = document.getElementById("hidePopup");
    if (stopPopup.checked == true || stopPopup.checked == "true") {
      console.log("checkbox checked");
      // Saves the checkbox status in LS
      localStorage.setItem("popupShown", "true");
    }
  });
});

// ********* REOPEN POPUP ********* //

const openPopup = document.querySelector(".nav_about");

openPopup.addEventListener("click", () => {
  popup.style.display = "block";
  app.classList.add("blur");
});

// ********* EXPAND SIDEBAR MENU ********* //
const btnExpand = document.querySelector(".btn_expand");
const pageNav = document.querySelector(".page-nav");
const navText = document.querySelectorAll(".btn-nav_text");
const btnNav = document.querySelectorAll(".btn-nav");

btnExpand.addEventListener("click", () => {
  pageNav.classList.toggle("page-nav_open");

  if (pageNav.classList.contains("page-nav_open")) {
    btnExpand.innerHTML = '<i class="fas fa-angle-double-left"></i>';
    openPopup.style.display = "block";
    btnNav.forEach(btn => {
      btn.classList.add("btn-nav_open");
    });
    navText.forEach(text => {
      text.style.display = "block";
    });
  } else {
    btnExpand.innerHTML = '<i class="fas fa-angle-double-right"></i>';
    openPopup.style.display = "none";
    btnNav.forEach(btn => {
      btn.classList.remove("btn-nav_open");
    });
    navText.forEach(text => {
      text.style.display = "none";
    });
  }
});

// ********* QUILL ********* //

var toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"]
];

const quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions
  },
  theme: "snow",
  placeholder: "Type your note here..."
});

// ***** QULL ADD-ONs: THEMES and PRINT  ******

const quillToolbar = document.querySelector(".ql-toolbar.ql-snow");
quillToolbar.insertAdjacentHTML(
  "beforeend",
  `
<span class="ql-formats">
    <form id="themes">
        <select name="themeSelect" for="theme" id="themeSelect">
            <option value="style">Default Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="spring">Spring Theme</option>
            <option value="autumn">Autumn Theme</option>
        </select>
    </form>
</span>
<span class="ql-formats">
    <button><i class="btn_print fas fa-print"></i></button>
</span>
`
);

// ******** PRINT ********* //

const printBtn = document.querySelector(".btn_print");

printBtn.addEventListener("click", e => {
  console.log(e.target);
  document.printBtn = window.print();
});

// ******** LOAD THEMES ********* //

function loadTheme() {
  let t = localStorage.getItem("theme");
  console.log("loadtheme ran, theme: " + t);
  if (t === null) {
    t = "style";
  }
  return t;
}

applyTheme(loadTheme());

// *********** THEMES *********** //

themeSelect = document.getElementById("themeSelect");
themeStylesheet = document.getElementById("themeStylesheet");
themeSelect.addEventListener("change", function () {
  applyTheme(this.value);
  console.log(this.value);
  localStorage.setItem("theme", this.value);
});

function applyTheme(theme) {
  themeStylesheet.setAttribute("href", "css/" + theme + ".css");
  themeSelect.value = theme;
}

// ********* NOTE CONSTRUCTOR ********* //

class Note {
  constructor(
    id,
    title,
    text,
    preview,
    isStarred,
    isDeleted,
    year,
    month,
    date,
    hours,
    minutes,
    seconds
  ) {
    this.title = title;
    this.text = text; // Delta, for quill use only
    this.preview = preview;
    this.isStarred = isStarred;
    this.isDeleted = isDeleted;
    this.id = id;
    //date
    this.year = year;
    this.month = month;
    this.date = date;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}

// ********* LOCAL STORAGE for NOTES ********* //

//An empty Array to save New Notes Objects into
let myNotes = [];

function saveNote() {
  localStorage.setItem("savedNotes", JSON.stringify(myNotes));
}

function loadNotes() {
  myNotes = JSON.parse(localStorage.getItem("savedNotes"));

  if (myNotes === null) {
    myNotes = [];
  }

  return myNotes;
}

loadNotes();

// ********* HIDES EMPTY NOTES ********* //

myNotes = myNotes.filter(note => note.title !== "" && note.preview !== "\n");

// *********** GLOBAL VARIABLES *********** //

const navList = document.querySelector(".nav_list");
const sideBar = document.querySelector(".notes");
const textEditor = document.querySelector(".main-content");

const mqMobile = window.matchMedia("(max-width: 576px)");
const mqTablet = window.matchMedia("(max-width: 780px)");

const notesList = document.querySelector(".notes_list");
const noteElements = document.querySelectorAll(".notes_item");

const searchBar = document.forms["notes_search"].querySelector("input");

// ********* DATES ********* //

const noteDate = document.querySelector(".quill_date");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// *********** GET DATE FROM NOTE'S ID *********** //

const getDateById = id => {
  const newDate = new Date(id);
  return `
    ${weekDays[newDate.getDay()]}, ${
    months[newDate.getMonth()]
    } ${newDate.getDate()}, ${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}
`;
};

// Shows current date in Editor
noteDate.innerHTML = getDateById(Date.now());

// ********* CREATE NEW NOTE FUNCTION ********* //

//New Note Button
const btnCreate = document.querySelector(".btn-nav_new-note");
//Save Button
const btnSave = document.querySelector(".action-btn_save");
//Title
const quillTitle = document.querySelector(".quill_title");
//Text
const quillText = quill.container;
let currentNote;

// Create a New Note Function
const createNewNote = () => {
  //create references for the object values
  let id = Date.now();
  let title = quillTitle.value;
  let text = quill.getContents();
  let preview = quill.getText(0, 50);
  let isStarred = false;
  let isDeleted = false;
  let year;
  let month;
  let date;
  let hours;
  let minutes;
  let seconds;

  //create new Note Object
  const newNote = new Note(
    id,
    title,
    text,
    preview,
    isStarred,
    isDeleted,
    //date
    year,
    month,
    date,
    hours,
    minutes,
    seconds
  );

  currentNote = newNote.id;
  currentDate = new Date(currentNote);

  newNote.year = currentDate.getFullYear();
  newNote.month = currentDate.getMonth();
  newNote.date = currentDate.getDate();
  newNote.hours = currentDate.getHours();
  newNote.minutes = currentDate.getMinutes();
  newNote.seconds = currentDate.getSeconds();

  loadNotes();

  myNotes.push(newNote);

  saveNote();
};

// ********* NOTES LIST FUNCTIONS ********* //

// ********* FAVORITE NOTE ********* //

const starNote = id => {
  myNotes.forEach(note => {
    if (id == note.id) {
      note.isStarred = true;
      console.log(note.id + " is Starred " + note.isStarred);
      saveNote(); // Save starreded status to local storage
    }
  });
};

const unStarNote = id => {
  myNotes.forEach(note => {
    if (id == note.id) {
      note.isStarred = false;
      console.log(note.id + " is Starred " + note.isStarred);
      saveNote(); // Save starreded status to local storage
    }
  });
};

// ********* DELETE NOTE FUNCTION ********* //

const deleteNote = id => {
  myNotes.forEach(note => {
    if (id == note.id) {
      note.isDeleted = true;
      console.log(note.id + " is Deleted " + note.isDeleted);
      saveNote(); // Save deleted status to local storage
    }
  });
};

// ********* DELETE NOTE FUNCTION ********* //

const undoDeleteNote = id => {
  myNotes.forEach(note => {
    if (id == note.id) {
      note.isDeleted = false;
      console.log(note.id + " is Delete undone " + note.isDeleted);
      saveNote(); // Save undone deleted status to local storage
    }
  });
};

// ********* DISPLAY NOTE IN EDITOR FUNCTION ********* //

const displayNote = id => {
  myNotes.forEach(note => {
    if (id == note.id) {
      quillTitle.value = note.title;
      quill.setContents(note.text);
      noteDate.innerHTML = getDateById(note.id);
    }
  });
};

// ********* NOTES LIST CLICK EVENTS ********* //

notesList.addEventListener("click", e => {
  let clickedLI = e.target.closest("li").id;
  let activeNote = myNotes.find(note => note.id == clickedLI);

  // Check if the clicked area is a Delete button
  if (e.target.classList.contains("notes_item-delete")) {
    deleteNote(clickedLI);
    unStarNote(clickedLI);
    e.target.closest("li").classList.add("deleted");
    e.target.closest("li").classList.add("hidden");
  }

  if (e.target.classList.contains("notes_item-undo")) {
    undoDeleteNote(clickedLI);
    e.target.closest("li").classList.remove("deleted");
    e.target.closest("li").classList.add("hidden");
  }
  // Check if the clicked area is a Star button
  else if (e.target.classList.contains("notes_star")) {
    e.target.classList.toggle("notes_starred");
    e.target.closest("li").classList.toggle("favorite");
    if (activeNote.isStarred) {
      unStarNote(clickedLI);
    } else {
      starNote(clickedLI);
    }
    if (e.target.closest('.notes_list').classList.contains('notes_favorites-list')) {
      let btnStarred = document.querySelector('.btn-nav_starred');
      btnStarred.click();
    }
  }
  // Display the clicked note if none of the above is true
  else {
    activeNote = clickedLI;
    displayNote(clickedLI);
  }
});

// ********* SIDEBAR NOTES FUNCTION ********* //

const sidebarNotes = (
  id,
  title,
  preview,
  month,
  date,
  isStarred,
  isDeleted
) => {
  console.log("id: " + id + " isStarred: " + isStarred);

  if (preview.length >= 50) {
    preview = preview.substring(0, 50) + "...";
  }

  if (isStarred) {
    notesList.insertAdjacentHTML(
      "afterbegin",
      `
        <li class="notes_item favorite" id=` +
      id +
      `>
        <button class="notes_item-delete"></button>
        <button class="notes_item-undo"></button>
        <div class="notes_info">
            <div class="notes-date">
            <span class="notes_date-month">` +
      months[month].substr(0, 3) +
      `</span>
            <span class="notes_date-day">` +
      date +
      `</span>
            </div>
            <i class="notes_star far fa-star notes_starred"></i>
        </div>
        <div class="notes_content">
            <h3 class="notes_title">` +
      title +
      `</h3>
            <p class="notes_text">` +
      preview +
      `</p>
        </div>
        </li>
    `
    );
  } else if (isDeleted) {
    notesList.insertAdjacentHTML(
      "afterbegin",
      `
        <li class="notes_item deleted hidden" id=` +
      id +
      `>
        <button class="notes_item-delete"></button>
         <button class="notes_item-undo"></button>
        <div class="notes_info">
            <div class="notes-date">
            <span class="notes_date-month">` +
      months[month].substr(0, 3) +
      `</span>
            <span class="notes_date-day">` +
      date +
      `</span>
            </div>
            <i class="notes_star far fa-star"></i>
        </div>
        <div class="notes_content">
            <h3 class="notes_title">` +
      title +
      `</h3>
            <p class="notes_text">` +
      preview +
      `</p>
        </div>
        </li>
    `
    );
  } else {
    notesList.insertAdjacentHTML(
      "afterbegin",
      `
        <li class="notes_item" id=` +
      id +
      `>
        <button class="notes_item-delete"></button>
        <button class="notes_item-undo"></button>
        <div class="notes_info">
            <div class="notes-date">
            <span class="notes_date-month">` +
      months[month].substr(0, 3) +
      `</span>
            <span class="notes_date-day">` +
      date +
      `</span>
            </div>
            <i class="notes_star far fa-star"></i>
        </div>
        <div class="notes_content">
            <h3 class="notes_title">` +
      title +
      `</h3>
            <p class="notes_text">` +
      preview +
      `</p>
        </div>
        </li>
    `
    );
  }
};

myNotes.forEach(note => {
  sidebarNotes(
    note.id,
    note.title,
    note.preview,
    note.month,
    note.date,
    note.isStarred,
    note.isDeleted
  );
});

// *********** SEARCH MENU *********** //

const textSearch = note => {
  let ops = note.text.ops;
  for (let i = 0; i < ops.length; i++) {
    if (typeof ops[i].insert == "string") {
      if (ops[i].insert.toLowerCase().includes(searchString)) {
        return true;
      }
    }
  }
  return false;
};

searchBar.addEventListener("keyup", e => {
  searchString = document
    .querySelector("input#search_input")
    .value.toLowerCase();
  let notesToDisplay = myNotes.filter(textSearch);
  document.querySelector(".notes_list").innerHTML = "";

  notesToDisplay.forEach(note => {
    if (!note.isDeleted) {
      sidebarNotes(
        note.id,
        note.title,
        note.preview,
        note.month,
        note.date,
        note.isStarred,
        note.isDeleted
      );
    }
  });
});

// *********** NAV BAR BUTTONS *********** //

const toggleSideBar = () => {
  if (mqMobile.matches) {
    if (sideBar.classList.contains("show")) {
      sideBar.classList.remove("show");
      textEditor.classList.remove("hidden");
    } else {
      sideBar.classList.add("show");
      textEditor.classList.add("hidden");
    }
  }
};

navList.addEventListener("click", e => {
  if (document.querySelector('.notes_list').classList.contains('notes_favorites-list')) {
    document.querySelector('.notes_list').classList.remove('notes_favorites-list')
  }
  let button = e.target.closest("button");

  // Create a New Note button
  if (button.classList.contains("btn-nav_new-note")) {
    createNewNote();

    quillTitle.value = "";
    quill.setText("");

    quillTitle.focus();
    quillTitle.select();
  }
  // My Notes button
  else if (button.classList.contains("btn-nav_my-notes")) {
    let newNoteElements = document.querySelectorAll(".notes_item");
    newNoteElements.forEach(note => {
      if (note.classList.contains("deleted")) {
        note.classList.add("hidden");
      } else {
        note.classList.remove("hidden");
      }
    });
  }
  // Favorites button
  else if (button.classList.contains("btn-nav_starred")) {
    document.querySelector('.notes_list').classList.add('notes_favorites-list');
    let newNoteElements = document.querySelectorAll(".notes_item");
    newNoteElements.forEach(note => {
      if (note.classList.contains("favorite")) {
        note.classList.remove("hidden");
      } else {
        note.classList.add("hidden");
      }
    });
  }
  // Deleted Notes button
  else if (button.classList.contains("btn-nav_deleted")) {
    let newNoteElements = document.querySelectorAll(".notes_item");
    newNoteElements.forEach(note => {
      if (note.classList.contains("deleted")) {
        note.classList.remove("hidden");
      } else {
        note.classList.add("hidden");
      }
    });

    // myNotes.filter(note => {
    //   if (note.isDeleted) {
    //     sidebarNotes(
    //       note.id,
    //       note.title,
    //       note.preview,
    //       note.date,
    //       note.month,
    //       note.isStarred,
    //       note.isDeleted
    //     );
    //   }
    // });
  }
  toggleSideBar();
});

// *********** SAVE NOTE *********** //

//Oncklick event on Save button
btnSave.addEventListener("click", () => {
  // Save button alert
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your note has been saved",
    showConfirmButton: false,
    timer: 1000
  });

  myNotes.forEach(note => {
    if (note.id == currentNote) {
      note.title = quillTitle.value;
      note.preview = quill.getText(0, 50);
      note.text = quill.getContents();

      sidebarNotes(
        note.id,
        note.title,
        note.preview,
        note.month,
        note.date,
        note.isStarred,
        note.isDeleted
      );
      saveNote();
    }
  });
});
