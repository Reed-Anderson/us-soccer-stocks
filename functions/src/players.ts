import { app } from "firebase-admin"
import * as functions from "firebase-functions"
import { players } from "./data/player-data"

export const initAllPlayers = functions.https.onRequest( async ( req, res ) => {
    const batch = app().firestore().batch()

    let position: keyof typeof players
    for( position in players ) {
        const playersInPosition = players[ position ]
        playersInPosition.forEach( player => {
            const id = `${player.firstName} ${player.lastName}`
            const url = `players/${id}`
            const docRef = app().firestore().doc( url )
            batch.set( docRef, {
                ...player,
                dividendsEarned: 0,
                position: position
            } )
        } )
    }

    const result = await batch.commit()
    res.send( result )
} )
