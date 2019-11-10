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
const toolbar = document.querySelector('.toolbar');

btnBurger.addEventListener('click', () => {
    navList.classList.toggle('nav-list_show');
    toolbar.classList.toggle('toolbar_hide');
    btnNavTxt.forEach((txt) => {
        if (navList.classList.contains('nav-list_show')) {
            txt.style.display = 'block';
        } else {
            txt.style.display = 'none';
        }

    })
})

// ********* ADD TO FAVORITES ********* //
const notesList = document.querySelector('.notes_list');
const notesItems = [...notesList.children];
const btnStarred = document.querySelector('.btn-nav_starred');

// Mark an item as a Favorite
notesList.addEventListener('click', e => {
    if (e.target.classList.contains('notes_star')) {
        e.target.classList.toggle('notes_starred');
        if (!e.target.parentNode.parentNode.classList.contains('favorite')) {
            e.target.parentNode.parentNode.classList.add('favorite');
        } else {
            e.target.parentNode.parentNode.classList.remove('favorite');
        }
    }
});

// ********* SHOW OR HIDE FAVORITES ********* //
const emptyMsg = document.querySelector('.notes_empty-msg');

btnStarred.addEventListener('click', () => {

    const faves = notesItems.filter(item => item.classList.contains('favorite'));

    notesItems.filter(item => {
        if (!item.classList.contains('favorite')) {
            item.classList.toggle('hidden');
        }
    })

    if (faves.length == 0) {
        emptyMsg.classList.toggle('show');
    }

})

// ********* CREATE A NEW NOTE ********* //

const btnNewNote = document.querySelector('.btn-nav_new-note');

btnNewNote.addEventListener('click', () => {

});

// Create Note //



var noteList = {
    notes: [],
    addNote: function (noteTitle, noteText) {
        this.notes.push({
            title: noteTitle,
            date: new Date(Date.now()).toISOString().slice(0, 10),
            text: noteText,
            favorite: false,
            //id: Date.now(),

        });
    }
    // settings: {
    //     darkmode: false,
    //     theme: winter,

    // }
};

// Add note manually//

noteList.addNote('My note', 'hello this is my note');
noteList.addNote('My note2', 'hello this is my second note');

localStorage.setItem('noteList', JSON.stringify(noteList));
console.log(noteList.notes);
