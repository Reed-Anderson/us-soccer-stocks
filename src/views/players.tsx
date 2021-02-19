import * as React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import MainHeader from '../components/main-header'
import { GrowDiv, SubHeader } from '../components/simple-divs'
import {
    Box,
    Button,
    Menu,
    ResponsiveContext,
    Tab,
    Tabs,
    Text,
    TextInput,
    Tip
} from 'grommet'
import { COLORS } from '../misc/colors'
import { Link } from 'react-router-dom'
import { Currency, PieChart, Search } from 'grommet-icons'

/*******************************************************************************
 *
 * PlayersView
 *
 ******************************************************************************/

/**
 * PlayersView Component
 */
const PlayersView = () => {
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
    /* TODO: Elevate this state */
    React.useEffect( () => {
        const doc = firebase.app().firestore().doc( "postTransactionLogs/1" )
        doc.onSnapshot( snapshot => {
            const positionSet: Set<string> = new Set()
            const newPlayers: any[] = []
            snapshot.data().players.forEach( ( player: any ) => {
                newPlayers.push( player )
                positionSet.add( player[ 'position' ] )
            } )
            setPositions( Array.from( positionSet ).sort() )
            setPlayers( newPlayers )
        } )
    }, [] )

    return (
        <>
            <MainHeader />
            <SubHeader>
                <Tabs
                    activeIndex={positionIndex}
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
                <Box flex={false} margin={{ bottom: "small" }} width="large">
                    <TextInput
                        icon={<Search />}
                        onChange={e => setPlayerQuery( e.target.value )}
                        placeholder="Search Player..."
                        size="small"
                        value={playerQuery}
                    />
                </Box>
                <PlayerBox players={filteredPlayers} />
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
    players: any[]
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
    player: any
}

/**
 * PlayerRow Component
 */
const PlayerRow = ( props: PlayerRowProps ) => {
    const size = React.useContext( ResponsiveContext )
    return (
        <Box
            align="center"
            background={props.oddIndex ? COLORS['light-1'] : COLORS.white}
            direction="row"
            flex={false}
            pad={{ horizontal: "xsmall", vertical: "2px" }}
        >
            <Link to={`/players/${props.player.displayName}`}>
                <Button
                    color={COLORS['dark-1']}
                    hoverIndicator
                    label={props.player.displayName}
                    plain
                    style={{ padding: 5 }}
                />
            </Link>
            {props.owned && (
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
            <Text>
                ${props.player.value}
            </Text>
            <Currency
                style={{ padding: '0 10px' }}
            />
            <Menu items={[]} />
        </Box>
    )
}

export default PlayersView