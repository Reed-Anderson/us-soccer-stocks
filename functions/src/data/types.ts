/*******************************************************************************
 *
 * PostTransactionLog
 *
 ******************************************************************************/

export interface User {
    cashOnHand: number
    description: string
    uid: string
}

/*******************************************************************************
 *
 * PostTransactionLog
 *
 ******************************************************************************/

export interface PostTransactionLog {
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
    "Placed",
    "Cancelled",
    "Fulfilled"
}

export interface Order {
    creationDate: Date
    playerId: string
    status: OrderStatus
    userId: string
    value: number
}