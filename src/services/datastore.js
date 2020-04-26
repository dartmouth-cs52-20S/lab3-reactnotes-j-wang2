import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBLZQzi3pIo6p8sEzTNOaevq6kGeMJ6SbE',
    authDomain: 'firenotes-1db2f.firebaseapp.com',
    databaseURL: 'https://firenotes-1db2f.firebaseio.com',
    projectId: 'firenotes-1db2f',
    storageBucket: 'firenotes-1db2f.appspot.com',
    messagingSenderId: '1017048621880',
    appId: '1:1017048621880:web:09b180b8534783392d57cd',
    measurementId: 'G-0DT25KX1F0',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();


export function fetchNotes(callback) {
    database.ref('notes').on('value', (snapshot) => {
        const newNoteState = snapshot.val();
        // do something with new note state
        callback(newNoteState);
    });
}

export function createNote(note) {
    database.ref('notes').push(note);
}

export function updateNote(id, note) {
    database.ref('notes').child(id).update(note);
}

export function deleteNote(id) {
    database.ref('notes').child(id).remove();
}
