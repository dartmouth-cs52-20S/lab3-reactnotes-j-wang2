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
        this.setState({ isEditing: true });
    }

    handleSaveClick = () => {
        console.log('saving');
        this.setState({ isEditing: false });
    }

    onInputChange = (event) => {
        this.props.editNote(this.props.id, event.target.value);
        console.log(event.target.value);
    }

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
                <Draggable onDrag={this.handleDrag}>
                    <div className="note">
                        <div className="top-bar flex-container">
                            <h1>{this.props.note.title}</h1>
                            <FontAwesomeIcon onClick={this.handleSaveClick} icon={faSave} />
                            <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                        </div>
                        <textarea value={this.props.note.content} onChange={this.onInputChange} />
                        <p> positionX={this.state.x} positionY={this.state.y}</p>
                    </div>
                </Draggable>

            );
        } else {
            return (
                <Draggable grid={[5, 5]} onDrag={this.handleDrag}>
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
