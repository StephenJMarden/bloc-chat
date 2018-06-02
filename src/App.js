import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
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

const initRoomList = (props) => {
    return (
        <RoomList
            firebase={firebase}
            {...props}
        />
    );
}

class App extends Component {
  render() {
    return (
        <div className="App">
            <main>
                <Route exact path="/" render={initRoomList}/>
            </main>
        </div>
    );
  }
}

export default App;
