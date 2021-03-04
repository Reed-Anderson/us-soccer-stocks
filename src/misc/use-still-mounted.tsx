import * as React from "react"

/******************************************************************************
 *
 * Custom hook to track whether the component has been unmounted
 *
 *****************************************************************************/
const useStillMounted = () => {
    /* Initialize stillMounted reference to true */
    const stillMounted = React.useRef( true )

    /* On cleanup, set stillMounted to false */
    React.useEffect( () => {
        return () => {
            stillMounted.current = false
        }
    }, [] )

    /* Return the value of stillMounted */
    return stillMounted
}

export default useStillMounted