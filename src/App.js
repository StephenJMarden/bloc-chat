import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
          activeRoom: {name: "Select a Room"},
          activeUser: {},
          menuActive: false
      }
  }

  changeActiveRoom(room) {
      this.setState({activeRoom: room});
      this.toggleMenu();
  }

  setUser(user) {
      this.setState({activeUser: user});
  }

  toggleMenu() {
      this.state.menuActive ? this.setState({menuActive: false}) : this.setState({menuActive: true});
  }

  render() {
    return (
        <div className="App">
            <main>
                <nav>
                    <div className="ui borderless menu">
                        <div className="item" onClick={() => this.toggleMenu()}>
                            <i className="icon bars"></i>
                        </div>
                        <div className="header big item">Bloc Chat</div>

                        <User
                            firebase={firebase}
                            activeUser={this.state.activeUser}
                            setUser={(user) => this.setUser(user)}
                        />
                    </div>
                </nav>

                <div className="content">
                    <RoomList
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                        changeActiveRoom={(room) => this.changeActiveRoom(room)}
                        menuActive={this.state.menuActive}
                    />

                    <MessageList
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                        activeUser={this.state.activeUser}
                    />
                </div>
            </main>
        </div>
    );
  }
}

export default App;
