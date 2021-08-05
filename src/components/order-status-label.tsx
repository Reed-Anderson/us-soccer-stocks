import * as React from 'react'
import { Box, Text } from 'grommet'
import {
    getOrderStatusColor,
    OrderStatus
} from '../../functions/src/data/types'

/*******************************************************************************
 *
 * OrderStatusLabel
 *
 ******************************************************************************/

/**
 * Props for OrderStatusLabel
 */
 interface OrderStatusLabelProps {
    status: OrderStatus
}

/**
 * OrderStatusLabel Component
 */
const OrderStatusLabel = ( props: OrderStatusLabelProps ) => {
    return (
        <Box
            background={{
                color: getOrderStatusColor( props.status ),
                opacity: .25
            }}
            pad="xsmall"
            style={{
                borderRadius: 5,
                display: "inline-block",
                padding: "2px 6px",
                width: "fit-content"
            }}
        >
            <Text size="xsmall">
                {props.status}
            </Text>
        </Box>
    )
}

export default OrderStatusLabel
