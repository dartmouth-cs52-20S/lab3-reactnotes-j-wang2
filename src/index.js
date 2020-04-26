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
            // eslint-disable-next-line react/no-unused-state
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
        // const id = this.state.notes.size + 1;
        const note = {
            title: newTitle,
            content: '',
            x: 20,
            y: 20,
        };
        // this.setState((prevState) => ({
        //     notes: prevState.notes.set(id, note),
        // }));
        db.createNote(note);
    }

    // note the parens which are shorthand for return
    deleteNote = (id) => {
        // this.setState((prevState) => ({
        //     notes: prevState.notes.delete(id),
        // }));
        db.deleteNote(id);
    }

    // pass in note
    updateNote = (id, updatedNote) => {
        db.updateNote(id, updatedNote);
        // this.setState((prevState) => ({
        //     notes: prevState.notes.update(id, (n) => {
        //         // eslint-disable-next-line prefer-object-spread
        //         // return Object.assign({}, n, { content: newContent });
        //         // eslint-disable-next-line prefer-object-spread
        //         db.updateNote(id, Object.assign({}, n, { content: newContent }));
        //     }),
        // }));
    }

    // updateNoteXY = (id, xVal, yVal) => {
    //     this.setState((prevState) => ({
    //         notes: prevState.notes.update(id, (n) => {
    //             // eslint-disable-next-line prefer-object-spread
    //             return Object.assign({}, n, { x: xVal, y: yVal });
    //             db.updateNote(id, Object.assign({}, n, { content: newContent }));
    //         }),
    //     }));
    // }

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
