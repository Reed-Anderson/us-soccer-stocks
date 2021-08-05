import { Box, Grid, GridProps, Heading, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import BuyCard from '../components/buy-card'
import FullPageLoader from '../components/full-page-loader'
import MainHeader from '../components/main-header'
import PositionCard from '../components/position-card'
import SellCard from '../components/sell-card'
import { SubHeader } from '../components/simple-divs'
import useLatestPtl from '../misc/use-latest-ptl'

/*******************************************************************************
 *
 * PlayerView
 *
 ******************************************************************************/

/**
 * Props for PlayerView
 */
interface PlayerViewParams {
    playerId: string
}

/**
 * PlayerView Component
 */
const PlayerView = () => {
    const params = useParams<PlayerViewParams>()
    const size = React.useContext( ResponsiveContext )
    const [ ptl, ptlLoading ] = useLatestPtl()
    const ptlPlayer = React.useMemo( () => {
        return ptl?.players.find( ptlPlayer =>
            ptlPlayer.displayName === params.playerId
        )
    }, [ ptl, params.playerId ] )

    if( ptlLoading ) {
        return (
            <>
                <MainHeader />
                <FullPageLoader />
            </>
        )
    }

    return (
        <>
            <MainHeader />
            <SubHeader addlProps={{ pad: { horizontal: "medium" } }}>
                <Heading>{params.playerId}</Heading>
                <Grid
                    {...getGridProps( size )}
                    gap="small"
                    margin={{ bottom: "medium" }}
                >
                    <Box gridArea="buy">
                        <BuyCard ptlPlayer={ptlPlayer} />
                    </Box>
                    <Box gridArea="sell">
                        <SellCard ptlPlayer={ptlPlayer} />
                    </Box>
                    <Box gridArea="order">
                        <PositionCard positionName={ptlPlayer.position} />
                    </Box>
                </Grid>
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * Utils
 *
 ******************************************************************************/

const getGridProps = ( size: string ): GridProps => {
    if( size === "small" ) {
        return {
            areas: [
                [ "buy" ],
                [ "sell" ],
                [ "order" ]
            ],
            rows: [ "225px", "200px", "275px" ]
        }
    }
    else {
        return {
            areas: [
                [ "buy", "sell" ],
                [ "order", "order" ]
            ],
            columns: [ "medium", "medium" ],
            rows: [ "225px", "200px" ]
        }
    }
}

export default PlayerView
