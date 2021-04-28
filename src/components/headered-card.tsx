import * as React from "react"
import { Box, BoxTypes, Card, CardBody, CardHeader, Text } from "grommet"
import { COLORS } from "../misc/colors"
import { GrowDiv } from "./simple-divs"
import { HashLoader } from "react-spinners"

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
    loading?: boolean
    message?: string
    rightHeaderElement?: JSX.Element
    title: string
}

/**
 * HeaderedCard Component
 */
const HeaderedCard: React.FC<HeaderedCardProps> = props => {
    return (
        <Card
            border={{ color: COLORS["light-5"] }}
            height="100%"
            {...props.addlCardProps}
        >
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
            <CardBody overflow="auto">
                {props.loading && (
                    <Box align="center" fill justify="center">
                        <HashLoader color={COLORS['neutral-3']} />
                    </Box>
                )}
                {!props.loading && props.message && (
                    <Box align="center" fill justify="center">
                        <Text color={COLORS['status-warning']}>
                            {props.message}
                        </Text>
                    </Box>
                )}
                {props.children}
            </CardBody>
        </Card>
    )
}

export default HeaderedCard
