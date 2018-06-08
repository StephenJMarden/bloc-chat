import React, { Component } from 'react';
import NewRoomForm from './NewRoomForm';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            displayNewRoomModal: false
        }

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on("child_added", snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    handleClick(room) {
        this.props.changeActiveRoom(room);
    }

    handleNewRoomClick() {
        this.setState({displayNewRoomModal: true});
    }

    closeNewRoomModal() {
        this.setState({displayNewRoomModal: false});
    }

    render () {
        return (
            <div className="RoomList">
                <h1>Bloc Chat</h1>
                <button className="ui button primary new-room-button" onClick={() => this.handleNewRoomClick()}>New Room</button>

                <div className={this.state.displayNewRoomModal ? "new-room-modal active-modal" : "new-room-modal"}>
                    <div className="modal-content">
                        <button onClick={() => this.closeNewRoomModal()} className="modal-exit ui icon button red"><i className="chevron down icon"></i></button>
                        <NewRoomForm firebase={this.props.firebase} closeModal={() => this.closeNewRoomModal()} />
                    </div>
                </div>

                <div className="room-list">
                    {
                        this.state.rooms.map((room, index) =>
                            <div
                                key={index}
                                onClick={() => this.handleClick(room)}
                                className={room.key === this.props.activeRoom.key ? "selected room" : "room"}
                            >{room.name}</div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default RoomList;
