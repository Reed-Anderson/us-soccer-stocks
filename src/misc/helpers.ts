import firebase from 'firebase/app'

const twoDecimalRegex = /^-?\d+(?:\.\d{0,2})?/

export const truncateTwoDecimals = ( num: number | string ) => {
    return +num.toString().match( twoDecimalRegex )[ 0 ]
}

export const timestampToDate = ( ts: firebase.firestore.Timestamp ) => {
    const date = ts.toDate()
    return `${date.getMonth() + 1}/${date.getDate()}`
}