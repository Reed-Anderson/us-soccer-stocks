import * as React from "react"
import firebase from 'firebase/app'
import 'firebase/auth'

export const UserContext = React.createContext( {
    authChecked: false,
    user: null as firebase.User
} )

export const UserContextProvider: React.FC<{}> = ( props ) => {
    const [ user, setUser ] = React.useState( {
        authChecked: false,
        user: null as firebase.User
    } )
    React.useEffect( () => {
        const unsubscribe = firebase.auth().onAuthStateChanged( ( user ) => {
            setUser( {
                authChecked: true,
                user: user
            } )
        } )
        return unsubscribe
    }, [] )
    
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}