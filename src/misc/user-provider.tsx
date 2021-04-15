import * as React from "react"
import firebase from 'firebase/app'
import 'firebase/auth'
import { User } from "../../functions/src/data/types"
import { useDocumentData } from "./firebase-hooks"

export const UserContext = React.createContext( {
    authChecked: false,
    authUser: undefined as firebase.User,
    user: undefined as User
} )

export const UserContextProvider: React.FC<{}> = ( props ) => {
    const [ authChecked, setAuthChecked ] = React.useState( false )
    const [ authUser, setAuthUser ] = React.useState( null as firebase.User )
    const [ user ] = useDocumentData<User>( `users/${authUser?.uid}` )

    React.useEffect( () => {
        const unsubscribe = firebase.auth().onAuthStateChanged( ( user ) => {
            setAuthChecked( true )
            setAuthUser( user )
        } )
        return unsubscribe
    }, [] )

    const value = {
        authChecked: authChecked,
        authUser: authUser,
        user: user
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}