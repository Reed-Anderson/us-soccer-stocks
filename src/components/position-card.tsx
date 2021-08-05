import { Box, Button, ResponsiveContext } from "grommet"
import { Optimize } from "grommet-icons"
import * as React from "react"
import { useHistory } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import { dividendToText, Position } from "../../functions/src/data/types"
import { COLORS } from "../misc/colors"
import { useDocumentData } from "../misc/firebase-hooks"
import HeaderedCard from "./headered-card"

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
        position
    ] = useDocumentData<Position>( `positions/${props.positionName}` )

    if( !position ) {
        return (
            <HeaderedCard
                addlCardBodyProps={{ align: "center", justify: "center" }}
                secondaryTitle={props.positionName}
                title="Position:"
            >
                <SyncLoader color={COLORS["accent-4"]} margin={5} size={20} />
            </HeaderedCard>
        )
    }

    const footerText = `Dividends earned increase 50% for competitive games and
        100% for World Cup games.`

    return (
        <HeaderedCard
            addlCardBodyProps={{
                direction: "row",
                flex: true,
                pad: "small",
                wrap: true
            }}
            footerText={footerText}
            rightHeaderElement={<PlayersButton />}
            secondaryTitle={props.positionName}
            title="Position:"
        >
            {Object.keys( position ).map(
                ( key: keyof Position, index ) => (
                    <DividendTag
                        key={key}
                        dividendName={key}
                        dividendValue={position[ key ]}
                        index={index}
                    />
                )
            )}
        </HeaderedCard>
    )
}

/*******************************************************************************
 *
 * PlayersButton
 *
 ******************************************************************************/

/**
 * PlayersButton Component
 */
const PlayersButton = () => {
    const history = useHistory()

    return (
        <Button
            color={COLORS["dark-2"]}
            icon={<Optimize />}
            hoverIndicator={COLORS["light-4"]}
            label="Players"
            onClick={() => history.push( "/players" )}
            plain
            style={{ padding: 5, textTransform: "capitalize" }}
        />
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