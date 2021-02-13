import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./app"
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    databaseUrl: process.env.DATABASE_URL,
    measurementId: process.env.MEASUREMENT_ID
}

if ( !firebase.apps.length ) {
    firebase.initializeApp( firebaseConfig )
}

ReactDOM.render( <App />, document.getElementById( "root" ) )