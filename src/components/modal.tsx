import { Box, Button, Heading, Layer } from "grommet"
import { FormClose } from "grommet-icons"
import * as React from "react"
import { COLORS } from "../misc/colors"
import { GrowDiv } from "./simple-divs"

/*******************************************************************************
 *
 * Modal
 *
 ******************************************************************************/

/**
 * Props for Modal
 */
 interface ModalProps {
    closeFn: () => void
    title: string
}

/**
 * Modal Component
 */
const Modal: React.FC<ModalProps> = props => {
    return (
        <Layer onEsc={props.closeFn}>
            <Box
                align='center'
                as='header'
                background={COLORS["light-2"]}
                border={{ color: COLORS["light-6"], side: "bottom" }}
                direction='row'
            >
                <Heading level={5} margin="small">
                    {props.title}
                </Heading>
                <GrowDiv />
                <Button
                    icon={<FormClose />}
                    hoverIndicator={COLORS["light-4"]}
                    onClick={props.closeFn}
                />
            </Box>
            {props.children}
        </Layer>
    )
}

export default Modal
