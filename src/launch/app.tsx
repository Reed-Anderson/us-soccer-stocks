import * as React from "react"
import { Grommet, ThemeType } from "grommet"
import { COLORS } from "../misc/colors"
import { BrowserRouter } from 'react-router-dom'
import ViewSwitch from "./view-switch"
import { UserContextProvider } from "../misc/user-provider"

/* Global Grommet theme */
const theme: ThemeType = {
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
            radius: '2px'
        }
    },
    tab: {
        active: {
            color: COLORS["neutral-3"]
        },
        border: {
            color: COLORS["dark-6"],
            hover: {
                color: COLORS["dark-2"]
            }
        },
        color: COLORS["dark-6"],
        extend: "text-transform: capitalize",
        hover: {
            color: COLORS["dark-2"]
        }
    },
    textArea: {
        extend: `border: 1px solid ${COLORS["light-4"]};`
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
            <UserContextProvider>
                <BrowserRouter>
                    <ViewSwitch />
                </BrowserRouter>
            </UserContextProvider>
        </Grommet>
    )
}