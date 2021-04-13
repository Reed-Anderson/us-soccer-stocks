import * as React from "react"
import { Switch, Route } from 'react-router-dom'
import ErrorView from "../views/error"
import HomeView from "../views/home"
import LeaderboardView from "../views/leaderboard"
import LoginView from "../views/login"
import PlayerView from "../views/player"
import PlayersView from "../views/players"
import PortfolioView from "../views/portfolio"
import ProfileView from "../views/profile"
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
            <Route exact component={ProfileView} path="/profile" />
            <Route exact component={PortfolioView} path="/portfolio" />
            <Route exact component={LeaderboardView} path="/leaderboard" />
            <Route exact component={PlayersView} path="/players" />
            <Route exact component={PlayerView} path="/players/:playerId" />
            <Route component={ErrorView} path="*" />
        </Switch>
    )
}

export default ViewSwitch