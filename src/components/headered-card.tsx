import * as React from "react"
import {
    Box,
    BoxTypes,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Text
} from "grommet"
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
    addlCardBodyProps?: BoxTypes
    footerText?: string
    loading?: boolean
    message?: string
    rightHeaderElement?: JSX.Element
    secondaryTitle?: string
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
                gap="none"
                height="xxsmall"
                pad={{ horizontal: "small" }}
                responsive={false}
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">
                    {props.title}
                </Text>
                {props.secondaryTitle && (
                    <Text margin={{ horizontal: "xsmall" }}>
                        {props.secondaryTitle}
                    </Text>
                )}
                <GrowDiv />
                {props.rightHeaderElement}
            </CardHeader>
            <CardBody overflow="auto" {...props.addlCardBodyProps}>
                {props.loading && (
                    <Box align="center" fill justify="center">
                        <HashLoader color={COLORS['neutral-3']} />
                    </Box>
                )}
                {!props.loading && (
                    props.message ? (
                        <Box align="center" fill justify="center">
                            <Text color={COLORS['status-warning']}>
                                {props.message}
                            </Text>
                        </Box>
                    ) : (
                        props.children
                    )
                )}
            </CardBody>
            {props.footerText && (
                <CardFooter
                    background={`${COLORS["light-1"]}99`}
                    border={{ color: COLORS["light-4"], side: "top" }}
                    pad={{ horizontal: "small", vertical: "xsmall" }}
                >
                    <Text size="small">
                        {props.footerText}
                    </Text>
                </CardFooter>
            )}
        </Card>
    )
}

export default HeaderedCard
