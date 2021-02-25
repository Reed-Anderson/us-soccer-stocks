import { app } from "firebase-admin"
import * as functions from "firebase-functions"
import { PostTransactionLogPlayer, PostTransactionLog } from "./data/types"
import { getCollection } from "./utils"

/**
 * Creates the first PostTransactionLog from all players in the database
 */
export const initPostTransactionLog = functions.https.onRequest(
    async ( req, res ) => {
        const postTransLogPlayers: PostTransactionLogPlayer[] = []

        const players = await getCollection( `players` )
        players.forEach( playerDoc => {
            /* Push each player into the array with a value of 0 */
            postTransLogPlayers.push( {
                displayName: playerDoc.id,
                position: playerDoc.data().position,
                value: 0
            } )
        } )

        /* Set the first postTransactionLog */
        const docRef = app().firestore().doc( "/postTransactionLogs/1" )
        const postTransactionLog: PostTransactionLog = {
            players: postTransLogPlayers,
            users: []
        }
        docRef.set( postTransactionLog )

        res.sendStatus( 200 )
    }
)