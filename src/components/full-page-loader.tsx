import * as React from "react"
import { Box, ResponsiveContext } from "grommet"
import { MoonLoader } from "react-spinners"
import { COLORS } from "../misc/colors"

/*******************************************************************************
 *
 * FullPageLoader
 *
 ******************************************************************************/

/**
 * FullPageLoader Component
 */
const FullPageLoader = () => {
    const size = React.useContext( ResponsiveContext )
    return (
        <Box
            align="center"
            fill
            justify="center"
            pad={{ bottom: size === "small" ? "none" : "250px" }}
        >
            <MoonLoader color={COLORS["accent-4"]} size={200} />
        </Box>
    )
}

export default FullPageLoader