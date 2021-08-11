import { Order, OrderStatus } from "../../functions/src/data/types"
import { useCollection } from "./firebase-hooks"

const useExistingPlacedOrders = ( playerId: string, userId: string ) => {
    return useCollection<Order>(
        "orders",
        [
            [ "playerId", "==", playerId ],
            [ "status", "==", OrderStatus.Placed ],
            [ "userId", "==", userId ]
        ]
    )
}

export default useExistingPlacedOrders
