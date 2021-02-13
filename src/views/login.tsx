import * as React from 'react'
import firebase from 'firebase/app'
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Form,
    FormField,
    ResponsiveContext,
    Text
} from 'grommet'
import { SubHeader } from '../components/simple-divs'
import { COLORS } from '../misc/colors'
import MainHeader from '../components/main-header'
import { Link, useHistory } from 'react-router-dom'

/*******************************************************************************
 *
 * LoginView
 *
 ******************************************************************************/

/**
 * LoginView Component
 */
const LoginView = () => {
    const size = React.useContext( ResponsiveContext )
    return (
        <>
            <MainHeader />
            <SubHeader>
                <Card
                    background={COLORS['light-3']}
                    elevation="none"
                    flex={size === "small"}
                    gap="small"
                    margin={size === "small" ? "none" : "large"}
                    pad="medium"
                    width="large"
                >
                    <CardHeader justify="center">
                        <Text size="large" weight="bold">
                            Log In
                        </Text>
                    </CardHeader>
                    <LoginForm />
                </Card>
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * LoginForm
 *
 ******************************************************************************/

/**
 * LoginForm Component
 */
const LoginForm = () => {
    /* History to redirect */
    const history = useHistory()

    /* State for the values inside the form */
    const [ formState, setFormState ] = React.useState( {
        Email: '',
        Password: ''
    } )

    /* State for an error message, if any */
    const [ errorMessage, setErrorMessage ] = React.useState( '' )

    /* Function for form submit */
    const onSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(
                formState.Email,
                formState.Password
            )
            history.push( '/' )
        } catch ( e: any ) {
            if( e.code === "auth/user-not-found" ) {
                setErrorMessage( "Invalid username/password" )
            }
            else {
                setErrorMessage( e.message || 'Something went wrong!' )
            }
        }
    }

    return (
        <Form
            onChange={setFormState}
            onSubmit={onSubmit}
            value={formState}
        >
            <CardBody
                background={COLORS['white']}
                border={{ color: COLORS['dark-3'], size: 'small' }}
                pad={{ horizontal: 'small', vertical: 'medium' }}
                round="xsmall"
            >

                <FormField
                    name="Email"
                    label="Email Address"
                    margin="small"
                    required
                />
                <FormField
                    name="Password"
                    label="Password"
                    margin="small"
                    required
                    type="password"
                />
                {errorMessage && (
                    <Box
                        align="center"
                        background={{
                            color: COLORS['status-error'],
                            opacity: 'medium'
                        }}
                        margin={{ bottom: 'small' }}
                        pad="small"
                        round="xxsmall"
                    >
                        {errorMessage}
                    </Box>
                )}
                <CardFooter justify="center">
                    <Box direction="row" gap="small">
                        <Link to="/register">
                            <Button label="Register" />
                        </Link>
                        <Button
                            label="Log In"
                            primary
                            type="submit"
                        />
                    </Box>
                </CardFooter>
            </CardBody>
        </Form>
    )
}

export default LoginView