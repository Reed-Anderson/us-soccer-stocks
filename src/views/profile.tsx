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
import { PostTransactionLog, User } from '../../functions/src/data/types'
import FullPageLoader from '../components/full-page-loader'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { useDocumentData } from '../misc/firebase-hooks'
import { UserContext } from '../misc/user-provider'
import { COLORS } from '../misc/colors'
import { displayNameRegex } from './register'
import { Checkmark, PieChart, Trophy, Twitter } from 'grommet-icons'
import { useHistory, useParams } from 'react-router'
import firebase from 'firebase/app'

/*******************************************************************************
 *
 * HomeView
 *
 ******************************************************************************/

interface ProfileViewParams {
    uid?: string
}

/**
 * HomeView Component
 */
const ProfileView = () => {
    const { uid } = useParams<ProfileViewParams>()
    const userContext = React.useContext( UserContext )
    const [ requestedUser ] = useDocumentData<User>( `users/${uid}` )
    const user = uid ? requestedUser : userContext.user
    const userOwnsProfile = userContext.authUser?.uid === user?.uid

    return (
        <>
            <MainHeader />
            {!userContext.authUser || !user ? (
                <FullPageLoader />
            ) : (
                <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                    <Heading>{user.displayName}</Heading>
                    <Box
                        background={COLORS['white']}
                        border={{ color: COLORS['dark-5'], size: 'small' }}
                        flex={false}
                        margin={{ bottom: "medium" }}
                        pad={{ horizontal: 'small', vertical: 'medium' }}
                        round="xsmall"
                        width="large"
                    >
                        <ProfileForm
                            authUser={userContext.authUser}
                            user={user}
                            userOwnsProfile={userOwnsProfile}
                        />
                    </Box>
                    <NavigationButtons twitterHandle={user.twitterHandle} />
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
    authUser: firebase.User
    user: User
    userOwnsProfile: boolean
}

/**
 * ProfileForm Component
 */
const ProfileForm = ( props: ProfileFormProps ) => {
    const [
        ptl
    ] = useDocumentData<PostTransactionLog>( "postTransactionLogs/1" )

    /**
     * State for values inside the form
     */
    const [ bio, setBio ] = React.useState( props.user.biography )
    const [ dispName, setDispName ] = React.useState( props.user.displayName )
    const [ twitter, setTwitter ] = React.useState( props.user.twitterHandle )

    /**
     * If props gives a new user, reset editable values
     */
    React.useEffect( () => {
        setBio( props.user.biography || "" )
        setDispName( props.user.displayName || "" )
        setTwitter( props.user.twitterHandle || "" )
    } )

    const netWorth = ptl?.users.find( u =>
        u.uid === props.user.uid
    )?.netWorth || props.user.cashOnHand

    /**
     * Variables for Saving Changes
     */
    const saveButtonDisabled = (
        bio === props.user.biography
        && dispName === props.user.displayName
        && twitter === props.user.twitterHandle
    )
    const saveChanges = () => {
        /* Sanity check that the user owns the profile they want to change */
        if( !props.userOwnsProfile || saveButtonDisabled ) {
            return
        }

        /*  */
        props.authUser.updateProfile( {
            displayName: dispName
        } )
        const user: User = {
            cashOnHand: props.user.cashOnHand,
            biography: bio,
            displayName: dispName,
            twitterHandle: twitter,
            uid: props.authUser.uid
        }
        firebase.app().firestore().doc( `users/${user.uid}` ).set( user )
    }

    return (
        <>
            <Form>
                <Box margin={{ horizontal: "small" }}>
                    <TextArea
                        fill
                        maxLength={500}
                        onChange={e => setBio( e.target.value )}
                        placeholder="Biography"
                        readOnly={!props.userOwnsProfile}
                        resize="vertical"
                        rows={5}
                        size="small"
                        value={bio}
                    />
                </Box>
                {props.userOwnsProfile && (
                    <FormField
                        label="Email Address"
                        margin="small"
                        readOnly
                        value={props.authUser.email}
                    />
                )}
                <FormField
                    label="Display Name"
                    margin="small"
                    onChange={e => setDispName( e.target.value )}
                    readOnly={!props.userOwnsProfile}
                    required
                    validate={{
                        regexp: displayNameRegex,
                        message: 'Invalid Display Name'
                    }}
                    value={dispName}
                />
                <FormField
                    label="Twitter Handle"
                    margin="small"
                    onChange={e => setTwitter( e.target.value )}
                    readOnly={!props.userOwnsProfile}
                    required
                    value={twitter}
                />
                <FormField
                    label="Net Worth"
                    margin="small"
                    readOnly
                    value={"$" + netWorth}
                />
            </Form>
            {props.userOwnsProfile && (
                <Box
                    direction="row"
                    gap="small"
                    justify="center"
                    margin={{ horizontal: "small", top: "small" }}
                >
                    <Button
                        color={COLORS['neutral-3']}
                        disabled={saveButtonDisabled}
                        fill
                        icon={<Checkmark />}
                        label="Save Changes"
                        onClick={saveChanges}
                        primary
                        target="_blank"
                    />
                </Box>
            )}
        </>
    )
}

/*******************************************************************************
 *
 * NavigationButtons
 *
 ******************************************************************************/

/**
 * Props for NavigationButtons
 */
interface NavigationButtonsProps {
    twitterHandle?: string
}

/**
 * NavigationButtons Component
 */
const NavigationButtons = ( props: NavigationButtonsProps ) => {
    const size = React.useContext( ResponsiveContext )
    const history = useHistory()
    const href = (
        props.twitterHandle
        && `https://twitter.com/${props.twitterHandle}`
    )

    return (
        <Box
            direction="row"
            flex={false}
            gap="small"
            justify="center"
            margin={{ bottom: "medium" }}
        >
            <Button
                color={COLORS.twitter}
                disabled={!props.twitterHandle}
                icon={<Twitter color={COLORS.white} />}
                href={href}
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
    )
}

export default ProfileView
