import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class AddNoteBtn extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '' };
    }

    // eslint-disable-next-line class-methods-use-this
    onInputChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleClick = () => {
        console.log('clicked! Adding new note');
        this.props.addNote(this.state.title);
    }

    render() {
        return (
            <div className="flex-container" id="add-note">
                <input onChange={this.onInputChange} />
                <button id="create-note" className="flex-container" onClick={this.handleClick} type="button">
                    <FontAwesomeIcon id="transition-icon" onClick={this.handleSaveClick} icon={faPlus} />
                    <span>Create new note</span>
                </button>
            </div>
        );
    }
}

export default AddNoteBtn;
