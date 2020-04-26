import React from 'react';
import ReactDOM from 'react-dom';
import { Map as iMap } from 'immutable';
import './style.scss';

// import marked from 'marked';
import Note from './components/note';
import AddNoteBtn from './components/addNote';
// import * as db from './services/datastore';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // eslint-disable-next-line react/no-unused-state
            notes: iMap(),
        };
        this.renderNoteMap = this.renderNoteMap.bind(this);
    }

    // componentDidMount() {
    //     db.fetchNotes((notes) => {
    //         this.setState({ notes: iMap(notes) });
    //     });
    // }

    addNote = (newTitle) => {
        // code to get random color for a new note
        // https://www.geeksforgeeks.org/how-to-pick-a-random-color-from-an-array-using-css-and-javascript/
        const noteColors = [
            '#ff0000', '#00ff00', '#0000ff',
            '#ff3333', '#ffff00', '#ff6600',
        ];
        const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];

        console.log(newTitle);
        const id = this.state.notes.size + 1;
        const note = { title: newTitle, content: '', color: randomColor };
        this.setState((prevState) => ({
            notes: prevState.notes.set(id, note),
        }));
    }

    // note the parens which are shorthand for return
    deleteNote = (id) => {
        console.log(id);
        console.log(`id: ${id}`);
        console.log('in deleteNote');
        this.setState((prevState) => ({
            notes: prevState.notes.delete(id),
        }));
    }

    editNote = (id, newContent) => {
        this.setState((prevState) => ({
            notes: prevState.notes.update(id, (n) => {
                // eslint-disable-next-line prefer-object-spread
                return Object.assign({}, n, { content: newContent });
            }),
        }));
    }

    updateNoteXY = (id, x, y) => {
        this.setState((prevState) => ({
            notes: prevState.notes.update(id, (n) => {
                // eslint-disable-next-line prefer-object-spread
                return Object.assign({}, n, { xVal: x, yVal: y });
            }),
        }));
    }

    renderNoteMap = (notes) => {
        console.log(notes.toJSON());
        return (notes.entrySeq().map(([id, note]) => {
            return <Note editNote={this.editNote} deleteNote={this.deleteNote} updateNoteXY={this.updateNoteXY} key={id} id={id} note={note} />;
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
