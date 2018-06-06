import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on("child_added", snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) });
        });
    }

    formatDate(unixDate) {
        const date = new Date(unixDate);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = "AM";
        if(hours > 12) {
            ampm = "PM";
            hours -= 12;
            if(hours < 10) {
                hours = "0" + hours;
            }
        }
        if(minutes < 10) {
            minutes = "0" + minutes;
        }

        return hours + ":" + minutes + " " + ampm;
    }

    render() {
        return (
            <div className="MessageList">
                <h1>{this.props.activeRoom.name}</h1>
                {
                    this.state.messages.map((message, index) => {
                        if(message.roomId === this.props.activeRoom.key) {
                            return (
                                <div className="message" key={index}>
                                    <span className="message-username">{message.username}</span>
                                    <span className="message-content">{message.content}</span>
                                    <span className="message-timestamp">{this.formatDate(message.sentAt)}</span>
                                </div>
                            )
                        }
                        return "";
                    })
                }
            </div>
        );
    }
}

export default MessageList;
