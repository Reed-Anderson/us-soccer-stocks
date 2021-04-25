import * as React from 'react'
import { Box, Heading, Text } from 'grommet'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { COLORS } from '../misc/colors'
import { Order } from '../../functions/src/data/types'
import { HashLoader, SyncLoader } from 'react-spinners'
import HeaderedCard from '../components/headered-card'

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
                <Box
                    direction="row"
                    height="large"
                    margin={{ bottom: "medium" }}
                    wrap
                >
                    <PorfolioList />
                    <PlacedOrdersList />
                </Box>
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * PorfolioList
 *
 ******************************************************************************/

/**
 * PorfolioList Component
 */
const PorfolioList = () => {
    const [
        orders,
        ordersLoading
    ] = [ [] as Order[], false ]

    return (
        <HeaderedCard
            addlCardProps={{ margin: "small", width: "large" }}
            title="Player Portfolio"
        >
            {ordersLoading && (
                <Box align="center" fill justify="center">
                    <SyncLoader color={COLORS['neutral-3']} />
                </Box>
            )}
            {!ordersLoading && !orders.length && (
                <Box align="center" fill justify="center">
                    <Text color={COLORS['status-warning']}>
                        No players in this portfolio.
                    </Text>
                </Box>
            )}
            {orders.map( () => (
                <div key={Math.random() /* TODO */}>
                    Hi Reed
                </div>
            ) )}
        </HeaderedCard>
    )
}

/*******************************************************************************
 *
 * PlacedOrdersList
 *
 ******************************************************************************/

/**
 * PlacedOrdersList Component
 */
const PlacedOrdersList = () => {
    const [
        orders,
        ordersLoading
    ] = [ [] as Order[], false ]

    return (
        <HeaderedCard
            addlCardProps={{ margin: "small", width: "medium" }}
            title="Orders Placed"
        >
            {ordersLoading && (
                <Box align="center" fill justify="center">
                    <HashLoader color={COLORS['neutral-3']} />
                </Box>
            )}
            {!ordersLoading && !orders.length && (
                <Box align="center" fill justify="center">
                    <Text color={COLORS['status-warning']}>
                        No orders to display.
                    </Text>
                </Box>
            )}
            {orders.map( () => (
                <div key={Math.random() /* TODO */}>
                    Hi Reed
                </div>
            ) )}
        </HeaderedCard>
    )
}

export default PortfolioView
