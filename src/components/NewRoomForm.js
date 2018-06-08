import React, { Component } from 'react';

class NewRoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "My Room"
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
        this.setState({roomName: ""});
        this.props.closeModal();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Create New Room?</h2>
                <div className="ui input">
                    <input type="text" value={this.state.roomName} onChange={(e) => this.handleChange(e)} />
                </div>
                <button className="ui button primary" type="submit">Create Room</button>
            </form>
        );
    }
}

export default NewRoomForm;
