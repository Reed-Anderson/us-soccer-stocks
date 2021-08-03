import * as React from "react"
import {
    Box,
    Button,
    Drop,
    Header,
    Menu,
    ResponsiveContext,
    Text,
    TextInput
} from "grommet"
import { COLORS } from "../misc/colors"
import {
    Github,
    Home,
    Login,
    Logout,
    Optimize,
    PieChart,
    Search,
    Trophy,
    User,
    UserAdd,
    UserManager
} from "grommet-icons"
import { GrowDiv } from "./simple-divs"
import { UserContext } from "../misc/user-provider"
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import { PostTransactionLog } from "../../functions/src/data/types"
import { useDocumentData } from "../misc/firebase-hooks"
import styled from "styled-components"

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
    const authUser = React.useContext( UserContext )
    const size = React.useContext( ResponsiveContext )

    const logout = async () => {
        await firebase.auth().signOut()
        history.push( "/login" )
    }

    const menuItems = authUser.authUser ? [
        /* Items to be shown when the user is logged in */
        {
            gap: "small",
            icon: <UserManager />,
            label: 'Profile',
            onClick: () => history.push( "/profile" )
        },
        {
            gap: "small",
            icon: <PieChart />,
            label: 'Portfolio',
            onClick: () => history.push( "/portfolio" )
        },
        {
            gap: "small",
            icon: <Trophy />,
            label: 'Leaderboard',
            onClick: () => history.push( "/leaderboard" )
        },
        {
            gap: "small",
            icon: <Optimize />,
            label: 'Players',
            onClick: () => history.push( "/players" )
        },
        {
            gap: "small",
            href: "https://github.com/Reed-Anderson/us-soccer-stocks",
            icon: <Github />,
            label: "Github",
            target: "_blank"
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
        },
        {
            gap: "small",
            href: "https://github.com/Reed-Anderson/us-soccer-stocks",
            icon: <Github />,
            label: "Github",
            target: "_blank"
        }
    ]

    return (
        <Header
            background={COLORS.brand}
            elevation="medium"
            gap="none"
            pad="xsmall"
        >
            <Button
                color={COLORS.white}
                icon={<Home />}
                hoverIndicator
                label={size === "small" ? "" : "USMNT Stocks"}
                onClick={() => history.push( "/" )}
                plain
                style={{ padding: 10 }}
            />
            <GrowDiv />
            <GlobalSearchBar />
            {size === "small" && (
                <GrowDiv />
            )}
            <Menu
                items={menuItems}
                label={authUser.authUser?.displayName || "Account"}
            />
        </Header>
    )
}

/*******************************************************************************
 *
 * GlobalSearchBar
 *
 ******************************************************************************/

const StyledWhitePlaceholders = styled.div`
    *::placeholder {
        color: ${COLORS.white}99;
    }
`

/**
 * GlobalSearchBar Component
 */
const GlobalSearchBar = () => {
    const [ searchString, setSearchString ] = React.useState( "" )
    const [ suggestOpen, setSuggestOpen ] = React.useState( false )
    const targetRef = React.useRef()
    const [
        ptl
    ] = useDocumentData<PostTransactionLog>( "postTransactionLogs/1" )

    const suggestedUsers = React.useMemo( () => {
        return ptl?.users.filter( ptlUser =>
            ptlUser.displayName
                .toLowerCase()
                .includes( searchString.toLowerCase() )

        )
    }, [ searchString, ptl ] )
    const suggestedPlayers = React.useMemo( () => {
        return ptl?.players.filter( ptlPlayer =>
            ptlPlayer.displayName
                .toLowerCase()
                .includes( searchString.toLowerCase() )
        )
    }, [ searchString, ptl ] )


    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchString( e.target.value )
        setSuggestOpen( !!e.target.value )
    }

    const onEsc = () => {
        setSuggestOpen( false )
        setSearchString( "" )
    }

    return (
        <Box margin={{ horizontal: "medium" }} width="small">
            <StyledWhitePlaceholders>
                <TextInput
                    color={COLORS.white}
                    icon={<Search />}
                    onChange={onChange}
                    onFocus={() => setSuggestOpen( !!searchString )}
                    placeholder="Search..."
                    ref={targetRef}
                    size="small"
                    value={searchString}
                />
            </StyledWhitePlaceholders>
            {suggestOpen && (
                <Drop
                    align={{ top: 'bottom', right: 'right' }}
                    onClickOutside={() => setSuggestOpen( false )}
                    onEsc={onEsc}
                    target={targetRef.current}
                >
                    <Box
                        height={{ max: "medium" }}
                        onClick={( e: any ) => e.preventDefault()}
                    >
                        {suggestedPlayers.map( suggestedPlayer => (
                            <GlobalSearchSuggestion
                                key={`players_${suggestedPlayer.displayName}`}
                                closeSuggest={() => setSuggestOpen( false )}
                                displayValue={suggestedPlayer.displayName}
                                icon={<User />}
                                setSearchString={setSearchString}
                                to={`/players/${suggestedPlayer.displayName}`}
                            />
                        ) )}
                        {suggestedUsers.map( suggestedUser => (
                            <GlobalSearchSuggestion
                                key={`users_${suggestedUser.displayName}`}
                                closeSuggest={() => setSuggestOpen( false )}
                                displayValue={suggestedUser.displayName}
                                icon={<UserManager />}
                                setSearchString={setSearchString}
                                to={`/profile/${suggestedUser.uid}`}
                            />
                        ) )}
                    </Box>
                </Drop>
            )}
        </Box>
    )
}

/*******************************************************************************
 *
 * GlobalSearchSuggestion
 *
 ******************************************************************************/

/**
 * Props for GlobalSearchSuggestion
 */
interface GlobalSearchSuggestionProps {
    closeSuggest: () => void
    displayValue: string
    icon: JSX.Element
    setSearchString: ( searchString: string ) => void
    to: string
}

/**
 * GlobalSearchSuggestion Component
 */
const GlobalSearchSuggestion = ( props: GlobalSearchSuggestionProps ) => {
    const history = useHistory()

    const onClick = () => {
        history.push( props.to )
        props.setSearchString( "" )
        props.closeSuggest()
    }

    return (
        <Box flex={false} pad="2px">
            <Button
                fill
                hoverIndicator
                onClick={onClick}
                plain
                style={{ alignItems: "center", display: "flex", padding: 10 }}
            >
                {props.icon}
                <Text margin={{ left: "small" }}>
                    {props.displayValue}
                </Text>
            </Button>
        </Box>
    )
}

export default MainHeader