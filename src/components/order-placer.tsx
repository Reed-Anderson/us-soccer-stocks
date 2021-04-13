import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    ResponsiveContext,
    Text,
    TextInput
} from "grommet"
import { Currency } from "grommet-icons"
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
        ptl,
        ptlLoading // TODO: Use
    ] = useDocumentData<PostTransactionLog>( "postTransactionLogs/1" )

    const [ ptlPlayer, setPtlPlayer ] = React.useState( null as PtlPlayer )
    React.useEffect( () => {
        setPtlPlayer(
            ptl?.players.find( player => player.displayName === props.playerId )
        )
    }, [ ptl ] )

    if( !ptlPlayer ) {
        return (
            null
        )
    }

    return (
        <Box
            direction="row"
            flex={false}
            height={{ min: "small" }}
            justify="between"
            width="large"
            wrap={true}
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
    const [ amount, setAmount ] = React.useState( 0 )
    const size = React.useContext( ResponsiveContext )
    const user = React.useContext( UserContext )
    const cashOnHand = 997.30

    /**
     * Truncate number to two decimal places
     */
    const setAmountTrunc = ( num: number ) => {
        setAmount( +num.toString().match( /^-?\d+(?:\.\d{0,2})?/ )[ 0 ] )
    }

    /**
     * TODO: A lot. At least put this behind a confirmation modal.
     */
    const placeOrder = () => {
        const order: Order = {
            creationDate: new Date(),
            playerId: props.ptlPlayer.displayName,
            status: OrderStatus.Placed,
            userId: user.user.uid,
            value: amount
        }

        firebase.app().firestore().doc( "orders/afjksldfjasehf" ).set( order )
    }

    return (
        <Card
            border
            margin={{ vertical: "medium" }}
            width={size === "small" ? "100%" : "48%"}
        >
            <CardHeader
                border={{ color: COLORS["light-5"], side: "bottom" }}
                justify="start"
                pad={{ horizontal: "small", vertical: "small" }}
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
                    <Text>Cash on Hand:</Text>
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
                    onClick={placeOrder}
                />
            </CardBody>
        </Card>
    )
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
            border
            margin={{ vertical: "medium" }}
            width={size === "small" ? "100%" : "48%"}
        >
            <CardHeader
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