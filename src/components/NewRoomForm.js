import React, { Component } from 'react';

class NewRoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: ""
        }

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    handleChange(event) {
        this.setState({roomName: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        const newRoomName = this.state.roomName;
        this.roomsRef.push({
            name: newRoomName
        });
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    Room Name:
                    <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                </label>
                <button type="submit">Create Room</button>
            </form>
        );
    }
}

export default NewRoomForm;
