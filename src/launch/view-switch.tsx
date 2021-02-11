import * as React from "react"
import { Switch, Route } from 'react-router-dom'
import ErrorView from "../views/error"
import HomeView from "../views/home"

/*******************************************************************************
 *
 * ViewSwitch
 *
 ******************************************************************************/

/**
 * ViewSwitch Component
 */
const ViewSwitch = () => {
    return (
        <Switch>
            <Route exact component={HomeView} path="/" />
            <Route component={ErrorView} path="*" />
        </Switch>
    )
}

export default ViewSwitch