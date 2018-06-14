import React, { Component } from 'react';

class User extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }

    render() {
        return (
            <div className="user ui right secondary menu">
                <div className="item">
                    <div className="ui big label">
                        {this.props.activeUser ? <i className="icon user"></i> : <i className="icon user secret"></i>}
                        {this.props.activeUser ? this.props.activeUser.displayName : "Guest"}
                    </div>
                </div>
                <div className="item">
                    {
                        this.props.activeUser ? (
                            <button className="ui right labeled icon red button" onClick={() => this.handleSignOut()}>
                                <i className="icon sign out alternate"></i>
                                Sign Out
                            </button>
                        ) : (
                            <button className="ui right labeled icon primary button" onClick={() => this.handleSignIn()}>
                                <i className="icon sign in alternate"></i>
                                Sign In
                            </button>
                        )
                    }
                </div>
            </div>

        )
    }
}

export default User;
