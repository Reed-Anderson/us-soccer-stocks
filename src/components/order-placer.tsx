import { Box, Select } from "grommet"
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
    ] = useDocumentData<PostTransactionLog>( "postTransactionLog/1" )

    const [ ptlPlayer, setPtlPlayer ] = React.useState( null as PtlPlayer )
    React.useEffect( () => {
        setPtlPlayer(
            ptl?.players.find( player => player.displayName === props.playerId )
        )
    }, [ ptl ] )

    const

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
            width="large"
        >
            <Select
                options={options}
            />
            {ptlPlayer?.value}
        </Box>
    )
}

export default OrderPlacer