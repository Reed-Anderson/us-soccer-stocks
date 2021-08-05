import * as React from "react"
import firebase from 'firebase/app'
import { PostTransactionLog } from "../../functions/src/data/types"

/*******************************************************************************
 *
 * Custom hook to return the latest PostTransactionLog
 *
 ******************************************************************************/
const useLatestPtl = ()
:[ PostTransactionLog, boolean, firebase.firestore.FirestoreError ] => {
    /* Value is what gets returned */
    const [ ptl, setPtl ] = React.useState( null as PostTransactionLog )

    /* Loading is true if data is yet to be retrieved */
    const [ loading, setLoading ] = React.useState( true )

    /* Error holds any error that may come back from firebase */
    const [ error, setError ] = React.useState(
        null as firebase.firestore.FirestoreError
    )

    React.useEffect( () => {
        const coll = firebase.app().firestore()
            .collection( "postTransactionLogs" )
            .orderBy( "creationDate", "desc" )
            .limit( 1 )

        coll.onSnapshot(
            snapshot => {
                setPtl( snapshot.docs[ 0 ].data() as PostTransactionLog )
                setLoading( false )
            },
            error => {
                setError( error )
                setLoading( false )
            }
        )
    }, [] )

    return [ ptl, loading, error ]
}

export default useLatestPtl
