import * as React from 'react'
import { Heading } from 'grommet'
import { User } from '../../functions/src/data/types'
import FullPageLoader from '../components/full-page-loader'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import { useDocumentData } from '../misc/firebase-hooks'
import { UserContext } from '../misc/user-provider'

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
                </SubHeader>
            )}
        </>
    )
}

export default ProfileView
