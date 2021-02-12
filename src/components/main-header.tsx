import * as React from "react"
import { Button, Header, Menu } from "grommet"
import { COLORS } from "../misc/colors"
import { Home, Menu as MenuIcon } from "grommet-icons"
import { GrowDiv } from "./simple-divs"

/*******************************************************************************
 *
 * MainHeader
 *
 ******************************************************************************/

/**
 * MainHeader Component
 */
const MainHeader = () => {

    /* Items to be shown when the user is logged in */
    const accountItems = [
        { label: 'Profile' },
        { label: 'Portfolio' },
        { label: 'Logout' }
    ]

    return (
        <Header background={COLORS.brand} gap="none" pad="xsmall">
            <Button icon={<Home />} hoverIndicator href="/" />
            <GrowDiv />
            <Menu label="Account" items={accountItems} />
            <Button icon={<MenuIcon />} hoverIndicator />
        </Header>
    )
}

export default MainHeader