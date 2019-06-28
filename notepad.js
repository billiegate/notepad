// Add your javascript here

let folder = document.getElementById('folder');
let add_note = document.getElementById('note');
let create = document.getElementById('create');
let notes = [];
let edit_mode = false;
let edit_index = 0;

const showEdit = () => {
    let text = document.getElementById('text');
    text.value = '';
    setTimeout( () => {
        text.focus();
    }, 0);
    
    //hide all notes
    [].forEach.call(document.querySelectorAll('.notes'),function(e){
      e.style.display = 'none';
    });
    
    add_note.style.display = 'block';
    create.style.display = 'none';
}

const hideEdit = () => {
    add_note.style.display = 'none';
    create.style.display = 'block';
    
    //show all notes
    //hide all notes
    [].forEach.call(document.querySelectorAll('.notes'),function(e){
      e.style.display = 'block';
    });
}

const createNoteNode = val => { 
    let note = document.createElement('div');
    note.className = 'notes';
    //create text
    let text = document.createElement('p');
    text.className = 'text';
    text.innerHTML = val;
    //add text to note
    note.appendChild(text);
    //create options
    let options = document.createElement('div');
    options.className = 'options';
    //create buttons
    let edit = document.createElement('button');
    let _delete = document.createElement('button');
    edit.className = 'edit';
    _delete.className = 'delete';
    edit.innerHTML = 'edit';
    _delete.innerHTML = 'delete';
    initEdit(edit);
    initDelete(_delete);
    //add buttons to options
    options.appendChild(edit);
    options.appendChild(_delete);
    //add options to note
    note.appendChild(options);
    
    return note;
}

const updateFolder = () => {
    [].forEach.call(document.querySelectorAll('.notes'),function(e){
      e.parentNode.removeChild(e);
    });
    notes.forEach( v => {
        if(v && v.trim() != ''){
            let note_node = createNoteNode(v);
            folder.insertBefore(note_node, add_note);
        }
    });
    hideEdit();
}

const addNote = () => {
    let text = document.getElementById('text').value;
    if(edit_mode) {
        if(text.trim() != ''){
            notes[edit_index] = text;
        }
    } else {
        notes.push(text);
    }
    
    updateFolder();
    edit_mode = false;
}

const initEdit = (node) => {
    node.onclick = (e) => { 
        showEdit() ;
        edit_mode = true;
        let _notes = document.getElementsByClassName('notes');
        edit_index = [..._notes].indexOf(e.srcElement.parentElement.parentElement);
        document.getElementById('text').value = notes[edit_index];
        //delete notes[index];
        e.srcElement.parentElement.parentElement.remove();
    };
}

const initDelete = (node) => {
    // init click event of the node passed
    node.onclick = (e) => { 
        let notes = document.getElementsByClassName('notes');
        let index = [...notes].indexOf(e.srcElement.parentElement.parentElement);
        console.log(index);
        console.log(delete notes[index]);
        console.log(notes);
        updateFolder();
    };
}