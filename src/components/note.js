import React from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Note extends React.Component {
    constructor(props) {
        super(props);
        // this.onClick = this.props.onClicke(this);d
        console.log(props);
        this.state = {
            // title: '',
            // text: '',
            x: 0,
            y: 0,
            // zIndex: 0,
        };
    }

    handleDeleteClick = () => {
        console.log('deleting');
        console.log(this.props.id);
        this.props.deleteNote(this.props.id);
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

    render() {
        console.log('rendering');
        console.log(this.props.id);
        return (
            <Draggable
                handle="note"
                grid={[25, 25]}
                defaultPosition={{ x: 20, y: 20 }}
                position={{
                    x: this.state.x, y: this.state.y, width: 40, height: 40,
                }}
                onStart={this.handleStartDrag}
                onDrag={this.handleDrag}
                // onDrag={console.log('fuck me')}
                onStop={this.handleStopDrag}
            >
                <div className="note">
                    <h1> here we are!</h1>
                    <h1> id={this.props.id} </h1>
                    <h1> title={this.props.note.title} </h1>

                    <FontAwesomeIcon onClick={this.handleDeleteClick} icon={faTrash} />
                    <p> content={this.props.note.content} </p>
                    <p>positionX={this.state.x} positionY={this.state.y}</p>
                </div>
            </Draggable>
        );
    }
}

export default Note;
