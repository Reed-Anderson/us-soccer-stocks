import * as React from "react"
import { Order, OrderStatus } from "../../functions/src/data/types"
import { useCollection } from "./firebase-hooks"
import { UserContext } from "./user-provider"

/*******************************************************************************
 *
 * Custom hook to track a user's cash on hand
 *
 ******************************************************************************/
const useCashOnHand = () => {
    const [ cashOnHand, setCashOnHand ] = React.useState( 0 )
    const { user } = React.useContext( UserContext )
    const [ ordersPlaced ] = useCollection<Order>(
        "orders",
        [
            [ "userId", "==", user?.uid || "" ],
            [ "status", "==", OrderStatus.Placed ]
        ]
    )


    React.useEffect( () => {
        if( user && ordersPlaced.length ) {
            const placeCashed = ordersPlaced.reduce( ( sum, order ) => {
                return sum + order.value
            }, 0 )
            setCashOnHand( user.cashOnHand - placeCashed )
        }
        else {
            setCashOnHand( 0 )
        }
    }, [ user, ordersPlaced ] )

    return cashOnHand
}

export default useCashOnHand
