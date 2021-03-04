import * as React from 'react'
import { useParams } from 'react-router-dom'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'

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

    return (
        <>
            <MainHeader />
            <SubHeader>
                <h1>{params.playerId}</h1>
            </SubHeader>
        </>
    )
}

export default PlayerView