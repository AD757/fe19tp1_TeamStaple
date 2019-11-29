// ********* POPUP ********* //
const popupClose = document.querySelectorAll('.btnClose');
const popup = document.querySelector('.popup_wrapper');
const app = document.querySelector('.app');

// Checking if the popup checkbox status is saved in LS //
let popupChecked = JSON.parse(localStorage.getItem('popupShown'));

// Hiding the popup if the popup hide-checkbox was checked //
if (popupChecked == true) {
    popup.style.display = 'none';
    app.classList.remove('blur');
}

// Closing the popup and saving the checkbox status //
popupClose.forEach((btn) => {

    btn.addEventListener('click', () => {
        popup.style.display = "none";
        app.classList.remove('blur');

        // ********* CHECKBOX ********* //
        let stopPopup = document.getElementById("hidePopup");
        if (stopPopup.checked == true || stopPopup.checked == 'true') {
            console.log('checkbox checked');
            // Saving the checkbox status in LS
            localStorage.setItem('popupShown', 'true');
        }
    })
});

// ********* REOPEN POPUP ********* //
const openPopup = document.querySelector('.nav_about');

openPopup.addEventListener('click', () => {
    popup.style.display = "block";
    app.classList.add('blur');
})

// ********* EXPAND SIDEBAR MENU ********* //
const btnExpand = document.querySelector('.btn_expand');
const pageNav = document.querySelector('.page-nav');
const navText = document.querySelectorAll('.btn-nav_text');
const btnNav = document.querySelectorAll('.btn-nav');

btnExpand.addEventListener('click', () => {
    pageNav.classList.toggle('page-nav_open');

    if (pageNav.classList.contains('page-nav_open')) {
        btnExpand.innerHTML = '<i class="fas fa-angle-double-left"></i>';
        openPopup.style.display = 'block';
        btnNav.forEach((btn) => {
            btn.classList.add('btn-nav_open');
        })
        navText.forEach((text) => {
            text.style.display = 'block';
        })
    } else {
        btnExpand.innerHTML = '<i class="fas fa-angle-double-right"></i>';
        openPopup.style.display = 'none';
        btnNav.forEach((btn) => {
            btn.classList.remove('btn-nav_open');
        })
        navText.forEach((text) => {
            text.style.display = 'none';
        })
    }

})

// ********* BURGER MENU ********* //
const btnBurger = document.querySelector('.nav_burger-menu');
const btnNavTxt = document.querySelectorAll('.btn-nav_text');
const navList = document.querySelector('.nav_list');

const allNotes = document.querySelector('.notes');
const textEditor = document.querySelector('.main-content');

const mqMobile = window.matchMedia("(max-width: 576px)");
const mqTablet = window.matchMedia("(max-width: 780px)");

pageNav.addEventListener('click', e => {
let button = e.target.closest("button")
    /// *** SHOW ALL NOTES *** ///
    if (button.classList.contains('btn-nav_my-notes')) {

        if (mqMobile.matches) {
            navList.classList.toggle('nav-list_show');
            allNotes.classList.remove('hidden');
            textEditor.classList.remove('show');
            allNotes.classList.add('show');
            textEditor.classList.add('hidden');
        } else if (mqTablet.matches) {
            allNotes.classList.remove('hidden');
            allNotes.classList.toggle('show');
            textEditor.classList.add('show');
        }
    }

    /// *** CREATE A NEW NOTE *** ///
    if (button.classList.contains('btn-nav_new-note')) {
        if (mqMobile.matches) {
            navList.classList.toggle('nav-list_show');
            allNotes.classList.remove('show');
            textEditor.classList.remove('hidden');
            allNotes.classList.add('hidden');
            textEditor.classList.add('show');
        } else if (mqTablet.matches) {
            allNotes.classList.remove('show');
        }
    }
})

// ********* QUILL ********* //
var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [ 'link', 'image'],
  ];

 const quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow',
    placeholder: 'Type your note here...',
  });

// ***** QUILL toolbar, added print button ******
// appends the HTML
const quillToolbar = document.querySelector(".ql-toolbar.ql-snow");
console.log(quillToolbar);
quillToolbar.insertAdjacentHTML('beforeend', `
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
`);
// creates new class
const printBtn = document.querySelector(".btn_print");

