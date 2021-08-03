import {
    Box,
    BoxTypes,
    Button,
    Card,
    CardBody,
    CardHeader,
    ResponsiveContext,
    Text,
    TextInput
} from "grommet"
import { Currency, PieChart } from "grommet-icons"
import * as React from "react"
import {
    Order,
    OrderStatus,
    PostTransactionLog,
    PtlPlayer
} from "../../functions/src/data/types"
import { COLORS } from "../misc/colors"
import { useCollection, useDocumentData } from "../misc/firebase-hooks"
import useCashOnHand from "../misc/use-cash-on-hand"
import HeaderedCard from "./headered-card"
import { truncateTwoDecimals } from "../misc/helpers"
import BuyConfirmModal from "./buy-confirm-modal"
import { UserContext } from "../misc/user-provider"
import { useHistory } from "react-router-dom"

/*******************************************************************************
 *
 * Reused Types and Consts
 *
 ******************************************************************************/

const smallTileProps = ( size: string ) => ( {
    width: size === "small" ? "100%" : "48%"
} )

const smallTileBodyProps: BoxTypes = {
    height: { min: "xsmall" },
    gap: "small",
    justify: "center",
    pad: "small"
}

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
    const size = React.useContext( ResponsiveContext )
    const { user } = React.useContext( UserContext )
    const [ confirmerOpen, setConfirmerOpen ] = React.useState( false )
    const [ amount, setAmount ] = React.useState( 0 )
    const [ cashOnHand, cashOnHandLoading ] = useCashOnHand()
    const [
        existingOrders,
        existingOrdersLoading
    ] = useCollection<Order>(
        "orders",
        [
            [ "userId", "==", user?.uid || "" ],
            [ "status", "==", OrderStatus.Placed ]
        ]
    )

    /**
     * If an order already exists for this player, short circuit the component
     */
    if( existingOrders.length ) {
        return (
            <ExistingOrderBuySection ptlPlayer={props.ptlPlayer} />
        )
    }

    /**
     * Truncate number to two decimal places
     */
    const setAmountTrunc = ( num: number ) => {
        setAmount( truncateTwoDecimals( num ) )
    }

    return (
        <HeaderedCard
            addlCardProps={smallTileProps( size )}
            addlCardBodyProps={smallTileBodyProps}
            loading={existingOrdersLoading || cashOnHandLoading}
            title="Buy"
        >
            {confirmerOpen && (
                <BuyConfirmModal
                    amount={amount}
                    cashOnHand={cashOnHand}
                    closeFn={() => setConfirmerOpen( false )}
                    ptlPlayer={props.ptlPlayer}
                />
            )}
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
        </HeaderedCard>
    )
}

/*******************************************************************************
 *
 * ExistingOrderBuySection
 *
 ******************************************************************************/

/**
 * Props for ExistingOrderBuySection
 */
interface ExistingOrderBuySectionProps {
    ptlPlayer: PtlPlayer
}

/**
 * ExistingOrderBuySection Component
 */
const ExistingOrderBuySection = ( props: ExistingOrderBuySectionProps ) => {
    const history = useHistory()
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
                <Box height="100%" justify="center">
                    <Text
                        color={COLORS["dark-2"]}
                        textAlign="center"
                        size="small"
                    >
                        You already have an unprocessed order for&nbsp;
                        {props.ptlPlayer.displayName} stock. The existing order
                        can be cancelled, but you may not create another one.
                    </Text>
                </Box>
                <Button
                    icon={<PieChart />}
                    label="Portfolio"
                    onClick={() => history.push( "/portfolio" )}
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
    const history = useHistory()
    const size = React.useContext( ResponsiveContext )

    return (
        <HeaderedCard
            addlCardProps={smallTileProps( size )}
            addlCardBodyProps={smallTileBodyProps}
            title="Sell"
        >
            <Box height="100%" justify="center">
                <Text
                    color={COLORS["dark-2"]}
                    textAlign="center"
                    size="small"
                >
                    You may not sell {props.ptlPlayer.displayName} stock. This
                    player is not in your portfolio.
                </Text>
            </Box>
            <Button
                icon={<PieChart />}
                label="Portfolio"
                onClick={() => history.push( "/portfolio" )}
            />
        </HeaderedCard>
    )
}

export default OrderPlacer