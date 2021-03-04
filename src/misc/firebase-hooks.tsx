import * as React from "react"
import firebase from 'firebase/app'

export function useDocumentData<Type>( path: string ):
[ Type, boolean, firebase.firestore.FirestoreError ] {
    /* Value is what gets returned */
    const [ value, setValue ] = React.useState( null as Type )

    /* Loading is true if data is yet to be retrieved */
    const [ loading, setLoading ] = React.useState( true )

    /* Error holds any error that may come back from firebase */
    const [ error, setError ] = React.useState(
        null as firebase.firestore.FirestoreError
    )

    /* Effect so the listener is only set once */
    React.useEffect( () => {
        const doc = firebase.app().firestore().doc( path )
        doc.onSnapshot(
            snapshot => {
                setLoading( false )
                setValue( snapshot.data() as Type )
            },
            error => {
                setLoading( false )
                setError( error )
            }
        )
    }, [] )

    return [ value, loading, error ]
}
