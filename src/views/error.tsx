import { Card, Box, Button, Text } from 'grommet'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { COLORS } from '../misc/colors'
/*******************************************************************************
 *
 * ErrorView
 *
 ******************************************************************************/

/**
 * ErrorView Component
 */
const ErrorView = () => {
    const history = useHistory()
    return (
        <>
            <MainHeader />
            <SubHeader addlProps={{ margin: 'xlarge' }}>
                <Card
                    background={COLORS['light-5']}
                    elevation="none"
                    gap="small"
                    pad="medium"
                    width="large"
                >
                    <Box
                        align="center"
                        alignContent="center"
                        flex="grow"
                        gap="large"
                    >
                        <Text size="large" weight="bold">
                            Error 404
                        </Text>
                        <Text>Page not found.</Text>
                        <Button
                            color={COLORS['neutral-3']}
                            label="Go Back"
                            onClick={history.goBack}
                            primary
                        />
                    </Box>
                </Card>
            </SubHeader>
        </>
    )
}

export default ErrorView