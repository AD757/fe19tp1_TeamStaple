// ********* POPUP ********* //
const popupClose = document.querySelectorAll('.btnClose');
const popup = document.querySelector('.popup_wrapper');
const app = document.querySelector('.app');

popupClose.forEach((btn) => {
    btn.addEventListener('click', () => {
        popup.style.display = "none";
    app.classList.remove('blur');
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