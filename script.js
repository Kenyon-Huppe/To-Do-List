
const listContainer = document.getElementById('input-area');
const form = document.getElementById('entry-form');

// keys
const LOCAL_STORAGE_LIST_KEY = 'task.list'
const LOCAL_STORAGE_ARRAY_KEY = 'task.array'

let dataList = document.getElementById('data-list');
let editButton = document.getElementById('edit-btn');

// ! may not need array?
let list = new Array();

form.addEventListener('submit', addEntry);

document.getElementById('clear-all').addEventListener('click', clearAll);

window.addEventListener('load', loadLocalStorage);


function addEntry(e) {
    // stops from submitting to page
    e.preventDefault();


    // ! grabs list from local storage & stores in current variable
    // let tempVar = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    // for (let i in tempVar) {
    //     list.push(tempVar[i]);
    // }

    list = loadLocalStorage(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));

    console.log(list + "here");
    // grabs entered value
    let entryValue = document.getElementById('entry-value').value;

    // checks if nothing is entered
    if (entryValue == null || entryValue === '') {
        return;
    }

    // add entryValue to end of array
    list.push(entryValue);
    console.log(list);

    dataList.innerHTML += `<li id="${list.length}"><span class="bubble">&#9711</span>${list[(list.length - 1)]}<button class="edit-btn" id="-${list.length}">Edit</button></li>`;

    let output = dataList.innerHTML;
    // saves output at end of each added entry
    save(output, list);

    // resets textbox for new entry
    document.getElementById('entry-value').value = '';
    console.log(output);
}

// todo 
dataList.addEventListener('click', editEntry);

function editEntry(e) {
    // disallows multiple entries from being selected for edit
    console.log('this');
    list = loadLocalStorage(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY));
    // grabs given element id
    let selectedEntryId = '';
    // makes sure it's correct tag
    if (e.target.tagName.toLowerCase() === 'button') {
        selectedButtonId = e.target.getAttribute('id');
        console.log(selectedButtonId);

        // allows user to click in dataList area without interuption of event listener
        dataList.removeEventListener('click', editEntry);

        // the button value is negative version while entry value is positive version. To get entry, must make id positive version of itself
        let selectedEntryId = (selectedButtonId * -1);

        let editValue = document.getElementById(selectedEntryId);

        console.log(list[(selectedEntryId - 1)]);
        // changes to textbox where user can enter new edit
        editValue.innerHTML = `<form action="" class="form" id="entry-form">
        <button class="btn" id="entry-btn" type="submit"><i
                class="fas fa-solid fa-plus"></i></button>
        <input type="text" id="entry-value" placeholder="Enter To-Do Item">`

        // grabs new edit
        document.getElementById(selectedEntryId).addEventListener('submit', () => {
            e.preventDefault();
            // grabs entered value
            let entryValue = document.getElementById('entry-value').value;
            // if enmpy value is submitted
            if (entryValue == null || entryValue === '') {
                // turns back on event listener
                dataList.addEventListener('click', editEntry);
                // reloads entry item
                editValue.innerHTML = `<li id="${selectedEntryId}"><span class="bubble">&#9711</span>${list[(selectedEntryId - 1)]}<button class="edit-btn" id="-${list.length}">Edit</button></li>`;
                return;
            }

            // todo automatically have cursor in textbox

            // todo look into setting html to a variable

            list[(selectedEntryId - 1)] = entryValue;
            console.log('select' + selectedEntryId);
            let output = '';

            for (let i in list) {
                output += `<li id="${list[i]}"><span class="bubble">&#9711</span>${list[i]}<button class="edit-btn" id="-${list[i]}">Edit</button></li>`;
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
    } else {
        console.log('it is because of that');
    }



    /*
        todo if user clicks on entry (all have same class name with even listener), then go into editEntry funciton
 
        todo *** make the edit button a type submit, then grab id ***
 
 
        todo run through array that goes through all id's 
    */

    // todo use id to select numbers
}

// todo 
function deleteEntry() {
    // todo use removeItem() to remove from local storage
}

// clears all to-do items
function clearAll(output, list) {

    dataList.innerHTML = '';
    output = '';
    localStorage.clear();
    // allows to use edit feature without issues
    window.location.reload(true);
}

// saves to local storage
function save(output, list) {
    // saves dataList HTML info
    // !
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, output);
    // saves list
    console.log(output);

    localStorage.setItem(LOCAL_STORAGE_ARRAY_KEY, JSON.stringify(list));
}
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