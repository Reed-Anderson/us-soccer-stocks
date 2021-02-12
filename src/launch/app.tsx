import * as React from "react"
import firebase from 'firebase/app'
import 'firebase/auth'
import { Grommet } from "grommet"
import { COLORS } from "../misc/colors"
import { BrowserRouter } from 'react-router-dom'
import ViewSwitch from "./view-switch"

/* Global Grommet theme */
const theme = {
    global: {
        colors: COLORS,
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px'
        },
        input: {
            weight: 400
        }
    },
    button: {
        border: {
            radius: '12px'
        }
    }
}

const grommetStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
}

export default function App() {
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
    }
    if ( !firebase.apps.length ) {
        firebase.initializeApp( firebaseConfig )
    }

    return (
        <Grommet style={grommetStyle} theme={theme}>
            <BrowserRouter>
                <ViewSwitch />
            </BrowserRouter>
        </Grommet>
    )
}