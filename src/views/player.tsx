import { Heading } from 'grommet'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Player } from '../../functions/src/data/types'
import FullPageLoader from '../components/full-page-loader'
import MainHeader from '../components/main-header'
import OrderPlacer from '../components/order-placer'
import PositionCard from '../components/position-card'
import { SubHeader } from '../components/simple-divs'
import { useDocumentData } from '../misc/firebase-hooks'

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
    const [
        player,
        playerLoading
    ] = useDocumentData<Player>( `players/${params.playerId}` )

    return (
        <>
            <MainHeader />
            {playerLoading ? (
                <FullPageLoader />
            ) : (
                <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                    <Heading>{params.playerId}</Heading>
                    {player && (
                        <OrderPlacer playerId={params.playerId} />
                    )}
                    {player?.position && (
                        <PositionCard positionName={player.position} />
                    )}
                </SubHeader>
            )}
        </>
    )
}

export default PlayerView