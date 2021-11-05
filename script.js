
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
// edit
dataList.addEventListener('click', editEntry);
// !delete
// !dataList.addEventListener('click', deleteEntry);
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
    console.log(list);

    dataList.innerHTML += `<li id="${list.length - 1}"><span class="bubble">&#9711</span>${list[(list.length - 1)]}<button class="edit-btn" id="e${list.length - 1}">Edit</button><button class="delete-btn" id="d${list.length - 1}">Delete</button></li>`;

    let output = dataList.innerHTML;
    // saves output at end of each added entry
    save(output, list);

    // resets textbox for new entry
    document.getElementById('entry-value').value = '';
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

        console.log(list[(selectedEntryId)]);
        console.log(selectedEntryId);
        console.log(list);
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
            console.log('editValue part ' + selectedEntryId);
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

            // todo account for user entering spaces


            list[(selectedEntryId)] = entryValue;
            console.log('select' + selectedEntryId);
            let output = '';

            selectedEntryId = null;

            for (let i in list) {
                output += `<li id="${i}"><span class="bubble">&#9711</span>${list[i]}<button class="edit-btn" id="e${i}">Edit</button><button class="delete-btn" id="d${i}">Delete</button></li>`;
                // if(i === (selectedEntryId - 1){}
                console.log(list[i]);
            }

            // dataList.innerHTML = output;
            save(output, list);

            //// returns to list entry
            // editValue.innerHTML = `<li id="${selectedEntryId}"><span class="bubble">&#9711</span>${entryValue}<button class="edit-btn" id="-${list.length}">Edit</button></li>`;

            // re-activates event listener
            dataList.addEventListener('click', editEntry);
        })
    } else if (e.target.className.toLowerCase() === 'delete-btn') {
        // delete btn was selected
        selectedButtonId = e.target.getAttribute('id');
        deleteEntry(selectedButtonId);
    } else {
        // ? cross off
        return;
    }



    /*
        todo if user clicks on entry (all have same class name with even listener), then go into editEntry funciton
 
        todo *** make the edit button a type submit, then grab id ***
 
 
        todo run through array that goes through all id's 
    */

    // todo use id to select numbers
}

// * DELETE ENTRY
// todo 
function deleteEntry(selectedButtonId) {
    console.log('delete running...');
    list = loadLocalStorage(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));

    // makes sure it's correct element

    // selectedButtonId = e.target.getAttribute('id');

    // cuts off first letter (d) to convert to entry id
    let selectedEntryId = selectedButtonId.substring(1);

    console.log('select id ' + selectedEntryId);
    let output = '';
    // let currentIndex = 0;
    // let newArray = new Array();
    // for (let i = 0; i < list.length; i++) {
    //     if (i === selectedEntryId) {
    //         i++;
    //         continue;
    //         console.log('inside' + i + 'current' + currentIndex + ' ' + newArray);
    //     }
    //     newArray[currentIndex] = list[i];
    //     currentIndex++;
    //     console.log(i + ' ' + newArray);
    // }
    list.splice(selectedEntryId, 1);
    console.log(list);

    // console.log('new array: ' + newArray);
    for (let i in list) {
        output += `<li id="${i}"><span class="bubble">&#9711</span>${list[i]}<button class="edit-btn" id="e${i}">Edit</button><button class="delete-btn" id="d${i}">Delete</button></li>`;
        console.log(list[i]);
    }
    save(output, list);
    loadLocalStorage();


    // dataList.innerHTML = output;

}
// todo use removeItem() to remove from local storage

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
    // !
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, output);
    // saves list
    console.log(output);

    localStorage.setItem(LOCAL_STORAGE_ARRAY_KEY, JSON.stringify(list));
}

// * LOAD LOCAL STORAGE
// retrieves stored data & displays to web page
function loadLocalStorage() {
    dataList.innerHTML = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);

    // !
    let tempVar = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    let newList = new Array();
    for (let i in tempVar) {
        newList.push(tempVar[i]);
    }
    console.log('output' + localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    console.log('array' + localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    return newList;
}
/*
    PLAN


        todo change + to 'ADD' (in green box)

        todo user selects given entry & edit (orange) / delete (red) options appear to right

            todo edit: allows user to type in text area & click add (same as adding but stays in same place)

            todo delete: deletes entry

        todo clicking circle to the left, task is crossed out

        todo add a 'Clear All' option at the top which resets

        todo save changes in browser
*/