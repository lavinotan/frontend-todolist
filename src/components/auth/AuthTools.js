import React, { Component } from 'react';

import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signOut, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

class AuthTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: this.props.isSignedIn,
            token: this.props.token
        }
    }
}

function signInWithGoogle() {
    signInWithPopup(auth, googleProvider).then((result) => {

        console.log("signInWithGoogle called");

        if (result) {
            this.setState({ isSignedIn: true });
            window.localStorage.setItem('auth', 'true');
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

const signInWithGitHub = () => signInWithPopup(auth, githubProvider).then((result) => {

    console.log("signInwithGitHub called");

    if (result) {
        this.setState({ isSignedIn: true });
        window.localStorage.setItem('auth', 'true');
    }
}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
});

const signInWithFacebook = () => signInWithPopup(auth, facebookProvider).then((result) => {

    console.log("signInWithFacebook called");

    if (result) {
        this.setState({ isSignedIn: true });
        window.localStorage.setItem('auth', 'true');
    }
}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
});

function signOutfromApp() {
    signOut(auth).then(() => {
        this.setState({ isSignedIn: false, token: "" });
        window.localStorage.setItem('auth', 'false');
    }).catch((error) => {
        console.log(error);
    });
}

export { signInWithGoogle, signInWithGitHub, signOutfromApp };
export default AuthTools;