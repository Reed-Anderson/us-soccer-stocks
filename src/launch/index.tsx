import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./app"
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyA5zy0QyjmGH7T4jGF0SBlcOo-XYYipkCM",
    authDomain: "us-soccer-stocks.firebaseapp.com",
    databaseURL: "https://us-soccer-stocks-default-rtdb.firebaseio.com",
    projectId: "us-soccer-stocks",
    storageBucket: "us-soccer-stocks.appspot.com",
    messagingSenderId: "963106756363",
    appId: "1:963106756363:web:4ee712af0b8573778c340e",
    measurementId: "G-LX92EVETEL"
}

if ( !firebase.apps.length ) {
    firebase.initializeApp( firebaseConfig )
}

ReactDOM.render( <App />, document.getElementById( "root" ) )