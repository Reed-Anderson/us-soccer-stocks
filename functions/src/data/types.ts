export interface PostTransactionLog {
    players: PtlPlayer[]
    users: any[]
}

export interface PtlPlayer {
    displayName: string
    position: string
    previousValue?: number
    value: number
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