
const listContainer = document.getElementById('input-area');
const form = document.getElementById('entry-form');

// keys
const LOCAL_STORAGE_LIST_KEY = 'task.list'
const LOCAL_STORAGE_ARRAY_KEY = 'task.array'

let dataList = document.getElementById('data-list');

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

    dataList.innerHTML += `<li id="${list.length}"><span class="bubble">&#9711</span>${entryValue}</li>`;

    let output = dataList.innerHTML;
    // saves output at end of each added entry
    save(output, list);

    // resets textbox for new entry
    document.getElementById('entry-value').value = '';
    console.log(output);
}

// todo 
function editEntry() {
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
}

// saves to local storage
function save(output, list) {
    // saves dataList HTML info
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, output);
    // saves list

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