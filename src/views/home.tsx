import * as React from 'react'
import { Box, Button, Text } from 'grommet'
import { Launch, UserExpert } from 'grommet-icons'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { COLORS } from '../misc/colors'
import { UserContext } from '../misc/user-provider'
import { useHistory } from 'react-router'

/*******************************************************************************
 *
 * HomeView
 *
 ******************************************************************************/

/**
 * HomeView Component
 */
const HomeView = () => {
    const authUser = React.useContext( UserContext )?.user
    const history = useHistory()

    return (
        <>
            <MainHeader />
            <SubHeader>
                <Box
                    align="center"
                    background={COLORS['light-2']}
                    direction="row"
                    height="medium"
                    justify="center"
                    style={{ position: "relative" }}
                    width="100%"
                >
                    <Launch size="large" />
                    <Text as="h1" size="48px" margin="small" textAlign="center">
                        USMNT Stock Market Game
                    </Text>
                    {authUser && (
                        <Button
                            hoverIndicator
                            secondary
                            style={{ bottom: "5px", position: "absolute" }}
                        >
                            <Box
                                align="center"
                                direction="row"
                                gap="xsmall"
                                onClick={() => history.push( "/profile" )}
                                pad="xsmall"
                            >
                                <UserExpert color={COLORS['status-ok']} />
                                <Text size="small">
                                    Logged in as {authUser.displayName}.
                                </Text>
                            </Box>
                        </Button>
                    )}
                </Box>
            </SubHeader>
        </>
    )
}

export default HomeView