
import * as React from 'react'
import 'firebase/firestore'
import 'firebase/auth'
import MainHeader from '../components/main-header'
import { GrowDiv, SubHeader } from '../components/simple-divs'
import {
    Box,
    Button,
    ResponsiveContext,
    Tab,
    Tabs,
    Text,
    TextInput,
    Tip
} from 'grommet'
import { COLORS } from '../misc/colors'
import { useHistory } from 'react-router-dom'
import { Currency, InProgress, PieChart, Search, User } from 'grommet-icons'
import {
    PostTransactionLog,
    PtlPlayer,
    ptlGetPositionsAndPlayers
} from '../../functions/src/data/types'
import { useDocumentData } from '../misc/firebase-hooks'
import FullPageLoader from '../components/full-page-loader'
import useStillMounted from '../misc/use-still-mounted'
import useExistingPlacedOrders from '../misc/use-existing-placed-orders'
import { UserContext } from '../misc/user-provider'

/*******************************************************************************
 *
 * PlayersView
 *
 ******************************************************************************/

/**
 * PlayersView Component
 */
const PlayersView = () => {

    /* StillMounted hook required to set state after async features */
    const stillMounted = useStillMounted()

    /* State to get the latest daily PostTransationLog */
    const [
        ptl,
        ptlLoading
    ] = useDocumentData<PostTransactionLog>( "postTransactionLogs/1" )

    /* State to hold the actively selected position */
    const [ positionIndex, setPositionIndex ] = React.useState( 0 )

    /* State to hold valid positions from postTransactionLog */
    const [ positions, setPositions ] = React.useState( [] as string[] )

    /* State to hold players from postTransactionLog */
    const [ players, setPlayers ] = React.useState( [] )

    /* State to hold search query */
    const [ playerQuery, setPlayerQuery ] = React.useState( "" )

    /* Memo to hold the players to display */
    const filteredPlayers = React.useMemo( () => {
        const position = positions[ positionIndex ]
        return players.filter( player => (
            player[ "position" ] === position
            && player[ "displayName" ]
                .toLowerCase()
                .includes( playerQuery.toLowerCase() )
        ) )
    }, [ players, positionIndex, playerQuery ] )

    /* Effect to populate players when component mounts */
    React.useEffect( () => {
        if( stillMounted.current ) {
            if( !ptl ) {
                setPositions( [] )
                setPlayers( [] )
            }
            else {
                const [ pos, players ] =  ptlGetPositionsAndPlayers( ptl )
                setPositions( pos )
                setPlayers( players )
            }
        }
    }, [ ptl ] )

    return (
        <>
            <MainHeader />
            <SubHeader>
                {ptlLoading ? (
                    <FullPageLoader />
                ) : (
                    <>
                        <Tabs
                            activeIndex={positionIndex}
                            flex={false}
                            margin="medium"
                            onActive={setPositionIndex}
                        >
                            {positions.map( position => (
                                <Tab
                                    key={`tab_${position}`}
                                    style={{ textTransform: 'capitalize' }}
                                    title={position}
                                />
                            ) )}
                        </Tabs>
                        <Box
                            flex={false}
                            margin={{ bottom: "small" }}
                            width="large"
                        >
                            <TextInput
                                icon={<Search />}
                                onChange={e => setPlayerQuery( e.target.value )}
                                placeholder="Filter Players..."
                                size="small"
                                value={playerQuery}
                            />
                        </Box>
                        <Box
                            background={COLORS['status-warning'] + "33"}
                            border={{ color: COLORS['status-warning'] + "AA" }}
                            flex={false}
                            margin={{ bottom: "small" }}
                            pad="small"
                            round="xsmall"
                            width="large"
                        >
                            <Text color={COLORS['dark-2']} size="small">
                                Players in this position still need more
                                investment from users before they can be
                                assigned values. $1000 of investment is still
                                needed for players in this position.
                            </Text>
                        </Box>
                        <PlayerBox players={filteredPlayers} />
                    </>
                )}
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * PlayerBox
 *
 ******************************************************************************/

/**
 * Props for PlayerBox
 */
interface PlayerBoxProps {
    players: PtlPlayer[]
}

/**
 * PlayerBox Component
 */
const PlayerBox = ( props: PlayerBoxProps ) => {
    const size = React.useContext( ResponsiveContext )
    return (
        <Box
            border={{ color: COLORS[ 'light-4' ] }}
            margin={{ bottom: size === "small" ? "" : "medium" }}
            overflow="auto"
            round="xxsmall"
            width="large"
        >
            {!props.players.length && (
                <Text style={{ padding: 15 }}>
                    No players to display.
                </Text>
            )}
            {props.players.map( ( player, index ) => (
                <PlayerRow
                    key={player.displayName}
                    oddIndex={index % 2 === 1}
                    owned={false}
                    player={player}
                />
            ) )}
        </Box>
    )
}

/*******************************************************************************
 *
 * PlayerRow
 *
 ******************************************************************************/

/**
 * Props for PlayerRow
 */
interface PlayerRowProps {
    oddIndex: boolean
    owned: boolean
    player: PtlPlayer
}

/**
 * PlayerRow Component
 */
const PlayerRow = ( props: PlayerRowProps ) => {
    const history = useHistory()
    const size = React.useContext( ResponsiveContext )
    const playerName = props.player.displayName
    const { user } = React.useContext( UserContext )
    const [ existingPlacedOrders ] = useExistingPlacedOrders(
        props.player.displayName,
        user?.uid
    )

    return (
        <Box
            align="center"
            background={props.oddIndex ? COLORS['light-2'] : COLORS.white}
            direction="row"
            flex={false}
            pad={{ horizontal: "xsmall", vertical: "2px" }}
        >
            <Button
                color={COLORS['dark-1']}
                hoverIndicator
                icon={<User />}
                label={playerName}
                onClick={() => history.push( `/players/${playerName}` )}
                plain
                style={{ padding: 8 }}
            />
            {existingPlacedOrders?.length > 0 && (
                <InProgress style={{ padding: '0 5px' }} />
            )}
            {( props.owned || true ) && (
                size === "small" ? (
                    <PieChart
                        color={COLORS['status-ok']}
                        style={{ marginLeft: 5 }}
                    />
                ) : (
                    <Tip
                        content="This player is part of your portfolio."
                        dropProps={{ align: { left: "right" } }}
                    >
                        <Box>
                            <PieChart
                                color={COLORS['status-ok']}
                                style={{ marginLeft: 5 }}
                            />
                        </Box>
                    </Tip>
                )
            )}
            <GrowDiv />
            <Text>${props.player.value}</Text>
            <Currency style={{ padding: '0 10px' }} />
        </Box>
    )
}

export default PlayersView