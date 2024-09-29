document.getElementById('add-note').addEventListener('click', function() {
    const noteInput = document.getElementById('note-input').value;
    const authorInput = document.getElementById('author-input').value;

    if (noteInput.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    const note = {
        content: noteInput,
        author: authorInput
    };

    addNoteToDOM(note);
    saveNoteToLocalStorage(note);

    // Clear input fields
    document.getElementById('note-input').value = '';
    document.getElementById('author-input').value = '';
});

function addNoteToDOM(note) {
    const notesContainer = document.getElementById('notes-container');
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const author = note.author ? `<div class="author">${note.author}</div>` : '';
    noteDiv.innerHTML = `
        <div class="note-header">
            <span class="remove-note">&times;</span>
        </div>
        <div>${note.content}</div>
        ${author}
    `;

    notesContainer.appendChild(noteDiv);

    // Add event listener to remove the note
    noteDiv.querySelector('.remove-note').addEventListener('click', function() {
        notesContainer.removeChild(noteDiv);
        removeNoteFromLocalStorage(note); // Optional: Remove from local storage as well
    });
}

function saveNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function removeNoteFromLocalStorage(note) {
    let notes = getNotesFromLocalStorage();
    notes = notes.filter(n => n.content !== note.content || n.author !== note.author);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotesFromLocalStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

function loadNotes() {
    const notes = getNotesFromLocalStorage();
    notes.forEach(addNoteToDOM);
}

// Load notes when the page is opened
window.onload = loadNotes;
