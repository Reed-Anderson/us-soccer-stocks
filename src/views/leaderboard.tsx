import * as React from 'react'
import { Heading, Text } from 'grommet'
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
                <Text>This page is under construction.</Text>
            </SubHeader>
        </>
    )
}

export default LeaderboardView
