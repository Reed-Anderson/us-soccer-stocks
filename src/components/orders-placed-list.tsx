import * as React from 'react'
import { Box, Button, Text } from 'grommet'
import { GrowDiv } from './simple-divs'
import { Order } from '../../functions/src/data/types'
import HeaderedCard from './headered-card'
import { useCollection } from '../misc/firebase-hooks'
import { UserContext } from '../misc/user-provider'
import { COLORS } from '../misc/colors'
import OrderDetailModal from './modals/order-detail-modal'
import { timestampToDate } from '../misc/helpers'
import OrderStatusLabel from './order-status-label'

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

export default OrdersPlacedList
