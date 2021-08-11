import * as React from "react"
import { Box, Button, Text, TextInput } from "grommet"
import { Currency, PieChart } from "grommet-icons"
import { PtlPlayer } from "../../functions/src/data/types"
import useCashOnHand from "../misc/use-cash-on-hand"
import HeaderedCard from "./headered-card"
import { truncateTwoDecimals } from "../misc/helpers"
import BuyConfirmModal from "./modals/buy-confirm-modal"
import { UserContext } from "../misc/user-provider"
import { useHistory } from "react-router-dom"
import { COLORS } from "../misc/colors"
import useExistingPlacedOrders from "../misc/use-existing-placed-orders"

/*******************************************************************************
 *
 * BuyCard
 *
 ******************************************************************************/

/**
 * Props for BuyCard
 */
 interface BuyCardProps {
    ptlPlayer: PtlPlayer
}

/**
 * BuyCard Component
 */
const BuyCard = ( props: BuyCardProps ) => {
    const { user } = React.useContext( UserContext )
    const [ confirmerOpen, setConfirmerOpen ] = React.useState( false )
    const [ amount, setAmount ] = React.useState( 0 )
    const [ cashOnHand, cashOnHandLoading ] = useCashOnHand()
    const [ existingOrders, existingOrdersLoading ] = useExistingPlacedOrders(
        props.ptlPlayer.displayName,
        user?.uid
    )

    /**
     * If an order already exists for this player, short circuit the component
     */
    if( !confirmerOpen && existingOrders.length ) {
        return (
            <ExistingOrderBuyCard ptlPlayer={props.ptlPlayer} />
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
            addlCardBodyProps={{
                gap: "small",
                justify: "between",
                pad: "small",
                responsive: false
            }}
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
                <Text>Amount to Invest:</Text>
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
 * ExistingOrderBuyCard
 *
 ******************************************************************************/

/**
 * Props for ExistingOrderBuyCard
 */
 interface ExistingOrderBuyCardProps {
    ptlPlayer: PtlPlayer
}

/**
 * ExistingOrderBuyCard Component
 */
const ExistingOrderBuyCard = ( props: ExistingOrderBuyCardProps ) => {
    const history = useHistory()

    return (
        <HeaderedCard addlCardBodyProps={{ pad: "small" }} title="Buy">
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
        </HeaderedCard>
    )
}

export default BuyCard
