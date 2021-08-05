import { Box, Button, Text } from "grommet"
import { PieChart } from "grommet-icons"
import * as React from "react"
import { PtlPlayer } from "../../functions/src/data/types"
import { COLORS } from "../misc/colors"
import HeaderedCard from "./headered-card"
import { useHistory } from "react-router-dom"

/*******************************************************************************
 *
 * SellCard
 *
 ******************************************************************************/

/**
 * Props for SellCard
 */
 interface SellCardProps {
    ptlPlayer: PtlPlayer
}

/**
 * SellCard Component
 */
const SellCard = ( props: SellCardProps ) => {
    const history = useHistory()

    return (
        <HeaderedCard
            addlCardBodyProps={{ pad: "small", responsive: false }}
            title="Sell"
        >
            <Box height="100%" justify="center">
                <Text
                    color={COLORS["dark-2"]}
                    textAlign="center"
                    size="small"
                >
                    You may not sell {props.ptlPlayer.displayName} stock. This
                    player is not in your portfolio.
                </Text>
            </Box>
            <Button
                icon={<PieChart />}
                label="Portfolio"
                onClick={() => history.push( "/portfolio" )}
            />
        </HeaderedCard>
    )
}

export default SellCard
