import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCZCYC1SIyqowd1W3mII4Cwmj-XuLQyFTA",
    authDomain: "reciepe-sharing.firebaseapp.com",
    projectId: "reciepe-sharing",
    storageBucket: "reciepe-sharing.appspot.com",
    messagingSenderId: "435483572951",
    appId: "1:435483572951:web:e86a6d5407e1cd61d10e92"
};


export const app = initializeApp(firebaseConfig);