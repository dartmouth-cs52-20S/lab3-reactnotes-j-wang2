import React from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import marked from 'marked';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
    }

    handleDeleteClick = () => {
        console.log('deleting note!');
        this.props.deleteNote(this.props.id);
    }

    handleEditClick = () => {
        this.setState({ isEditing: true });
    }

    handleSaveClick = () => {
        console.log('saving');
        this.setState({ isEditing: false });
    }

    onInputChange = (event) => {
        const updatedNote = { ...this.props.note };
        updatedNote.content = event.target.value;
        this.props.updateNote(this.props.id, updatedNote);
    }

    handleDrag = (e, data) => {
        const updatedNote = { ...this.props.note };
        const x = this.props.note.x + data.deltaX;
        const y = this.props.note.y + data.deltaY;
        updatedNote.x = x;
        updatedNote.y = y;
        this.props.updateNote(this.props.id, updatedNote);
    }

    renderNote() {
        if (this.state.isEditing) {
            return (
                <Draggable position={{ x: this.props.note.x, y: this.props.note.y }} onDrag={this.handleDrag}>
                    <div className="note">
                        <div className="top-bar flex-container">
                            <h1>{this.props.note.title}</h1>
                            <FontAwesomeIcon onClick={this.handleSaveClick} icon={faSave} />
                            <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                        </div>
                        <textarea value={this.props.note.content} onChange={this.onInputChange} />
                    </div>
                </Draggable>

            );
        } else {
            return (
                <Draggable grid={[5, 5]} position={{ x: this.props.note.x, y: this.props.note.y }} onDrag={this.handleDrag}>
                    <div className="note">
                        <div className="top-bar flex-container">
                            <h1> {this.props.note.title} </h1>
                            <FontAwesomeIcon onClick={this.handleEditClick} icon={faEdit} />
                            <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                        </div>
                        <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />
                    </div>
                </Draggable>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderNote()}
            </div>
        );
    }
}

export default Note;
