import React, { Component } from 'react';
import ChatBox from './ChatBox';

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
                <h2>{this.props.activeRoom.name}</h2>
                <div className="message-container">
                    {
                        this.state.messages.map((message, index) => {
                            if(message.roomId === this.props.activeRoom.key) {
                                return (
                                    <div className="message" key={index}>
                                        <span className="message-info">
                                            <span className="message-username">{message.username}</span>
                                            <span className="message-content">{message.content}</span>
                                        </span>
                                        <span className="message-timestamp">{this.formatDate(message.sentAt)}</span>
                                    </div>
                                )
                            }
                            return "";
                        })
                    }
                </div>

                <ChatBox
                    className="chatbox"
                    firebase={this.props.firebase}
                    activeRoom={this.props.activeRoom}
                    activeUser={this.props.activeUser}
                />
            </div>
        );
    }
}

export default MessageList;
