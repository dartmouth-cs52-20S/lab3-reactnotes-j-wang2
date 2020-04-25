import React from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import marked from 'marked';

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

    // handleDrag = (e, ui) => {
    //     console.log('handlingdrag');
    //     const { x, y } = this.state.deltaPosition;
    //     this.setState({
    //       deltaPosition: {
    //         x: x + ui.deltaX,
    //         y: y + ui.deltaY,
    //       },
    //     });
    // };

    // handleDrag = (e, data) => {
    //     console.log('heree');
    //         let x = prevState.x + data.deltaX,
    //         let y = prevState.y + data.deltaY,

    //     this.props.updateNoteXY(this.props.id, x, y);
    //     // console.log(`(${this.state.x}, ${this.state.y}) --- ${data.deltaX}, ${data.deltaY}`);
    // }

    handleDrag = (e, data) => {
        this.setState((prevState) => ({
            x: prevState.x + data.deltaX,
            y: prevState.y + data.deltaY,
        }));
        console.log(`(${this.state.x}, ${this.state.y}) --- ${data.deltaX}, ${data.deltaY}`);
    }

    renderNote() {
        if (this.state.isEditing) {
            return (
                // <div>editing!</div>
                <Draggable
                    // handle=".class-of-note-mover-element"
                    // onDrag={console.log('here')}
                    onDrag={this.handleDrag}
                >
                    <div className="note">
                        <div className="top-bar flex-container">
                            <h1>{this.props.note.title}</h1>
                            <FontAwesomeIcon onClick={this.handleSaveClick} icon={faSave} />
                            <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                        </div>
                        <input onChange={this.onInputChange} />
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
                        <p> {this.props.note.content} </p>
                        <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
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
