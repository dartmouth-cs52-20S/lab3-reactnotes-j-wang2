import React from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

class Note extends React.Component {
    constructor(props) {
        super(props);
        // this.onClick = this.props.onClicke(this);d
        console.log(props);
        this.state = {
            x: 0,
            y: 0,
            // zIndex: 0,
            isEditing: false,
        };
    }

    handleDeleteClick = () => {
        console.log('deleting');
        console.log(this.props.id);
        this.props.deleteNote(this.props.id);
    }

    handleEditClick = () => {
        console.log('editing');
        console.log(this.props.id);
        this.setState({ isEditing: true });
        // this.props.editNote(this.props.id);
    }

    handleSaveClick = () => {
        console.log('saving');
        // this.props.editNote(this.props.id, event.target.value);
        this.setState({ isEditing: false });
        console.log(this.props.note);
        // console.log(event.target.value);
    }

    // onEditChange = (event) => {
    //     // const newNote = Object.assign({}, this.state.notes, newNote);
    //     // this.setState({ this.props.note.content: event.target.value });
    //     this.props.editNote(this.props.id, event.target.value);
    //     console.log(event.target.value);
    // }


    onInputChange = (event) => {
        this.props.editNote(this.props.id, event.target.value);
        // this.setState({ content: event.target.value });
        console.log(event.target.value);
    }

    handleDrag = (e, ui) => {
        console.log('handlingdrag');
        const { x, y } = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          },
        });
    };


    renderNote() {
        if (this.state.isEditing) {
            return (
                // <div>editing!</div>
                <Draggable
                    handle=".class-of-note-mover-element"
                    onStart={this.handleStartDrag}
                    // onDrag={this.handleDrag}
                    onDrag={console.log('here')}
                    onStop={this.handleStopDrag}
                >
                    <div className="note">
                        <div className="top-bar flex-container">
                            <h1> title={this.props.note.title} </h1>
                            <FontAwesomeIcon onClick={this.handleSaveClick} icon={faSave} />
                            <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                            <input onChange={this.onInputChange} />
                        </div>
                        <p> positionX={this.state.x} positionY={this.state.y}</p>
                    </div>
                </Draggable>

            );
        } else {
            return (
                <Draggable>
                    <div className="note">
                        <div className="top-bar flex-container">
                            <h1> {this.props.note.title} </h1>
                            <FontAwesomeIcon onClick={this.handleEditClick} icon={faEdit} />
                            <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                        </div>
                        <p> content={this.props.note.content} </p>
                        <p> positionX={this.state.x} positionY={this.state.y}</p>
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
