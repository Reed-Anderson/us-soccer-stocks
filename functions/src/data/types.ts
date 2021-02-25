export interface PostTransactionLog {
    players: PostTransactionLogPlayer[]
    users: any[]
}

export interface PostTransactionLogPlayer {
    displayName: string
    position: string
    previousValue?: number
    value: number
}