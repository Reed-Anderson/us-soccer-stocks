import { Box, Select, Text } from "grommet"
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
 * Options for selection
 */
const options = [ "Buy", "Sell" ]

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

    const [ option, setOption ] = React.useState( options[ 0 ] )

    if( ptlLoading ) {
        return (
            null
        )
    }

    return (
        <Box
            border={{ color: COLORS["light-4"] }}
            height="medium"
            margin="medium"
            pad="small"
            round="3px"
            width="large"
        >
            <Select
                onChange={e => setOption( e.value )}
                options={options}
                value={option}
            />
            {option === "Buy" && (
                <BuySection />
            )}
            {option === "Sell" && (
                <SellSection ptlPlayer={ptlPlayer} />
            )}
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

}

/**
 * BuySection Component
 */
const BuySection = ( props: BuySectionProps ) => {
    return <div />
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
    return (
        <Box alignContent="center" fill justify="around">
            <Text color={COLORS["status-warning"]} textAlign="center" > 
                You may not sell {props.ptlPlayer.displayName} stock. This
                player is not in your portfolio.
            </Text>
        </Box>
    )
}

export default OrderPlacer