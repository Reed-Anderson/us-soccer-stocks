import * as React from 'react'
import { Order } from '../../functions/src/data/types'
import HeaderedCard from './headered-card'

/*******************************************************************************
 *
 * PortfolioList
 *
 ******************************************************************************/

/**
 * PortfolioList Component
 */
 const PortfolioList = () => {
    const [
        orders,
        ordersLoading
    ] = [ [] as Order[], false ]

    return (
        <HeaderedCard
            loading={ordersLoading}
            message={!orders.length ? "No players in this portfolio." : ""}
            title="Player Portfolio"
        >
            {orders.map( order => (
                <div key={order.uid}>
                    {order.playerId}
                </div>
            ) )}
        </HeaderedCard>
    )
}

export default PortfolioList
