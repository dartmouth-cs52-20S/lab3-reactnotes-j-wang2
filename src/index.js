import React from 'react';
import ReactDOM from 'react-dom';
import { Map as iMap } from 'immutable';
import './style.scss';

// import marked from 'marked';
import Note from './components/note';
import AddNoteBtn from './components/addNote';
import * as db from './services/datastore';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: iMap(),
        };
        this.renderNoteMap = this.renderNoteMap.bind(this);
    }

    componentDidMount() {
        db.fetchNotes((notes) => {
            this.setState({ notes: iMap(notes) });
        });
    }

    addNote = (newTitle) => {
        const note = {
            title: newTitle,
            content: '',
            x: 20,
            y: 20,
        };
        db.createNote(note);
    }

    deleteNote = (id) => {
        db.deleteNote(id);
    }

    // pass in note
    updateNote = (id, updatedNote) => {
        db.updateNote(id, updatedNote);
    }

    renderNoteMap = (notes) => {
        return (notes.entrySeq().map(([id, note]) => {
            return <Note updateNote={this.updateNote} deleteNote={this.deleteNote} updateNoteXY={this.updateNoteXY} key={id} id={id} note={note} />;
        }));
    }

    render() {
        return (
            <div>
                <h1> sticky notes ! </h1>
                <AddNoteBtn addNote={this.addNote} />
                { this.renderNoteMap(this.state.notes) }
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('main'));
