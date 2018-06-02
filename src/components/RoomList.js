import React, { Component } from 'react';
import NewRoomForm from './NewRoomForm';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
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

    render () {
        return (
            <div className="RoomList">
                <div className="room-list">
                    {
                        this.state.rooms.map((room, index) =>
                            <div key={index}>{room.name}</div>
                        )
                    }
                </div>
                <NewRoomForm
                    firebase={this.props.firebase}
                />
            </div>
        );
    }
}

export default RoomList;
