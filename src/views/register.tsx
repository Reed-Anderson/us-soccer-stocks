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
import { useHistory } from 'react-router-dom'

/*******************************************************************************
 *
 * Regular Expressions
 *
 ******************************************************************************/

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%^@#£€*?&]{8,}$/
const displayNameRegex = /^[a-zA-Z0-9 _-]{3,16}$/

/*******************************************************************************
 *
 * RegisterView
 *
 ******************************************************************************/

/**
 * RegisterView Component
 */
const RegisterView = () => {
    const size = React.useContext( ResponsiveContext )
    return (
        <>
            <MainHeader />
            <SubHeader>
                <Card
                    background={COLORS['light-3']}
                    elevation="none"
                    flex={false}
                    gap="small"
                    margin={size === "small" ? "none" : "large"}
                    pad="medium"
                    width="large"
                >
                    <CardHeader justify="center">
                        <Text size="large" weight="bold">
                            Register
                        </Text>
                    </CardHeader>
                    <RegisterForm />
                </Card>
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * RegisterForm
 *
 ******************************************************************************/


/**
 * RegisterForm Component
 */
const RegisterForm = () => {
    /* History to redirect */
    const history = useHistory()

    /* State for the values inside the form */
    const [ formState, setFormState ] = React.useState( {
        Email: '',
        DisplayName: '',
        MobileNumber: '',
        Password: '',
        ConfirmPassword: ''
    } )

    /* State for an error message, if any */
    const [ errorMessage, setErrorMessage ] = React.useState( '' )

    /* Function for form submit */
    const onSubmit = async () => {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    formState.Email,
                    formState.Password
                )

            history.push( '/' )
        } catch ( e: any ) {
            setErrorMessage( e.message || 'Something went wrong!' )
        }
    }

    /* Validate Confirm Password */
    const validateConfirmPassword = ( confirmPassword: string ) => {
        if ( confirmPassword !== formState.Password ) {
            return 'Passwords do not match.'
        }
        return true
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
                    validate={{
                        regexp: emailRegex,
                        message: 'Invalid Email'
                    }}
                />
                <FormField
                    name="DisplayName"
                    label="Display Name"
                    margin="small"
                    required
                    validate={{
                        regexp: displayNameRegex,
                        message: 'Invalid Display Name'
                    }}
                />
                <FormField
                    name="MobileNumber"
                    label="Mobile Number (Optional)"
                    margin="small"
                />
                <FormField
                    name="Password"
                    label="Password"
                    margin="small"
                    required
                    type="password"
                    validate={{
                        regexp: passwordRegex,
                        message: 'Password requires a minimum of 8 characters.'
                    }}
                />
                <FormField
                    name="ConfirmPassword"
                    label="Confirm Password"
                    margin="small"
                    required
                    type="password"
                    validate={validateConfirmPassword}
                />
                <FormField
                    name="ConfirmPassword"
                    label="Confirm Password"
                    margin="small"
                    required
                    type="password"
                    validate={validateConfirmPassword}
                />
                <FormField
                    name="ConfirmPassword"
                    label="Confirm Password"
                    margin="small"
                    required
                    type="password"
                    validate={validateConfirmPassword}
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
                        <Button
                            href="/login"
                            label="Log In"
                        />
                        <Button
                            label="Register"
                            primary
                            type="submit"
                        />
                    </Box>
                </CardFooter>
            </CardBody>
        </Form>
    )
}

export default RegisterView