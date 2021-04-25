import * as React from "react"
import { BoxTypes, Card, CardBody, CardHeader, Text } from "grommet"
import { COLORS } from "../misc/colors"

/*******************************************************************************
 *
 * HeaderedCard
 *
 ******************************************************************************/

/**
 * Props for HeaderedCard
 */
interface HeaderedCardProps {
    addlCardProps?: BoxTypes
    title: string
}

/**
 * HeaderedCard Component
 */
const HeaderedCard: React.FC<HeaderedCardProps> = props => {
    return (
        <Card border={{ color: COLORS["light-5"] }} {...props.addlCardProps}>
            <CardHeader
                background={COLORS["light-2"]}
                border={{ color: COLORS["light-5"], side: "bottom" }}
                justify="start"
                pad={{ horizontal: "small", vertical: "small" }}
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">{props.title}</Text>
            </CardHeader>
            <CardBody>
                {props.children}
            </CardBody>
        </Card>
    )
}

export default HeaderedCard
