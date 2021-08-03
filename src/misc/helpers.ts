
const twoDecimalRegex = /^-?\d+(?:\.\d{0,2})?/

export const truncateTwoDecimals = ( num: number | string ) => {
    return +num.toString().match( twoDecimalRegex )[ 0 ]
}