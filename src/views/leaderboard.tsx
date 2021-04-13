import { Heading } from 'grommet'
import * as React from 'react'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'

/*******************************************************************************
 *
 * LeaderboardView
 *
 ******************************************************************************/

/**
 * LeaderboardView Component
 */
const LeaderboardView = () => {
    return (
        <>
            <MainHeader />
            <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                <Heading>Leaderboard</Heading>
            </SubHeader>
        </>
    )
}

export default LeaderboardView
