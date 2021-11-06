
const listContainer = document.getElementById('input-area');
const form = document.getElementById('entry-form');

// keys
const LOCAL_STORAGE_LIST_KEY = 'task.list'
const LOCAL_STORAGE_ARRAY_KEY = 'task.array'

let dataList = document.getElementById('data-list');
let editButton = document.getElementById('edit-btn');

let list = new Array();
// add
form.addEventListener('submit', addEntry);
// edit (+ delete)
dataList.addEventListener('click', editEntry);
// clear all
document.getElementById('clear-all').addEventListener('click', clearAll);
// load
window.addEventListener('load', loadLocalStorage);

// * ADD ENTRY
function addEntry(e) {
    // stops from submitting to page
    e.preventDefault();

    list = loadLocalStorage(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    // grabs entered value
    let entryValue = document.getElementById('entry-value').value;

    // disallows user from entering more than 10 values
    if (list.length === 10) {
        alert('Error: Max entry limit reached.')
        return;
    }
    // checks if nothing is entered
    if (entryValue == null || entryValue === '' || entryValue.trim().length === 0) {
        // resets textbox so as to not leave any
        document.getElementById('input-area').innerHTML = `<form action="" class="form" id="entry-form">
        <button class="btn" id="entry-btn" type="submit"><i class="fas fa-solid fa-plus"></i></button>
        <input type="text" id="entry-value" placeholder="Enter To-Do Item">`;

        return;
    }
    // add entryValue to end of array
    list.push(entryValue.trim());

    dataList.innerHTML += `<li id="${list.length - 1}"><span class="bubble">&#9711</span>${list[(list.length - 1)]}<button class="edit-btn" id="e${list.length - 1}">Edit</button><button class="delete-btn" id="d${list.length - 1}">Delete</button></li>`;

    let output = dataList.innerHTML;
    // saves output at end of each added entry
    save(output, list);

    // resets textbox for new entry
    document.getElementById('entry-value').value = '';
    if (list.length === 10) {
        document.getElementById('entry-value').style.display = "none";
        document.getElementById('entry-btn').style.display = "none";
    }
}

// * EDIT ENTRY
function editEntry(e) {
    list = loadLocalStorage(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));

    let selectedButtonId = null;
    let selectedEntryId = null;
    // edit button was selected
    if (e.target.className.toLowerCase() === 'edit-btn') {
        selectedButtonId = e.target.getAttribute('id');

        // allows user to click in dataList area without interuption of event listener
        dataList.removeEventListener('click', editEntry);

        // cuts off first letter (e) to convert to entry id
        let selectedEntryId = selectedButtonId.substring(1);

        let editValue = document.getElementById(selectedEntryId);
        // changes to textbox where user can enter new edit
        editValue.innerHTML = `<form action="" class="form" id="entry-form">
        <button class="btn" id="entry-btn" type="submit"><i class="fas fa-solid fa-plus"></i></button>
        <input type="text" id="entry-value" placeholder="Enter To-Do Item">`
        // sets cursor in textbox after clicking 'edit' btn
        document.getElementById('entry-value').focus();
        document.getElementById('entry-value').select();
        // grabs new edit
        document.getElementById(selectedEntryId).addEventListener('submit', () => {
            e.preventDefault();
            // grabs entered value
            let entryValue = document.getElementById('entry-value').value;
            // if enmpy value is submitted
            if (entryValue == null || entryValue === '' || entryValue.trim().length === 0) {
                // turns back on event listener
                dataList.addEventListener('click', editEntry);
                // reloads entry item
                editValue.innerHTML = `<li id="${selectedEntryId}"><span class="bubble">&#9711</span>${list[selectedEntryId]}<button class="edit-btn" id="e${selectedEntryId}">Edit</button><button class="delete-btn" id="d${selectedEntryId}">Delete</button></li>`;
                return;
            }

            list[(selectedEntryId)] = entryValue;
            let output = '';
            selectedEntryId = null;
            for (let i in list) {
                output += `<li id="${i}"><span class="bubble">&#9711</span>${list[i]}<button class="edit-btn" id="e${i}">Edit</button><button class="delete-btn" id="d${i}">Delete</button></li>`;
                // if(i === (selectedEntryId - 1){}
            }
            save(output, list);
            // re-activates event listener
            dataList.addEventListener('click', editEntry);
            loadLocalStorage();
            if (list.length === 10) {
                document.getElementById('entry-value').style.display = "none";
                document.getElementById('entry-btn').style.display = "none";
            }
        })
    } else if (e.target.className.toLowerCase() === 'delete-btn') {
        // delete btn was selected
        selectedButtonId = e.target.getAttribute('id');
        deleteEntry(selectedButtonId);
    } else {
        return;
    }
}

// * DELETE ENTRY
function deleteEntry(selectedButtonId) {
    list = loadLocalStorage(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));

    // cuts off first letter (d) to convert to entry id
    let selectedEntryId = selectedButtonId.substring(1);
    let output = '';
    list.splice(selectedEntryId, 1);

    for (let i in list) {
        output += `<li id="${i}"><span class="bubble">&#9711</span>${list[i]}<button class="edit-btn" id="e${i}">Edit</button><button class="delete-btn" id="d${i}">Delete</button></li>`;
    }

    save(output, list);

    loadLocalStorage();
    if (list.length === 10) {
        document.getElementById('entry-value').style.display = "none";
        document.getElementById('entry-btn').style.display = "none";
    } else {
        document.getElementById('entry-value').style.display = "block";
        document.getElementById('entry-btn').style.display = "block";
    }
}

// * CLEAR ALL
// clears all to-do items
function clearAll(output, list) {
    dataList.innerHTML = '';
    output = '';
    localStorage.clear();
    // allows to use edit feature without issues
    window.location.reload(true);
}

// * SAVE
// saves to local storage
function save(output, list) {
    // saves dataList HTML info
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, output);
    // saves list
    localStorage.setItem(LOCAL_STORAGE_ARRAY_KEY, JSON.stringify(list));
}

// * LOAD LOCAL STORAGE
// retrieves stored data & displays to web page
function loadLocalStorage() {
    dataList.innerHTML = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);
    let tempVar = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    let newList = new Array();
    for (let i in tempVar) {
        newList.push(tempVar[i]);
    }

    return newList;
}