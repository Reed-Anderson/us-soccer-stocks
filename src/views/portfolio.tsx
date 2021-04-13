import { Heading } from 'grommet'
import * as React from 'react'
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
            </SubHeader>
        </>
    )
}

export default PortfolioView
