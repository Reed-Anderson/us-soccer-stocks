import {
    Box,
    Card,
    CardBody,
    CardHeader,
    ResponsiveContext,
    Text
} from "grommet"
import * as React from "react"
import { PostTransactionLog, PtlPlayer } from "../../functions/src/data/types"
import { COLORS } from "../misc/colors"
import { useDocumentData } from "../misc/firebase-hooks"

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
        ptlLoading
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
            height="medium"
            justify="between"
            margin="medium"
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
    const size = React.useContext( ResponsiveContext )

    return (
        <Card width={size === "small" ? "100%" : "48%"}>
            <CardHeader
                border={{ color: COLORS["light-5"], side: "bottom" }}
                justify="start"
                pad={{ horizontal: "small", vertical: "small" }}
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">Buy</Text>
            </CardHeader>
            <CardBody justify="center" pad="small">
                <Text color={COLORS["status-warning"]} textAlign="center">
                    You may not sell {props.ptlPlayer.displayName} stock. This
                    player is not in your portfolio.
                </Text>
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
        <Card width={size === "small" ? "100%" : "48%"}>
            <CardHeader
                border={{ color: COLORS["light-5"], side: "bottom" }}
                justify="start"
                pad={{ horizontal: "small", vertical: "small" }}
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">Sell</Text>
            </CardHeader>
            <CardBody justify="center" pad="small">
                <Text color={COLORS["status-warning"]} textAlign="center">
                    You may not sell {props.ptlPlayer.displayName} stock. This
                    player is not in your portfolio.
                </Text>
            </CardBody>
        </Card>
    )
}

export default OrderPlacer