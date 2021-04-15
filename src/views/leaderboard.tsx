import * as React from 'react'
import { Box, Button, Heading, ResponsiveContext, Text } from 'grommet'
import MainHeader from '../components/main-header'
import { GrowDiv, SubHeader } from '../components/simple-divs'
import { PostTransactionLog, PtlUser } from '../../functions/src/data/types'
import { useDocumentData } from '../misc/firebase-hooks'
import FullPageLoader from '../components/full-page-loader'
import { COLORS } from '../misc/colors'
import { Currency, UserManager } from 'grommet-icons'
import { useHistory } from 'react-router-dom'

/*******************************************************************************
 *
 * LeaderboardView
 *
 ******************************************************************************/

/**
 * LeaderboardView Component
 */
const LeaderboardView = () => {
    const [
        ptl
    ] = useDocumentData<PostTransactionLog>( "postTransactionLogs/1" )
    const smallSize = React.useContext( ResponsiveContext ) === "small"
    const sortedUsers = ptl?.users.sort( ( a, b ) => {
        return a.netWorth - b.netWorth
    } )

    return (
        <>
            <MainHeader />
            <SubHeader>
                {!ptl ? (
                    <FullPageLoader />
                ) : (
                    <>
                        <Heading>Leaderboard</Heading>
                        <Box
                            border={{ color: COLORS[ 'light-4' ] }}
                            margin={{ bottom: smallSize ? "" : "medium" }}
                            overflow="auto"
                            round="xxsmall"
                            width="large"
                        >
                            {sortedUsers.map( ( ptlUser, index ) => (
                                <LeaderboardUserRow
                                    key={`ptl_user_${ptlUser.uid}`}
                                    index={index}
                                    ptlUser={ptlUser}
                                />
                            ) )}
                        </Box>
                    </>
                )}
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * LeaderboardUserRow
 *
 ******************************************************************************/

/**
 * Props for LeaderboardUserRow
 */
interface LeaderboardUserRowProps {
    index: number
    ptlUser: PtlUser
}

/**
 * LeaderboardUserRow Component
 */
const LeaderboardUserRow = ( props: LeaderboardUserRowProps ) => {
    const history = useHistory()

    return (
        <Box
            align="center"
            background={props.index % 2 ? COLORS['light-2'] : COLORS.white}
            direction="row"
            flex={false}
            pad={{ horizontal: "xsmall", vertical: "2px" }}
        >
            <Button
                color={COLORS['dark-1']}
                hoverIndicator
                icon={<UserManager />}
                label={`${props.index + 1}. ${props.ptlUser.displayName}`}
                onClick={() => history.push( `/profile/${props.ptlUser.uid}` )}
                plain
                style={{ padding: 8 }}
            />
            <GrowDiv />
            <Text>${props.ptlUser.netWorth}</Text>
            <Currency style={{ padding: '0 10px' }} />
        </Box>
    )
}

export default LeaderboardView
