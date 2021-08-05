import firebase from "firebase"
import { COLORS } from '../../../src/misc/colors'

/*******************************************************************************
 *
 * Constants
 *
 ******************************************************************************/
export const NEW_USER_CASH_AMOUNT = 600

/*******************************************************************************
 *
 * PostTransactionLog
 *
 ******************************************************************************/

export interface User {
    cashOnHand: number
    biography: string
    displayName: string
    twitterHandle: string
    uid: string
}

/*******************************************************************************
 *
 * PostTransactionLog
 *
 ******************************************************************************/

export interface PostTransactionLog {
    creationDate: firebase.firestore.Timestamp
    players: PtlPlayer[]
    users: PtlUser[]
}

export interface PtlPlayer {
    displayName: string
    position: string
    previousValue?: number
    value: number
}

export interface PtlUser {
    displayName: string
    netWorth: number
    uid: string
}

export const ptlGetPositionsAndPlayers = ( ptl: PostTransactionLog ) => {
    const positionSet: Set<string> = new Set()
    const newPlayers: PtlPlayer[] = []
    ptl.players.forEach( player => {
        newPlayers.push( player )
        positionSet.add( player[ 'position' ] )
    } )
    const positions = Array.from( positionSet ).sort()

    return [ positions, newPlayers ] as [ string[], PtlPlayer[] ]
}

/*******************************************************************************
 *
 * Players
 *
 ******************************************************************************/

export interface Player {
    dividendsEarned: number,
    firstName: string,
    lastName: string,
    position: string,
    team: string
}

/*******************************************************************************
 *
 * Positions
 *
 ******************************************************************************/

export interface Position {
    dividendPerAssist?: number
    dividendPerCallup?: number
    dividendPerGoal?: number
    dividendPerGoalConcede?: number
    dividendPerMinute?: number
    dividendPerTeamGoal?: number
}

export const dividendToText = ( dividend: keyof Position ) => {
    switch( dividend ) {
        case "dividendPerAssist":
            return "Dividend per assist"
        case "dividendPerCallup":
            return "Dividend per callup"
        case "dividendPerGoal":
            return "Dividend per goal"
        case "dividendPerGoalConcede":
            return "Dividend per conceded goal"
        case "dividendPerMinute":
            return "Dividend per minute"
        case "dividendPerTeamGoal":
            return "Dividend per team goal"
        default:
            return ""
    }
}

/*******************************************************************************
 *
 * Orders
 *
 ******************************************************************************/

export enum OrderStatus {
    Placed = "Placed",
    Cancelled = "Cancelled",
    Fulfilled = "Fulfilled"
}

export interface Order {
    creationDate: firebase.firestore.Timestamp
    playerId: string
    status: OrderStatus
    type: "Buy" | "Sell"
    uid: string
    userId: string
    value: number
}

export const getOrderStatusColor = ( status: OrderStatus ) => {
    switch( status ) {
        case OrderStatus.Placed:
            return COLORS[ "neutral-3" ]
        case OrderStatus.Fulfilled:
            return COLORS[ "status-ok" ]
        case OrderStatus.Cancelled:
            return COLORS[ "status-critical" ]
    }
}