import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import CONFIG from './config';

// Initialize Firebase
var config = {
    apiKey: CONFIG.apiKey,
    authDomain: "bloc-chat-40438.firebaseapp.com",
    databaseURL: "https://bloc-chat-40438.firebaseio.com",
    projectId: "bloc-chat-40438",
    storageBucket: "bloc-chat-40438.appspot.com",
    messagingSenderId: "620885876589"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          activeRoom: {name: "Select a Room"}
      }
  }

  changeActiveRoom(room) {
      this.setState({activeRoom: room});
  }

  render() {
    return (
        <div className="App">
            <main>
                <RoomList
                    firebase={firebase}
                    activeRoom={this.state.activeRoom}
                    changeActiveRoom={(room) => this.changeActiveRoom(room)}
                />
                <MessageList
                    firebase={firebase}
                    activeRoom={this.state.activeRoom}
                />
            </main>
        </div>
    );
  }
}

export default App;
