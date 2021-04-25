import * as React from 'react'
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    ResponsiveContext,
    Text
} from 'grommet'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { COLORS } from '../misc/colors'
import { Order } from '../../functions/src/data/types'
import { HashLoader } from 'react-spinners'
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
    const size = React.useContext( ResponsiveContext )

    return (
        <>
            <MainHeader />
            <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                <Heading>Portfolio</Heading>
                <Box
                    direction={size === "small" ? "column" : "row"}
                    gap="medium"
                    height="large"
                    margin={{ bottom: "medium" }}
                    width="xlarge"
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
 * Props for PorfolioList
 */
interface PorfolioListProps {

}

/**
 * PorfolioList Component
 */
const PorfolioList = ( props: PorfolioListProps ) => {
    return (
        <HeaderedCard
            addlCardProps={{ width: "large" }}
            title="Player Portfolio"
        >
            Hi
        </HeaderedCard>
    )
}

/*******************************************************************************
 *
 * PlacedOrdersList
 *
 ******************************************************************************/

/**
 * Props for PlacedOrdersList
 */
interface PlacedOrdersListProps {

}

/**
 * PlacedOrdersList Component
 */
const PlacedOrdersList = ( props: PlacedOrdersListProps ) => {
    const [
        orders,
        ordersLoading
    ] = [ [] as Order[], true ]

    return (
        <HeaderedCard addlCardProps={{ width: "medium" }} title="Orders Placed">
            {ordersLoading && (
                <Box align="center" fill justify="center">
                    <HashLoader color={COLORS['neutral-3']} />
                </Box>
            )}
            {!ordersLoading && !orders.length && (
                null
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
