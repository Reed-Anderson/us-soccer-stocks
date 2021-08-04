import * as React from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import MainHeader from '../components/main-header'
import { GrowDiv, SubHeader } from '../components/simple-divs'
import {
    Order,
    OrderStatus,
    getOrderStatusColor
} from '../../functions/src/data/types'
import HeaderedCard from '../components/headered-card'
import { useCollection } from '../misc/firebase-hooks'
import { UserContext } from '../misc/user-provider'
import { COLORS } from '../misc/colors'
import OrderDetailModal from '../components/modals/order-detail-modal'
import { timestampToDate } from '../misc/helpers'

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
            {orders.map( order => (
                <div key={order.uid}>
                    {order.playerId}
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
    const [ orderInModal, setOrderInModal ] = React.useState(
        undefined as Order
    )
    const [
        orders,
        ordersLoading
    ] = useCollection<Order>(
        "orders",
        [ [ "userId", "==", authUser?.uid || "" ] ]
    )

    const sortedOrders = React.useMemo( () => {
        return orders.sort( ( a, b ) =>
            b.creationDate.seconds - a.creationDate.seconds
        )
    }, [ orders ] )

    return (
        <>
            {orderInModal && (
                <OrderDetailModal
                    closeFn={() => setOrderInModal( undefined )}
                    order={orderInModal}
                />
            )}
            <HeaderedCard
                addlCardProps={{ margin: "small", width: "medium" }}
                loading={ordersLoading}
                message={!orders.length ? "No orders to display." : ""}
                title="Orders Placed"
            >
                {sortedOrders.map( ( order, index ) => (
                    <OrderRow
                        key={order.uid}
                        oddIndex={!!( index % 2 )}
                        order={order}
                        setOrderInModal={setOrderInModal}
                    />
                ) )}
            </HeaderedCard>
        </>
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
    order: Order
    setOrderInModal: ( order: Order ) => void
}

/**
 * OrderRow Component
 */
const OrderRow = ( props: OrderRowProps ) => {
    const playerName = props.order.playerId

    return (
        <Box
            align="center"
            background={props.oddIndex ? COLORS['light-2'] : COLORS.white}
            direction="row"
            flex={false}
            pad={{ horizontal: "small", vertical: "2px" }}
        >
            <Text margin={{ right: "xsmall" }} size="xsmall">
                {timestampToDate( props.order.creationDate )}
            </Text>
            <Button
                color={COLORS['dark-1']}
                hoverIndicator
                label={playerName}
                onClick={() => props.setOrderInModal( props.order )}
                plain
                style={{ padding: 8 }}
            />
            <GrowDiv />
            <OrderStatusLabel status={props.order.status} />
            <Box direction="row" flex={false} justify="end" width="50px">
                <Text size="small">${props.order.value}</Text>
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
export const OrderStatusLabel = ( props: OrderStatusLabelProps ) => {
    return (
        <Box
            background={{
                color: getOrderStatusColor( props.status ),
                opacity: .25
            }}
            pad="xsmall"
            style={{
                borderRadius: 5,
                display: "inline-block",
                padding: "2px 6px",
                width: "fit-content"
            }}
        >
            <Text size="xsmall">
                {props.status}
            </Text>
        </Box>
    )
}

export default PortfolioView
