import { Box, BoxProps } from "grommet"
import * as React from "react"
import styled from "styled-components"

/*******************************************************************************
 *
 * GrowDiv
 *
 ******************************************************************************/

/**
 * Style for GrowDiv
 */
const StyledGrowDiv = styled.div`
    flex-grow: 1;
`

/**
 * GrowDiv Component
 */
export const GrowDiv = () => <StyledGrowDiv />

/*******************************************************************************
 *
 * SubHeader
 *
 ******************************************************************************/

/**
 * Props for SubHeader
 */
interface SubHeaderProps {
    addlProps?: BoxProps & JSX.IntrinsicElements['div']
}

/**
 * SubHeader Component
 */
export const SubHeader: React.FC<SubHeaderProps> = ( props ) => {
    return (
        <Box
            align="center"
            flex
            overflow="auto"
            {...props.addlProps}
        >
            {props.children}
        </Box>
    )
}