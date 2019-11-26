// ********* POPUP ********* //
const popupClose = document.querySelectorAll(".btnClose");
const popup = document.querySelector(".popup_wrapper");
const app = document.querySelector(".app");

// Checking if the popup checkbox status is saved in LS //
let popupChecked = JSON.parse(localStorage.getItem("popupShown"));

// Hiding the popup if the popup hide-checkbox was checked //
if (popupChecked == true) {
  popup.style.display = "none";
  app.classList.remove("blur");
}

// Closing the popup and saving the checkbox status //
popupClose.forEach(btn => {
  btn.addEventListener("click", () => {
    popup.style.display = "none";
    app.classList.remove("blur");

    // ********* CHECKBOX ********* //
    let stopPopup = document.getElementById("hidePopup");
    if (stopPopup.checked == true || stopPopup.checked == "true") {
      console.log("checkbox checked");
      // Saving the checkbox status in LS
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

// ********* BURGER MENU ********* //
const btnBurger = document.querySelector(".nav_burger-menu");
const btnNavTxt = document.querySelectorAll(".btn-nav_text");
const navList = document.querySelector(".nav_list");
const toolbar = document.querySelector(".toolbar");

btnBurger.addEventListener("click", () => {
  navList.classList.toggle("nav-list_show");
  toolbar.classList.toggle("toolbar_hide");
  btnNavTxt.forEach(txt => {
    if (navList.classList.contains("nav-list_show")) {
      txt.style.display = "block";
    } else {
      txt.style.display = "none";
    }
  });
});

// ********* ADD TO FAVORITES ********* //
const notesList = document.querySelector(".notes_list");
const notesItems = [...notesList.children];
const btnStarred = document.querySelector(".btn-nav_starred");

const emptyMsg = document.querySelector(".notes_empty-msg");

function showEmptyMsg() {
  emptyMsg.classList.toggle("show");
}

// Mark an item as a Favorite
notesList.addEventListener("click", e => {
  if (e.target.classList.contains("notes_star")) {
    e.target.classList.toggle("notes_starred");
    if (!e.target.parentNode.parentNode.classList.contains("favorite")) {
      e.target.parentNode.parentNode.classList.add("favorite");
    } else {
      e.target.parentNode.parentNode.classList.remove("favorite");
    }
  }
});

// ********* SHOW OR HIDE FAVORITES ********* //

btnStarred.addEventListener("click", () => {
  const faves = notesItems.filter(item => item.classList.contains("favorite"));

  notesItems.filter(item => {
    if (!item.classList.contains("favorite")) {
      item.classList.toggle("hidden");
    }
  });

  if (faves.length == 0) {
    showEmptyMsg();
  }
});

// ********* QUILL ********* //
var toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
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

// ********* LOCAL STORAGE ********* //

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
}

loadNotes();

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

themeSelect.addEventListener("change", function() {
  applyTheme(this.value);
  console.log(this.value);
  localStorage.setItem("theme", this.value);
});

function applyTheme(theme) {
  themeStylesheet.setAttribute("href", "css/" + theme + ".css");
  themeSelect.value = theme;
}

// ********* DATES ********* //

const newDate = new Date();
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
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// ********* SHOW DATE IN EDITOR ********* //

noteDate.innerHTML = `
    ${weekDays[newDate.getDay()]}, ${
  months[newDate.getMonth()]
} ${newDate.getDate()}, ${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}
`;

// ********* FILL IN SIDEBAR NOTES ********* //

const sidebarNotes = (title, preview, month, date, id) => {
  // need id

  if (preview.length > 50) {
    preview = preview.substring(0, 50) + "...";
  }

  notesList.insertAdjacentHTML(
    "afterbegin",
    `
        <li class="notes_item">
        <button class="notes_item-delete" id=` +
      id +
      `></button>
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
};

myNotes.forEach(note => {
  if (!note.isDeleted == true) {
    // Check for deleted items
    sidebarNotes(note.title, note.preview, note.month, note.date, note.id);
  }
});

// ********* NOTE CONSTRUCTOR ********* //

class Note {
  constructor(
    title,
    text,
    preview,
    isStarred,
    isDeleted,
    id,
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

// ********* CREATE NEW NOTE ********* //

//New Note Button
const btnCreate = document.querySelector(".btn-nav_new-note");

//Save Button
const btnSave = document.querySelector(".quill_btn-save");
//Title
const quillTitle = document.querySelector(".quill_title");
//Text
const quillText = quill.container;

btnCreate.addEventListener("click", () => {
  quillTitle.value = "";
  quill.setText("");
});

//Oncklick event on Save button
btnSave.addEventListener("click", () => {
  //create references for the object values
  let title = quillTitle.value;
  //let text = quillText.textContent;
  let text = quill.getContents();
  let preview = quill.getText(0, 30);
  let isStarred = "false";
  let isDeleted = false;
  let id = Date.now();
  let year = newDate.getFullYear();
  let month = newDate.getMonth();
  let date = newDate.getDate();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();

  //create new Note Object
  const newNote = new Note(
    title,
    text,
    preview,
    isStarred,
    isDeleted,
    id,
    //date
    year,
    month,
    date,
    hours,
    minutes,
    seconds
  );

  if (newNote.title == "") {
    console.log("Enter a title");
    return;
  }

  sidebarNotes(
    newNote.title,
    newNote.preview,
    newNote.month,
    newNote.date,
    newNote.id
  );

  myNotes.push(newNote);

  saveNote();
});

// Delete Note

document.addEventListener("click", function() {
  let btnDelete = event.target;
  if (!btnDelete.classList.contains("notes_item-delete")) {
    return;
  }
  let notesItem = btnDelete.parentElement;
  notesItem.style.display = "none";
  noteDelete(btnDelete.id);
});

function noteDelete(noteid) {
  myNotes.forEach(note => {
    if (noteid == note.id) {
      note.isDeleted = true;
      saveNote(); // Save deleted status to local storage
    }
  });
}

// ***** QUILL toolbar, added print button ******

// appends the HTML
const span = document.querySelector(
  "body > main > section > section > div.ql-toolbar.ql-snow > span:nth-child(4)"
);
span.innerHTML += "<button>Print</button>";

// creates new class
const Btn = document.querySelectorAll("button");

Btn.forEach(b => {
  if (b.textContent.includes("Print")) {
    b.classList.add("print");
  }
});

// //PRINT FUNCTION

const printBtn = document
  .querySelector(".print")
  .addEventListener("click", function() {
    document.printBtn = window.print();
  });

// ********* CREATE A NEW NOTE ********* //

/*
class Note {
    constructor(title, text, isStarred, isDeleted, id, year, month, date, hours, minutes, seconds) {
        this.title = title
        this.text = text
        this.isStarred = isStarred
        this.isDeleted = isDeleted
        this.id = id
        //date
        this.year = year
        this.month = month
        this.date = date
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }
}

//All the notes Array
const notes = document.querySelectorAll('.notes_item');
const notesArr = [...document.querySelectorAll('.notes_item')];

console.log(notesArr);

// *** NOTES *** //

const btnSave = document.querySelector('.quill_btn-save');

//create reference for the Title input field
const inputTitle = document.querySelector('.quill_title').value;
//create a new quill key:value for Title and assign it to Title input value
quill.title = inputTitle;
const quillTitle = quill.title;
const quillText = quill.container.textContent;


btnSave.addEventListener('click', () => {

    console.log(inputTitle);

    let title = quillTitle;
    let text = quillText;
    let isStarred = 'false';
    let isDeleted = 'false';
    let id = Date.now();

    const newNote = new Note (
        title,
        text,
        isStarred,
        isDeleted,
        id,
    );

    if (newNote.title == '') {
        /* inputTitle.insertAdjacentHTML('afterend', `
            <p>*Enter title</p>
        `)
        return;
    }

    if (newNote.text.length > 30) {
        newNote.text = newNote.text.substring(0,50) + "...";
    }

    notesList.insertAdjacentHTML('afterbegin', `
        <li class="notes_item">
            <div class="notes_info">
                <div class="notes-date">
                <span class="notes_date-month">Oct</span>
                <span class="notes_date-day">14</span>
                </div>
                <i class="notes_star far fa-star"></i>
            </div>
            <div class="notes_content">
                <h3 class="notes_title">${newNote.title}</h3>
                <p class="notes_text">${newNote.text}</p>
            </div>
        </li>
    `);

    myNotes.push(newNote);

    notesArr.push(newNote);

    console.log(notesArr);

});

*/
