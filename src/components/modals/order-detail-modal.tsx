import * as React from "react"
import Modal from "../modal"
import { Box, Button, ResponsiveContext, Text, TextInput } from "grommet"
import { Order, OrderStatus } from "../../../functions/src/data/types"
import { Currency, Calendar, User } from "grommet-icons"
import { COLORS } from "../../misc/colors"
import { GrowDiv } from "../simple-divs"
import { MoonLoader } from "react-spinners"
import firebase from 'firebase/app'
import { OrderStatusLabel } from "../../views/portfolio"
import { timestampToDate } from "../../misc/helpers"
import { useHistory } from "react-router"

/*******************************************************************************
 *
 * OrderDetailModal
 *
 ******************************************************************************/

/**
 * Props for OrderDetailModal
 */
interface OrderDetailModalProps {
    closeFn: () => void
    order: Order
}

/**
 * OrderDetailModal Component
 */
const OrderDetailModal = ( props: OrderDetailModalProps ) => {
    const [ loading, setLoading ] = React.useState( false )

    const cancelOrderFn = async () => {
        setLoading( true )

        const newOrder: Order = {
            ...props.order,
            status: OrderStatus.Cancelled
        }
        await firebase
            .app()
            .firestore()
            .doc( `orders/${props.order.uid}` )
            .set( newOrder )

        setLoading( false )
        props.closeFn()
    }

    if( loading ) {
        return (
            <Modal
                closeFn={props.closeFn}
                title="Order Details"
            >
                <Box
                    align="center"
                    height="160px"
                    justify="center"
                    width="500px"
                >
                    <MoonLoader color={COLORS[ 'neutral-4' ]} size={80} />
                </Box>
            </Modal>
        )
    }
    else {
        return (
            <OrderDetailModalStandard
                cancelOrderFn={cancelOrderFn}
                {...props}
            />
        )
    }
}

/*******************************************************************************
 *
 * OrderDetailModalStandard
 *
 ******************************************************************************/

/**
 * Props for OrderDetailModalStandard
 */
interface OrderDetailModalStandardProps extends OrderDetailModalProps {
    cancelOrderFn: () => void
}

/**
 * OrderDetailModalStandard Component
 */
const OrderDetailModalStandard = ( props: OrderDetailModalStandardProps ) => {
    const size = React.useContext( ResponsiveContext )
    const history = useHistory()
    const [ confirmingCancel, setConfirmingCancel ] = React.useState( false )

    const inputWidths = size === "small" ? "160px" : "215px"
    const clickPlayer = () => {
        history.push( `/players/${props.order.playerId}` )
    }

    return (
        <Modal
            closeFn={props.closeFn}
            title="Order Details"
        >
            <Box
                pad="small"
                width="500px"
            >
                <Box
                    align="center"
                    direction="row"
                    flex={false}
                    justify="between"
                >
                    <Box direction="row" gap="xsmall">
                        <Text>Player:</Text>
                    </Box>
                    <Box width={inputWidths}>
                        <Button
                            color={COLORS['dark-1']}
                            hoverIndicator
                            icon={<User />}
                            label={props.order.playerId}
                            onClick={clickPlayer}
                            plain
                            style={{ padding: 10, width: "fit-content" }}
                        />
                    </Box>
                </Box>
                <Box
                    align="center"
                    direction="row"
                    flex={false}
                    justify="between"
                >
                    <Text>Investment Amount:</Text>
                    <Box width={inputWidths}>
                        <TextInput
                            icon={<Currency />}
                            plain
                            readOnly
                            type="number"
                            value={props.order.value}
                        />
                    </Box>
                </Box>
                <Box
                    align="center"
                    direction="row"
                    flex={false}
                    justify="between"
                >
                    <Text>Order Placed On:</Text>
                    <Box width={inputWidths}>
                        <TextInput
                            icon={<Calendar />}
                            plain
                            readOnly
                            value={timestampToDate( props.order.creationDate )}
                        />
                    </Box>
                </Box>
                <Box
                    align="center"
                    direction="row"
                    flex={false}
                    justify="between"
                >
                    <Text>Order Status:</Text>
                    <Box pad="small" width={inputWidths}>
                        <OrderStatusLabel status={props.order.status} />
                    </Box>
                </Box>
                <GrowDiv />
                {confirmingCancel ? (
                    <Box
                        align="center"
                        direction="row"
                        fill
                        gap="small"
                        margin={{ top: "small" }}
                    >
                        <Text size="small">
                            Are you sure you want to cancel this order?
                        </Text>
                        <GrowDiv />
                        <Button
                            autoFocus
                            color={COLORS["status-unknown"] + "99"}
                            label="No"
                            onClick={() => setConfirmingCancel( false )}
                            primary
                        />
                        <Button
                            color={COLORS["status-warning"] + "99"}
                            label="Yes"
                            onClick={props.cancelOrderFn}
                            primary
                        />
                    </Box>
                ) : (
                    props.order.status === OrderStatus.Placed && (
                        <Button
                            color={COLORS["status-warning"] + "99"}
                            label="Cancel Order"
                            margin={{ top: "small" }}
                            onClick={() => setConfirmingCancel( true )}
                            primary
                        />
                    )
                )}
            </Box>
        </Modal>
    )
}

export default OrderDetailModal
