import * as React from "react"
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
    return (
        <Grommet style={grommetStyle} theme={theme}>
            <BrowserRouter>
                <ViewSwitch />
            </BrowserRouter>
        </Grommet>
    )
}