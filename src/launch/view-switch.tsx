import * as React from "react"
import { Switch, Route } from 'react-router-dom'
import ErrorView from "../views/error"
import HomeView from "../views/home"
import LoginView from "../views/login"
import RegisterView from "../views/register"

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
            <Route exact component={RegisterView} path="/register" />
            <Route exact component={LoginView} path="/login" />
            <Route component={ErrorView} path="*" />
        </Switch>
    )
}

export default ViewSwitch