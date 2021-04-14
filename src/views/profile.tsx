import * as React from 'react'
import {
    Box,
    Button,
    Form,
    FormField,
    Heading,
    ResponsiveContext,
    TextArea
} from 'grommet'
import { User } from '../../functions/src/data/types'
import FullPageLoader from '../components/full-page-loader'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { useDocumentData } from '../misc/firebase-hooks'
import { UserContext } from '../misc/user-provider'
import { COLORS } from '../misc/colors'
import { displayNameRegex } from './register'
import firebase from 'firebase/app'
import 'firebase/auth'
import { PieChart, Trophy, Twitter } from 'grommet-icons'
import { useHistory } from 'react-router'

/*******************************************************************************
 *
 * HomeView
 *
 ******************************************************************************/

/**
 * HomeView Component
 */
const ProfileView = () => {
    const user = React.useContext( UserContext )
    const [
        userData,
        userDataLoading,
        userDataError
    ] = useDocumentData<User>( `users/${user.user?.uid}` )

    if( userData ) {
        userData.twitterHandle = "DevReed1"
    }

    if( userDataError ) {
        // TODO: Full page error
        return null
    }

    return (
        <>
            <MainHeader />
            {userDataLoading || !userData ? (
                <FullPageLoader />
            ) : (
                <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                    <Heading>{userData.displayName}</Heading>
                    <Box
                        background={COLORS['white']}
                        border={{ color: COLORS['dark-3'], size: 'small' }}
                        flex={false}
                        margin={{ bottom: "medium" }}
                        pad={{ horizontal: 'small', vertical: 'medium' }}
                        round="xsmall"
                        width="large"
                    >
                        <ProfileForm
                            firebaseUser={user.user}
                            user={userData}
                            userIsOwner={true}
                        />
                    </Box>
                </SubHeader>
            )}
        </>
    )
}

/*******************************************************************************
 *
 * ProfileForm
 *
 ******************************************************************************/

/**
 * Props for ProfileForm
 */
interface ProfileFormProps {
    firebaseUser: firebase.User
    user: User
    userIsOwner: boolean
}

/**
 * ProfileForm Component
 */
const ProfileForm = ( props: ProfileFormProps ) => {
    const size = React.useContext( ResponsiveContext )
    const history = useHistory()

    return (
        <>
            <Form>
                <Box margin={{ horizontal: "small" }}>
                    <TextArea
                        placeholder="Biography"
                        resize="vertical"
                        value={props.user.description}
                    />
                </Box>
                {props.userIsOwner && (
                    <FormField
                        label="Email Address"
                        margin="small"
                        name="Email"
                        readOnly
                        value={props.firebaseUser.email}
                    />
                )}
                <FormField
                    label="Display Name"
                    margin="small"
                    name="DisplayName"
                    required
                    validate={{
                        regexp: displayNameRegex,
                        message: 'Invalid Display Name'
                    }}
                    value={props.user.displayName}
                />
                <FormField
                    label="Twitter Handle"
                    margin="small"
                    name="TwitterHandle"
                    required
                    validate={{
                        regexp: displayNameRegex,
                        message: 'Invalid Display Name'
                    }}
                    value={props.user.twitterHandle}
                />
                <FormField
                    label="Net Worth"
                    margin={{
                        bottom: "medium",
                        horizontal: "small",
                        top: "small"
                    }}
                    name="NetWorth"
                    required
                    validate={{
                        regexp: displayNameRegex,
                        message: 'Invalid Display Name'
                    }}
                    value={"$" + props.user.cashOnHand}
                />
            </Form>
            <Box
                direction="row"
                gap="small"
                justify="center"
                margin={{ top: "small" }}
            >
                <Button
                    color={COLORS.twitter}
                    icon={<Twitter color={COLORS.white} />}
                    href={`https://twitter.com/${props.user.twitterHandle}`}
                    label={size === "small" ? "" : "Twitter"}
                    primary
                    style={{ color: COLORS.white }}
                    target="_blank"
                />
                <Button
                    color={COLORS['neutral-1']}
                    icon={<PieChart />}
                    label={size === "small" ? "" : "Portfolio"}
                    onClick={() => history.push( "/portfolio" )}
                    primary
                />
                <Button
                    color={COLORS['neutral-4']}
                    icon={<Trophy />}
                    label={size === "small" ? "" : "Leaderboard"}
                    onClick={() => history.push( "/leaderboard" )}
                    primary
                />
            </Box>
        </>
    )
}

export default ProfileView
