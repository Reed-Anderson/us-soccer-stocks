import { Box, Text } from 'grommet'
import * as React from 'react'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { COLORS } from '../misc/colors'

/*******************************************************************************
 *
 * HomeView
 *
 ******************************************************************************/

/**
 * HomeView Component
 */
const HomeView = () => {
    return (
        <>
            <MainHeader />
            <SubHeader>
                <Box
                    align="center"
                    background={COLORS['light-2']}
                    height="medium"
                    justify="center"
                    width="100%"
                >
                    <Text as="h1" size="48px" margin="small" textAlign="center">
                        USMNT Stock Market Game
                    </Text>
                </Box>
            </SubHeader>
        </>
    )
}

export default HomeView