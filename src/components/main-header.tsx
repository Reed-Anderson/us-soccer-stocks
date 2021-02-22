import * as React from "react"
import { Button, Header, Menu } from "grommet"
import { COLORS } from "../misc/colors"
import {
    Home,
    Login,
    Logout,
    Optimize,
    PieChart,
    UserAdd,
    UserManager
} from "grommet-icons"
import { GrowDiv } from "./simple-divs"
import { UserContext } from "../misc/user-provider"
import { Link, useHistory } from "react-router-dom"
import firebase from 'firebase/app'

/*******************************************************************************
 *
 * MainHeader
 *
 ******************************************************************************/

/**
 * MainHeader Component
 */
const MainHeader = () => {

    const history = useHistory()
    const user = React.useContext( UserContext )

    const logout = async () => {
        await firebase.auth().signOut()
        history.push( "/login" )
    }

    const menuItems = user.user ? [
        /* Items to be shown when the user is logged in */
        {
            gap: "small",
            icon: <UserManager />,
            label: 'Profile'
        },
        {
            gap: "small",
            icon: <PieChart />,
            label: 'Portfolio'
        },
        {
            gap: "small",
            icon: <Optimize />,
            label: 'Players',
            onClick: () => history.push( "/players" )
        },
        {
            gap: "small",
            icon: <Logout />,
            label: 'Logout',
            onClick: logout
        }
    ] : [
        /* Items to be shown when the user is not logged in */
        {
            gap: "small",
            icon: <UserAdd />,
            label: 'Register',
            onClick: () => history.push( "/register" )
        },
        {
            gap: "small",
            icon: <Login />,
            label: 'Login',
            onClick: () => history.push( "/login" )
        }
    ]

    return (
        <Header
            background={COLORS.brand}
            elevation="medium"
            gap="none"
            pad="xsmall"
        >
            <Link to="/">
                <Button
                    color={COLORS.white}
                    icon={<Home />}
                    hoverIndicator
                    label="USMNT Stocks"
                    plain
                    style={{ padding: 10 }}
                />
            </Link>
            <GrowDiv />
            <Menu
                items={menuItems}
                label={user.user?.displayName || "Account"}
            />
        </Header>
    )
}

export default MainHeader