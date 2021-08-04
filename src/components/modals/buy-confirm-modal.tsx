import firebase from 'firebase/app'
import {
    ResponsiveContext,
    Box,
    Heading,
    Button,
    TextInput,
    CheckBox,
    Text
} from "grommet"
import { Checkmark, Optimize, PieChart, Currency, User } from "grommet-icons"
import * as React from "react"
import { useHistory } from "react-router-dom"
import { MoonLoader } from "react-spinners"
import {
    PtlPlayer,
    Order,
    OrderStatus
} from "../../../functions/src/data/types"
import { COLORS } from "../../misc/colors"
import { UserContext } from "../../misc/user-provider"
import Modal from "../modal"

/*******************************************************************************
 *
 * BuyConfirmModal
 *
 ******************************************************************************/

/**
 * Props for BuyConfirmModal
 */
 interface BuyConfirmModalProps {
    amount: number
    cashOnHand: number
    closeFn: () => void
    ptlPlayer: PtlPlayer
}

/**
 * BuyConfirmModal Component
 */
const BuyConfirmModal = ( props: BuyConfirmModalProps ) => {
    const authUser = React.useContext( UserContext )
    const [ orderLoading, setOrderLoading ] = React.useState( false )
    const [ orderConfirmed, setOrderConfirmed ] = React.useState( false )

    /**
     * Places the order in firestore
     */
     const placeOrder = async () => {
        setOrderLoading( true )
        const nextId = firebase
            .app()
            .firestore()
            .collection( "orders" )
            .doc()
            .id

        const nextOrder: Order = {
            creationDate: firebase.firestore.Timestamp.now(),
            playerId: props.ptlPlayer.displayName,
            status: OrderStatus.Placed,
            uid: nextId,
            type: "Buy",
            userId: authUser.authUser.uid,
            value: props.amount
        }
        await firebase.firestore().doc( `orders/${nextId}` ).set( nextOrder )

        setOrderConfirmed( true )
        setOrderLoading( false )
    }

    if( orderConfirmed ) {
        return (
            <BuyConfirmModalConfirmed {...props} />
        )
    }
    else if( orderLoading ) {
        return (
            <Modal
                closeFn={props.closeFn}
                title="Confirm Purchase"
            >
                <Box
                    align="center"
                    height="350px"
                    justify="center"
                    width="500px"
                >
                    <MoonLoader color={COLORS[ 'neutral-4' ]} size={120} />
                </Box>
            </Modal>
        )
    }
    else {
        return (
            <BuyConfirmModalStandard
                placeOrder={placeOrder}
                {...props}
            />
        )
    }
}

/*******************************************************************************
 *
 * BuyConfirmModalConfirmed
 *
 ******************************************************************************/

/**
 * BuyConfirmModalConfirmed Component
 */
const BuyConfirmModalConfirmed = ( props: BuyConfirmModalProps ) => {
    const history = useHistory()

    return (
        <Modal
            closeFn={props.closeFn}
            title="Confirm Purchase"
        >
            <Box
                align="center"
                height="350px"
                justify="center"
                width="500px"
            >
                <Checkmark color={COLORS["status-ok"]} size="large" />
                <Heading level={2}>Order Placed</Heading>
                <Box direction="row" gap="small" justify="around">
                    <Button
                        icon={<Optimize />}
                        label="Players"
                        onClick={() => history.push( "/players" )}
                    />
                    <Button
                        icon={<PieChart />}
                        label="Portfolio"
                        onClick={() => history.push( "/portfolio" )}
                    />
                </Box>
            </Box>
        </Modal>
    )
}

/*******************************************************************************
 *
 * BuyConfirmModalStandard
 *
 ******************************************************************************/

interface BuyConfirmModalStandardProps extends BuyConfirmModalProps {
    placeOrder: () => void
}

/**
 * BuyConfirmModalStandard Component
 */
const BuyConfirmModalStandard = ( props: BuyConfirmModalStandardProps ) => {

    const size = React.useContext( ResponsiveContext )
    const [ understands, setUnderstands ] = React.useState( false )

    const inputWidths = size === "small" ? "160px" : "215px"
    const textBoxMargin = { left: size === "small" ? "medium" : "" }

    return (
        <Modal
            closeFn={props.closeFn}
            title="Confirm Purchase"
        >
            <Box
                height="350px"
                pad={{ horizontal: "medium", vertical: "small" }}
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
                        <TextInput
                            plain
                            readOnly
                            value={props.ptlPlayer.displayName}
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
                            value={props.amount}
                        />
                    </Box>
                </Box>
                <Box
                    align="center"
                    border={{
                        color: COLORS["light-4"],
                        side: "bottom"
                    }}
                    direction="row"
                    flex={false}
                    justify="between"
                >
                    <Text>Remaining Cash:</Text>
                    <Box width={inputWidths}>
                        <TextInput
                            icon={<Currency />}
                            plain
                            readOnly
                            type="number"
                            value={props.cashOnHand - props.amount}
                        />
                    </Box>
                </Box>
                <Box
                    align="center"
                    direction="row"
                    flex={false}
                    justify="between"
                >
                    <Text>Previous Price:</Text>
                    <Box width={inputWidths}>
                        <TextInput
                            icon={<Currency />}
                            plain
                            readOnly
                            type="number"
                            value={props.ptlPlayer.value}
                        />
                    </Box>
                </Box>
                <Box
                    align="center"
                    direction="row"
                    flex={false}
                    justify="between"
                    margin={{ bottom: "xsmall" }}
                >
                    <Text>Estimated quantity:</Text>
                    <Box width={inputWidths}>
                        <TextInput
                            icon={<User />}
                            plain
                            readOnly
                            type="number"
                            value={props.amount / props.ptlPlayer.value}
                        />
                    </Box>
                </Box>
                <Box style={{ lineHeight: "1.75em" }}>
                    <CheckBox
                        checked={understands}
                        onChange={() => setUnderstands( !understands )}
                        label={(
                            <Box margin={textBoxMargin}>
                                <Text size="small">
                                    I understand that my transaction price
                                    may not match the price shown.
                                </Text>
                            </Box>
                        )}
                    />
                </Box>
                <Button
                    disabled={!understands}
                    label="Confirm"
                    margin={{ top: "small" }}
                    onClick={props.placeOrder}
                    primary
                />
            </Box>
        </Modal>
    )
}

export default BuyConfirmModal
