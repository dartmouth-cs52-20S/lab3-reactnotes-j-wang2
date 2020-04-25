import React, { Component } from 'react';

class AddNoteBtn extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '' };

        // add to the bottom of your constructor
        // this.onInputChange = this.onInputChange.bind(this);
        // this.props = this.props.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    onInputChange = (event) => {
        this.setState({ title: event.target.value });
        console.log(event.target.value);
    }

    handleClick = () => {
        this.props.addNote(this.state.title);
        console.log('clicked! Adding new note');
        // this.setState({ title: event.target.value });
        console.log(`heres my title ${this.state.title}`);
    }

    render() {
        return (
            <div className="flex-container" id="add-note">
                <input onChange={this.onInputChange} />
                <button onClick={this.handleClick} type="button">Create new note</button>
                <p> Title value: {this.state.title} </p>
            </div>
        );
    }
}

export default AddNoteBtn;
