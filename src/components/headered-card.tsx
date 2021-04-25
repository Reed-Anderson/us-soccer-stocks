import * as React from "react"
import { BoxTypes, Card, CardBody, CardHeader, Text } from "grommet"
import { COLORS } from "../misc/colors"
import { GrowDiv } from "./simple-divs"

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
    rightHeaderElement?: JSX.Element
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
                <GrowDiv />
                {props.rightHeaderElement}
            </CardHeader>
            <CardBody>
                {props.children}
            </CardBody>
        </Card>
    )
}

export default HeaderedCard
