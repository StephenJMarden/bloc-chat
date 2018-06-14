import React, { Component } from 'react';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const newMessage = this.state.message.trim();
        if(newMessage === "") {
            this.setState({message: ""}); //clears textbox in case user submitted only whitespace
            return;
        }
        const roomId = this.props.activeRoom.key;
        const sentAt = Date.now();
        const username = this.props.activeUser ? this.props.activeUser.displayName : "Guest";
        this.messagesRef.push({
            content: newMessage,
            roomId: roomId,
            sentAt: sentAt,
            username: username
        });
        this.setState({message: ""});
    }

    render() {
        if(this.props.activeRoom.key) {
            return (
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="ui fluid action input">
                        <input type="text" value={this.state.message} onChange={(e) => this.handleChange(e)} />
                        <button className="ui button primary" type="submit">Send Message</button>
                    </div>
                </form>
            )
        }
        return null;
    }
}

export default ChatBox;