// //PRINT FUNCTION
printBtn.addEventListener("click", function(e) {
    console.log(e.target);
    document.printBtn = window.print();
});

// ********* LOCAL STORAGE ********* //

//An empty Array to save New Notes Objects into
let myNotes = [];
let currentNote;

function saveNote() {

    localStorage.setItem('savedNotes', JSON.stringify(myNotes));

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

myNotes = myNotes.filter(note => note.title !== '' && note.preview !== '\n');

console.log(myNotes)


// TODO: refactor code below up till fill sidebarnotes to a function which accepts either a note object or just the ID
// ********* DATES ********* //

const newDate = new Date();
const noteDate = document.querySelector('.quill_date');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ********* SHOW DATE IN EDITOR ********* //

noteDate.innerHTML = `
    ${weekDays[newDate.getDay()]}, ${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}
`;

// ********* FILL IN SIDEBAR NOTES ********* //

const notesList = document.querySelector('.notes_list');

const sidebarNotes = (id, title, preview, month, date, isStarred, isSaved) => { // need id
console.log("id: " + id + " isStarred: " + isStarred);
console.log("id: " + id + " isSaved: " + isSaved);
    if (preview.length >= 50) {
        preview = preview.substring(0, 50) + "...";
    }

    if (isStarred) {
        console.log('this element is starred');
    }

    if (id == currentNote && isSaved && isStarred) {
        console.log("id: " + id + " isSaved: " + isSaved);

        const existingNote = document.getElementById(currentNote);
        existingNote.innerHTML = `
            <button class="notes_item-delete"></button>
            <div class="notes_info">
                <div class="notes-date">
                <span class="notes_date-month">` + months[month].substr(0, 3) + `</span>
                <span class="notes_date-day">` + date + `</span>
                </div>
                <i class="notes_star far fa-star notes_starred"></i>
            </div>
            <div class="notes_content">
                <h3 class="notes_title">` + title + `</h3>
                <p class="notes_text">` + preview + `</p>
            </div>
        `;
        existingNote.classList.add('favorite');

        return;

    } else if (id == currentNote && isSaved && !isStarred) {
        console.log("id: " + id + " isSaved: " + isSaved);

        const existingNote = document.getElementById(currentNote);
        existingNote.innerHTML = `
            <button class="notes_item-delete"></button>
            <div class="notes_info">
                <div class="notes-date">
                <span class="notes_date-month">` + months[month].substr(0, 3) + `</span>
                <span class="notes_date-day">` + date + `</span>
                </div>
                <i class="notes_star far fa-star"></i>
            </div>
            <div class="notes_content">
                <h3 class="notes_title">` + title + `</h3>
                <p class="notes_text">` + preview + `</p>
            </div>
        `;

        return;
    }
    else {
        notesList.insertAdjacentHTML('afterbegin', `
        <li class="notes_item" id=` + id + `>
        <button class="notes_item-delete"></button>
        <div class="notes_info">
            <div class="notes-date">
            <span class="notes_date-month">` + months[month].substr(0, 3) + `</span>
            <span class="notes_date-day">` + date + `</span>
            </div>
            <i class="notes_star far fa-star"></i>
        </div>
        <div class="notes_content">
            <h3 class="notes_title">` + title + `</h3>
            <p class="notes_text">` + preview + `</p>
        </div>
        </li>
    `);

    let newNote = document.getElementById(id);

    if (newNote) {
        newNote.addEventListener('click', (e) => {
            let clickedLI = e.target.closest('li');
            console.log(e.target);
    
            for (let i = 0; i < myNotes.length; i++) {
    
                if (clickedLI.id == myNotes[i].id ) {
    
                    quillTitle.value = myNotes[i].title;
                    quill.setContents(myNotes[i].text);
                    currentNote = myNotes[i].id;
                    console.log(currentNote);
    
                    myNotes[i].isSaved = true;
                }
    
            }
        })
    }

    }

    const iconStar = document.querySelector('.notes_star');

/*     if (isStarred) {

        myNotes.forEach(note => {
            if (note.isStarred) {
                console.log('Note' + note.isStarred);
                iconStar.classList.add('notes_starred');
            } else {
                iconStar.classList.remove('notes_starred');
            }

            saveNote();
        })
    } */

    

        /* notesList.insertAdjacentHTML('afterbegin', `
            <li class="notes_item favorite" id=` + id + `>
            <button class="notes_item-delete"></button>
            <div class="notes_info">
                <div class="notes-date">
                <span class="notes_date-month">` + months[month].substr(0, 3) + `</span>
                <span class="notes_date-day">` + date + `</span>
                </div>
                <i class="notes_star far fa-star notes_starred"></i>
            </div>
            <div class="notes_content">
                <h3 class="notes_title">` + title + `</h3>
                <p class="notes_text">` + preview + `</p>
            </div>
            </li>
        `);
    } else {
        notesList.insertAdjacentHTML('afterbegin', `
            <li class="notes_item" id=` + id + `>
            <button class="notes_item-delete"></button>
            <div class="notes_info">
                <div class="notes-date">
                <span class="notes_date-month">` + months[month].substr(0, 3) + `</span>
                <span class="notes_date-day">` + date + `</span>
                </div>
                <i class="notes_star far fa-star"></i>
            </div>
            <div class="notes_content">
                <h3 class="notes_title">` + title + `</h3>
                <p class="notes_text">` + preview + `</p>
            </div>
            </li>
        `); 
    }*/

}

myNotes.forEach(note => {

    if (!note.isDeleted == true) { // Check for deleted items
        sidebarNotes(note.id, note.title, note.preview, note.month, note.date, note.isStarred, note.isSaved);
    }

});


// ********* NOTE CONSTRUCTOR ********* //

class Note {
    constructor(id, title, text, preview, isStarred, isDeleted, isSaved, year, month, date, hours, minutes, seconds) {
        this.id = id
        this.title = title
        this.text = text // Delta, for quill use only
        this.preview = preview
        this.isStarred = isStarred
        this.isDeleted = isDeleted
        this.isSaved = isSaved
        //date
        this.year = year
        this.month = month
        this.date = date
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }
}

// ********* CREATE NEW NOTE ********* //

//New Note Button
const btnCreate = document.querySelector('.btn-nav_new-note');
//Save Button
const btnSave = document.querySelector('.action-btn_save');
//Title
const quillTitle = document.querySelector('.quill_title');
//Text
const quillText = quill.container;

//Oncklick event on NewNote button
btnCreate.addEventListener('click', () => {

    //create references for the object values
    let id = Date.now();
    let title = quillTitle.value;
    //let text = quillText.textContent;
    let text = quill.getContents();
    let preview = quill.getText(0, 50);
    let isStarred = false;
    let isDeleted = false;
    let isSaved = false;
    let oldDate = new Date(id);
    let year = oldDate.getFullYear();
    let month = oldDate.getMonth();
    let date = oldDate.getDate();
    let hours = oldDate.getHours();
    let minutes = oldDate.getMinutes();
    let seconds = oldDate.getSeconds();

    //create new Note Object
    const newNote = new Note (
        id,
        title,
        text,
        preview,
        isStarred,
        isDeleted,
        isSaved,
        //date
        year,
        month,
        date,
        hours,
        minutes,
        seconds,
    );

    quillTitle.value = '';
    quill.setText('');

    loadNotes();

    myNotes.push(newNote);

    saveNote();

    currentNote = newNote.id;

});

//Oncklick event on Save button
btnSave.addEventListener('click', () => {

    /* if (newNote.title == '') {
        console.log('Enter a title');
        return; 
    } */ 

    myNotes.forEach(note => {

        if (note.id == currentNote) {
            note.title = quillTitle.value;
            note.preview = quill.getText(0, 50);
            note.text = quill.getContents();
            //note.isSaved = true;
            year = newDate.getFullYear();
            month = newDate.getMonth();
            date = newDate.getDate();

            sidebarNotes(note.id, note.title, note.preview, note.month, note.date, note.isStarred, note.isSaved);
            saveNote();

        } 
        
    })

});

// ********* DELETE NOTE ********* //

document.addEventListener('click', function () {
    let btnDelete = event.target;
    if (!btnDelete.classList.contains('notes_item-delete')) {
        return;
    }
    let notesItem = btnDelete.closest('.notes_item');
    notesItem.style.display = 'none';
    noteDelete(notesItem.id);

});

function noteDelete(notesItemId) {
    myNotes.forEach(note => {
        if (notesItemId == note.id) {
            note.isDeleted = true;
            saveNote(); // Save deleted status to local storage
        }
    });
};

// ********* SHOW OR HIDE FAVORITES ********* //

const btnStarred = document.querySelector('.btn-nav_starred');

btnStarred.addEventListener('click', () => {

    let noteItems = [...notesList.children];

    let emptyMsg = document.querySelector('.notes_empty-msg');
    let favNoteItems = noteItems.filter(item => item.classList.contains('favorite'));
    noteItems.filter(item => {
        if (!item.classList.contains('favorite')) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    })

    if (favNoteItems.length == 0) {
        showEmptyMsg(emptyMsg);
    }

});

function showEmptyMsg(emptyMsg) {
    emptyMsg.classList.add('show');
}

// Star note with a specific ID
const starNote = (notesID) => {
    console.log("starNote ran with id: " + notesID)
    myNotes.forEach(note => {
        if (notesID == note.id) {
            note.isStarred = !note.isStarred;
            saveNote(); // Save starred status to local storage
        }
    });
}

// ********* SPECIFIC NOTE FUNCTIONALITY ********* //

notesListArr = [...notesList.children];

notesListArr.forEach(note => {
    note.addEventListener('click', (e) => {
        const clickedLi = e.target.closest('li');

        console.log(e.target);

        // Check if clicked item is the star
        if (e.target.classList.contains('notes_star')) {

            // Toggle a class that shows that the star was starred
            e.target.classList.toggle('notes_starred');

            // Add a new class '.favorite' to the LI element
            clickedLi.classList.toggle('favorite');

            // Run a function with ID as a parameter
            starNote(clickedLi.id);
        }

        // Autoclick the Show/Hide Favorites button
        if (notesList.classList.contains('favorite-notes')) {
            btnStarred.click();
        }

        for (let i = 0; i < myNotes.length; i++) {

            if (clickedLi.id == myNotes[i].id) {

                quillTitle.value = myNotes[i].title;
                quill.setContents(myNotes[i].text);
                currentNote = myNotes[i].id;
                console.log(currentNote);

                myNotes[i].isSaved = true;
                
            }
        }
    })
})

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

// *********** FLOATING ACTION MENU *********** //

const actionMenu = document.querySelector('.action-menu');
const actionBtns = document.querySelectorAll('.action-btn');

actionMenu.addEventListener('click', (e) => {

    if (e.target.classList.contains('action-btn_prime') || e.target.parentNode.classList.contains('action-btn_prime')) {
        actionBtns.forEach(btn => {
            btn.classList.toggle('action-btn_shown');
        })
    }
})

const notesUL = document.getElementById("ul").getElementsByTagName("li");

for (let i = 0; i < myNotes.length; i++) {

    //console.log(myNotes[i].isStarred);

    if(myNotes[i].isStarred) {
        //notesUL[i].classList.add('favorite')
    }

/*     if (!notesUL[i].classList.contains('favorite')) {
        console.log('true')
    } */
}

const createNote = () => {

}

const showNotes = () => {



}

const showStarred = () => {

}

const showDeleted = () => {

}

navList.addEventListener('click', (e) => {
    const btnCreate = e.target.closest('.btn-nav_new-note');
    const btnMyNotes = e.target.closest('.btn-nav_my-notes');
    const btnStarred = e.target.closest('.btn-nav_starred');
    const btnDeleted = e.target.closest('.btn-nav_deleted');
    
    if (btnCreate) {
        console.log('New Note')
        createNote();
    }

    if (btnMyNotes) {
        console.log('My Notes')
        showNotes();
    }

    if (btnStarred) {
        console.log('Favorite Notes')
        showStarred();
    }

    if (btnDeleted) {
        console.log('Deleted Notes')
        showDeleted();
    }
     
})