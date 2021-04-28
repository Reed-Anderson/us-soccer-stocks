import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    CheckBox,
    Heading,
    ResponsiveContext,
    Text,
    TextInput
} from "grommet"
import { Checkmark, Currency, Optimize, PieChart, User } from "grommet-icons"
import * as React from "react"
import {
    Order,
    OrderStatus,
    PostTransactionLog,
    PtlPlayer
} from "../../functions/src/data/types"
import { COLORS } from "../misc/colors"
import { useDocumentData } from "../misc/firebase-hooks"
import firebase from 'firebase/app'
import { UserContext } from "../misc/user-provider"
import Modal from "./modal"
import { MoonLoader } from "react-spinners"
import { useHistory } from "react-router"
import useCashOnHand from "../misc/use-cash-on-hand"

/*******************************************************************************
 *
 * OrderPlacer
 *
 ******************************************************************************/

/**
 * Props for OrderPlacer
 */
interface OrderPlacerProps {
    playerId: string
}

/**
 * OrderPlacer Component
 */
const OrderPlacer = ( props: OrderPlacerProps ) => {
    const [
        ptl
    ] = useDocumentData<PostTransactionLog>( "postTransactionLogs/1" )
    const size = React.useContext( ResponsiveContext )

    const ptlPlayer = React.useMemo( () => (
        ptl?.players.find( player => player.displayName === props.playerId )
    ), [ ptl, props.playerId ] )


    if( !ptlPlayer ) {
        return (
            null // TODO: Loader in Buy/Sell sections
        )
    }

    return (
        <Box
            direction={size === "small" ? "column" : "row"}
            flex={false}
            gap="medium"
            height={{ min: "small" }}
            justify="between"
            margin={{ bottom: "medium" }}
            width="large"
        >
            <BuySection ptlPlayer={ptlPlayer} />
            <SellSection ptlPlayer={ptlPlayer} />
        </Box>
    )
}

/*******************************************************************************
 *
 * BuySection
 *
 ******************************************************************************/

/**
 * Props for BuySection
 */
interface BuySectionProps {
    ptlPlayer: PtlPlayer
}

/**
 * BuySection Component
 */
const BuySection = ( props: BuySectionProps ) => {
    const [ confirmerOpen, setConfirmerOpen ] = React.useState( false )
    const [ orderLoading, setOrderLoading ] = React.useState( false )
    const [ orderConfirmed, setOrderConfirmed ] = React.useState( false )
    const [ amount, setAmount ] = React.useState( 0 )
    const size = React.useContext( ResponsiveContext )
    const authUser = React.useContext( UserContext )
    const cashOnHand = useCashOnHand()

    /**
     * Truncate number to two decimal places
     */
    const setAmountTrunc = ( num: number ) => {
        setAmount( +num.toString().match( /^-?\d+(?:\.\d{0,2})?/ )[ 0 ] )
    }

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
            userId: authUser.authUser.uid,
            value: amount
        }
        await firebase.firestore().doc( `orders/${nextId}` ).set( nextOrder )

        setOrderConfirmed( true )
        setOrderLoading( false )
    }

    return (
        <Card
            border={{ color: COLORS["light-6"] }}
            width={size === "small" ? "100%" : "48%"}
        >
            {confirmerOpen && (
                <BuyConfirmer
                    amount={amount}
                    cashOnHand={cashOnHand}
                    closeFn={() => setConfirmerOpen( false )}
                    confirmed={orderConfirmed}
                    confirmFn={placeOrder}
                    loading={orderLoading}
                    ptlPlayer={props.ptlPlayer}
                />
            )}
            <CardHeader
                background={COLORS["light-2"]}
                border={{ color: COLORS["light-5"], side: "bottom" }}
                justify="start"
                pad="small"
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">Buy</Text>
            </CardHeader>
            <CardBody
                height={{ min: "xsmall" }}
                gap="small"
                justify="center"
                pad="small"
            >
                <Box align="center" direction="row" justify="between">
                    <Text>Cash to Invest:</Text>
                    <Box width="160px">
                        <TextInput
                            icon={<Currency />}
                            plain
                            readOnly
                            type="number"
                            value={cashOnHand}
                        />
                    </Box>
                </Box>
                <Box align="center" direction="row" justify="between">
                    <Text>Investment Amount:</Text>
                    <Box width="160px">
                        <TextInput
                            icon={<Currency />}
                            onChange={e => setAmountTrunc( +e.target.value )}
                            placeholder="0.00"
                            type="number"
                            value={amount || ""}
                        />
                    </Box>
                </Box>
                <Button
                    disabled={amount <= 0 || amount > cashOnHand}
                    label="Buy"
                    onClick={() => setConfirmerOpen( true )}
                />
            </CardBody>
        </Card>
    )
}

/*******************************************************************************
 *
 * BuyConfirmer
 *
 ******************************************************************************/

/**
 * Props for BuyConfirmer
 */
interface BuyConfirmerProps {
    amount: number
    cashOnHand: number
    closeFn: () => void
    confirmed: boolean
    confirmFn: () => void
    loading: boolean
    ptlPlayer: PtlPlayer
}

/**
 * BuyConfirmer Component
 */
const BuyConfirmer = ( props: BuyConfirmerProps ) => {
    const [ understands, setUnderstands ] = React.useState( false )
    const size = React.useContext( ResponsiveContext )
    const history = useHistory()

    const inputWidths = size === "small" ? "160px" : "215px"
    const textBoxMargin = { left: size === "small" ? "medium" : "" }

    if( props.confirmed ) {
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
    else if( props.loading ) {
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
                                        may be higher than the price shown.
                                    </Text>
                                </Box>
                            )}
                        />
                    </Box>
                    <Button
                        disabled={!understands}
                        label="Confirm"
                        margin={{ top: "small" }}
                        onClick={props.confirmFn}
                        primary
                    />
                </Box>
            </Modal>
        )
    }
}

/*******************************************************************************
 *
 * SellSection
 *
 ******************************************************************************/

/**
 * Props for SellSection
 */
interface SellSectionProps {
    ptlPlayer: PtlPlayer
}

/**
 * SellSection Component
 */
const SellSection = ( props: SellSectionProps ) => {
    const size = React.useContext( ResponsiveContext )

    return (
        <Card
            border={{ color: COLORS["light-6"] }}
            width={size === "small" ? "100%" : "48%"}
        >
            <CardHeader
                background={COLORS["light-2"]}
                border={{ color: COLORS["light-5"], side: "bottom" }}
                justify="start"
                pad={{ horizontal: "small", vertical: "small" }}
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">Sell</Text>
            </CardHeader>
            <CardBody
                height={{ min: "xsmall" }}
                gap="small"
                justify="center"
                pad="small"
            >
                <Text color={COLORS["status-warning"]} textAlign="center">
                    You may not sell {props.ptlPlayer.displayName} stock. This
                    player is not in your portfolio.
                </Text>
            </CardBody>
        </Card>
    )
}

export default OrderPlacer