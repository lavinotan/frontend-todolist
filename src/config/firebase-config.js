import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCsx9HKaUbg8POsY71kjInvng6yPRlMzKQ",

    authDomain: "react-todolist-node.firebaseapp.com",

    projectId: "react-todolist-node",

    storageBucket: "react-todolist-node.appspot.com",

    messagingSenderId: "1076601616814",

    appId: "1:1076601616814:web:87645bfb06321efa62303f"
};

const app = initializeApp(firebaseConfig);

export default app;



