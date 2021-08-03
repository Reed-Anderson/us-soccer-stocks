import * as React from "react"
import { Order, OrderStatus } from "../../functions/src/data/types"
import { useCollection } from "./firebase-hooks"
import { UserContext } from "./user-provider"

/*******************************************************************************
 *
 * Custom hook to track a user's cash on hand
 *
 ******************************************************************************/
const useCashOnHand = (): [ number, boolean ] => {
    const [ cashOnHand, setCashOnHand ] = React.useState( 0 )
    const { user } = React.useContext( UserContext )
    const [ ordersPlaced, ordersPlacedLoading ] = useCollection<Order>(
        "orders",
        [
            [ "userId", "==", user?.uid || "" ],
            [ "status", "==", OrderStatus.Placed ]
        ]
    )

    const cashOnHandLoading = !user || ordersPlacedLoading

    React.useEffect( () => {
        if( !cashOnHandLoading ) {
            const placeCashed = ordersPlaced.reduce( ( sum, order ) => {
                return sum + order.value
            }, 0 )
            setCashOnHand( user.cashOnHand - placeCashed )
        }
    }, [ user, ordersPlaced ] )

    return [ cashOnHand, cashOnHandLoading ]
}

export default useCashOnHand
