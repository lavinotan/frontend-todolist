import React, { Component } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';


import "../../App.css";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


class Login extends Component {

    signInWithGoogle = () => signInWithPopup(auth, googleProvider).then((result) => {

        //console.log("signInWithGoogle called");

        if (result) {
            window.localStorage.setItem('auth', 'true');
            return true;
        }
    }).catch((error) => {
        console.log(error.message);
        console.log(error.code);
        console.log(error);
    });

    signInWithGitHub = () => signInWithPopup(auth, githubProvider).then((result) => {

        //console.log("signInwithGitHub called");

        if (result) {
            window.localStorage.setItem('auth', 'true');
            return true;
        }
    }).catch((error) => {
        //console.log(error.message);
        if (error.code === "auth/account-exists-with-different-credential") {
            var pendingCred = error.credential;
            var email = error.email;

            var googleProvider = new GoogleAuthProvider();
            googleProvider.setCustomParameters({ "login_hint": email });
            signInWithPopup(auth, googleProvider).then((result) => {
                return result.user.linkWithCredential(pendingCred);
            });
        }
    });

    signInWithFacebook = () => signInWithPopup(auth, facebookProvider).then((result) => {

        //console.log("signInWithFacebook called");

        if (result) {
            window.localStorage.setItem('auth', 'true');
            return true;
        }
    }).catch((error) => {
        //console.log(error.message);
        if (error.code === "auth/account-exists-with-different-credential") {
            var pendingCred = error.credential;
            var email = error.email;

            var googleProvider = new GoogleAuthProvider();
            googleProvider.setCustomParameters({ "login_hint": email });
            signInWithPopup(auth, googleProvider).then((result) => {
                return result.user.linkWithCredential(pendingCred);
            });
        }
    });

    render() {
        return (
            <div>
                <div className="loginArea">
                    <button className="logButton" onClick={this.signInWithGoogle}><i className="fab fa-google"></i>Sign in with Google</button>
                    <button className="logButton" onClick={this.signInWithGitHub}><i className="fab fa-github"></i>Sign in with GitHub</button>
                    <button className="logButton" onClick={this.signInWithFacebook}><i className="fab fa-facebook"></i>Sign in with Facebook</button>
                </div>
            </div>
        );
    }
}

export default Login;
