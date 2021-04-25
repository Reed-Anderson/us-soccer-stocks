import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    ResponsiveContext,
    Text
} from "grommet"
import { Optimize } from "grommet-icons"
import * as React from "react"
import { useHistory } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import { dividendToText, Position } from "../../functions/src/data/types"
import { COLORS } from "../misc/colors"
import { useDocumentData } from "../misc/firebase-hooks"
import { GrowDiv } from "./simple-divs"

/*******************************************************************************
 *
 * PositionCard
 *
 ******************************************************************************/

/**
 * Props for PositionCard
 */
interface PositionCardProps {
    positionName: string
}

/**
 * PositionCard Component
 */
const PositionCard = ( props: PositionCardProps ) => {
    const [
        position,
        positionLoading
    ] = useDocumentData<Position>( `positions/${props.positionName}` )
    const history = useHistory()

    if( positionLoading ) {
        return (
            <Card
                align="center"
                border
                height="small"
                justify="center"
                width="large"
            >
                <SyncLoader color={COLORS["accent-4"]} margin={5} size={20} />
            </Card>
        )
    }

    return (
        <Card
            border={{ color: COLORS["light-6"] }}
            flex={false}
            margin={{ bottom: "medium" }}
            width="large"
        >
            <CardHeader
                border={{ color: COLORS["light-5"], side: "bottom" }}
                background={COLORS["light-2"]}
                justify="start"
                gap="none"
                pad={{ horizontal: "small", vertical: "xsmall" }}
                style={{ textTransform: "capitalize" }}
            >
                <Text weight="bold">Position:</Text>
                <Text margin="xsmall">{props.positionName}</Text>
                <GrowDiv />
                <Button
                    color={COLORS["dark-2"]}
                    icon={<Optimize />}
                    hoverIndicator={COLORS["light-4"]}
                    label="Players"
                    onClick={() => history.push( "/players" )}
                    plain
                    style={{ padding: 5, textTransform: "capitalize" }}
                />
            </CardHeader>
            <CardBody direction="row" flex pad="small" wrap>
                {position && (
                    Object.keys( position ).map(
                        ( key: keyof Position, index ) => (
                            <DividendTag
                                key={key}
                                dividendName={key}
                                dividendValue={position[ key ]}
                                index={index}
                            />
                        )
                    )
                )}
            </CardBody>
            <CardFooter
                border={{ color: COLORS["light-4"], side: "top" }}
                pad={{ horizontal: "small", vertical: "xsmall" }}
            >
                <Text size="small">
                    Points earned increase 50% for competitive games.
                </Text>
            </CardFooter>
        </Card>
    )
}

/*******************************************************************************
 *
 * DividendTag
 *
 ******************************************************************************/

/**
 * Props for DividendTag
 */
interface DividendTagProps {
    dividendName: keyof Position
    dividendValue: number
    index: number
}

/**
 * DividendTag Component
 */
const DividendTag = ( props: DividendTagProps ) => {
    const size = React.useContext( ResponsiveContext )

    const divLabel = dividendToText( props.dividendName )
    if( !divLabel ) {
        return null
    }

    const bgc = ( () => {
        switch( props.index % 4 ) {
            case 0:
                return COLORS["accent-1"]
            case 1:
                return COLORS["accent-2"]
            case 2:
                return COLORS["accent-3"]
            case 3:
                return COLORS["accent-4"]
        }
    } )()

    return (
        <div style={{ minWidth: "50%" }}>
            <Box
                background={{ color: bgc, opacity: .25 }}
                margin={size === "small" ? "small" : "xsmall"}
                pad="xsmall"
                style={{ borderRadius: 5, display: "inline-block" }}
            >
                {divLabel}: {props.dividendValue}
            </Box>
        </div>
    )
}

export default PositionCard