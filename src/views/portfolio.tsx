import * as React from 'react'
import { Box, Heading, Text } from 'grommet'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'

/*******************************************************************************
 *
 * PortfolioView
 *
 ******************************************************************************/

/**
 * PortfolioView Component
 */
const PortfolioView = () => {
    return (
        <>
            <MainHeader />
            <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                <Heading>Portfolio</Heading>
                <Box width="large">
                    <Text textAlign="center">
                        This page is under construction. But hey, so is the
                        whole site, so you probably don&apos;t have a portfolio
                        yet anyway.
                    </Text>
                </Box>
            </SubHeader>
        </>
    )
}

export default PortfolioView
