import * as React from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import MainHeader from '../components/main-header'
import { GrowDiv, SubHeader } from '../components/simple-divs'
import { Order, OrderStatus } from '../../functions/src/data/types'
import HeaderedCard from '../components/headered-card'
import { useCollection } from '../misc/firebase-hooks'
import { UserContext } from '../misc/user-provider'
import { COLORS } from '../misc/colors'
import { Currency } from 'grommet-icons'
import { useHistory } from 'react-router'

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
                    <OrdersPlacedList />
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
            loading={ordersLoading}
            message={!orders.length ? "No players in this portfolio." : ""}
            title="Player Portfolio"
        >
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
 * OrdersPlacedList
 *
 ******************************************************************************/

/**
 * OrdersPlacedList Component
 */
const OrdersPlacedList = () => {
    const { authUser } = React.useContext( UserContext )
    const [
        orders,
        ordersLoading
    ] = useCollection<Order>( "orders", "userId", "==", authUser?.uid || "" )

    return (
        <HeaderedCard
            addlCardProps={{ margin: "small", width: "medium" }}
            loading={ordersLoading}
            message={!orders.length ? "No orders to display." : ""}
            title="Orders Placed"
        >
            {orders.map( ( order, index ) => (
                <OrderRow
                    key={order.uid}
                    oddIndex={!!( index % 2 )}
                    playerName={order.playerId}
                    status={order.status}
                    value={order.value}
                />
            ) )}
        </HeaderedCard>
    )
}

/*******************************************************************************
 *
 * OrderRow
 *
 ******************************************************************************/

/**
 * Props for OrderRow
 */
interface OrderRowProps {
    oddIndex: boolean
    playerName: string
    status: OrderStatus
    value: number
}

/**
 * OrderRow Component
 */
const OrderRow = ( props: OrderRowProps ) => {
    const history = useHistory()

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
                label={props.playerName}
                onClick={() => history.push( `/players/${props.playerName}` )}
                plain
                style={{ padding: 8 }}
            />
            <GrowDiv />
            <OrderStatusLabel status={props.status} />
            <Box direction="row" flex={false} justify="end" width="95px">
                <Text>${props.value}</Text>
                <Currency style={{ padding: '0 10px' }} />
            </Box>
        </Box>
    )
}

/*******************************************************************************
 *
 * OrderStatusLabel
 *
 ******************************************************************************/

/**
 * Props for OrderStatusLabel
 */
interface OrderStatusLabelProps {
    status: OrderStatus
}

/**
 * OrderStatusLabel Component
 */
const OrderStatusLabel = ( props: OrderStatusLabelProps ) => {
    return (
        <Box
            background={{ color: COLORS['neutral-3'], opacity: .25 }}
            margin="xsmall"
            pad="xsmall"
            style={{ borderRadius: 5, display: "inline-block" }}
        >
            {props.status}
        </Box>
    )
}

export default PortfolioView
